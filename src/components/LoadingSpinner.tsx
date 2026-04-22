import { motion } from 'motion/react';
import { RefreshCw } from 'lucide-react';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

export default function LoadingSpinner({ fullScreen = false }: LoadingSpinnerProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="h-16 w-16 rounded-full border-4 border-brand-blue/10 border-t-brand-blue shadow-[0_0_15px_rgba(0,122,255,0.2)]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <RefreshCw size={24} className="text-brand-blue opacity-40 animate-pulse" />
        </div>
      </div>
      
      <div className="space-y-1 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue/60 animate-pulse">Loading Application</p>
        <div className="flex gap-1 justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2, repeatType: "reverse" }}
              className="h-1 w-1 rounded-full bg-brand-blue"
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#FBFBFD] flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-blue/30 blur-[120px] rounded-full" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-brand-blue/20 blur-[120px] rounded-full" />
        </div>
        {content}
      </div>
    );
  }

  return content;
}
