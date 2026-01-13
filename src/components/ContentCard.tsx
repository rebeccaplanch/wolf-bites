import { ContentItem } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Youtube, Twitter, Mic, ExternalLink } from 'lucide-react';

interface ContentCardProps {
  item: ContentItem;
}

const sourceIcons = {
  youtube: Youtube,
  twitter: Twitter,
  podcast: Mic,
};

const sourceColors = {
  youtube: 'bg-red-100 text-red-600',
  twitter: 'bg-blue-100 text-blue-600',
  podcast: 'bg-purple-100 text-purple-600',
};

const sportColors = {
  football: 'bg-green-100 text-green-800',
  basketball: 'bg-orange-100 text-orange-800',
  baseball: 'bg-blue-100 text-blue-800',
};

export default function ContentCard({ item }: ContentCardProps) {
  const SourceIcon = sourceIcons[item.source];

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {item.thumbnail && (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${sourceColors[item.source]}`}>
                <SourceIcon size={12} />
                {item.source}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${sportColors[item.sport]}`}>
                {item.sport}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {item.description}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{item.author}</span>
              <span>{formatDistanceToNow(item.publishedAt, { addSuffix: true })}</span>
            </div>
          </div>
          <ExternalLink size={16} className="text-gray-400 flex-shrink-0" />
        </div>
      </div>
    </a>
  );
}
