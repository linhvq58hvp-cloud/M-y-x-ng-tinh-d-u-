import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.NODE_ENV === 'production' && process.env.PORT 
  ? parseInt(process.env.PORT, 10) 
  : 3000;

// Meta CAPI Configuration
const META_PIXEL_ID = process.env.META_PIXEL_ID || '1441153647920557';
const META_ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN || 
  'EAAPKviuGMEYBSrk4RAt4BPw85EoTH3PSA9qhZAc10h07wzR3Wt2GTYMlDETknG5DZAAUyLp67RdqJ7cqYYEKxGBHkNlM2NZCG4dNwZAKOEgRzgT4xBI4l9XiUWvM7jDjwepXOu7y2c5ykph9UjfIhGEZBLp7sl4trlXff8HI0KGwKKJYvmqqK380WVAdSjcHhHgZDZD';

app.use(express.json());

// Helper to hash string with SHA-256 for Meta CAPI
function sha256Hash(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

// Normalize phone for Meta (remove spaces, symbols, ensure country code)
function normalizeAndHashPhone(phone?: string): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  if (!digits) return null;
  // If starts with 0 and 10 digits (e.g., Vietnam: 0942223434), replace 0 with 84
  let normalized = digits;
  if (normalized.startsWith('0')) {
    normalized = '84' + normalized.slice(1);
  }
  return sha256Hash(normalized);
}

// Normalize and hash email
function normalizeAndHashEmail(email?: string): string | null {
  if (!email || !email.includes('@')) return null;
  return sha256Hash(email.trim().toLowerCase());
}

// Extract cookies helper
function parseCookies(cookieHeader?: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach((part) => {
    const [k, ...v] = part.trim().split('=');
    if (k && v.length) {
      cookies[k] = decodeURIComponent(v.join('='));
    }
  });
  return cookies;
}

// Status endpoint to verify Meta Conversions API readiness
app.get('/api/meta-conversions/status', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    pixelId: META_PIXEL_ID,
    hasToken: Boolean(META_ACCESS_TOKEN && META_ACCESS_TOKEN.length > 20),
    timestamp: new Date().toISOString()
  });
});

// Meta Conversions API Endpoint
app.post('/api/meta-conversions', async (req: Request, res: Response) => {
  try {
    const {
      event_name,
      event_id,
      event_time,
      event_source_url,
      user_data = {},
      custom_data = {},
      test_event_code
    } = req.body;

    if (!event_name) {
      return res.status(400).json({ error: 'event_name is required' });
    }

    if (!META_ACCESS_TOKEN) {
      return res.status(500).json({ error: 'Meta Conversions API access token not configured' });
    }

    const cookies = parseCookies(req.headers.cookie);
    
    // Extract client IP address (handle proxies, Cloud Run, Cloudflare)
    const forwardedHeader = req.headers['x-forwarded-for'];
    let clientIp = '';
    if (typeof forwardedHeader === 'string') {
      clientIp = forwardedHeader.split(',')[0].trim();
    } else if (Array.isArray(forwardedHeader) && forwardedHeader.length > 0) {
      clientIp = forwardedHeader[0].trim();
    } else {
      clientIp = req.socket.remoteAddress || '';
    }

    // Extract client user agent
    const clientUserAgent = (req.headers['user-agent'] as string) || (user_data.client_user_agent as string) || '';

    // Build user_data for Meta CAPI
    const formattedUserData: Record<string, any> = {};

    if (clientIp) {
      formattedUserData.client_ip_address = clientIp;
    }
    if (clientUserAgent) {
      formattedUserData.client_user_agent = clientUserAgent;
    }

    // Facebook browser cookie IDs (_fbp & _fbc)
    const fbp = user_data.fbp || cookies._fbp;
    const fbc = user_data.fbc || cookies._fbc;
    if (fbp) formattedUserData.fbp = fbp;
    if (fbc) formattedUserData.fbc = fbc;

    // Hashed Phone
    const hashedPhone = normalizeAndHashPhone(user_data.phone);
    if (hashedPhone) {
      formattedUserData.ph = [hashedPhone];
    }

    // Hashed Email
    const hashedEmail = normalizeAndHashEmail(user_data.email);
    if (hashedEmail) {
      formattedUserData.em = [hashedEmail];
    }

    // Hashed Name
    if (user_data.name) {
      const nameParts = user_data.name.trim().split(/\s+/);
      if (nameParts.length > 1) {
        formattedUserData.fn = [sha256Hash(nameParts[nameParts.length - 1])];
        formattedUserData.ln = [sha256Hash(nameParts[0])];
      } else {
        formattedUserData.fn = [sha256Hash(user_data.name)];
      }
    }

    const eventPayload: Record<string, any> = {
      event_name,
      event_time: event_time || Math.floor(Date.now() / 1000),
      event_source_url: event_source_url || req.headers.referer || '',
      action_source: 'website',
      user_data: formattedUserData
    };

    // Deduplication event_id
    if (event_id) {
      eventPayload.event_id = String(event_id);
    }

    // Custom e-commerce data
    if (custom_data && Object.keys(custom_data).length > 0) {
      eventPayload.custom_data = custom_data;
    }

    const payload: Record<string, any> = {
      data: [eventPayload],
      access_token: META_ACCESS_TOKEN
    };

    const activeTestCode = test_event_code || process.env.META_TEST_EVENT_CODE;
    if (activeTestCode) {
      payload.test_event_code = activeTestCode;
    }

    const fbUrl = `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events`;
    const fbResponse = await fetch(fbUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const fbData = await fbResponse.json();

    if (!fbResponse.ok) {
      console.error('Meta CAPI Error:', fbData);
      return res.status(fbResponse.status).json({
        success: false,
        error: fbData
      });
    }

    return res.json({
      success: true,
      meta_response: fbData
    });
  } catch (error: any) {
    console.error('Server error handling Meta CAPI:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

// Test trigger endpoint
app.post('/api/meta-conversions/test', async (req: Request, res: Response) => {
  try {
    const { test_event_code } = req.body;
    const testPayload = {
      event_name: 'PageView',
      event_id: `test_${Date.now()}`,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: req.headers.referer || 'https://localhost:3000',
      user_data: {
        phone: '0942223434',
        name: 'Test Customer',
        client_user_agent: req.headers['user-agent']
      },
      custom_data: {
        currency: 'VND',
        value: 1290000,
        content_name: 'Apex One Luxury Edition (Test Event)'
      },
      test_event_code: test_event_code || process.env.META_TEST_EVENT_CODE
    };

    const forwarded = req.headers['x-forwarded-for'];
    const clientIp = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket.remoteAddress || '113.190.234.50';

    const fbPayload: Record<string, any> = {
      data: [
        {
          event_name: testPayload.event_name,
          event_id: testPayload.event_id,
          event_time: testPayload.event_time,
          event_source_url: testPayload.event_source_url,
          action_source: 'website',
          user_data: {
            client_ip_address: clientIp,
            client_user_agent: req.headers['user-agent'] || 'Mozilla/5.0',
            ph: [sha256Hash('84942223434')]
          },
          custom_data: testPayload.custom_data
        }
      ],
      access_token: META_ACCESS_TOKEN
    };

    if (testPayload.test_event_code) {
      fbPayload.test_event_code = testPayload.test_event_code;
    }

    const fbResponse = await fetch(`https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fbPayload)
    });

    const data = await fbResponse.json();
    return res.json({ success: fbResponse.ok, result: data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
