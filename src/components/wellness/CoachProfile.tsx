import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Star, 
  MapPin, 
  Clock, 
  Globe, 
  MessageSquare, 
  Share2, 
  Check, 
  Award, 
  Users, 
  Heart, 
  Calendar,
  ArrowLeft,
  Phone,
  Video,
  Home,
  Building2,
  Target,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

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

interface CoachProfileProps {
  coach: Coach;
  onClose: () => void;
}

export default function CoachProfile({ coach, onClose }: CoachProfileProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${coach.name} - ${coach.specialty}`,
          text: coach.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === coach.testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? coach.testimonials.length - 1 : prev - 1
    );
  };

  const getLocationIcon = (location: string) => {
    switch (location.toLowerCase()) {
      case 'en salle':
        return <Building2 className="w-4 h-4" />;
      case 'à domicile':
        return <Home className="w-4 h-4" />;
      case 'en visio':
        return <Video className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header with banner */}
      <div className="relative h-64">
        <img
          src={coach.bannerUrl}
          alt={`${coach.name} coaching session`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Header controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleShare}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors"
          >
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        {/* Profile info overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end gap-4">
            <div className="relative">
              <img
                src={coach.imageUrl}
                alt={coach.name}
                className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg"
              />
              {coach.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold">{coach.name}</h1>
                {coach.isVerified && (
                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                    Coach Certifié ✅
                  </span>
                )}
              </div>
              <p className="text-white/90 font-medium">{coach.specialty}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{coach.rating}/5 ({coach.reviewCount} avis)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{coach.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowBookingModal(true)}
            className="flex-1 py-3 bg-mybakup-coral text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            <span>Réserver une séance</span>
          </button>
          <button className="px-6 py-3 border border-green-500 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-colors flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            <span>Contacter</span>
          </button>
          <button className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Heart className="w-5 h-5" />
            <span>Suivre</span>
          </button>
        </div>

        {/* About section */}
        <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold text-green-700 mb-4">À propos</h2>
          <p className="text-gray-600 leading-relaxed">
            {coach.description}
          </p>
        </section>

        {/* Practical info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Languages */}
          <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-700">Langues parlées</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {coach.languages.map((lang, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </section>

          {/* Locations */}
          <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-700">Lieux possibles</h3>
            </div>
            <div className="space-y-2">
              {coach.locations.map((location, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {getLocationIcon(location)}
                  <span className="text-gray-600">{location}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Pricing */}
        <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-700">Tarifs</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">Séance individuelle</h4>
                  <p className="text-sm text-gray-600">1 heure</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600">{coach.pricing.individual}€</span>
                </div>
              </div>
            </div>
            <div className="p-4 border border-green-200 rounded-xl bg-green-50 relative">
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                  Économie 10€
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">Pack 5 séances</h4>
                  <p className="text-sm text-gray-600">5 x 1 heure</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600">{coach.pricing.pack5}€</span>
                  <p className="text-xs text-gray-500 line-through">{coach.pricing.individual * 5}€</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            💡 Prix affiché = prix payé (frais MyBakup inclus)
          </p>
        </section>

        {/* Performance / Social proof */}
        <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-green-700 mb-6">Performances</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{coach.clientsCount}</div>
              <div className="text-sm text-gray-600">Clients accompagnés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{coach.recommendations}</div>
              <div className="text-sm text-gray-600">Recommandations MyBakup</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{coach.rating}</div>
              <div className="text-sm text-gray-600">Note moyenne</div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-700">Certifications</h3>
          </div>
          <div className="space-y-2">
            {coach.certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-gray-600">{cert}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-700">Avis & Témoignages</h3>
          </div>
          
          {coach.testimonials.length > 0 && (
            <div className="relative">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={coach.testimonials[currentTestimonial].avatar}
                    alt={coach.testimonials[currentTestimonial].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-800">
                        {coach.testimonials[currentTestimonial].name}
                      </h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < coach.testimonials[currentTestimonial].rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      "{coach.testimonials[currentTestimonial].text}"
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(coach.testimonials[currentTestimonial].date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </div>

              {coach.testimonials.length > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="flex gap-2">
                    {coach.testimonials.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === currentTestimonial ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Services */}
        <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-green-700 mb-4">Services proposés</h3>
          <div className="grid grid-cols-2 gap-3">
            {coach.services.map((service, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Target className="w-4 h-4 text-green-600" />
                <span className="text-gray-700 font-medium">{service}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4">
          <div className="max-w-4xl mx-auto flex gap-3">
            <button
              onClick={() => setShowBookingModal(true)}
              className="flex-1 py-3 bg-mybakup-coral text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Réserver maintenant</span>
            </button>
            <button className="px-6 py-3 border border-green-500 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-green-700">
                  Réserver avec {coach.name}
                </h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-700">Séance individuelle</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">1 heure</span>
                    <span className="text-xl font-bold text-green-600">{coach.pricing.individual}€</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Créneaux disponibles</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['Aujourd\'hui 16h', 'Demain 9h', 'Demain 14h', 'Jeudi 10h'].map((slot, idx) => (
                      <button
                        key={idx}
                        className="p-3 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center"
                      >
                        <span className="text-sm font-medium text-gray-700">{slot}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full py-3 bg-mybakup-coral text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors">
                  Confirmer la réservation
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}