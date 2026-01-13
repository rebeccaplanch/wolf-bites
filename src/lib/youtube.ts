import { ContentItem, YouTubeChannel, SportType } from '@/types';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    channelTitle: string;
    thumbnails: {
      medium: { url: string };
    };
  };
}

/**
 * Fetch recent videos from a YouTube channel
 */
export async function fetchYouTubeVideos(
  channel: YouTubeChannel,
  maxResults: number = 10
): Promise<ContentItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.error(`[YouTube] API key not configured for channel: ${channel.name} (${channel.id})`);
    console.error('[YouTube] Make sure YOUTUBE_API_KEY is set in Vercel environment variables');
    return [];
  }

  try {
    // Build URL with query parameters
    const url = `${YOUTUBE_API_BASE}/search?` +
      `part=snippet` +
      `&channelId=${channel.id}` +
      `&maxResults=${maxResults}` +
      `&order=date` +
      `&type=video` +
      `&key=${apiKey}`;
    
    console.log(`[YouTube] Fetching videos from ${channel.name} (${channel.id})`);
    console.log(`[YouTube] API Key present: ${apiKey.substring(0, 10)}... (length: ${apiKey.length})`);

    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      
      console.error(`[YouTube] API error for ${channel.name}:`, {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        url: url.replace(apiKey, 'REDACTED'),
      });
      
      // Return empty array but log the error for debugging
      return [];
    }

    const data = await response.json();
    
    // Check for API errors in response
    if (data.error) {
      console.error(`[YouTube] API returned error for ${channel.name}:`, data.error);
      return [];
    }

    const videoCount = data.items?.length || 0;
    console.log(`[YouTube] Successfully fetched ${videoCount} videos from ${channel.name}`);

    if (videoCount === 0) {
      console.warn(`[YouTube] No videos found for channel ${channel.name} (${channel.id})`);
    }

    return (data.items || []).map((item: YouTubeVideo) => ({
      id: `youtube-${item.id.videoId}`,
      title: item.snippet.title,
      description: item.snippet.description,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnail: item.snippet.thumbnails.medium.url,
      author: item.snippet.channelTitle,
      publishedAt: new Date(item.snippet.publishedAt),
      source: 'youtube' as const,
      sport: channel.sport,
    }));
  } catch (error) {
    console.error(`[YouTube] Exception fetching videos from ${channel.name}:`, error);
    if (error instanceof Error) {
      console.error(`[YouTube] Error message: ${error.message}`);
      console.error(`[YouTube] Error stack: ${error.stack}`);
    }
    return [];
  }
}

/**
 * Fetch videos from multiple YouTube channels
 */
export async function fetchAllYouTubeVideos(
  channels: YouTubeChannel[],
  sport?: SportType
): Promise<ContentItem[]> {
  const filteredChannels = sport
    ? channels.filter((c) => c.sport === sport)
    : channels;

  // Deduplicate channels by ID to avoid fetching the same channel multiple times
  const uniqueChannels = Array.from(
    new Map(filteredChannels.map((channel) => [channel.id, channel])).values()
  );

  const results = await Promise.all(
    uniqueChannels.map((channel) => fetchYouTubeVideos(channel, 5))
  );

  // Flatten results and deduplicate by video ID
  const allVideos = results.flat();
  
  // Use Map to deduplicate by video ID (keep first occurrence)
  const uniqueVideos = Array.from(
    new Map(allVideos.map((video) => [video.id, video])).values()
  );

  return uniqueVideos.sort((a, b) =>
    b.publishedAt.getTime() - a.publishedAt.getTime()
  );
}
