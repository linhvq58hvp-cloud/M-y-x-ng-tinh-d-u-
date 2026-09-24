import { BRAND_INFO } from '../data/productData';

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

/**
 * Initializes Meta Pixel (Facebook Pixel) with PageView tracking
 */
export function initMetaPixel(pixelId?: string) {
  const activePixelId = pixelId || BRAND_INFO.metaPixelId;
  if (!activePixelId || typeof window === 'undefined') return;

  // Prevent multiple initializations
  if (window.fbq) return;

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
    window.fbq('track', 'PageView');
  }
}

/**
 * Track custom Meta Pixel Events (Purchase, InitiateCheckout, Lead, etc.)
 */
export function trackMetaPixelEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}
