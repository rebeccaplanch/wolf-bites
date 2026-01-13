import { NextRequest, NextResponse } from 'next/server';
import { sources } from '@/config/sources';
import { fetchAllYouTubeVideos } from '@/lib/youtube';
import { fetchAllTweets } from '@/lib/twitter';
import { fetchAllPodcasts } from '@/lib/podcasts';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sourceType = searchParams.get('source');

    console.log(`[API] Fetching content - Source: ${sourceType || 'all'}`);
    
    // Check environment variables
    const youtubeApiKey = process.env.YOUTUBE_API_KEY;
    console.log(`[API] YouTube API Key configured: ${!!youtubeApiKey}`);
    if (!youtubeApiKey) {
      console.warn('[API] WARNING: YOUTUBE_API_KEY is not set in environment variables');
    }

    // Fetch from all sources in parallel (no sport filtering)
    const [youtubeContent, twitterContent, podcastContent] = await Promise.all([
      !sourceType || sourceType === 'youtube'
        ? fetchAllYouTubeVideos(sources.youtube)
        : [],
      !sourceType || sourceType === 'twitter'
        ? fetchAllTweets(sources.twitter)
        : [],
      !sourceType || sourceType === 'podcast'
        ? fetchAllPodcasts(sources.podcasts)
        : [],
    ]);

    console.log(`[API] Content fetched - YouTube: ${youtubeContent.length}, Twitter: ${twitterContent.length}, Podcasts: ${podcastContent.length}`);

    // Combine and sort all content by date
    const allContent = [
      ...youtubeContent,
      ...twitterContent,
      ...podcastContent,
    ].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

    console.log(`[API] Found ${allContent.length} total items`);

    return NextResponse.json({
      success: true,
      count: allContent.length,
      items: allContent,
      timestamp: new Date().toISOString(),
      breakdown: {
        youtube: youtubeContent.length,
        twitter: twitterContent.length,
        podcasts: podcastContent.length,
      },
    });
  } catch (error) {
    console.error('[API] Error in content API:', error);
    if (error instanceof Error) {
      console.error('[API] Error message:', error.message);
      console.error('[API] Error stack:', error.stack);
    }
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch content',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
