import { NextRequest, NextResponse } from 'next/server';
import { sources } from '@/config/sources';
import { fetchAllYouTubeVideos } from '@/lib/youtube';
import { fetchAllTweets } from '@/lib/twitter';
import { fetchAllPodcasts } from '@/lib/podcasts';
import { SportType } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sport = searchParams.get('sport') as SportType | null;
    const sourceType = searchParams.get('source');

    console.log(`Fetching content - Sport: ${sport || 'all'}, Source: ${sourceType || 'all'}`);

    // Fetch from all sources in parallel
    const [youtubeContent, twitterContent, podcastContent] = await Promise.all([
      !sourceType || sourceType === 'youtube'
        ? fetchAllYouTubeVideos(sources.youtube, sport || undefined)
        : [],
      !sourceType || sourceType === 'twitter'
        ? fetchAllTweets(sources.twitter, sport || undefined)
        : [],
      !sourceType || sourceType === 'podcast'
        ? fetchAllPodcasts(sources.podcasts, sport || undefined)
        : [],
    ]);

    // Combine and sort all content by date
    const allContent = [
      ...youtubeContent,
      ...twitterContent,
      ...podcastContent,
    ].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

    console.log(`Found ${allContent.length} total items`);

    return NextResponse.json({
      success: true,
      count: allContent.length,
      items: allContent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in content API:', error);
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
