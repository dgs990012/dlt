import { AppItem } from '../types';

interface AppCardProps {
  app: AppItem;
}

const badgeColors: Record<string, string> = {
  '强烈推荐': 'bg-sky-500',
  '新品上线': 'bg-emerald-500',
  '热门推荐': 'bg-rose-500',
};

export default function AppCard({ app }: AppCardProps) {
  return (
    <a
      href={app.linkUrl}
      className="group flex flex-col h-full"
    >
      <div className="w-full h-full p-3 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:border-gray-400 transition-all duration-300 flex flex-col gap-3">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 group-hover:shadow-md transition-all duration-300">
          <img
            src={app.imageUrl}
            alt={app.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {app.badge && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
          {app.badge && (
            <span
              className={`absolute top-2 left-2 ${badgeColors[app.badge] ?? 'bg-gray-700'} text-white text-[8px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm bg-opacity-95 shadow-lg`}
            >
              {app.badge}
            </span>
          )}
        </div>
        <div className="w-full px-1 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">
              {app.name}
            </p>
            {app.tagline && (
              <p className="text-xs text-gray-500 leading-snug line-clamp-1 mt-1">
                {app.tagline}
              </p>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}
