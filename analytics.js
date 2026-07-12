// ShadeCast Lightweight Internal Analytics Event Layer
export const ANALYTICS_ENABLED = true;

const eventLog = [];

export function trackEvent(eventName, eventData = {}) {
  if (!ANALYTICS_ENABLED) return;
  
  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    data: eventData
  };
  
  // Store in-memory
  eventLog.push(payload);
  
  // Mirror to localStorage for local session persistence
  try {
    const stored = JSON.parse(localStorage.getItem('shadecast_events') || '[]');
    stored.push(payload);
    
    // Cap at 100 entries to prevent localStorage bloat
    if (stored.length > 100) {
      stored.shift();
    }
    
    localStorage.setItem('shadecast_events', JSON.stringify(stored));
  } catch (e) {
    console.error('Analytics localStorage write failed:', e);
  }
  
  // Debug Console Output
  console.log(`[ShadeCast Telemetry] ${eventName}:`, payload);
  
  // Trigger custom window event for integrations or debugging tools
  window.dispatchEvent(new CustomEvent('shadecast_telemetry_event', { detail: payload }));
}

// Automatically track load/page-view events on script initialization
if (typeof window !== 'undefined') {
  trackEvent('page_view', {
    userAgent: navigator.userAgent,
    referrer: document.referrer
  });
  
  // Identify if initial path maps to any static pre-rendered SEO route
  const path = window.location.pathname.toLowerCase();
  const seoRoutes = [
    'best-driving-sunglasses',
    'best-fishing-sunglasses',
    'best-disc-golf-sunglasses',
    'best-running-sunglasses',
    'best-skiing-sunglasses'
  ];
  const matchedRoute = seoRoutes.find(route => path.includes(route));
  if (matchedRoute) {
    trackEvent('seo_route_loaded', { route: matchedRoute });
  }
}
