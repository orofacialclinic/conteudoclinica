import { useState } from 'react';
import { CategoryColor } from '@/types/calendar';
import { useCalendarData } from '@/hooks/useCalendarData';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { CategoryLegend } from './CategoryLegend';
import { NotesSection } from './NotesSection';

export function ContentCalendar() {
  const [currentMonth, setCurrentMonth] = useState(0); // January
  const [currentYear] = useState(2026);
  const [selectedColor, setSelectedColor] = useState<CategoryColor>(null);
  
  const { data, categories, notes, setNotes, updateDay, clearDay, updateCategory } =
    useCalendarData();

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar with vertical text and legend */}
          <div className="hidden lg:flex items-stretch gap-3 shrink-0">
            {/* Vertical text */}
            <div className="flex items-center">
              <div 
                className="text-xs font-bold tracking-[0.25em] text-calendar-purple/80"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                CONTEÚDO
              </div>
            </div>
            {/* Vertical purple bar */}
            <div className="w-1.5 bg-calendar-purple rounded-full" />
            {/* Legend */}
            <div className="w-48">
              <CategoryLegend
                categories={categories}
                selectedColor={selectedColor}
                onSelectColor={setSelectedColor}
                onUpdateCategory={updateCategory}
              />
            </div>
          </div>

          {/* Main calendar */}
          <div className="flex-1">
            <CalendarHeader
              month={currentMonth}
              year={currentYear}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
            <CalendarGrid
              month={currentMonth}
              year={currentYear}
              data={data}
              selectedColor={selectedColor}
              onUpdateDay={updateDay}
              onClearDay={clearDay}
            />
          </div>

          {/* Right sidebar with notes */}
          <div className="hidden lg:block w-56 shrink-0">
            <NotesSection notes={notes} onNotesChange={setNotes} />
          </div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden space-y-4 mt-6">
          <CategoryLegend
            categories={categories}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
            onUpdateCategory={updateCategory}
          />
          <NotesSection notes={notes} onNotesChange={setNotes} />
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>Selecione uma cor e clique nos dias para pintar • Clique sem cor selecionada para adicionar texto</p>
        </div>
      </div>
    </div>
  );
}
