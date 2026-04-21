import { useState, useEffect, useCallback } from 'react';
import { Grid3x3 as Grid3X3, ChevronLeft, ChevronRight } from 'lucide-react';

// ════════════════════════════════════════════
//  一、类型定义
// ════════════════════════════════════════════

// 单个应用卡片的数据结构
interface AppItem {
  id: string;           // 唯一标识符
  name: string;         // 应用名称
  tagline: string;      // 应用副标语
  description: string;  // 应用详细描述
  category: string;     // 所属分类ID
  imageUrl: string;     // 封面图片链接
  linkUrl: string;      // 点击跳转链接
  badge?: string;       // 可选徽章文字（如"热门推荐"）
  rating?: number;      // 可选评分
  downloads?: string;   // 可选下载量文字
}

// 轮播横幅的数据结构
interface BannerItem {
  id: string;           // 唯一标识符
  title: string;        // 横幅主标题
  subtitle: string;     // 横幅副标题
  imageUrl: string;     // 背景图片链接（修改此处可更换横幅图片）
  linkUrl: string;      // 点击横幅跳转的链接
  accentColor: string;  // 标签强调色（十六进制色值）
}

// ════════════════════════════════════════════
//  二、网站配置（顶部导航栏）
// ════════════════════════════════════════════

const siteConfig = {
  name: 'NG集团',                                                         // 网站名称
  logoUrl: 'https://pic1.imgdb.cn/item/689dd5ec58cb8da5c8251893.jpg',   // 顶部导航LOGO图片链接（替换此URL即可更换LOGO）
};

// ════════════════════════════════════════════
//  三、轮播横幅数据
// ════════════════════════════════════════════

const banners: BannerItem[] = [
  {
    id: 'b1',
    title: '',                                                              // 第一张横幅标题（可填写文字，留空则不显示）
    subtitle: '',                                                           // 第一张横幅副标题
    imageUrl: 'https://i.postimg.cc/d041SZWv/du-li-tong-zhi-ding1.webp', // 第一张横幅背景图（替换此URL可更换图片）
    linkUrl: '#',                                                           // 第一张横幅点击跳转链接
    accentColor: '#0ea5e9',                                                // 第一张横幅标签颜色（天蓝色）
  },
  {
    id: 'b2',
    title: '',                                                              // 第二张横幅标题
    subtitle: '',                                                           // 第二张横幅副标题
    imageUrl: 'https://i.postimg.cc/wB0vbRWY/du-li-tong-zhi-ding2.webp', // 第二张横幅背景图（替换此URL可更换图片）
    linkUrl: '#',                                                           // 第二张横幅点击跳转链接
    accentColor: '#10b981',                                                // 第二张横幅标签颜色（绿色）
  },
  {
    id: 'b3',
    title: '',                                                              // 第三张横幅标题
    subtitle: '',                                                           // 第三张横幅副标题
    imageUrl: 'https://i.postimg.cc/TPCwH5kx/du-li-tong-zhi-ding3.webp', // 第三张横幅背景图（替换此URL可更换图片）
    linkUrl: '#',                                                           // 第三张横幅点击跳转链接
    accentColor: '#f59e0b',                                                // 第三张横幅标签颜色（琥珀色）
  },
];

// ════════════════════════════════════════════
//  四、应用数据列表（每项对应一张应用卡片）
// ════════════════════════════════════════════

