const stats = [
  { value: '500+', label: '精选应用' },
  { value: '2000万+', label: '月活用户' },
  { value: '20+', label: '应用分类' },
  { value: '99.9%', label: '服务可用率' },
];

export default function StatsBar() {
  return (
    <div className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold mb-1">{s.value}</div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
