export type SportType = 'football' | 'basketball' | 'baseball';

export type ContentSource = 'youtube' | 'twitter' | 'podcast';

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

export interface TwitterAccount {
  username: string;
  name: string;
  sport: SportType;
}

export interface PodcastFeed {
  url: string;
  name: string;
  sport: SportType;
}

export interface SourcesConfig {
  youtube: YouTubeChannel[];
  twitter: TwitterAccount[];
  podcasts: PodcastFeed[];
}
