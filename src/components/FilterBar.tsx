'use client';

import { ContentSource } from '@/types';
import { Youtube, Mic, Grid } from 'lucide-react';

interface FilterBarProps {
  selectedSource: ContentSource | 'all';
  onSourceChange: (source: ContentSource | 'all') => void;
}

const sources: Array<{ value: ContentSource | 'all'; label: string; icon: any }> = [
  { value: 'all', label: 'All Sources', icon: Grid },
  { value: 'youtube', label: 'YouTube', icon: Youtube },
  { value: 'podcast', label: 'Podcasts', icon: Mic },
];

export default function FilterBar({
  selectedSource,
  onSourceChange,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
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
  );
}
