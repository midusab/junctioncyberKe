import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'sw';

interface Translations {
  [key: string]: {
    en: string;
    sw: string;
  };
}

export const translations: Translations = {
  nav_home: { en: 'Home', sw: 'Nyumbani' },
  nav_services: { en: 'Services', sw: 'Huduma' },
  nav_about: { en: 'About', sw: 'Kuhusu' },
  nav_team: { en: 'Team', sw: 'Timu' },
  nav_faq: { en: 'FAQ', sw: 'Maswali' },
  nav_gallery: { en: 'Gallery', sw: 'Picha' },
  nav_contact: { en: 'Contact', sw: 'Mawasiliano' },
  book_now: { en: 'Book Now', sw: 'Weka Nafasi' },
  hero_tag: { en: 'A Premier Multi-Business Experience', sw: 'Uzoefu Bora wa Biashara Mseto' },
  hero_title_1: { en: 'Elegance in', sw: 'Kifahari katika' },
  hero_title_2: { en: 'Every Detail.', sw: 'Kila Undani.' },
  hero_desc: { 
    en: 'The Junction Cyber offers a curated ecosystem of premium services. From visionary tech solutions to elite grooming and automotive care.', 
    sw: 'Junction Cyber inatoa mfumo ulioratibiwa wa huduma bora. Kutoka kwa suluhisho za kiteknolojia hadi huduma za unyoaji na matunzo ya gari.' 
  },
  explore_btn: { en: 'Explore Services', sw: 'Gundua Huduma' },
  pricing_btn: { en: 'View Pricing', sw: 'Angalia Bei' },
  request_quote: { en: 'Request a Quote', sw: 'Omba Makadirio' },
  make_inquiry: { en: 'Make an Inquiry', sw: 'Uliza Swali' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