const apps: AppItem[] = [
  {
    id: 'app1',
    name: '非凡娱乐',                                                                                                             // 应用名称
    tagline: '',                                                                                                                   // 副标语（可填写，留空则不显示）
    description: '用看板与时间轴掌控每一个项目进度，让团队协作更流畅。',
    category: 'productivity',
    imageUrl: 'https://pic1.imgdb.cn/item/68692e6658cb8da5c89176fd.jpg',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://bakmry.gziasti.com/app/register.php?site_id=1050&topId=880722&selfPlanId=855049',                          // 点击跳转链接
    badge: '热门推荐',                                                                                                            // 徽章文字（可选值：热门推荐 / 新品上线 / 强烈推荐，删除此行则不显示徽章）
    rating: 4.9,
    downloads: '120万+',
  },
  {
    id: 'app2',
    name: '梦想国际',
    tagline: '',
    description: '矢量绘图、UI设计、原型制作一体化，释放你的创作潜能。',
    category: 'creative',
    imageUrl: 'https://pic1.imgdb.cn/item/69df01c6f76f4dd14b4c2858.jpg',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://mgokgd.jgqvji.com/app/register.php?site_id=1061&pt=08A0E1AF-96B3-A9C8-6E51-1D02FD14ABAC',                 // 点击跳转链接
    badge: '新品上线',
    rating: 4.8,
    downloads: '85万+',
  },
  {
    id: 'app3',
    name: '君临国际',
    tagline: '',
    description: '端对端加密，零广告，保护每一条私信的安全与隐私。',
    category: 'social',
    imageUrl: 'https://pic1.imgdb.cn/item/695248a74b4fb88febf26626.jpg',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://tfajn.hcjwj.com/app/register.php?site_id=2081&topId=23647&selfPlanId=6413',                               // 点击跳转链接
    badge: '新品上线',
    rating: 4.7,
    downloads: '300万+',
  },
  {
    id: 'app4',
    name: '汇赢国际',
    tagline: '',
    description: '智能追踪收支、投资组合与目标储蓄，让财务清晰可见。',
    category: 'finance',
    imageUrl: 'https://pic1.imgdb.cn/item/69da7d4e757fdade5eafac10.jpg',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://ncgca.tprsmi.com/app/register.php?site_id=1062&topId=13593&selfPlanId=918',                               // 点击跳转链接
    badge: '新品上线',
    rating: 4.6,
    downloads: '60万+',
  },
  {
    id: 'app5',
    name: 'top1体育',
    tagline: '',
    description: '睡眠、运动、冥想一体化追踪，科学指导你的健康生活。',
    category: 'health',
    imageUrl: 'https://i.postimg.cc/FzGDYZpB/xin-TOP-ti-yu.jpg',                                                                 // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://bakmry.gziasti.com/app/register.php?site_id=1051&topId=457911',                                            // 点击跳转链接
    badge: '热门推荐',
    rating: 4.8,
    downloads: '200万+',
  },
  {
    id: 'app6',
    name: '新时代',
    tagline: '',
    description: '整合多平台片单，支持离线缓存，随时随地享受高清内容。',
    category: 'entertainment',
    imageUrl: 'https://i.postimg.cc/t4SjcBzw/xin-shi-dai.jpg',                                                                   // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://derear.fnbpsw.com/app/register.php?site_id=1059&topId=82351&selfPlanId=144338',                            // 点击跳转链接
    badge: '热门推荐',
    rating: 4.5,
    downloads: '150万+',
  },
  {
    id: 'app7',
    name: '问鼎娱乐',
    tagline: '',
    description: '双向链接、AI摘要、多端同步，构建你的第二大脑。',
    category: 'productivity',
    imageUrl: 'https://pic1.imgdb.cn/item/6984d021312b01a291a7449f.webp',                                                        // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://onkrcy.hefaship.com/app/register.php?site_id=1020&topId=21543657',                                         // 点击跳转链接
    badge: '热门推荐',
    rating: 4.9,
    downloads: '95万+',
  },
  {
    id: 'app8',
    name: '壹号娱乐',
    tagline: '',
    description: '从图片提取调色板，AI生成配色方案，一键导出设计规范。',
    category: 'creative',
    imageUrl: 'https://pic1.imgdb.cn/item/688c1d0e58cb8da5c8f69d21.webp',                                                        // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://gfvgx.jgqvji.com/app/register.php?site_id=800&pt=20784FBB-9EDA-E1C7-A955-C82CA771D0F3',                   // 点击跳转链接
    badge: '热门推荐',
    rating: 4.7,
    downloads: '40万+',
  },
  {
    id: 'app9',
    name: '胜天国际',
    tagline: '',
    description: '基于兴趣标签匹配，加入同频圈子，发现真实的人与故事。',
    category: 'social',
    imageUrl: 'https://i.postimg.cc/D05BSg6D/xin-sheng-tian-guo-ji.jpg',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://tfajn.hcjwj.com/app/register.php?site_id=1058&topId=26442&selfPlanId=1692',                               // 点击跳转链接
    badge: '热门推荐',
    rating: 4.4,
    downloads: '180万+',
  },
  {
    id: 'app10',
    name: '超凡国际',
    tagline: '',
    description: '多交易所聚合行情、智能预警与持仓分析，把握市场脉搏。',
    category: 'finance',
    imageUrl: 'https://pic1.imgdb.cn/item/68692e6558cb8da5c89176f7.jpg',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://pkajim.hfjcl.com/app/register.php?site_id=1032&topId=1056008',                                             // 点击跳转链接
    badge: '热门推荐',
    rating: 4.6,
    downloads: '75万+',
  },
  {
    id: 'app11',
    name: '东升国际',
    tagline: '',
    description: '精选冥想课程与呼吸练习，帮助你减压、专注、更好入睡。',
    category: 'health',
    imageUrl: 'https://pic1.imgdb.cn/item/68692e6758cb8da5c89176fe.jpg',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://tz.wx-zxivoq2.com/app/register.php?site_id=2173&topId=1090266',                                            // 点击跳转链接
    badge: '热门推荐',
    rating: 4.8,
    downloads: '110万+',
  },
  {
    id: 'app12',
    name: '征途国际',
    tagline: '',
    description: '专业采样、混音、母带处理，在手机上完成专辑级别的创作。',
    category: 'entertainment',
    imageUrl: 'https://pic1.imgdb.cn/item/68692e6658cb8da5c89176fc.jpg',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://pkajim.hfjcl.com/app/register.php?site_id=1031&topId=1890399',                                             // 点击跳转链接
    badge: '热门推荐',
    rating: 4.7,
    downloads: '55万+',
  },
  {
    id: 'app13',
    name: '巅峰国际',
    tagline: '',
    description: '专业采样、混音、母带处理，在手机上完成专辑级别的创作。',
    category: 'entertainment',
    imageUrl: 'https://pic1.imgdb.cn/item/68692e6658cb8da5c89176f8.jpg',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://gfvgx.jgqvji.com/app/register.php?site_id=1030&topId=1744632',                                             // 点击跳转链接
    badge: '热门推荐',
    rating: 4.7,
    downloads: '55万+',
  },
  {
    id: 'app14',
    name: 'NG南宫',
    tagline: '',
    description: '专业采样、混音、母带处理，在手机上完成专辑级别的创作。',
    category: 'entertainment',
    imageUrl: 'https://pic1.imgdb.cn/item/689dd5ec58cb8da5c8251893.jpg',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://149.30.163.235:32011/#/link?allwin=BT8jp798vc163kFA9xyh2g%3D%3D',                                          // 点击跳转链接
    badge: '热门推荐',
    rating: 4.7,
    downloads: '55万+',
  },
   {
    id: 'app15',
    name: 'NG体育',
    tagline: '',
    description: '专业采样、混音、母带处理，在手机上完成专辑级别的创作。',
    category: 'entertainment',
    imageUrl: 'https://pic1.imgdb.cn/item/68b3af8358cb8da5c8655b32.jpg',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://nvjmce.hfjcl.com/app/register.php?site_id=1019&topId=10325130',                                          // 点击跳转链接
    badge: '热门推荐',
    rating: 4.7,
    downloads: '55万+',
  }, {
    id: 'app16',
    name: '保时捷',
    tagline: '',
    description: '专业采样、混音、母带处理，在手机上完成专辑级别的创作。',
    category: 'entertainment',
    imageUrl: 'https://pic1.imgdb.cn/item/68dbfe46c5157e1a884b253c.jpg',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://bsj.iypcst.com/app/register.php?site_id=134523275&topId=82386',                                          // 点击跳转链接
    badge: '热门推荐',
    rating: 4.7,
    downloads: '55万+',
  }, {
    id: 'app17',
    name: '赏金国际',
    tagline: '',
    description: '专业采样、混音、母带处理，在手机上完成专辑级别的创作。',
    category: 'entertainment',
    imageUrl: 'https://pic1.imgdb.cn/item/688c1d0e58cb8da5c8f69d23.jpg',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://xjvueb.hefaship.com/app/register.php?site_id=1010&topId=3094701',                                          // 点击跳转链接
    badge: '热门推荐',
    rating: 4.7,
    downloads: '55万+',
  }, {
    id: 'app18',
    name: '亿万28',
    tagline: '',
    description: '专业采样、混音、母带处理，在手机上完成专辑级别的创作。',
    category: 'entertainment',
    imageUrl: 'https://pic1.imgdb.cn/item/68a570b358cb8da5c83d12f9.jpg',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://xjvueb.hefaship.com/app/register.php?site_id=1017&topId=7061046',                                          // 点击跳转链接
    badge: '热门推荐',
    rating: 4.7,
    downloads: '55万+',
  }, {
    id: 'app19',
    name: '大满贯',
    tagline: '',
    description: '专业采样、混音、母带处理，在手机上完成专辑级别的创作。',
    category: 'entertainment',
    imageUrl: 'https://pic1.imgdb.cn/item/6911f7f73203f7be00ed9d46.jpg',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://tz.wxdmg6.cc/app/register.php?site_id=2228&topId=1661558',                                          // 点击跳转链接
    badge: '热门推荐',
    rating: 4.7,
    downloads: '55万+',
  }, {
    id: 'app20',
    name: '多多28',
    tagline: '',
    description: '专业采样、混音、母带处理，在手机上完成专辑级别的创作。',
    category: 'entertainment',
    imageUrl: 'https://pic1.imgdb.cn/item/686f644658cb8da5c899de0b.png',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://wlkyiy.paradisemall.net/app/register.php?site_id=1021&topId=5519693',                                          // 点击跳转链接
    badge: '热门推荐',
    rating: 4.7,
    downloads: '55万+',
  }, {
    id: 'app21',
    name: '旺财28',
    tagline: '',
    description: '专业采样、混音、母带处理，在手机上完成专辑级别的创作。',
    category: 'entertainment',
    imageUrl: 'https://pic1.imgdb.cn/item/68b3af7e58cb8da5c8655b00.png',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://wlkyiy.paradisemall.net/app/register.php?site_id=1012&topId=3926701',                                          // 点击跳转链接
    badge: '热门推荐',
    rating: 4.7,
    downloads: '55万+',
  }, {
    id: 'app22',
    name: '28圈',
    tagline: '',
    description: '专业采样、混音、母带处理，在手机上完成专辑级别的创作。',
    category: 'entertainment',
    imageUrl: 'https://pic1.imgdb.cn/item/68692e6658cb8da5c89176f9.jpg',                                                         // 应用封面图片（替换此URL可更换图片）
    linkUrl: 'https://149.30.163.235:32011/#/link?allwin=BT8jp798vc163kFA9xyh2g%3D%3D',                                          // 点击跳转链接
    badge: '热门推荐',
    rating: 4.7,
    downloads: '55万+',
  },
];

