export type SportType = 'football' | 'basketball' | 'baseball';

export type ContentSource = 'youtube' | 'podcast';

export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
  author: string;
  publishedAt: Date;
  source: ContentSource;
  sport: SportType;
}

export interface YouTubeChannel {
  id: string;
  name: string;
  sport: SportType;
}

export interface PodcastFeed {
  url: string;
  name: string;
  sport: SportType;
  applePodcastsUrl?: string; // Apple Podcasts URL for the podcast
}

export interface SourcesConfig {
  youtube: YouTubeChannel[];
  podcasts: PodcastFeed[];
}
