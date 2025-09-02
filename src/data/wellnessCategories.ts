export interface WellnessCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface WellnessFilter {
  id: string;
  name: string;
  type: 'checkbox' | 'select' | 'range';
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
}

export const wellnessCategories: WellnessCategory[] = [
  {
    id: 'fitness',
    name: 'Fitness & Sport',
    description: 'Coachs sportifs, musculation, cardio',
    icon: '💪',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    id: 'nutrition',
    name: 'Nutrition',
    description: 'Nutritionnistes, diététiciens',
    icon: '🥗',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: 'spa',
    name: 'Spa & Massage',
    description: 'Massothérapeutes, soins relaxants',
    icon: '🧘‍♀️',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    id: 'yoga',
    name: 'Yoga & Méditation',
    description: 'Professeurs de yoga, méditation',
    icon: '🕉️',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'mental',
    name: 'Bien-être mental',
    description: 'Psychologues, thérapeutes',
    icon: '🧠',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    id: 'beauty',
    name: 'Beauté & Soins',
    description: 'Esthéticiennes, soins du visage',
    icon: '✨',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  }
];

export const wellnessFilters: WellnessFilter[] = [
  {
    id: 'availability',
    name: 'Disponibilité',
    type: 'select',
    options: [
      { value: 'all', label: 'Toutes' },
      { value: 'today', label: 'Aujourd\'hui' },
      { value: 'tomorrow', label: 'Demain' },
      { value: 'this-week', label: 'Cette semaine' },
      { value: 'next-week', label: 'Semaine prochaine' }
    ]
  },
  {
    id: 'price',
    name: 'Prix par séance',
    type: 'range',
    min: 20,
    max: 100
  },
  {
    id: 'location',
    name: 'Lieu',
    type: 'checkbox',
    options: [
      { value: 'studio', label: 'En studio' },
      { value: 'home', label: 'À domicile' },
      { value: 'outdoor', label: 'En extérieur' },
      { value: 'online', label: 'En visio' }
    ]
  },
  {
    id: 'language',
    name: 'Langue',
    type: 'select',
    options: [
      { value: 'all', label: 'Toutes les langues' },
      { value: 'fr', label: 'Français' },
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Español' },
      { value: 'de', label: 'Deutsch' },
      { value: 'it', label: 'Italiano' }
    ]
  },
  {
    id: 'rating',
    name: 'Note minimale',
    type: 'select',
    options: [
      { value: 'all', label: 'Toutes les notes' },
      { value: '3', label: '3+ étoiles' },
      { value: '4', label: '4+ étoiles' },
      { value: '4.5', label: '4.5+ étoiles' }
    ]
  },
  {
    id: 'experience',
    name: 'Expérience',
    type: 'select',
    options: [
      { value: 'all', label: 'Toute expérience' },
      { value: 'beginner', label: 'Débutant accepté' },
      { value: 'intermediate', label: 'Niveau intermédiaire' },
      { value: 'advanced', label: 'Niveau avancé' }
    ]
  }
];