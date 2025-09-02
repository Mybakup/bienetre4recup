import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  UserCircle, 
  Bell, 
  Users, 
  Dumbbell, 
  Sparkles, 
  ArrowRight,
  Heart,
  Zap,
  Waves,
  Flower2,
  X,
  Star,
  MapPin,
  Calendar,
  Clock,
  Globe,
  MessageSquare,
  Share2,
  Check,
  Award,
  Target,
  Zap as Lightning
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CoachProfile from '../components/wellness/CoachProfile';

interface Coach {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  location: string;
  availability: string;
  imageUrl: string;
  bannerUrl: string;
  languages: string[];
  description: string;
  certifications: string[];
  clientsCount: number;
  recommendations: number;
  pricing: {
    individual: number;
    pack5: number;
  };
  services: string[];
  locations: string[];
  testimonials: {
    name: string;
    avatar: string;
    rating: number;
    text: string;
    date: string;
  }[];
  isVerified: boolean;
  responseTime: string;
}

const coaches: Coach[] = [
  {
    id: '1',
    name: 'Emma Rodriguez',
    specialty: 'Coach Fitness & Nutrition',
    rating: 4.9,
    reviewCount: 127,
    location: 'Marseille, FR',
    availability: 'Disponible cette semaine',
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&q=80&w=300&h=300',
    bannerUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800&h=400',
    languages: ['Français', 'English', 'Español'],
    description: 'Coach sportive diplômée et nutritionniste, Emma propose des séances personnalisées adaptées aux voyageurs, familles et expatriés. Approche bienveillante, résultats durables, bien-être garanti.',
    certifications: ['Coach Sportif Certifié', 'Nutritionniste Diplômée', 'Yoga Alliance RYT-200'],
    clientsCount: 340,
    recommendations: 89,
    pricing: {
      individual: 40,
      pack5: 180
    },
    services: ['Fitness', 'Nutrition', 'Yoga', 'Pilates'],
    locations: ['En salle', 'En extérieur', 'À domicile', 'En visio'],
    testimonials: [
      {
        name: 'Sophie M.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
        rating: 5,
        text: 'Emma m\'a aidée à retrouver ma forme pendant mon séjour à Marseille. Ses conseils nutrition sont parfaits !',
        date: '2024-03-15'
      },
      {
        name: 'Thomas L.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
        rating: 5,
        text: 'Séances de yoga exceptionnelles avec vue sur la mer. Emma s\'adapte parfaitement aux débutants.',
        date: '2024-03-10'
      }
    ],
    isVerified: true,
    responseTime: '< 2h'
  },
  {
    id: '2',
    name: 'Marcus Thompson',
    specialty: 'Coach CrossFit & Préparation Physique',
    rating: 4.8,
    reviewCount: 93,
    location: 'Nice, FR',
    availability: 'Disponible demain',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=300&h=300',
    bannerUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800&h=400',
    languages: ['English', 'Français'],
    description: 'Ancien athlète professionnel reconverti en coach CrossFit. Marcus accompagne les voyageurs dans leur remise en forme avec des programmes intensifs et motivants.',
    certifications: ['CrossFit Level 2 Trainer', 'Préparateur Physique Certifié', 'First Aid Certified'],
    clientsCount: 280,
    recommendations: 67,
    pricing: {
      individual: 45,
      pack5: 200
    },
    services: ['CrossFit', 'Musculation', 'Cardio', 'Préparation physique'],
    locations: ['En salle', 'En extérieur', 'En visio'],
    testimonials: [
      {
        name: 'Julie K.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
        rating: 5,
        text: 'Marcus m\'a fait découvrir le CrossFit pendant mes vacances. Maintenant j\'en fais chez moi !',
        date: '2024-03-12'
      }
    ],
    isVerified: true,
    responseTime: '< 1h'
  },
  {
    id: '3',
    name: 'Amélie Dubois',
    specialty: 'Thérapeute Spa & Relaxation',
    rating: 4.9,
    reviewCount: 156,
    location: 'Cannes, FR',
    availability: 'Disponible aujourd\'hui',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    bannerUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800&h=400',
    languages: ['Français', 'English', 'Italiano'],
    description: 'Thérapeute certifiée en massages thérapeutiques et relaxation. Amélie offre une expérience de détente unique dans un cadre idyllique face à la Méditerranée.',
    certifications: ['Massothérapeute Certifiée', 'Aromathérapie', 'Réflexologie Plantaire'],
    clientsCount: 420,
    recommendations: 112,
    pricing: {
      individual: 60,
      pack5: 270
    },
    services: ['Massage thérapeutique', 'Aromathérapie', 'Réflexologie', 'Relaxation'],
    locations: ['En spa', 'À domicile', 'En extérieur'],
    testimonials: [
      {
        name: 'Marie P.',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100',
        rating: 5,
        text: 'Un moment de pure détente ! Amélie a des mains magiques et un accueil chaleureux.',
        date: '2024-03-18'
      }
    ],
    isVerified: true,
    responseTime: '< 30min'
  },
  {
    id: '4',
    name: 'Yuki Tanaka',
    specialty: 'Professeur de Yoga & Méditation',
    rating: 4.9,
    reviewCount: 89,
    location: 'Paris, FR',
    availability: 'Disponible cette semaine',
    imageUrl: 'https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?auto=format&fit=crop&q=80&w=300&h=300',
    bannerUrl: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&q=80&w=800&h=400',
    languages: ['Français', 'English', '日本語'],
    description: 'Maître de yoga traditionnel formé au Japon et en Inde. Yuki enseigne le Hatha et Vinyasa yoga avec une approche méditative profonde pour tous niveaux.',
    certifications: ['Yoga Alliance RYT-500', 'Méditation Mindfulness', 'Reiki Level 2'],
    clientsCount: 190,
    recommendations: 78,
    pricing: {
      individual: 35,
      pack5: 160
    },
    services: ['Hatha Yoga', 'Vinyasa', 'Méditation', 'Reiki'],
    locations: ['En studio', 'En extérieur', 'À domicile', 'En visio'],
    testimonials: [
      {
        name: 'Claire B.',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=100&h=100',
        rating: 5,
        text: 'Yuki m\'a initiée au yoga pendant mon voyage à Paris. Une expérience transformatrice !',
        date: '2024-03-14'
      }
    ],
    isVerified: true,
    responseTime: '< 1h'
  }
];

