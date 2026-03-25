# WonderStart

A modern AI-powered search and chat application with real thinking AI and smart search capabilities.

## Features

- **Real Thinking AI**: Uses Riverflow V2 Pro model for deep reasoning
- **Smart Search**: Brave Search API with DuckDuckGo fallback
- **Image Generation**: Pixazo Flux Schnell for AI-generated images
- **Polish Content**: Specialized filtering for Poland-specific content

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Vercel Serverless Functions
- **AI**: OpenRouter API (Riverflow V2 Pro)
- **Search**: Brave Search API + DuckDuckGo
- **Images**: Pixazo API (Flux Schnell)

## Environment Variables

This app uses the following environment variables:

- `BRAVE_API_KEY`: Your Brave Search API key
- `OPENROUTER_API_KEY`: Your OpenRouter API key

## Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   - In Vercel dashboard → Settings → Environment Variables
   - Add `BRAVE_API_KEY` with your Brave Search API key
   - Add `OPENROUTER_API_KEY` with your OpenRouter API key

3. **Deploy**
   - Vercel will automatically deploy
   - Serverless functions will be available at `/api/*`

### Local Development

1. Clone the repository
2. Install Vercel CLI: `npm i -g vercel`
3. Run locally: `vercel dev`
4. Set environment variables in `.env.local`

## API Endpoints

### POST /api/brave-search

Serverless function that handles Brave Search API calls server-side to avoid CORS issues.

**Request:**
```json
{
  "query": "search term",
  "location": "Poland" (optional)
}
```

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "title": "Result title",
      "url": "https://example.com",
      "snippet": "Result description",
      "source": "example.com"
    }
  ],
  "provider": "brave_search"
}
```

## API Keys Required

### Brave Search API
1. Go to [Brave Search API Dashboard](https://api-dashboard.search.brave.com/)
2. Create account and get API key
3. Add to Vercel environment variables

### OpenRouter API
1. Go to [OpenRouter](https://openrouter.ai/keys)
2. Create free API key
3. Add to Vercel environment variables

## License

MIT
