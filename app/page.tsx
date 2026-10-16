'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Invitation from '@/components/Invitation';

function HomeContent() {
  const searchParams = useSearchParams();

  // Legacy links: /?to=Name&t=Title
  const guestName = searchParams.get('to');
  const guestTitle = searchParams.get('t');
  const personalizedName = guestName ? `${guestTitle ? guestTitle + ' ' : ''}${guestName}` : '';

  return <Invitation personalizedName={personalizedName} />;
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-primary font-serif italic text-xl">Loading Invitation...</div>}>
      <HomeContent />
    </Suspense>
  );
}
