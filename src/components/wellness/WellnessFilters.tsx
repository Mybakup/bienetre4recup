import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { wellnessFilters, type WellnessFilter } from '../../data/wellnessCategories';

interface WellnessFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Record<string, any>;
  onFilterChange: (filterId: string, value: any) => void;
  onClearFilters: () => void;
}

export default function WellnessFilters({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters
}: WellnessFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['availability', 'price']);

  if (!isOpen) return null;

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const renderFilter = (filter: WellnessFilter) => {
    const isExpanded = expandedSections.includes(filter.id);

    return (
      <div key={filter.id} className="border-b border-gray-200 last:border-b-0">
        <button
          onClick={() => toggleSection(filter.id)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium text-gray-800">{filter.name}</span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {isExpanded && (
          <div className="px-4 pb-4">
            {filter.type === 'select' && filter.options && (
              <select
                value={filters[filter.id] || 'all'}
                onChange={(e) => onFilterChange(filter.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {filter.type === 'checkbox' && filter.options && (
              <div className="space-y-2">
                {filter.options.map((option) => (
                  <label key={option.value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters[filter.id]?.includes(option.value) || false}
                      onChange={(e) => {
                        const currentValues = filters[filter.id] || [];
                        const newValues = e.target.checked
                          ? [...currentValues, option.value]
                          : currentValues.filter((v: string) => v !== option.value);
                        onFilterChange(filter.id, newValues);
                      }}
                      className="rounded text-green-500 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {filter.type === 'range' && filter.min !== undefined && filter.max !== undefined && (
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{filter.min}€</span>
                  <span>{filter.max}€</span>
                </div>
                <input
                  type="range"
                  min={filter.min}
                  max={filter.max}
                  value={filters[filter.id] || filter.max}
                  onChange={(e) => onFilterChange(filter.id, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center">
                  <span className="text-sm font-medium text-green-600">
                    Jusqu'à {filters[filter.id] || filter.max}€
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value && value !== 'all'
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full max-w-md h-[80vh] md:h-auto md:max-h-[80vh] rounded-t-2xl md:rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-800">Filtres</h2>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Effacer tout
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="overflow-y-auto max-h-[calc(80vh-120px)] md:max-h-96">
          {wellnessFilters.map(renderFilter)}
        </div>

        {/* Apply Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
          >
            Appliquer les filtres
          </button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #16a34a;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #16a34a;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}