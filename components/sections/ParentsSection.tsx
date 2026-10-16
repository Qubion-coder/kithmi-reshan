'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Users, MapPin } from 'lucide-react';

function ParentsSectionContent() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const searchParams = useSearchParams();
  const guestName = searchParams.get('u');
  const tableNumber = searchParams.get('t');

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-secondary/10 to-transparent hidden md:block" />
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Corner Decor */}
      <div className="absolute top-0 right-0 w-40 h-40 md:w-72 md:h-72 pointer-events-none z-0 opacity-95">
        <img src="/images/44.png" alt="" className="w-full h-full object-contain object-top-right" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-[400px] md:w-64 md:h-[600px] pointer-events-none z-0 opacity-95">
        <img src="/images/f.png" alt="" className="w-full h-full object-contain object-bottom-left" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">


        {/* Personalized Invitation Card */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20 text-center"
          >
            <div className="relative inline-block w-full max-w-3xl overflow-hidden rounded-[3rem] border border-primary/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(255,248,249,0.98))] p-8 md:p-14 shadow-[0_30px_70px_rgba(235,129,169,0.15)] backdrop-blur-xl">
              {/* Internal Card Decor */}
              <div className="absolute top-[-10%] right-[-10%] h-[150px] w-[150px] rounded-full bg-primary/5 blur-[40px]" />
              <div className="absolute bottom-[-10%] left-[-10%] h-[150px] w-[150px] rounded-full bg-secondary/5 blur-[40px]" />

              <div className="relative z-10">
                <p className="text-secondary font-bold uppercase tracking-[0.32em] text-[10px] md:text-xs mb-6">You are cordially invited</p>
                <h3 className="font-serif text-3xl md:text-6xl text-primary mb-6 leading-tight font-light tracking-wide">{guestName}</h3>
                <p className="text-foreground/60 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium mb-10">
                  We would be honored to have your presence on our special day. Your love, prayers, and support have been an essential part of our journey, and we look forward to celebrating this beginning with you.
                </p>

                {tableNumber && (
                  <div className="relative mt-8 pt-8 text-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                    <div className="flex items-center justify-center gap-2 text-secondary mb-2">
                      <MapPin size={16} className="animate-bounce" />
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em]">Reserved Seating</span>
                    </div>
                    <p className="font-serif text-2xl md:text-4xl text-foreground font-light">
                      TABLE NUMBER <span className="text-primary font-bold ml-1">{tableNumber}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/3"
          >
            <div className="relative aspect-[4/5] md:h-[450px] md:aspect-auto rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl">
              <img src="/pre/couple-1.jpeg" alt="Couple" className="w-full h-full object-cover object-[center_30%]" />
            </div>
          </motion.div>
          <div className="flex-1 text-center lg:text-left px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <p className="font-serif text-lg md:text-2xl text-foreground uppercase tracking-wider leading-relaxed">MR. WARNAKULASURIYA ALEX KEERTHI FERNANDO <br /> &amp; MRS. JAYASURIYA KURANAGE SUCHINI KEMA NIRODHANI PERERA</p>
                <p className="text-secondary font-bold uppercase tracking-[0.2em]">Together with</p>
                <p className="font-serif text-lg md:text-2xl text-foreground uppercase tracking-wider leading-relaxed">MR. SUMITH RAJA SILVA <br /> &amp; MRS. DHARSHANI KUMARI PEIRIS</p>
              </div>

              <div className="py-6">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-secondary/30 to-transparent mx-auto lg:mx-0" />
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">TO CELEBRATE THE MARRIAGE OF THEIR CHILDREN</p>
                <h3 className="font-serif text-3xl md:text-6xl text-primary font-bold uppercase tracking-widest leading-tight">KITHMI &amp; RESHAN</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ParentsSection() {
  return (
    <Suspense fallback={<div className="h-40" />}>
      <ParentsSectionContent />
    </Suspense>
  );
}
