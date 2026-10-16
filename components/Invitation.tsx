'use client';

import { useState, useEffect } from 'react';
import { EnvelopeOpener } from '@/components/envelope-opener';
import HeroSection from '@/components/sections/HeroSection';
import PersonalizedWelcome from '@/components/sections/PersonalizedWelcome';
import ParentsSection from '@/components/sections/ParentsSection';

import CeremonyDetails from '@/components/sections/CeremonyDetails';
import CountdownSection from '@/components/sections/CountdownSection';

import VenueLocation from '@/components/sections/VenueLocation';
import RSVPSection from '@/components/sections/RSVPSection';
import BlessingsSection from '@/components/sections/BlessingsSection';
import FooterSection from '@/components/sections/FooterSection';
import SimpleImageSection from '@/components/sections/SimpleImageSection';
import MusicPlayer from '@/components/MusicPlayer';

export default function Invitation({ personalizedName }: { personalizedName: string }) {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('scroll-smooth');
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-background">
      {/* Persistent floating music player */}
      <MusicPlayer />

      {!isOpened ? (
        <EnvelopeOpener
          onEnvelopeOpen={() => setIsOpened(true)}
          guestName={personalizedName}
        />
      ) : (
        <>
          <HeroSection />
          <PersonalizedWelcome guestName={personalizedName} />
          <ParentsSection />

          <CeremonyDetails />
          <SimpleImageSection imageSrc="/pre/couple-2.jpeg" />
          <CountdownSection />
          <SimpleImageSection imageSrc="/pre/couple-4.jpeg" />

          <VenueLocation />
          <RSVPSection guestName={personalizedName} />
          <SimpleImageSection imageSrc="/pre/couple-5.jpeg" useFullImage />
          <BlessingsSection />
          <FooterSection />
        </>
      )}
    </div>
  );
}
