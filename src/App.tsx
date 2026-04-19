import { useState, useEffect, useCallback } from 'react';
import { Grid3x3 as Grid3X3, ChevronLeft, ChevronRight } from 'lucide-react';
import { apps } from './data/apps';
import { banners, siteConfig, footerBrand, footerLinks } from './data/config';
import { AppItem, BannerItem } from './types';

// ─── 徽章颜色映射表（根据徽章文字匹配对应背景色）───
const badgeColors: Record<string, string> = {
  '强烈推荐': 'bg-sky-500',
  '新品上线': 'bg-emerald-500',
  '热门推荐': 'bg-rose-500',
};

// ─── 单个应用卡片组件 ───
function AppCard({ app }: { app: AppItem }) {
  return (
    // 点击跳转到应用链接
    <a href={app.linkUrl} className="group flex flex-col items-center text-center gap-1.5">
      {/* 应用图标容器，悬停时放大并加深阴影 */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
        {/* 应用封面图片，悬停时轻微放大 */}
        <img
          src={app.imageUrl}
          alt={app.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* 若有徽章则显示在图标左上角 */}
        {app.badge && (
          <span
            className={`absolute top-1.5 left-1.5 ${badgeColors[app.badge] ?? 'bg-gray-700'} text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full`}
          >
            {app.badge}
          </span>
        )}
      </div>
      {/* 应用名称，超出一行截断 */}
      <p className="text-xs font-medium text-gray-800 leading-tight line-clamp-1 w-full px-0.5">
        {app.name}
      </p>
      {/* 应用副标语，超出一行截断 */}
      <p className="text-[10px] text-gray-400 leading-tight line-clamp-1 w-full px-0.5">
        {app.tagline}
      </p>
    </a>
  );
}

// ─── 应用网格列表组件 ───
function AppGrid({ apps }: { apps: AppItem[] }) {
  // 若无应用数据则显示空状态提示
  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <p className="text-lg font-medium">没有找到匹配的应用</p>
        <p className="text-sm mt-1">试试其他关键词或分类</p>
      </div>
    );
  }

  return (
    // 响应式网格布局，从4列到8列随屏幕宽度变化
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-5">
      {apps.map((app, i) => (
        // 每张卡片依次延迟淡入，营造错落动画效果
        <div
          key={app.id}
          style={{ animationDelay: `${i * 50}ms`, animation: 'fadeIn 0.4s ease forwards', opacity: 0 }}
        >
          <AppCard app={app} />
        </div>
      ))}
    </div>
  );
}

// ─── 顶部导航栏组件 ───
function Header() {
  // 记录页面是否已向下滚动超过20px
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // 监听滚动事件，超过20px时切换为毛玻璃背景
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // 固定在页面顶部，滚动后背景切换为半透明白色+模糊效果
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* LOGO图标区域：有图片链接则显示图片，否则显示默认网格图标 */}
          {/* 修改 siteConfig.logoUrl 即可更换顶部导航LOGO图片 */}
          <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center bg-gray-900 flex-shrink-0">
            {siteConfig.logoUrl ? (
              // 自定义LOGO图片，填满28×28px圆角容器
              <img
                src={siteConfig.logoUrl}
                alt={siteConfig.name}
                className="w-full h-full object-cover"
              />
            ) : (
              // 未设置图片时显示默认图标
              <Grid3X3 size={14} className="text-white" />
            )}
          </div>
          {/* 网站名称文字 */}
          <span className="text-gray-900 font-semibold text-base tracking-tight">{siteConfig.name}</span>
        </div>
      </div>
    </header>
  );
}

