import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Generate a unique visitor ID and store in localStorage
const getVisitorId = (): string => {
  const key = 'royal_devs_visitor_id';
  let visitorId = localStorage.getItem(key);
  
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem(key, visitorId);
  }
  
  return visitorId;
};

export function useAnalytics() {
  const trackPageView = useCallback(async (pagePath: string) => {
    try {
      const visitorId = getVisitorId();
      
      await supabase.from('page_views').insert({
        page_path: pagePath,
        visitor_id: visitorId,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
      });
    } catch (error) {
      // Silently fail - analytics should not break the app
      console.debug('Analytics tracking failed:', error);
    }
  }, []);

  return { trackPageView };
}

export function usePageView(pagePath: string) {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView(pagePath);
  }, [pagePath, trackPageView]);
}
