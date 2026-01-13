import { ContentItem, TwitterAccount, SportType } from '@/types';
import { decodeHtmlEntities } from './utils';

const TWITTER_API_BASE = 'https://api.twitter.com/2';

interface Tweet {
  id: string;
  text: string;
  created_at: string;
  author_id: string;
}

interface TwitterUser {
  id: string;
  name: string;
  username: string;
}

interface TwitterResponse {
  data?: Tweet[];
  includes?: {
    users?: TwitterUser[];
  };
}

/**
 * Fetch recent tweets from a Twitter account
 */
export async function fetchTweets(
  account: TwitterAccount,
  maxResults: number = 10
): Promise<ContentItem[]> {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  if (!bearerToken) {
    console.warn('Twitter Bearer Token not configured');
    return [];
  }

  try {
    // First, get the user ID from username
    const userUrl = `${TWITTER_API_BASE}/users/by/username/${account.username}`;
    const userResponse = await fetch(userUrl, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!userResponse.ok) {
      console.error(`Twitter API error (user): ${userResponse.status}`);
      return [];
    }

    const userData = await userResponse.json();
    const userId = userData.data?.id;

    if (!userId) {
      console.error(`User ID not found for @${account.username}`);
      return [];
    }

    // Then fetch tweets
    const tweetsUrl = `${TWITTER_API_BASE}/users/${userId}/tweets?` +
      `max_results=${maxResults}` +
      `&tweet.fields=created_at,author_id` +
      `&expansions=author_id` +
      `&user.fields=name,username`;

    const tweetsResponse = await fetch(tweetsUrl, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
      },
      next: { revalidate: 300 },
    });

    if (!tweetsResponse.ok) {
      console.error(`Twitter API error (tweets): ${tweetsResponse.status}`);
      return [];
    }

    const tweetsData: TwitterResponse = await tweetsResponse.json();

    if (!tweetsData.data) {
      return [];
    }

    const users = tweetsData.includes?.users || [];

    return tweetsData.data.map((tweet: Tweet) => {
      const author = users.find((u) => u.id === tweet.author_id);

      return {
        id: `twitter-${tweet.id}`,
        title: decodeHtmlEntities(tweet.text.substring(0, 100) + (tweet.text.length > 100 ? '...' : '')),
        description: decodeHtmlEntities(tweet.text),
        url: `https://twitter.com/${account.username}/status/${tweet.id}`,
        author: decodeHtmlEntities(author?.name || account.name),
        publishedAt: new Date(tweet.created_at),
        source: 'twitter' as const,
        sport: account.sport,
      };
    });
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return [];
  }
}

/**
 * Fetch tweets from multiple Twitter accounts
 */
export async function fetchAllTweets(
  accounts: TwitterAccount[],
  sport?: SportType
): Promise<ContentItem[]> {
  const filteredAccounts = sport
    ? accounts.filter((a) => a.sport === sport)
    : accounts;

  const results = await Promise.all(
    filteredAccounts.map((account) => fetchTweets(account, 5))
  );

  return results.flat().sort((a, b) =>
    b.publishedAt.getTime() - a.publishedAt.getTime()
  );
}
