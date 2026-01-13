import { NextResponse } from 'next/server';
import { sources } from '@/config/sources';

export const dynamic = 'force-dynamic';

export async function GET() {
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;
  const twitterToken = process.env.TWITTER_BEARER_TOKEN;

  return NextResponse.json({
    environment: {
      youtubeApiKeyConfigured: !!youtubeApiKey,
      youtubeApiKeyLength: youtubeApiKey?.length || 0,
      youtubeApiKeyPrefix: youtubeApiKey?.substring(0, 10) || 'NOT_SET',
      twitterTokenConfigured: !!twitterToken,
    },
    sources: {
      youtubeChannels: sources.youtube.length,
      youtubeChannelIds: sources.youtube.map(c => ({ id: c.id, name: c.name })),
      twitterAccounts: sources.twitter.length,
      podcasts: sources.podcasts.length,
    },
    test: {
      message: 'If you see this, the API route is working',
    }
  });
}
