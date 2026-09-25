import { BRAND_INFO } from '../data/productData';

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

/**
 * Get cookie value by name (used for _fbp and _fbc tracking)
 */
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : undefined;
}

/**
 * Generate a unique event ID for Meta Deduplication (matching browser pixel & Conversions API)
 */
export function generateEventId(prefix: string = 'evt'): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 9);
  return `${prefix}_${timestamp}_${randomStr}`;
}

export interface MetaUserData {
  phone?: string;
  name?: string;
  email?: string;
  fbp?: string;
  fbc?: string;
}

/**
 * Sends event to Server-side Meta Conversions API (CAPI)
 */
export async function sendMetaConversionsApiEvent(
  eventName: string,
  eventId: string,
  customData?: Record<string, any>,
  userData?: MetaUserData
) {
  try {
    const fbp = userData?.fbp || getCookie('_fbp');
    const fbc = userData?.fbc || getCookie('_fbc');

    const testEventCode = typeof window !== 'undefined' 
      ? (new URLSearchParams(window.location.search).get('test_event_code') || localStorage.getItem('meta_test_event_code') || undefined)
      : undefined;

    const payload: Record<string, any> = {
      event_name: eventName,
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: typeof window !== 'undefined' ? window.location.href : '',
      user_data: {
        ...userData,
        fbp,
        fbc,
        client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
      },
      custom_data: customData || {}
    };

    if (testEventCode) {
      payload.test_event_code = testEventCode;
    }

    const res = await fetch('/api/meta-conversions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.warn('[Meta CAPI] Warning response:', err);
    } else {
      const result = await res.json().catch(() => ({}));
      console.log(`[Meta CAPI] Sent "${eventName}" event successfully:`, result);
    }
  } catch (error) {
    console.warn('[Meta CAPI] Dispatch error (silently handled):', error);
  }
}

/**
 * Initializes Meta Pixel with PageView tracking & dual-channel CAPI dispatch
 */
export function initMetaPixel(pixelId?: string) {
  const activePixelId = pixelId || BRAND_INFO.metaPixelId;
  if (!activePixelId || typeof window === 'undefined') return;

  const pageViewId = generateEventId('pv');

  // If already initialized in HTML head
  if (window.fbq) {
    try {
      window.fbq('track', 'PageView', {}, { eventID: pageViewId });
      sendMetaConversionsApiEvent('PageView', pageViewId);
    } catch (e) {
      console.warn('fbq pageview error:', e);
    }
    return;
  }

  /* eslint-disable */
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    if (s && s.parentNode) {
      s.parentNode.insertBefore(t, s);
    }
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  if (window.fbq) {
    window.fbq('init', activePixelId);
    window.fbq('track', 'PageView', {}, { eventID: pageViewId });
    sendMetaConversionsApiEvent('PageView', pageViewId);
  }
}

/**
 * Track Meta Pixel Events with automatic Conversions API (CAPI) deduplication
 */
export function trackMetaPixelEvent(
  eventName: string,
  params?: Record<string, any>,
  userData?: MetaUserData,
  forcedEventId?: string
): string {
  const eventId = forcedEventId || (params?.orderId ? `order_${params.orderId}` : generateEventId(eventName.toLowerCase()));

  // 1. Browser Meta Pixel Event
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('track', eventName, params || {}, { eventID: eventId });
    } catch (err) {
      console.warn('fbq track error:', err);
    }
  }

  // 2. Server-side Meta Conversions API (CAPI) Event
  sendMetaConversionsApiEvent(eventName, eventId, params, userData);

  return eventId;
}
