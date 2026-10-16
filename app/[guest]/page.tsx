'use client';

import { useParams } from 'next/navigation';
import Invitation from '@/components/Invitation';
import { decodeGuestSegment } from '@/lib/wedding';

export default function GuestInvitation() {
  const params = useParams<{ guest: string }>();
  return <Invitation personalizedName={decodeGuestSegment(params?.guest)} />;
}
