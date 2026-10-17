'use client';

import { useEffect, useRef, useState } from 'react';

export default function LoopVideo({ id, label, hero = false }: { id: string; label: string; hero?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (preference.matches) video.current?.pause();
      else void video.current?.play().catch(() => {});
    };
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  const content = <>
    <video ref={video} className="loop-video" muted loop playsInline preload={hero ? 'auto' : 'metadata'} poster={`/media/${id}-poster.jpg`} width="1280" height="720" aria-label={label} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
      <source src={`/media/${id}.mp4`} type="video/mp4" />
    </video>
    <button className="loop-toggle" type="button" onClick={() => {
      if (video.current?.paused) void video.current.play().catch(() => {});
      else video.current?.pause();
    }} aria-label={`${playing ? 'Pause' : 'Play'} ${label.toLowerCase()}`}>{playing ? 'Pause video' : 'Play video'}</button>
  </>;
  return hero ? content : <div className="loop-media">{content}</div>;
}
