import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import AppGrid from './components/AppGrid';
import Footer from './components/Footer';
import { apps, banners } from './data/apps';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <HeroBanner banners={banners} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-gray-800">全部应用</h2>
          <span className="text-xs text-gray-400">{apps.length} 款</span>
        </div>
        <AppGrid apps={apps} />
      </main>

      <Footer />
    </div>
  );
}
