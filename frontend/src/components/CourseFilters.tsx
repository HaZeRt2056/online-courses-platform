import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';

interface CourseFiltersProps {
  onFilterChange: (filters: Record<string, string>) => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({ onFilterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [language, setLanguage] = useState(searchParams.get('language') || '');
  const [level, setLevel] = useState(searchParams.get('level') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  
  // Mock data for filters - would come from API in production
  const categories = [
    { id: 'web-development', name: 'Веб-разработка' },
    { id: 'mobile-development', name: 'Мобильная разработка' },
    { id: 'design', name: 'Дизайн' },
    { id: 'devops', name: 'DevOps' },
    { id: 'databases', name: 'Базы данных' },
    { id: 'machine-learning', name: 'Машинное обучение' },
  ];
  
  const languages = [
    { id: 'russian', name: 'Русский' },
    { id: 'english', name: 'Английский' },
  ];
  
  const levels = [
    { id: 'beginner', name: 'Начинающий' },
    { id: 'intermediate', name: 'Средний' },
    { id: 'advanced', name: 'Продвинутый' },
  ];
  
  const sortOptions = [
    { id: 'newest', name: 'Сначала новые' },
    { id: 'oldest', name: 'Сначала старые' },
    { id: 'popular', name: 'По популярности' },
    { id: 'rating', name: 'По рейтингу' },
  ];
  
  // Apply filters when they change
  useEffect(() => {
    const newFilters: Record<string, string> = {};

    if (searchQuery) newFilters.search = searchQuery;
    if (category) newFilters.category = category;
    if (language) newFilters.language = language;
    if (level) newFilters.level = level;
    if (sort) newFilters.sort = sort;

    const currentFilters = Object.fromEntries([...searchParams.entries()]);

    const areEqual =
        Object.keys(newFilters).length === Object.keys(currentFilters).length &&
        Object.keys(newFilters).every(
            (key) => currentFilters[key] === newFilters[key]
        );

    if (!areEqual) {
      setSearchParams(newFilters);
      onFilterChange(newFilters);
    }
  }, [searchQuery, category, language, level, sort, searchParams, setSearchParams, onFilterChange]);


  // Handle search form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setCategory('');
    setLanguage('');
    setLevel('');
    setSort('newest');
  };
  
  return (
    <div className="bg-white rounded-lg shadow mb-6">
      {/* Search form */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Поиск курсов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        
        {/* Toggle filters button */}
        <div className="mt-3 flex justify-between items-center">
          <button
            type="button"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <Filter className="h-4 w-4 mr-1" />
            Фильтры
          </button>
          
          {/* Reset filters button - only show if any filter is applied */}
          {(category || language || level || sort !== 'newest' || searchQuery) && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              Сбросить все
            </button>
          )}
        </div>
      </form>
      
      {/* Filters panel */}
      {filtersOpen && (
        <div className="border-t border-gray-200 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Категория
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="">Все категории</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Language filter */}
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
              Язык
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="">Все языки</option>
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Level filter */}
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
              Уровень
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="">Все уровни</option>
              {levels.map((lvl) => (
                <option key={lvl.id} value={lvl.id}>
                  {lvl.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Sort filter */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
              Сортировка
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      
      {/* Active filters */}
      {(category || language || level) && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600">Активные фильтры:</span>
          
          {category && (
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {categories.find(c => c.id === category)?.name}
              <button
                type="button"
                onClick={() => setCategory('')}
                className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-primary-400 hover:text-primary-600 focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          {language && (
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
              {languages.find(l => l.id === language)?.name}
              <button
                type="button"
                onClick={() => setLanguage('')}
                className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-secondary-400 hover:text-secondary-600 focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          {level && (
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
              {levels.find(l => l.id === level)?.name}
              <button
                type="button"
                onClick={() => setLevel('')}
                className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-accent-400 hover:text-accent-600 focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseFilters;