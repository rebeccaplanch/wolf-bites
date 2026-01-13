'use client';

import { ContentSource } from '@/types';

interface FilterBarProps {
  selectedSource: ContentSource | 'all';
  onSourceChange: (source: ContentSource | 'all') => void;
}

const sources: Array<{ value: ContentSource | 'all'; label: string; icon: string }> = [
  { value: 'all', label: 'All Sources', icon: 'apps' },
  { value: 'youtube', label: 'YouTube', icon: 'movie' },
  { value: 'podcast', label: 'Podcasts', icon: 'podcasts' },
];

export default function FilterBar({
  selectedSource,
  onSourceChange,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-4 sm:mb-6">
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
          Source
        </label>
        <div className="flex gap-2">
          {sources.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => onSourceChange(value)}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors touch-manipulation active:scale-95 ${
                selectedSource === value
                  ? 'bg-ncstate-red text-white'
                  : 'bg-gray-100 text-gray-700 active:bg-gray-200'
              }`}
            >
              <span className="material-symbols-outlined text-sm sm:text-base">{icon}</span>
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">
                {value === 'all' ? 'All' : value === 'youtube' ? 'YT' : 'Pod'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
