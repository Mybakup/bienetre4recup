import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Languages, Volume2, Copy, Check } from 'lucide-react';

const medicalPhrases = [
  {
    category: 'Urgences',
    phrases: [
      { fr: "J'ai besoin d'un médecin", en: "I need a doctor", es: "Necesito un médico" },
      { fr: "C'est une urgence", en: "This is an emergency", es: "Es una emergencia" },
      { fr: "Appelez une ambulance", en: "Call an ambulance", es: "Llame una ambulancia" },
      { fr: "J'ai mal ici", en: "I have pain here", es: "Me duele aquí" }
    ]
  },
  {
    category: 'Symptômes',
    phrases: [
      { fr: "J'ai de la fièvre", en: "I have a fever", es: "Tengo fiebre" },
      { fr: "J'ai mal à la tête", en: "I have a headache", es: "Me duele la cabeza" },
      { fr: "J'ai des nausées", en: "I feel nauseous", es: "Tengo náuseas" },
      { fr: "Je suis allergique à...", en: "I'm allergic to...", es: "Soy alérgico a..." }
    ]
  },
  {
    category: 'Consultation',
    phrases: [
      { fr: "Où est l'hôpital le plus proche?", en: "Where is the nearest hospital?", es: "¿Dónde está el hospital más cercano?" },
      { fr: "Combien coûte la consultation?", en: "How much does the consultation cost?", es: "¿Cuánto cuesta la consulta?" },
      { fr: "Acceptez-vous l'assurance?", en: "Do you accept insurance?", es: "¿Aceptan seguro?" },
      { fr: "Pouvez-vous répéter s'il vous plaît?", en: "Can you repeat please?", es: "¿Puede repetir por favor?" }
    ]
  }
];

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

export default function MedicalTranslator() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPhrase(text);
      setTimeout(() => setCopiedPhrase(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSpeak = (text: string, language: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
              Traduction médicale
            </h1>
          </div>
          <div className="p-2 rounded-xl bg-[#EDF5FF]">
            <Languages className="w-6 h-6 text-mybakup-blue" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Language Selector */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-mybakup-blue mb-4">
            Langue de traduction
          </h2>
          <div className="flex gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-colors ${
                  selectedLanguage === lang.code
                    ? 'border-mybakup-coral bg-mybakup-coral/5 text-mybakup-coral'
                    : 'border-gray-200 hover:border-mybakup-coral'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Phrases by Category */}
        {medicalPhrases.map((category) => (
          <div key={category.category} className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-mybakup-blue mb-4">
              {category.category}
            </h3>
            <div className="space-y-3">
              {category.phrases.map((phrase, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-mybakup-blue">
                      {phrase.fr}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSpeak(phrase.fr, 'fr')}
                        className="p-2 hover:bg-white rounded-full transition-colors"
                      >
                        <Volume2 className="w-4 h-4 text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleCopy(phrase.fr)}
                        className="p-2 hover:bg-white rounded-full transition-colors"
                      >
                        {copiedPhrase === phrase.fr ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">
                      {selectedLanguage === 'en' ? phrase.en : phrase.es}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSpeak(
                          selectedLanguage === 'en' ? phrase.en : phrase.es, 
                          selectedLanguage
                        )}
                        className="p-2 hover:bg-white rounded-full transition-colors"
                      >
                        <Volume2 className="w-4 h-4 text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleCopy(selectedLanguage === 'en' ? phrase.en : phrase.es)}
                        className="p-2 hover:bg-white rounded-full transition-colors"
                      >
                        {copiedPhrase === (selectedLanguage === 'en' ? phrase.en : phrase.es) ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Help Section */}
        <div className="bg-[#EDF5FF] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-mybakup-blue mb-4">
            Comment utiliser le traducteur
          </h3>
          <div className="space-y-3 text-gray-600">
            <p>1. Sélectionnez la langue de traduction souhaitée</p>
            <p>2. Trouvez la phrase qui correspond à votre situation</p>
            <p>3. Utilisez le bouton audio pour entendre la prononciation</p>
            <p>4. Copiez la phrase pour la montrer au médecin</p>
          </div>
        </div>
      </main>
    </div>
  );
}