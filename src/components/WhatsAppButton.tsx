import { motion } from 'motion/react';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center justify-center">
      {/* Pulse Rings */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-16 w-16 rounded-full bg-[#25D366]/20 blur-xl"
      />
      
      <motion.a
        href="https://wa.me/254717322769"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileHover={{ 
          scale: 1.1, 
          rotate: 8,
          boxShadow: "0 20px 40px -10px rgba(37, 211, 102, 0.4)"
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-2xl backdrop-blur-xl transition-all"
        id="whatsapp-float"
        aria-label="Contact us on WhatsApp"
      >
        {/* Specular Highlight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
        
        {/* Inner Glow */}
        <div className="absolute inset-[2px] rounded-full border border-white/20 pointer-events-none" />

        <svg viewBox="0 0 24 24" fill="currentColor" className="relative z-10 h-8 w-8 drop-shadow-md">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.67-1.613-.916-2.207-.242-.579-.487-.5-.67-.509-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.199-.57-.347m-5.421 7.403h-.004a5.494 5.494 0 0 1-2.801-.768l-.2-.119-2.072.544 1.986-1.933-.131-.212a5.53 5.53 0 0 1-.848-2.906c0-3.036 2.471-5.505 5.505-5.505s5.505 2.469 5.505 5.505-2.469 5.505-5.505 5.505m10.158-16.711C20.153 2.505 16.315-.002 11.996 0 5.438 0 .048 5.391.048 11.95a6.6 6.6 0 0 0 1.006 3.515L0 23.36l8.804-2.311a6.6 6.6 0 0 0 3.192.812h.005c6.559 0 11.949-5.391 11.949-11.949 0-3.195-1.243-6.202-3.504-8.461Z" />
        </svg>

        {/* Hover Label */}
        <div className="absolute right-full mr-4 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
          <div className="whitespace-nowrap px-4 py-2 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/40 text-[13px] font-bold text-[#1D1D1F] shadow-xl">
            Chat with us
          </div>
        </div>
      </motion.a>
    </div>
  );
}
