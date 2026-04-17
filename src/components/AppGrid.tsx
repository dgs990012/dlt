import { AppItem } from '../types';
import AppCard from './AppCard';

interface AppGridProps {
  apps: AppItem[];
}

export default function AppGrid({ apps }: AppGridProps) {
  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <p className="text-lg font-medium">没有找到匹配的应用</p>
        <p className="text-sm mt-1">试试其他关键词或分类</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-5">
      {apps.map((app, i) => (
        <div
          key={app.id}
          style={{ animationDelay: `${i * 50}ms`, animation: 'fadeIn 0.4s ease forwards', opacity: 0 }}
        >
          <AppCard app={app} />
        </div>
      ))}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
