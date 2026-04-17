import { AppItem } from '../types';

interface AppCardProps {
  app: AppItem;
}

const badgeColors: Record<string, string> = {
  '编辑推荐': 'bg-sky-500',
  '新品上线': 'bg-emerald-500',
  '热门': 'bg-rose-500',
};

export default function AppCard({ app }: AppCardProps) {
  return (
    <a
      href={app.linkUrl}
      className="group flex flex-col items-center text-center gap-1.5"
    >
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
        <img
          src={app.imageUrl}
          alt={app.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {app.badge && (
          <span
            className={`absolute top-1.5 left-1.5 ${badgeColors[app.badge] ?? 'bg-gray-700'} text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full`}
          >
            {app.badge}
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-gray-800 leading-tight line-clamp-1 w-full px-0.5">
        {app.name}
      </p>
      <p className="text-[10px] text-gray-400 leading-tight line-clamp-1 w-full px-0.5">
        {app.tagline}
      </p>
    </a>
  );
}
