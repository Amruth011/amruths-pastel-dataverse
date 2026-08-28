/**
 * Lightweight analytics helper.
 *
 * - Sends events to Google Analytics (gtag) when a measurement ID is configured
 *   via VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY.
 * - Always keeps a rolling local log (last 200 events) so events can be
 *   inspected in the browser console with `window.__portfolioEvents`.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __portfolioEvents?: Array<{ name: string; params: EventParams; at: string }>;
  }
}

const measurementId = import.meta.env
  .VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY as string | undefined;

let initialized = false;

export const initAnalytics = () => {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  window.__portfolioEvents = window.__portfolioEvents ?? [];

  if (!measurementId) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
};

export const trackEvent = (name: string, params: EventParams = {}) => {
  if (typeof window === 'undefined') return;

  const entry = { name, params, at: new Date().toISOString() };
  window.__portfolioEvents = window.__portfolioEvents ?? [];
  window.__portfolioEvents.push(entry);
  if (window.__portfolioEvents.length > 200) window.__portfolioEvents.shift();

  window.gtag?.('event', name, params);
};

export const trackPageView = (path: string) => {
  trackEvent('page_view', { page_path: path });
};
