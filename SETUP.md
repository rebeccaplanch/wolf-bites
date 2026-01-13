# Wolf Bites Setup Guide

This guide will help you set up the NC State sports news aggregator.

## Prerequisites

- Node.js 18.0.0 or higher
- npm, yarn, or pnpm
- API keys for YouTube and Twitter

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Get API Keys

### YouTube Data API v3

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy the API key

### Twitter/X API Bearer Token

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new app or select an existing one
3. Go to the **Keys and Tokens** tab
4. Generate a **Bearer Token**
5. Copy the bearer token

**Note:** Twitter's free tier has very limited API access. You may need to apply for Elevated access or use the Basic tier.

## Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your API keys:
   ```env
   YOUTUBE_API_KEY=your_actual_youtube_api_key
   TWITTER_BEARER_TOKEN=your_actual_twitter_bearer_token
   ```

## Step 4: Configure Content Sources

Edit `src/config/sources.ts` to customize your content sources:

### Adding YouTube Channels

To find a YouTube channel ID:
1. Go to the channel page
2. View page source (Ctrl+U or Cmd+U)
3. Search for "channelId"
4. Copy the ID (starts with UC...)

```typescript
youtube: [
  {
    id: 'UCjyDoANM6X-zK_PnSCD-iEQ', // Channel ID
    name: 'NC State Athletics',
    sport: 'football', // 'football' | 'basketball' | 'baseball'
  },
  // Add more channels...
]
```

### Adding Twitter Accounts

```typescript
twitter: [
  {
    username: 'PackFootball', // Without the @
    name: 'NC State Football',
    sport: 'football',
  },
  // Add more accounts...
]
```

### Adding Podcast RSS Feeds

To find podcast RSS feeds:
1. Find the podcast on Apple Podcasts
2. Right-click and "Copy Link"
3. Use a service like [PodcastURL.com](https://podcasturl.com) to convert the Apple Podcasts URL to an RSS feed URL

```typescript
podcasts: [
  {
    url: 'https://feeds.megaphone.fm/packedhouse',
    name: 'Packed House Podcast',
    sport: 'football',
  },
  // Add more podcasts...
]
```

## Step 5: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 6: Test the App

1. Click the **Refresh** button to fetch latest content
2. Use the sport filters (Football, Basketball, Baseball)
3. Use the source filters (YouTube, Twitter, Podcasts)
4. Click on any content card to open it in a new tab

## Troubleshooting

### No YouTube videos showing

- **Check your API key**: Make sure it's correctly set in `.env.local`
- **Check API quota**: YouTube API has daily quotas (10,000 units/day)
- **Check channel IDs**: Make sure they're correct
- **Check browser console**: Look for error messages

### No tweets showing

- **Check bearer token**: Make sure it's correctly set in `.env.local`
- **Check API access**: Twitter's free tier is very limited
- **Check rate limits**: Twitter has strict rate limits
- **Check usernames**: Make sure they don't include the @ symbol

### No podcast episodes showing

- **Check RSS feed URLs**: Make sure they're valid and accessible
- **Check CORS**: Some RSS feeds may have CORS restrictions
- **Check feed format**: Make sure it's a valid RSS feed

### "Failed to fetch content" error

- **Check API keys**: Make sure all required keys are set
- **Check network**: Make sure you have internet connection
- **Check API status**: Check if YouTube/Twitter APIs are operational
- **Check browser console**: Look for specific error messages

### Build errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

## API Rate Limits

### YouTube Data API v3
- **Daily quota**: 10,000 units
- **Search request cost**: 100 units
- **Approximately**: 100 searches per day

### Twitter API (Free Tier)
- **Very limited**: Consider upgrading to Basic tier ($100/month)
- **Rate limits**: Varies by endpoint

### Podcast RSS Feeds
- **No API required**: Free to use
- **Be respectful**: Don't fetch too frequently (5 second cooldown recommended)

## Customization

### Change Colors

Edit `tailwind.config.ts` to change the NC State colors:

```typescript
colors: {
  'ncstate-red': '#CC0000',
  'ncstate-white': '#FFFFFF',
}
```

### Add More Sports

1. Update `src/types/index.ts`:
   ```typescript
   export type SportType = 'football' | 'basketball' | 'baseball' | 'soccer';
   ```

2. Update `src/components/FilterBar.tsx` to add the new sport filter

3. Add sources for the new sport in `src/config/sources.ts`

### Customize Refresh Interval

Add to `.env.local`:
```env
REFRESH_INTERVAL=300000  # 5 minutes in milliseconds
```

## Deployment

See [VERCEL_SETUP.md](VERCEL_SETUP.md) for instructions on deploying to Vercel.

**Important:** Make sure to add your environment variables in the Vercel dashboard:
- Project Settings → Environment Variables
- Add `YOUTUBE_API_KEY` and `TWITTER_BEARER_TOKEN`

## Next Steps

1. Customize the sources in `src/config/sources.ts`
2. Test the app locally
3. Deploy to Vercel
4. Share with fellow Wolfpack fans!

## Support

For issues or questions:
- Check the [GitHub Issues](https://github.com/rebeccaplanch/wolf-bites/issues)
- Review the [CLAUDE.md](CLAUDE.md) for development guidelines

## Resources

- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
- [Twitter API Documentation](https://developer.twitter.com/en/docs/twitter-api)
- [RSS Parser Documentation](https://www.npmjs.com/package/rss-parser)
- [Next.js Documentation](https://nextjs.org/docs)
