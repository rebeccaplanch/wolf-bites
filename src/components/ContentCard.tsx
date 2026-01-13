import { ContentItem } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface ContentCardProps {
  item: ContentItem;
}

const sourceIcons = {
  youtube: 'movie',
  podcast: 'podcasts',
};

const sourceColors = {
  youtube: 'bg-red-100 text-red-600',
  podcast: 'bg-purple-100 text-purple-600',
};

export default function ContentCard({ item }: ContentCardProps) {
  const sourceIcon = sourceIcons[item.source];

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 overflow-hidden touch-manipulation"
    >
      <div className="p-4 sm:p-6">
        <div className="flex gap-3 sm:gap-4">
          {/* Thumbnail */}
          {item.thumbnail && (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0"
            />
          )}

          {/* Content */}
          <div className="flex-1 min-w-0" style={{ fontFamily: '"Source Sans 3", sans-serif' }}>
            {/* Title */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2 leading-snug">
              {item.title}
            </h3>

            {/* Description */}
            {item.description && (
              <p className="text-[10px] sm:text-sm text-gray-600 mb-4 sm:mb-6 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            )}

            {/* Divider */}
            <div className="border-t border-gray-100 mb-3 sm:mb-4"></div>

            {/* Author and Timestamp */}
            <div className="text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-4">
              <span className="truncate">{formatDistanceToNow(item.publishedAt, { addSuffix: true })} by {item.author}</span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-2 sm:mb-3"></div>

            {/* Source Badge */}
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-medium ${sourceColors[item.source]}`}>
                <span className="material-symbols-outlined text-xs sm:text-sm">{sourceIcon}</span>
                {item.source === 'youtube' ? 'YouTube' : 'Podcast'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
