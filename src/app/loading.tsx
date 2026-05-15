'use client';

import RippleWaveLoader from '@/components/mvpblocks/ripple-loader';

export default function Loading() {
  return (
    <div className="fixed inset-0 min-h-dvh w-full flex items-center justify-center bg-background/80 backdrop-blur-sm z-[99]">
      <RippleWaveLoader />
    </div>
  );
}
