import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            active === cat.id
              ? 'bg-gray-900 text-white shadow-sm'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
