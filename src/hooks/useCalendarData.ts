import { useState, useEffect } from 'react';
import { CalendarData, Category, DEFAULT_CATEGORIES, DayData } from '@/types/calendar';

const STORAGE_KEY = 'calendar-data-2026';
const CATEGORIES_KEY = 'calendar-categories';
const NOTES_KEY = 'calendar-notes';

export function useCalendarData() {
  const [data, setData] = useState<CalendarData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(CATEGORIES_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  const [notes, setNotes] = useState<string>(() => {
    return localStorage.getItem(NOTES_KEY) || '';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, notes);
  }, [notes]);

  const updateDay = (dateKey: string, dayData: DayData) => {
    setData(prev => ({
      ...prev,
      [dateKey]: dayData,
    }));
  };

  const clearDay = (dateKey: string) => {
    setData(prev => {
      const newData = { ...prev };
      delete newData[dateKey];
      return newData;
    });
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === id ? { ...cat, ...updates } : cat))
    );
  };

  return {
    data,
    categories,
    notes,
    setNotes,
    updateDay,
    clearDay,
    updateCategory,
  };
}
