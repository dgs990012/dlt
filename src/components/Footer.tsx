import { Grid3x3 as Grid3X3 } from 'lucide-react';

const links = [
  { group: '关于', items: ['关于我们', '联系我们', '隐私政策', '服务条款'] },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Grid3X3 size={16} className="text-white" />
              </div>
              <span className="text-gray-900 font-semibold text-lg tracking-tight">AppHub</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              精心筛选每一款优质应用，<br />为你发现更好的数字生活。
            </p>
          </div>

          {links.map((col) => (
            <div key={col.group}>
              <h4 className="text-sm font-semibold text-gray-800 mb-4">{col.group}</h4>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item}>
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

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">© 2025 AppHub. 保留所有权利。</p>
          <p className="text-xs text-gray-400">
            以极简之美，聚合无限可能
          </p>
        </div>
      </div>
    </footer>
  );
}