// ════════════════════════════════════════════
//  五、页脚配置
// ════════════════════════════════════════════

const footerBrand = {
  name: 'NG集团-品质铸就品牌',                                                             // 页脚品牌名称
  description: '精选平台推荐与服务，信息仅供参考。',                                         // 页脚品牌简介
  copyright: '©NG集团| 2025 ',                                                            // 版权文字
  tagline: '以极简之美，聚合无限可能',                                                       // 品牌口号
  logoUrl: 'https://pic1.imgdb.cn/item/689dd5ec58cb8da5c8251893.jpg',                   // 页脚LOGO图片链接（替换此URL即可更换，留空则显示默认图标）
};

const footerLinks = [
  {
    group: '关于',                                                                          // 链接分组标题
    items: ['关于我们', '联系我们', '隐私政策', '服务条款'],                                  // 分组下的链接文字列表
  },
];

// ════════════════════════════════════════════
//  六、徽章颜色映射表
// ════════════════════════════════════════════

// 根据徽章文字匹配对应的背景颜色类名
const badgeColors: Record<string, string> = {
  '强烈推荐': 'bg-sky-500',    // 天蓝色
  '新品上线': 'bg-emerald-500', // 绿色
  '热门推荐': 'bg-rose-500',   // 玫红色
};

// ════════════════════════════════════════════
//  七、组件定义
// ════════════════════════════════════════════