// ─── 顶部轮播横幅组件 ───
function HeroBanner({ banners }: { banners: BannerItem[] }) {
  // 当前显示的轮播项索引
  const [current, setCurrent] = useState(0);
  // 防止切换动画期间重复触发
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 切换到指定轮播项（带过渡锁）
  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + banners.length) % banners.length);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning, banners.length]
  );

  // 每5秒自动切换到下一张
  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const banner = banners[current];

  return (
    // 16:6宽高比的横幅容器，隐藏溢出内容
    <section className="relative w-full overflow-hidden" style={{ aspectRatio: '16/6' }}>
      {/* 遍历所有轮播项，当前项完全显示，其余项隐藏 */}
      {banners.map((b, i) => (
        <a
          key={b.id}
          href={b.linkUrl}
          className={`absolute inset-0 block transition-opacity duration-700 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          tabIndex={i === current ? 0 : -1}
        >
          {/* 横幅背景图片，完全填充并居中裁剪 */}
          <img
            src={b.imageUrl}
            alt={b.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* 左侧渐变遮罩，增强文字可读性 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        </a>
      ))}

      {/* 横幅文字内容区（标题与副标题），叠加在图片上方 */}
      <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-5 w-full">
          <div key={banner.id} style={{ animation: 'fadeSlideUp 0.6s ease forwards' }}>
            {/* 强调标签，颜色由各横幅的 accentColor 决定 */}
            <div
              className="inline-block text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full mb-2"
              style={{ background: banner.accentColor, color: '#fff' }}
            >
              精选推荐
            </div>
            {/* 横幅主标题 */}
            <h1 className="text-lg md:text-2xl font-bold text-white leading-snug mb-1">
              {banner.title}
            </h1>
            {/* 横幅副标题 */}
            <p className="text-white/75 text-xs md:text-sm">{banner.subtitle}</p>
          </div>
        </div>
      </div>

      {/* 底部圆点导航指示器，当前项为白色宽条，其余为半透明圆点 */}
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

      {/* 向左切换按钮 */}
      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200"
      >
        <ChevronLeft size={14} />
      </button>
      {/* 向右切换按钮 */}
      <button
        onClick={() => goTo(current + 1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200"
      >
        <ChevronRight size={14} />
      </button>
    </section>
  );
}

// ─── 底部页脚组件 ───
function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* 页脚上半部分：品牌信息 + 链接分组 */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              {/* LOGO图标区域：有图片链接则显示图片，否则显示默认网格图标 */}
              {/* 修改 footerBrand.logoUrl 即可更换页脚LOGO图片 */}
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-gray-900 flex-shrink-0">
                {footerBrand.logoUrl ? (
                  // 自定义LOGO图片，填满32×32px圆角容器
                  <img
                    src={footerBrand.logoUrl}
                    alt={footerBrand.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // 未设置图片时显示默认图标
                  <Grid3X3 size={16} className="text-white" />
                )}
              </div>
              {/* 品牌名称 */}
              <span className="text-gray-900 font-semibold text-lg tracking-tight">{footerBrand.name}</span>
            </div>
            {/* 品牌简介说明文字 */}
            <p className="text-sm text-gray-400 leading-relaxed">{footerBrand.description}</p>
          </div>

          {/* 渲染所有页脚链接分组 */}
          {footerLinks.map((col) => (
            <div key={col.group}>
              {/* 链接分组标题 */}
              <h4 className="text-sm font-semibold text-gray-800 mb-4">{col.group}</h4>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item}>
                    {/* 各链接项，悬停变深色 */}
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-gray-700 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 页脚底部分割线：版权信息 + 口号 */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* 版权文字 */}
          <p className="text-xs text-gray-400">{footerBrand.copyright}</p>
          {/* 品牌口号 */}
          <p className="text-xs text-gray-400">{footerBrand.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

// ─── 页面根组件 ───
export default function App() {
  return (
    // 整体页面背景浅灰色，最小高度撑满视口
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* 顶部固定导航栏 */}
      <Header />

      {/* 顶部轮播横幅，传入横幅数据 */}
      <HeroBanner banners={banners} />

      {/* 主内容区：应用网格列表 */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          {/* 区块标题 */}
          <h2 className="text-base font-semibold text-gray-800">全部应用</h2>
          {/* 应用总数统计 */}
          <span className="text-xs text-gray-400">{apps.length} 款</span>
        </div>
        {/* 应用卡片网格，传入全部应用数据 */}
        <AppGrid apps={apps} />
      </main>

      {/* 底部页脚 */}
      <Footer />
    </div>
  );
}
