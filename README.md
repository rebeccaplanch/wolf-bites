# Wolf Bites 🐺

> Your consolidated hub for NC State Wolfpack sports news

Wolf Bites aggregates the latest news, videos, and podcasts about NC State men's football, basketball, and baseball from across YouTube, Twitter, and podcast platforms - all in one place.

## Features

- **Multi-Source Aggregation**: Combines content from YouTube, Twitter/X, and podcasts
- **Sport Filtering**: View content for specific sports (Football, Basketball, Baseball)
- **Source Filtering**: Filter by content type (Videos, Tweets, Podcasts)
- **Real-time Updates**: Refresh button to fetch the latest content
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Direct Links**: Click any item to open the original source

## Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- YouTube Data API key ([Get one here](https://console.cloud.google.com/))
- Twitter/X Bearer Token ([Get one here](https://developer.twitter.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rebeccaplanch/wolf-bites.git
   cd wolf-bites
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your API keys:
   ```env
   YOUTUBE_API_KEY=your_youtube_api_key
   TWITTER_BEARER_TOKEN=your_twitter_bearer_token
   ```

4. **Configure your sources** (optional)

   Edit `src/config/sources.ts` to customize which YouTube channels, Twitter accounts, and podcasts to follow.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

For detailed setup instructions, see [SETUP.md](SETUP.md).

## Project Structure

```
wolf-bites/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   │   └── content/  # Content aggregation endpoint
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ContentCard.tsx
│   │   ├── ContentFeed.tsx
│   │   └── FilterBar.tsx
│   ├── lib/              # API integrations
│   │   ├── youtube.ts    # YouTube API
│   │   ├── twitter.ts    # Twitter API
│   │   └── podcasts.ts   # RSS feed parser
│   ├── config/           # Configuration
│   │   └── sources.ts    # Content sources
│   └── types/            # TypeScript types
│       └── index.ts
├── public/               # Static assets
├── SETUP.md              # Detailed setup guide
├── VERCEL_SETUP.md       # Vercel deployment guide
├── CLAUDE.md             # AI assistant guide
└── package.json          # Dependencies
```

## Usage

### Filtering Content

- **By Sport**: Click Football, Basketball, or Baseball to see sport-specific content
- **By Source**: Click YouTube, Twitter, or Podcasts to see content from that platform
- **All**: View all content from all sources

### Refreshing

Click the **Refresh** button in the top right to fetch the latest content from all sources.

### Opening Content

Click any content card to open the original video, tweet, or podcast episode in a new tab.

## Customization

### Adding Sources

Edit `src/config/sources.ts`:

```typescript
youtube: [
  {
    id: 'CHANNEL_ID',
    name: 'Channel Name',
    sport: 'football', // or 'basketball' | 'baseball'
  },
],
twitter: [
  {
    username: 'TwitterHandle', // without @
    name: 'Display Name',
    sport: 'football',
  },
],
podcasts: [
  {
    url: 'https://feeds.example.com/podcast',
    name: 'Podcast Name',
    sport: 'football',
  },
],
```

See [SETUP.md](SETUP.md) for details on finding channel IDs and RSS feed URLs.

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

See [VERCEL_SETUP.md](VERCEL_SETUP.md) for detailed instructions.

## API Rate Limits

- **YouTube**: 10,000 units/day (≈100 searches)
- **Twitter**: Limited on free tier (consider upgrading)
- **Podcasts**: No limits (RSS feeds)

See [SETUP.md](SETUP.md) for more details on API limits.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **APIs**: YouTube Data API v3, Twitter API v2, RSS Parser
- **Deployment**: [Vercel](https://vercel.com/)

## Documentation

- [SETUP.md](SETUP.md) - Detailed setup and configuration guide
- [VERCEL_SETUP.md](VERCEL_SETUP.md) - Vercel deployment instructions
- [CLAUDE.md](CLAUDE.md) - Developer and AI assistant guidelines

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Go Pack! 🐺🔴⚪

---

Made with ❤️ for the Wolfpack community
