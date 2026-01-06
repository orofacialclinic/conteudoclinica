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
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-72 shrink-0 space-y-4">
            {/* Vertical title */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="writing-vertical text-sm font-bold tracking-[0.3em] text-muted-foreground">
                CALENDÁRIO DE CONTEÚDO
              </div>
              <div className="flex-1 space-y-4">
                <CategoryLegend
                  categories={categories}
                  selectedColor={selectedColor}
                  onSelectColor={setSelectedColor}
                  onUpdateCategory={updateCategory}
                />
                <NotesSection notes={notes} onNotesChange={setNotes} />
              </div>
            </div>
            
            {/* Mobile legend */}
            <div className="lg:hidden space-y-4">
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
        </div>

        {/* Mobile notes */}
        <div className="lg:hidden mt-6">
          <NotesSection notes={notes} onNotesChange={setNotes} />
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            <strong>Dica:</strong> Selecione uma cor na legenda e clique nos dias para pintá-los rapidamente.
            Clique em um dia sem cor selecionada para adicionar texto.
          </p>
        </div>
      </div>
    </div>
  );
}
