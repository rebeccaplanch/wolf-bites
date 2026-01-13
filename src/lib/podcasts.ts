import Parser from 'rss-parser';
import { ContentItem, PodcastFeed, SportType } from '@/types';
import { decodeHtmlEntities } from './utils';

const parser = new Parser();

/**
 * Fetch recent episodes from a podcast RSS feed
 */
export async function fetchPodcastEpisodes(
  podcast: PodcastFeed,
  maxResults: number = 10
): Promise<ContentItem[]> {
  try {
    console.log(`Fetching podcast: ${podcast.name} from ${podcast.url}`);
    const feed = await parser.parseURL(podcast.url);

    const items = feed.items
      .slice(0, maxResults)
      .map((item) => {
        // Use Apple Podcasts URL if available, otherwise use episode link or podcast website
        let episodeUrl: string;
        
        if (podcast.applePodcastsUrl) {
          // Link to the main podcast page on Apple Podcasts
          // Note: We can't link to specific episodes without the episode ID from Apple
          episodeUrl = podcast.applePodcastsUrl;
        } else {
          // Fallback: use item.link if it's valid, otherwise use podcast website
          episodeUrl = item.link;
          
          // If item.link is the RSS feed URL or doesn't exist, use the podcast's main website
          if (!episodeUrl || episodeUrl === podcast.url || episodeUrl.includes('.xml') || episodeUrl.includes('/rss/')) {
            episodeUrl = feed.link || podcast.url;
          }
        }
        
        return {
          id: `podcast-${item.guid || item.link || item.title}`,
          title: decodeHtmlEntities(item.title || 'Untitled Episode'),
          description: decodeHtmlEntities(item.contentSnippet || item.content || ''),
          url: episodeUrl,
          thumbnail: item.itunes?.image || feed.image?.url,
          author: decodeHtmlEntities(feed.title || podcast.name),
          publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
          source: 'podcast' as const,
          sport: podcast.sport,
        };
      });

    console.log(`Podcast: Fetched ${items.length} episodes from ${podcast.name}`);
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