export default function Wellness() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-200/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />

      {/* Header */}
      <header className="relative z-10 bg-white/70 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/10 rounded-full transition-colors mr-2"
            >
              <ArrowLeft className="w-5 h-5 text-[#424e6f]" />
            </button>
            <img 
              src="https://i.imgur.com/jxMQcJi.png" 
              alt="MyBakup" 
              className="h-6"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors relative"
              >
                <Bell className="w-5 h-5 text-[#424e6f]" />
              </button>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            >
              <UserCircle className="w-5 h-5 text-[#424e6f]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <motion.main 
        className="relative z-10 max-w-6xl mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flower2 className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-green-700">
              Bien-être en voyage
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-2">
            Prenez soin de votre corps et de votre esprit
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Découvrez nos coachs certifiés pour enrichir votre expérience de voyage
          </p>
        </motion.div>

        {/* User Welcome Message */}
        {user && (
          <motion.div 
            className="text-center mb-8"
            variants={itemVariants}
          >
            <p className="text-lg text-green-700">
              Bonjour <span className="font-semibold">{user.firstName}</span> ! 🌿
            </p>
            <p className="text-gray-600 mt-1">
              Découvrez nos coachs bien-être près de vous
            </p>
          </motion.div>
        )}

        {/* Coaches Grid - 2 per row */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          variants={itemVariants}
        >
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.id}
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCoach(coach)}
              className="bg-white rounded-2xl overflow-hidden cursor-pointer border border-white/50 shadow-lg group"
            >
              {/* Banner Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={coach.bannerUrl}
                  alt={`${coach.name} coaching session`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Availability badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  {coach.availability}
                </div>
                
                {/* Profile photo */}
                <div className="absolute -bottom-8 left-6">
                  <div className="relative">
                    <img
                      src={coach.imageUrl}
                      alt={coach.name}
                      className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-lg"
                    />
                    {coach.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="pt-12 p-6 space-y-4">
                {/* Header info */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-green-700 group-hover:text-green-600 transition-colors">
                        {coach.name}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        {coach.specialty}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-700">{coach.rating}</span>
                      <span className="text-sm text-gray-500">({coach.reviewCount})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{coach.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Répond en {coach.responseTime}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {coach.description}
                </p>

                {/* Services tags */}
                <div className="flex flex-wrap gap-2">
                  {coach.services.slice(0, 3).map((service, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                  {coach.services.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      +{coach.services.length - 3}
                    </span>
                  )}
                </div>

                {/* Languages */}
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {coach.languages.join(', ')}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-600">{coach.clientsCount} clients</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-gray-600">{coach.recommendations} recommandations</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {coach.pricing.individual}€
                    </div>
                    <div className="text-xs text-gray-500">
                      / séance
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <motion.div 
                  className="flex items-center gap-2 text-green-600 font-medium pt-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span>Voir le profil complet</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/50"
          variants={itemVariants}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              Pourquoi choisir MyBakup Bien-être ?
            </h2>
            <p className="text-gray-600">
              Une approche holistique de votre bien-être en voyage
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="p-4 rounded-full bg-purple-100 w-fit mx-auto">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Professionnels certifiés</h3>
              <p className="text-sm text-gray-600">
                Tous nos coachs sont vérifiés et certifiés dans leur domaine
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="p-4 rounded-full bg-blue-100 w-fit mx-auto">
                <Lightning className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Réservation instantanée</h3>
              <p className="text-sm text-gray-600">
                Réservez vos séances en quelques clics, où que vous soyez
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="p-4 rounded-full bg-emerald-100 w-fit mx-auto">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Expérience sur-mesure</h3>
              <p className="text-sm text-gray-600">
                Des recommandations personnalisées selon vos préférences
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-8"
          variants={itemVariants}
        >
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux services santé</span>
          </button>
        </motion.div>
      </motion.main>

      {/* Coach Profile Modal */}
      {selectedCoach && (
        <CoachProfile 
          coach={selectedCoach} 
          onClose={() => setSelectedCoach(null)} 
        />
      )}
    </div>
  );
}