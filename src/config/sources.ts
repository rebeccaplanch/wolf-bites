import { SourcesConfig } from '@/types';

/**
 * Configure your NC State sports content sources here
 *
 * To find YouTube Channel IDs:
 * 1. Go to the channel page
 * 2. View page source (Ctrl+U)
 * 3. Search for "channelId"
 *
 * To find Podcast RSS feeds:
 * 1. Find the podcast on Apple Podcasts
 * 2. Right-click and "Copy Link"
 * 3. Use a service like https://podcasturl.com to get the RSS feed
 * 4. Or use https://rss.apple.com/ to convert Apple Podcasts URLs to RSS feeds
 */

export const sources: SourcesConfig = {
  youtube: [
    // ========================================
    // IMPORTANT: Replace PLACEHOLDER IDs below with actual channel IDs
    // To find channel IDs:
    // 1. Go to youtube.com/@ChannelHandle
    // 2. Right-click → View Page Source (Ctrl+U)
    // 3. Search for "channelId" (Ctrl+F)
    // 4. Copy the ID (starts with UC...)
    // ========================================
    // Note: Each channel should only be listed once to avoid duplicates.
    // Videos are deduplicated automatically by video ID.

    // 247Sports NC State Coverage
    // Channel: youtube.com/@NCStateWolfpack247Sports
    {
      id: 'UCl_MWtDgqcNRo4MXhVd3z0w',
      name: '247Sports NC State',
      sport: 'football', // Sport tag for filtering (videos from this channel may cover multiple sports)
    },

    // Inside Pack Sports
    // Channel: youtube.com/@InsidePackSports
    {
      id: 'UC-gveie5Hvn2O-57sOAJjlg',
      name: 'Inside Pack Sports',
      sport: 'football', // Sport tag for filtering (videos from this channel may cover multiple sports)
    },

    // Add more YouTube channels here
  ],

  podcasts: [
    // Pack Power - NC State Wolfpack Podcasts on 247Sports
    {
      url: 'https://feeds.megaphone.fm/pack-pride',
      name: 'Pack Power - NC State Wolfpack Podcasts on 247Sports',
      sport: 'football',
      applePodcastsUrl: 'https://podcasts.apple.com/us/podcast/pack-power-nc-state-wolfpack-podcast-on-247sports/id1845447455',
    },
    // Inside Pack Sports Live
    {
      url: 'https://rss.libsyn.com/shows/102525/destinations/544501.xml',
      name: 'Inside Pack Sports Live',
      sport: 'football',
      applePodcastsUrl: 'https://podcasts.apple.com/us/podcast/inside-pack-sports-live/id1266096331',
    },
  ],
};

/**
 * Rate limiting configuration
 */
export const RATE_LIMITS = {
  youtube: {
    maxRequestsPerDay: 10000, // YouTube API quota
    cooldownMs: 1000, // 1 second between requests
  },
  podcasts: {
    cooldownMs: 5000, // 5 seconds between RSS fetches
  },
};
