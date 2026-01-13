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
      className="block bg-white rounded-lg shadow-md hover:shadow-xl active:shadow-lg transition-shadow duration-200 overflow-hidden touch-manipulation"
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          {item.thumbnail && (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${sourceColors[item.source]}`}>
                <span className="material-symbols-outlined text-xs">{sourceIcon}</span>
                <span className="hidden sm:inline">{item.source}</span>
                <span className="sm:hidden">{item.source === 'youtube' ? 'YT' : 'Pod'}</span>
              </span>
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 line-clamp-2 leading-tight">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2 leading-snug">
                {item.description}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-gray-500 flex-wrap gap-1">
              <span className="truncate max-w-[50%]">{item.author}</span>
              <span className="flex-shrink-0">{formatDistanceToNow(item.publishedAt, { addSuffix: true })}</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-gray-400 flex-shrink-0 text-sm sm:text-base">open_in_new</span>
        </div>
      </div>
    </a>
  );
}
