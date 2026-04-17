import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BannerItem } from '../types';

interface HeroBannerProps {
  banners: BannerItem[];
}

export default function HeroBanner({ banners }: HeroBannerProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + banners.length) % banners.length);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning, banners.length]
  );

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const banner = banners[current];

  return (
    <section className="relative w-full h-44 md:h-56 overflow-hidden">
      {banners.map((b, i) => (
        <a
          key={b.id}
          href={b.linkUrl}
          className={`absolute inset-0 block transition-opacity duration-700 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          tabIndex={i === current ? 0 : -1}
        >
          <img
            src={b.imageUrl}
            alt={b.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        </a>
      ))}

      <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-5 w-full">
          <div key={banner.id} style={{ animation: 'fadeSlideUp 0.6s ease forwards' }}>
            <div
              className="inline-block text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full mb-2"
              style={{ background: banner.accentColor, color: '#fff' }}
            >
              精选推荐
            </div>
            <h1 className="text-lg md:text-2xl font-bold text-white leading-snug mb-1">
              {banner.title}
            </h1>
            <p className="text-white/75 text-xs md:text-sm">{banner.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-0 right-0 z-30 flex items-center justify-center gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200"
      >
        <ChevronLeft size={14} />
      </button>
      <button
        onClick={() => goTo(current + 1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200"
      >
        <ChevronRight size={14} />
      </button>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
