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
    console.warn('YouTube API key not configured');
    return [];
  }

  try {
    const url = `${YOUTUBE_API_BASE}/search?` +
      `part=snippet` +
      `&channelId=${channel.id}` +
      `&maxResults=${maxResults}` +
      `&order=date` +
      `&type=video` +
      `&key=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`YouTube API error: ${response.status}`, errorText);
      return [];
    }

    const data = await response.json();
    console.log(`YouTube: Fetched ${data.items?.length || 0} videos from ${channel.name}`);

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
    console.error('Error fetching YouTube videos:', error);
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

  const results = await Promise.all(
    filteredChannels.map((channel) => fetchYouTubeVideos(channel, 5))
  );

  return results.flat().sort((a, b) =>
    b.publishedAt.getTime() - a.publishedAt.getTime()
  );
}
