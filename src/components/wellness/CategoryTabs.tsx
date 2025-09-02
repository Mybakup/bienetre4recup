import React from 'react';
import { wellnessCategories, type WellnessCategory } from '../../data/wellnessCategories';

interface CategoryTabsProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export default function CategoryTabs({ selectedCategory, onCategorySelect }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onCategorySelect(null)}
        className={`flex-shrink-0 px-4 py-2 rounded-full border-2 transition-colors ${
          selectedCategory === null
            ? 'border-green-500 bg-green-50 text-green-700'
            : 'border-gray-200 text-gray-600 hover:border-green-300'
        }`}
      >
        Tous
      </button>
      {wellnessCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-colors ${
            selectedCategory === category.id
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-gray-200 text-gray-600 hover:border-green-300'
          }`}
        >
          <span className="text-lg">{category.icon}</span>
          <span className="font-medium">{category.name}</span>
        </button>
      ))}
    </div>
  );
}