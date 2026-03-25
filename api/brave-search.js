// Vercel serverless function for Brave Search API
// This handles CORS issues by making server-side requests

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, location } = req.body;

    // Validate input
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Get Brave API key from environment variables
    const braveApiKey = process.env.BRAVE_API_KEY;
    
    if (!braveApiKey) {
      console.error('Brave API key not configured');
      return res.status(500).json({ error: 'Brave API key not configured' });
    }

    console.log('🔍 Server-side Brave Search:', query);
    console.log('🔑 Using API key:', braveApiKey.substring(0, 10) + '...');

    // Build Brave API URL
    const params = new URLSearchParams({
      q: query,
      count: '10',
      text_decorations: 'false',
      spellcheck: 'true',
      result_filter: 'web',
      safesearch: 'moderate'
    });

    if (location) {
      params.append('country', location === 'Poland' ? 'PL' : 'US');
    }

    const braveUrl = `https://api.search.brave.com/res/v1/web/search?${params}`;
    console.log('🔗 Brave API URL:', braveUrl);

    // Make server-side request to Brave API
    const response = await fetch(braveUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'X-Subscription-Token': braveApiKey,
        'User-Agent': 'WonderStart/1.0'
      }
    });

    console.log('📊 Brave Response Status:', response.status);
    console.log('📊 Brave Response OK:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Brave API Error:', errorText);
      return res.status(response.status).json({ 
        error: `Brave API error: ${response.statusText}`,
        details: errorText
      });
    }

    const data = await response.json();
    console.log('✅ Brave API Success!');
    console.log('Results count:', data.web?.results?.length || 0);

    // Format results for frontend
    const results = [];
    if (data.web?.results) {
      data.web.results.forEach(result => {
        results.push({
          title: result.title || 'No Title',
          url: result.url || '',
          snippet: result.description || 'No Description',
          source: new URL(result.url || '').hostname || 'Unknown'
        });
      });
    }

    console.log('🔍 Formatted results:', results.length, 'items');

    // Return success response
    return res.status(200).json({
      success: true,
      results: results,
      instantAnswer: null,
      instantAnswerSource: null,
      query: query,
      provider: 'brave_search'
    });

  } catch (error) {
    console.error('💥 Server Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
