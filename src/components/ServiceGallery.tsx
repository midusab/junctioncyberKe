import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../context/LanguageContext';

import { supabase } from '../lib/supabase';

const galleryData = [
  {
    service: 'Cyber Services',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    service: 'Precision Barber',
    images: [
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1621605815841-2cd666c23177?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512690196252-7abc35a62e0b?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    service: 'Elite Carwash',
    images: [
      'https://images.unsplash.com/photo-1552933061-90320eecd1f1?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1605499270744-8d4866ca557c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    service: 'Premium Laundry',
    images: [
      'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1521656693064-15d15d0b23a1?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1545173168-9f1947eebb9f?auto=format&fit=crop&q=80&w=1200'
    ]
  }
];

export default function ServiceGallery() {
  const [activeIndices, setActiveIndices] = useState(galleryData.map(() => 0));
  const [data, setData] = useState(galleryData);
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data: supabaseData, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (supabaseData && supabaseData.length > 0) {
          // Process supabase data into categories if structured that way
          // For now, we'll merge or replace if the user has provided content
          const categorized = galleryData.map(cat => {
             const updates = supabaseData.filter(item => item.category === cat.service);
             if (updates.length > 0) {
               return { ...cat, images: [...updates.map(u => u.image_url), ...cat.images] };
             }
             return cat;
          });
          setData(categorized);
        }
      } catch (err) {
        console.error('Gallery Fetch Error:', err);
      }
    }
    fetchGallery();
  }, []);

  const handleNext = (categoryIndex: number) => {
    setActiveIndices(prev => {
      const newState = [...prev];
      newState[categoryIndex] = (newState[categoryIndex] + 1) % data[categoryIndex].images.length;
      return newState;
    });
  };

  const handlePrev = (categoryIndex: number) => {
    setActiveIndices(prev => {
      const newState = [...prev];
      newState[categoryIndex] = (newState[categoryIndex] - 1 + data[categoryIndex].images.length) % data[categoryIndex].images.length;
      return newState;
    });
  };

  return (
    <section id="gallery" className="py-24 px-4 bg-black/[0.01]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-blue font-bold tracking-widest uppercase text-xs mb-4 block">Visual Portfolios</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">Inside The <span className="text-black/40">Junction Experience</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {data.map((item, categoryIndex) => (
            <div key={item.service} className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl md:text-2xl font-bold text-[#1D1D1F] flex items-center gap-2">
                  <Camera size={20} className="text-brand-blue" />
                  {item.service}
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handlePrev(categoryIndex)}
                    className="h-9 w-9 md:h-10 md:w-10 glass-card rounded-full flex items-center justify-center hover:bg-black/5"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    onClick={() => handleNext(categoryIndex)}
                    className="h-9 w-9 md:h-10 md:w-10 glass-card rounded-full flex items-center justify-center hover:bg-black/5"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="relative h-[300px] md:h-[400px] rounded-[32px] md:rounded-[40px] overflow-hidden glass-card shadow-xl group border-white/60">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndices[categoryIndex]}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={item.images[activeIndices[categoryIndex]]} 
                      alt={`${item.service} image ${activeIndices[categoryIndex] + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10 px-4 py-2 rounded-full glass-card border-white/40">
                  {item.images.map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        activeIndices[categoryIndex] === i ? "w-6 bg-brand-blue" : "w-1.5 bg-white/40"
                      )}
                    />
                  ))}
                </div>

                {/* Floating Badge */}
                <div className="absolute top-6 left-6 z-10">
                   <div className="glass-card px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/80 bg-black/20 backdrop-blur-md">
                      0{activeIndices[categoryIndex] + 1} / 0{item.images.length}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
