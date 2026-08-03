import { useState, useEffect } from 'react';

export function useAudio(src: string) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const newAudio = new Audio(src);
    setAudio(newAudio);

    const handleEnded = () => setPlaying(false);
    newAudio.addEventListener('ended', handleEnded);
    
    return () => {
      newAudio.removeEventListener('ended', handleEnded);
      newAudio.pause();
    };
  }, [src]);

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [volume, audio]);

  const toggle = () => {
    if (!audio) return;
    playing ? audio.pause() : audio.play();
    setPlaying(!playing);
  };

  const play = () => {
    if (!audio) return;
    audio.play();
    setPlaying(true);
  };

  const pause = () => {
    if (!audio) return;
    audio.pause();
    setPlaying(false);
  };

  return { playing, toggle, play, pause, volume, setVolume, audio };
}
