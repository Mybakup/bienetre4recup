import React from 'react';
import { Search, MapPin, Filter } from 'lucide-react';

interface WellnessSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLocationClick: () => void;
  onFilterClick: () => void;
  isLocating: boolean;
  activeFiltersCount: number;
}

export default function WellnessSearch({
  searchQuery,
  onSearchChange,
  onLocationClick,
  onFilterClick,
  isLocating,
  activeFiltersCount
}: WellnessSearchProps) {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher un coach, une activité..."
          className="w-full h-12 pl-12 pr-24 bg-white border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button
            onClick={onLocationClick}
            disabled={isLocating}
            className={`p-2 rounded-full transition-colors ${
              isLocating 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
            title="Utiliser ma position"
          >
            <MapPin className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={onFilterClick}
            className="relative p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            title="Filtres"
          >
            <Filter className="w-4 h-4" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Quick Search Suggestions */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {[
          'Yoga débutant',
          'Coach fitness',
          'Massage relaxant',
          'Nutrition sportive',
          'Méditation'
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSearchChange(suggestion)}
            className="flex-shrink-0 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-green-300 hover:text-green-600 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}