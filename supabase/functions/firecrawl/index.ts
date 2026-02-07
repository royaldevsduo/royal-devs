const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
          limit: options?.limit || 5000,
          includeSubdomains: options?.includeSubdomains ?? false,
        };
        break;

      case 'crawl':
        endpoint = 'https://api.firecrawl.dev/v1/crawl';
        body = {
          url: formattedUrl,
          limit: options?.limit || 100,
          maxDepth: options?.maxDepth || 3,
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
