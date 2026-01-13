import { SourcesConfig } from '@/types';

/**
 * Configure your NC State sports content sources here
 *
 * To find YouTube Channel IDs:
 * 1. Go to the channel page
 * 2. View page source (Ctrl+U)
 * 3. Search for "channelId"
 *
 * To find Twitter usernames:
 * Just use the @ handle without the @
 *
 * To find Podcast RSS feeds:
 * 1. Find the podcast on Apple Podcasts
 * 2. Right-click and "Copy Link"
 * 3. Use a service like https://podcasturl.com to get the RSS feed
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

  twitter: [
    // NC State Football Twitter Accounts
    {
      username: 'PackFootball',
      name: 'NC State Football',
      sport: 'football',
    },
    {
      username: 'PackMensBball',
      name: 'NC State Men\'s Basketball',
      sport: 'basketball',
    },
    {
      username: 'NCStateBaseball',
      name: 'NC State Baseball',
      sport: 'baseball',
    },
    {
      username: 'TheWolfpacker',
      name: 'The Wolfpacker',
      sport: 'football',
    },
    {
      username: 'TheWolfpacker',
      name: 'The Wolfpacker',
      sport: 'basketball',
    },
    {
      username: 'TheWolfpacker',
      name: 'The Wolfpacker',
      sport: 'baseball',
    },
    // Add more Twitter accounts here
    // Example:
    // {
    //   username: 'PackPride247',
    //   name: 'Pack Pride 247',
    //   sport: 'football',
    // },
  ],

  podcasts: [
    // NC State Sports Podcasts (RSS feeds)
    // Note: You'll need to find the actual RSS feed URLs
    {
      url: 'https://feeds.megaphone.fm/packedhouse',
      name: 'Packed House Podcast',
      sport: 'football',
    },
    {
      url: 'https://feeds.megaphone.fm/packedhouse',
      name: 'Packed House Podcast',
      sport: 'basketball',
    },
    // Add more podcast RSS feeds here
    // To find RSS feeds:
    // 1. Find podcast on Apple Podcasts
    // 2. Use https://podcasturl.com or similar service
    // Example:
    // {
    //   url: 'https://feeds.example.com/ncstate-sports',
    //   name: 'NC State Sports Talk',
    //   sport: 'football',
    // },
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
  twitter: {
    maxRequestsPerMonth: 500000, // Twitter API limit (free tier much lower)
    cooldownMs: 1000,
  },
  podcasts: {
    cooldownMs: 5000, // 5 seconds between RSS fetches
  },
};
