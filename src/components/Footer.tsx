import { Grid3x3 as Grid3X3 } from 'lucide-react';
import { footerBrand, footerLinks } from '../data/config';

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
              <span className="text-gray-900 font-semibold text-lg tracking-tight">{footerBrand.name}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{footerBrand.description}</p>
          </div>

          {footerLinks.map((col) => (
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
          <p className="text-xs text-gray-400">{footerBrand.copyright}</p>
          <p className="text-xs text-gray-400">{footerBrand.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
