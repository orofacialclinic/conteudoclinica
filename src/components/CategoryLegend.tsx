import { Category, CategoryColor } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface CategoryLegendProps {
  categories: Category[];
  selectedColor: CategoryColor;
  onSelectColor: (color: CategoryColor) => void;
  onUpdateCategory: (id: string, updates: Partial<Category>) => void;
}

const colorClasses: Record<string, string> = {
  blue: 'bg-calendar-blue',
  yellow: 'bg-calendar-yellow',
  'green-light': 'bg-calendar-green-light',
  pink: 'bg-calendar-pink',
  green: 'bg-calendar-green',
  purple: 'bg-calendar-purple',
  gray: 'bg-calendar-gray',
  holiday: 'bg-calendar-holiday',
};

export function CategoryLegend({
  categories,
  selectedColor,
  onSelectColor,
  onUpdateCategory,
}: CategoryLegendProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 space-y-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectColor(category.color === selectedColor ? null : category.color)}
          className={cn(
            'w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200',
            'hover:bg-muted/50',
            selectedColor === category.color && 'ring-2 ring-primary ring-offset-2 ring-offset-card'
          )}
        >
          <div
            className={cn(
              'w-3 h-3 rounded-full shrink-0',
              colorClasses[category.color || 'gray']
            )}
          />
          <input
            type="text"
            value={category.name}
            onChange={(e) => onUpdateCategory(category.id, { name: e.target.value })}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'flex-1 bg-transparent text-xs font-semibold text-foreground',
              'border-none outline-none focus:bg-muted/30 rounded px-1 py-0.5',
              'transition-colors duration-200',
              colorClasses[category.color || 'gray'],
              'rounded-full px-3 py-1.5'
            )}
          />
        </button>
      ))}
    </div>
  );
}
