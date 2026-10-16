'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles } from 'lucide-react';

interface PersonalizedWelcomeProps {
  guestName: string;
}

export default function PersonalizedWelcome({ guestName }: PersonalizedWelcomeProps) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  if (!guestName) return null;

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="h-px w-8 bg-primary/30" />
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="h-px w-8 bg-primary/30" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-[#b4527a] text-xs uppercase tracking-[0.4em] mb-4 font-semibold">
            Special Welcome For
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-[#8f3d60] mb-6 italic drop-shadow-sm">
            {guestName}
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mb-8" />
          <p className="max-w-xl mx-auto mb-4 font-serif text-lg md:text-2xl italic text-[#5f5146] leading-relaxed">
            We cordially invite <span className="not-italic font-semibold text-[#b4527a]">{guestName}</span> to celebrate our special day with us.
          </p>
          <p className="max-w-xl mx-auto text-[#5f5146] text-sm md:text-base leading-relaxed font-light tracking-wide">
            We are truly honored to have you with us as we celebrate the beginning of our new life together. Your presence makes our special day even more meaningful.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
