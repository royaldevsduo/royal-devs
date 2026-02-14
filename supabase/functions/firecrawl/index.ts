const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    if (!['http:', 'https:'].includes(url.protocol)) {
      return false;
    }
    // Block internal/private IPs
    const hostname = url.hostname;
    if (
      hostname === 'localhost' ||
      hostname.startsWith('127.') ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.16.') ||
      hostname.startsWith('0.') ||
      hostname === '[::1]'
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, url, options } = await req.json();

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let formattedUrl = url?.trim();
    if (formattedUrl && !formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    // Validate URL format and block internal networks
    if (!formattedUrl || !isValidUrl(formattedUrl)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid or disallowed URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate options parameters
    const limit = options?.limit ? Number(options.limit) : undefined;
    if (limit !== undefined && (isNaN(limit) || limit < 1 || limit > 5000)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid limit value (1-5000)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const maxDepth = options?.maxDepth ? Number(options.maxDepth) : undefined;
    if (maxDepth !== undefined && (isNaN(maxDepth) || maxDepth < 1 || maxDepth > 10)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid maxDepth value (1-10)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let endpoint: string;
    let body: Record<string, unknown>;

    switch (action) {
      case 'scrape':
        endpoint = 'https://api.firecrawl.dev/v1/scrape';
        body = {
          url: formattedUrl,
          formats: options?.formats || ['markdown'],
          onlyMainContent: options?.onlyMainContent ?? true,
        };
        break;

      case 'map':
        endpoint = 'https://api.firecrawl.dev/v1/map';
        body = {
          url: formattedUrl,
          limit: limit || 5000,
          includeSubdomains: options?.includeSubdomains ?? false,
        };
        break;

      case 'crawl':
        endpoint = 'https://api.firecrawl.dev/v1/crawl';
        body = {
          url: formattedUrl,
          limit: limit || 100,
          maxDepth: maxDepth || 3,
          scrapeOptions: {
            formats: ['markdown', 'html'],
          },
        };
        break;

      default:
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid action. Use: scrape, map, or crawl' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    console.log(`Firecrawl ${action}:`, formattedUrl);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Firecrawl API error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data.error || `Request failed with status ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`${action} successful`);
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in firecrawl function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
