import { NextResponse } from 'next/server';
import { sources } from '@/config/sources';

export const dynamic = 'force-dynamic';

export async function GET() {
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;

  return NextResponse.json({
    environment: {
      youtubeApiKeyConfigured: !!youtubeApiKey,
      youtubeApiKeyLength: youtubeApiKey?.length || 0,
      youtubeApiKeyPrefix: youtubeApiKey?.substring(0, 10) || 'NOT_SET',
    },
    sources: {
      youtubeChannels: sources.youtube.length,
      youtubeChannelIds: sources.youtube.map(c => ({ id: c.id, name: c.name })),
      podcasts: sources.podcasts.length,
      podcastNames: sources.podcasts.map(p => ({ name: p.name, url: p.url })),
    },
    test: {
      message: 'If you see this, the API route is working',
    }
  });
}
