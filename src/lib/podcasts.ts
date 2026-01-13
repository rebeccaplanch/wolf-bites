import Parser from 'rss-parser';
import { ContentItem, PodcastFeed, SportType } from '@/types';

const parser = new Parser();

/**
 * Fetch recent episodes from a podcast RSS feed
 */
export async function fetchPodcastEpisodes(
  podcast: PodcastFeed,
  maxResults: number = 10
): Promise<ContentItem[]> {
  try {
    const feed = await parser.parseURL(podcast.url);

    const items = feed.items
      .slice(0, maxResults)
      .map((item) => ({
        id: `podcast-${item.guid || item.link}`,
        title: item.title || 'Untitled Episode',
        description: item.contentSnippet || item.content,
        url: item.link || podcast.url,
        thumbnail: item.itunes?.image || feed.image?.url,
        author: feed.title || podcast.name,
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        source: 'podcast' as const,
        sport: podcast.sport,
      }));

    return items;
  } catch (error) {
    console.error(`Error fetching podcast ${podcast.name}:`, error);
    return [];
  }
}

/**
 * Fetch episodes from multiple podcast feeds
 */
export async function fetchAllPodcasts(
  podcasts: PodcastFeed[],
  sport?: SportType
): Promise<ContentItem[]> {
  const filteredPodcasts = sport
    ? podcasts.filter((p) => p.sport === sport)
    : podcasts;

  const results = await Promise.all(
    filteredPodcasts.map((podcast) => fetchPodcastEpisodes(podcast, 5))
  );

  return results.flat().sort((a, b) =>
    b.publishedAt.getTime() - a.publishedAt.getTime()
  );
}
