import { supabase } from '@/integrations/supabase/client';

type FirecrawlResponse<T = unknown> = {
  success: boolean;
  error?: string;
  data?: T;
  links?: string[];
};

type ScrapeOptions = {
  formats?: ('markdown' | 'html' | 'links' | 'screenshot')[];
  onlyMainContent?: boolean;
};

type MapOptions = {
  limit?: number;
  includeSubdomains?: boolean;
};

type CrawlOptions = {
  limit?: number;
  maxDepth?: number;
};

export const firecrawlApi = {
  async scrape(url: string, options?: ScrapeOptions): Promise<FirecrawlResponse> {
    const { data, error } = await supabase.functions.invoke('firecrawl', {
      body: { action: 'scrape', url, options },
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return data;
  },

  async map(url: string, options?: MapOptions): Promise<FirecrawlResponse> {
    const { data, error } = await supabase.functions.invoke('firecrawl', {
      body: { action: 'map', url, options },
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return data;
  },

  async crawl(url: string, options?: CrawlOptions): Promise<FirecrawlResponse> {
    const { data, error } = await supabase.functions.invoke('firecrawl', {
      body: { action: 'crawl', url, options },
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return data;
  },

  // Utility to trigger indexing of our own site
  async indexOurSite(): Promise<FirecrawlResponse> {
    return this.crawl('https://royal-devs.lovable.app', {
      limit: 50,
      maxDepth: 3,
    });
  },
};
