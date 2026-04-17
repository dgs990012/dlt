import { AppItem } from '../types';
import { Star, ArrowRight } from 'lucide-react';

interface FeaturedRowProps {
  apps: AppItem[];
}

export default function FeaturedRow({ apps }: FeaturedRowProps) {
  const featured = apps.filter((a) => a.badge === '编辑推荐').slice(0, 2);

  if (featured.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
      {featured.map((app) => (
        <a
          key={app.id}
          href={app.linkUrl}
          className="group relative overflow-hidden rounded-2xl h-52 block"
        >
          <img
            src={app.imageUrl}
            alt={app.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 p-5 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-sky-300">
                编辑推荐
              </span>
              {app.rating && (
                <div className="flex items-center gap-0.5">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs text-white/80">{app.rating}</span>
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold text-white mb-0.5">{app.name}</h3>
            <p className="text-white/70 text-sm">{app.tagline}</p>
            <div className="flex items-center gap-1 mt-3 text-sky-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>立即体验</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
