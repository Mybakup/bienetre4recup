import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  UserCircle, 
  Bell, 
  Stethoscope, 
  Flower2, 
  ArrowRight,
  Globe,
  Shield,
  MessageSquare,
  Clock,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Notification {
  id: string;
  type: 'appointment' | 'insurance' | 'message' | 'system' | 'reminder';
  title: string;
  message: string;
  date: Date;
  read: boolean;
  link?: string;
}

export default function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'appointment',
      title: 'Rappel de rendez-vous',
      message: 'Votre rendez-vous avec Dr. Sarah Chen est demain à 14:30',
      date: new Date(),
      read: false,
      link: '/appointments/1'
    },
    {
      id: '2',
      type: 'insurance',
      title: 'Assurance voyage',
      message: 'Votre assurance voyage expire dans 5 jours',
      date: new Date(Date.now() - 86400000),
      read: true,
      link: '/insurance'
    }
  ]);

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? {...notif, read: true} : notif
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'appointment':
        return <Stethoscope className="w-5 h-5 text-blue-500" />;
      case 'insurance':
        return <Globe className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-mybakup-coral" />;
    }
  };

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
    hidden: { scale: 0.8, opacity: 0 },
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
      scale: 1.05,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDF5FF] via-white to-[#FFE8E8] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-mybakup-coral/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mybakup-blue/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-200/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />

      {/* Header */}
      <header className="relative z-10 bg-white/70 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
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
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-mybakup-coral text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-medium text-mybakup-blue">Notifications</h3>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-mybakup-coral/5' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <h4 className={`font-medium ${!notification.read ? 'text-mybakup-blue' : 'text-gray-700'}`}>
                                  {notification.title}
                                </h4>
                                <button 
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-gray-400 hover:text-red-500 p-1"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {notification.message}
                              </p>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-500">
                                  {notification.date.toLocaleDateString()}
                                </span>
                                {notification.link && (
                                  <button 
                                    onClick={() => {
                                      markAsRead(notification.id);
                                      navigate(notification.link!);
                                      setShowNotifications(false);
                                    }}
                                    className="text-xs text-mybakup-coral hover:underline"
                                  >
                                    Voir
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        Aucune notification
                      </div>
                    )}
                  </div>
                  
                  <div className="p-2 border-t border-gray-100 text-center">
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-gray-500 hover:text-mybakup-coral"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              )}
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
        className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.div 
          className="text-center mb-12 max-w-2xl"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-mybakup-blue">
              Bienvenue sur MyBakup
            </h1>
            <span className="text-3xl">🌍</span>
          </div>
          <p className="text-lg text-gray-600 mb-2">
            Choisissez votre besoin principal
          </p>
          <p className="text-sm text-gray-500">
            Votre compagnon de voyage pour la santé et le bien-être
          </p>
        </motion.div>

        {/* Choice Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-12"
          variants={itemVariants}
        >
          {/* Santé Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/home')}
            className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 cursor-pointer border border-white/50 shadow-lg overflow-hidden group"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-red-50/50 opacity-60" />
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-mybakup-coral/10 rounded-full transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-mybakup-blue/10 rounded-full transform -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10 text-center space-y-6">
              <motion.div 
                className="flex justify-center"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-6 rounded-full bg-gradient-to-br from-mybakup-blue/20 to-mybakup-coral/20 border border-white/30">
                  <Stethoscope className="w-12 h-12 text-mybakup-coral" />
                </div>
              </motion.div>
              
              <div>
                <h2 className="text-2xl font-bold text-mybakup-blue mb-2">
                  Santé en voyage
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Médecins, assurance et conseils santé
                </p>
              </div>
              
              <div className="space-y-2 text-sm text-gray-500">
                <p>• Médecins francophones</p>
                <p>• Assurance voyage</p>
                <p>• Conseils santé & vaccins</p>
                <p>• Urgences médicales</p>
              </div>
              
              <motion.div 
                className="flex items-center justify-center gap-2 text-mybakup-coral font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span>Accéder aux services santé</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </div>
          </motion.div>

          {/* Bien-être Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/wellness')}
            className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 cursor-pointer border border-white/50 shadow-lg overflow-hidden group"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-60" />
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/20 rounded-full transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-200/20 rounded-full transform -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10 text-center space-y-6">
              <motion.div 
                className="flex justify-center"
                whileHover={{ rotate: -10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-6 rounded-full bg-gradient-to-br from-green-200/30 to-emerald-200/30 border border-white/30">
                  <Flower2 className="w-12 h-12 text-green-600" />
                </div>
              </motion.div>
              
              <div>
                <h2 className="text-2xl font-bold text-green-700 mb-2">
                  Bien-être en voyage
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Coachs, spas, activités sportives
                </p>
              </div>
              
              <div className="space-y-2 text-sm text-gray-500">
                <p>• Coachs & activités</p>
                <p>• Salles de sport</p>
                <p>• Spas & massages</p>
                <p>• Yoga & méditation</p>
              </div>
              
              <motion.div 
                className="flex items-center justify-center gap-2 text-green-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span>Accéder au bien-être</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* User Welcome Message */}
        {user && (
          <motion.div 
            className="text-center mb-8"
            variants={itemVariants}
          >
            <p className="text-lg text-mybakup-blue">
              Bonjour <span className="font-semibold">{user.firstName}</span> ! 👋
            </p>
            <p className="text-gray-600 mt-1">
              Comment pouvons-nous vous accompagner aujourd'hui ?
            </p>
          </motion.div>
        )}

        {/* Footer Note */}
        <motion.div 
          className="text-center max-w-lg"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-500 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
            💡 Vous pourrez toujours basculer entre Santé et Bien-être dans l'app
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="mt-12 grid grid-cols-3 gap-6 max-w-md"
          variants={itemVariants}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-mybakup-blue">42+</div>
            <div className="text-xs text-gray-500">Pays couverts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-mybakup-blue">24/7</div>
            <div className="text-xs text-gray-500">Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-mybakup-blue">15+</div>
            <div className="text-xs text-gray-500">Langues</div>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
}