// ─── 单个应用卡片组件 ───
function AppCard({ app }: { app: AppItem }) {
  return (
    // 整个卡片为链接，点击跳转到应用页面
    <a href={app.linkUrl} className="group flex flex-col items-center text-center gap-1.5">
      {/* 图片容器：固定正方形比例，圆角，悬停阴影加深 */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
        {/* 封面图片：悬停时轻微放大 */}
        <img
          src={app.imageUrl}
          alt={app.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* 若定义了徽章则显示在图片左上角 */}
        {app.badge && (
          <span
            className={`absolute top-1.5 left-1.5 ${badgeColors[app.badge] ?? 'bg-gray-700'} text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full`}
          >
            {app.badge}
          </span>
        )}
      </div>
      {/* 应用名称：超出一行时截断省略 */}
      <p className="text-xs font-medium text-gray-800 leading-tight line-clamp-1 w-full px-0.5">
        {app.name}
      </p>
      {/* 副标语：超出一行时截断省略 */}
      <p className="text-[10px] text-gray-400 leading-tight line-clamp-1 w-full px-0.5">
        {app.tagline}
      </p>
    </a>
  );
}

// ─── 应用网格列表组件 ───
function AppGrid({ apps }: { apps: AppItem[] }) {
  // 无数据时显示空状态提示
  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <p className="text-lg font-medium">没有找到匹配的应用</p>
        <p className="text-sm mt-1">试试其他关键词或分类</p>
      </div>
    );
  }

  return (
    // 响应式网格：手机3列，平板4列，桌面固定6列
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-5">
      {apps.map((app, i) => (
        // 每张卡片依次延迟淡入，形成错落动画
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
  // 滚动状态：超过20px时导航栏切换为毛玻璃背景
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // 添加滚动事件监听，组件卸载时移除
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // 固定在顶部，滚动后背景变为半透明白色+模糊
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* LOGO容器：28×28px圆角方块，有图片则显示图片，否则显示默认图标 */}
          {/* 更换顶部LOGO：修改上方 siteConfig.logoUrl 的值即可 */}
          <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center bg-gray-900 flex-shrink-0">
            {siteConfig.logoUrl ? (
              <img src={siteConfig.logoUrl} alt={siteConfig.name} className="w-full h-full object-cover" />
            ) : (
              <Grid3X3 size={14} className="text-white" />
            )}
          </div>
          {/* 网站名称 */}
          <span className="text-gray-900 font-semibold text-base tracking-tight">{siteConfig.name}</span>
        </div>
      </div>
    </header>
  );
}

// ─── 顶部轮播横幅组件 ───
function HeroBanner({ banners }: { banners: BannerItem[] }) {
  // 当前显示的横幅索引
  const [current, setCurrent] = useState(0);
  // 动画过渡锁，防止连续点击导致动画错乱
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 跳转到指定索引（循环，带过渡锁）
  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + banners.length) % banners.length); // 超出范围时循环
      setTimeout(() => setIsTransitioning(false), 500);       // 500ms后解除锁定
    },
    [isTransitioning, banners.length]
  );

  // 每5000ms自动切换到下一张
  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timer); // 组件卸载时清除定时器
  }, [current, goTo]);

  const banner = banners[current]; // 当前显示的横幅数据

  return (
    // 16:6宽高比容器，裁剪超出内容
    <section className="relative w-full overflow-hidden" style={{ aspectRatio: '16/6' }}>
      {/* 遍历所有横幅，通过透明度切换显示/隐藏 */}
      {banners.map((b, i) => (
        <a
          key={b.id}
          href={b.linkUrl}
          className={`absolute inset-0 block transition-opacity duration-700 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0' // 当前项完全显示，其余隐藏
          }`}
          tabIndex={i === current ? 0 : -1} // 非当前项从Tab顺序移除
        >
          {/* 横幅背景图片，覆盖整个容器 */}
          <img src={b.imageUrl} alt={b.title} className="absolute inset-0 w-full h-full object-cover object-center" />
          {/* 左侧渐变遮罩，提升文字可读性 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        </a>
      ))}

      {/* 文字内容区，悬浮在图片上方，不阻挡鼠标事件 */}
      <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-5 w-full">
          <div key={banner.id} style={{ animation: 'fadeSlideUp 0.6s ease forwards' }}>
            {/* 强调色标签，颜色由 accentColor 决定 */}
            <div
              className="inline-block text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full mb-2"
              style={{ background: banner.accentColor, color: '#fff' }}
            >
              精选推荐
            </div>
            {/* 横幅主标题（留空则不占空间） */}
            <h1 className="text-lg md:text-2xl font-bold text-white leading-snug mb-1">{banner.title}</h1>
            {/* 横幅副标题 */}
            <p className="text-white/75 text-xs md:text-sm">{banner.subtitle}</p>
          </div>
        </div>
      </div>

      {/* 底部圆点指示器：当前项为白色宽条，其余为半透明圆点 */}
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

      {/* 向左翻页按钮 */}
      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200"
      >
        <ChevronLeft size={14} />
      </button>
      {/* 向右翻页按钮 */}
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
        {/* 上半部分：品牌区 + 链接分组 */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              {/* 页脚LOGO容器：32×32px，有图片则显示图片，否则显示默认图标 */}
              {/* 更换页脚LOGO：修改上方 footerBrand.logoUrl 的值即可 */}
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-gray-900 flex-shrink-0">
                {footerBrand.logoUrl ? (
                  <img src={footerBrand.logoUrl} alt={footerBrand.name} className="w-full h-full object-cover" />
                ) : (
                  <Grid3X3 size={16} className="text-white" />
                )}
              </div>
              {/* 品牌名称 */}
              <span className="text-gray-900 font-semibold text-lg tracking-tight">{footerBrand.name}</span>
            </div>
            {/* 品牌简介 */}
            <p className="text-sm text-gray-400 leading-relaxed">{footerBrand.description}</p>
          </div>

          {/* 渲染所有链接分组 */}
          {footerLinks.map((col) => (
            <div key={col.group}>
              {/* 分组标题 */}
              <h4 className="text-sm font-semibold text-gray-800 mb-4">{col.group}</h4>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item}>
                    {/* 链接项，悬停时文字变深 */}
                    <a href="#" className="text-sm text-gray-400 hover:text-gray-700 transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 底部分割线：版权 + 口号 */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">{footerBrand.copyright}</p> {/* 版权文字 */}
          <p className="text-xs text-gray-400">{footerBrand.tagline}</p>   {/* 品牌口号 */}
        </div>
      </div>
    </footer>
  );
}

// ════════════════════════════════════════════
//  八、页面根组件（入口）
// ════════════════════════════════════════════

export default function App() {
  return (
    // 整体页面：浅灰背景，最小高度填满视口
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* 顶部固定导航栏 */}
      <Header />

      {/* 轮播横幅区域，传入横幅数据数组 */}
      <HeroBanner banners={banners} />

      {/* 主内容：应用网格 */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-gray-800">全部应用</h2>  {/* 区块标题 */}
          <span className="text-xs text-gray-400">{apps.length} 款</span>      {/* 应用总数 */}
        </div>
        {/* 传入全部应用数据，渲染卡片网格 */}
        <AppGrid apps={apps} />
      </main>

      {/* 底部页脚 */}
      <Footer />
    </div>
  );
}
