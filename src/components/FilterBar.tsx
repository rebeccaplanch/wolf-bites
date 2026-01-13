'use client';

import { SportType, ContentSource } from '@/types';
import { Trophy, CircleDot, Disc, Youtube, Twitter, Mic, Grid } from 'lucide-react';

interface FilterBarProps {
  selectedSport: SportType | 'all';
  selectedSource: ContentSource | 'all';
  onSportChange: (sport: SportType | 'all') => void;
  onSourceChange: (source: ContentSource | 'all') => void;
}

const sports: Array<{ value: SportType | 'all'; label: string; icon: any }> = [
  { value: 'all', label: 'All Sports', icon: Grid },
  { value: 'football', label: 'Football', icon: Trophy },
  { value: 'basketball', label: 'Basketball', icon: CircleDot },
  { value: 'baseball', label: 'Baseball', icon: Disc },
];

const sources: Array<{ value: ContentSource | 'all'; label: string; icon: any }> = [
  { value: 'all', label: 'All Sources', icon: Grid },
  { value: 'youtube', label: 'YouTube', icon: Youtube },
  { value: 'twitter', label: 'Twitter', icon: Twitter },
  { value: 'podcast', label: 'Podcasts', icon: Mic },
];

export default function FilterBar({
  selectedSport,
  selectedSource,
  onSportChange,
  onSourceChange,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sport Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sport
          </label>
          <div className="flex flex-wrap gap-2">
            {sports.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => onSportChange(value)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSport === value
                    ? 'bg-ncstate-red text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Source Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source
          </label>
          <div className="flex flex-wrap gap-2">
            {sources.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => onSourceChange(value)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSource === value
                    ? 'bg-ncstate-red text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
