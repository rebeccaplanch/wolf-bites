'use client';

import { useState, useEffect } from 'react';
import { ContentItem, SportType, ContentSource } from '@/types';
import ContentCard from './ContentCard';
import FilterBar from './FilterBar';
import { RefreshCw, AlertCircle } from 'lucide-react';

export default function ContentFeed() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('all');
  const [selectedSource, setSelectedSource] = useState<ContentSource | 'all'>('all');
  const [refreshing, setRefreshing] = useState(false);

  const fetchContent = async () => {
    try {
      setError(null);
      const params = new URLSearchParams();
      if (selectedSport !== 'all') params.append('sport', selectedSport);
      if (selectedSource !== 'all') params.append('source', selectedSource);

      console.log('[Frontend] Fetching content from:', `/api/content?${params.toString()}`);
      
      const response = await fetch(`/api/content?${params.toString()}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('[Frontend] API response:', {
        success: data.success,
        count: data.count,
        breakdown: data.breakdown,
      });

      if (data.success) {
        // Convert date strings back to Date objects
        const itemsWithDates = data.items.map((item: any) => ({
          ...item,
          publishedAt: new Date(item.publishedAt),
        }));
        setItems(itemsWithDates);
        
        // Log breakdown if available
        if (data.breakdown) {
          console.log('[Frontend] Content breakdown:', data.breakdown);
          if (data.count === 0) {
            console.warn('[Frontend] No content found. Check API logs for details.');
          }
        }
      } else {
        setError(data.message || 'Failed to fetch content');
        console.error('[Frontend] API returned error:', data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error. Please check your connection.';
      setError(errorMessage);
      console.error('[Frontend] Fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [selectedSport, selectedSource]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchContent();
  };

  const filteredItems = items;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Wolf Bites
          </h1>
          <p className="text-lg text-gray-600">
            Your NC State Sports News Hub
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-4 py-2 bg-ncstate-red text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Filters */}
      <FilterBar
        selectedSport={selectedSport}
        selectedSource={selectedSource}
        onSportChange={setSelectedSport}
        onSourceChange={setSelectedSource}
      />

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="animate-spin text-ncstate-red" size={32} />
          <span className="ml-3 text-gray-600">Loading content...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Content Grid */}
      {!loading && !error && (
        <>
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No content found. Try adjusting your filters or check back later!
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
              </div>
              <div className="grid gap-4">
                {filteredItems.map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
