'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cross, Heart, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      <motion.div
        initial={{ scale: 1.1 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 15, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-[center_25%] sm:bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/pre/couple-3.jpeg)' }}
      />

      {/* Dark Premium Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.6)_60%,rgba(0,0,0,0.85)_100%)]" />



      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col items-center justify-center px-4 pb-16 pt-28 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-8 inline-flex items-center gap-4 rounded-full border border-secondary/40 bg-white/5 px-6 py-2.5 backdrop-blur-xl"
        >
          <div className="h-px w-8 bg-secondary/60" />
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-secondary">
            Wedding Ceremony
          </span>
          <div className="h-px w-8 bg-secondary/60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[1.1] bg-gradient-to-b from-[#fbd3e2] via-[#eb81a9] to-[#c45d87] bg-clip-text text-transparent drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        >
          KITHMI <span className="text-white italic opacity-80">&amp;</span> <br className="sm:hidden" />
          RESHAN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 max-w-2xl text-xs sm:text-sm leading-relaxed text-white/70 uppercase tracking-[0.2em] font-medium"
        >
          Sharing our beautiful journey with love and grace
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.45 }}
          className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] group hover:border-primary/30 transition-all duration-500"
        >
          <div className="flex flex-col items-center">
             <p className="text-[10px] uppercase tracking-[0.6em] text-primary font-bold mb-4 opacity-70 group-hover:opacity-100 transition-opacity">Save the Date</p>
             <h2 className="font-serif text-3xl text-white sm:text-5xl tracking-wide">
               SATURDAY <span className="text-primary mx-2">23</span> JANUARY 2027
             </h2>
             <div className="mt-6 flex items-center gap-6 text-white/40">
                <div className="h-px w-12 bg-white/20" />
                <Heart className="h-5 w-5 fill-white" />
                <div className="h-px w-12 bg-white/20" />
             </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-white">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
