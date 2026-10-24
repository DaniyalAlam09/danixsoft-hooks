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

  // play() returns a promise that rejects when autoplay is blocked or the
  // source fails; reflect that instead of leaving an unhandled rejection.
  const startPlayback = (element: HTMLAudioElement) => {
    setPlaying(true);
    const result = element.play();
    if (result && typeof result.catch === 'function') {
      result.catch(() => setPlaying(false));
    }
  };

  const toggle = () => {
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      startPlayback(audio);
    }
  };

  const play = () => {
    if (!audio) return;
    startPlayback(audio);
  };

  const pause = () => {
    if (!audio) return;
    audio.pause();
    setPlaying(false);
  };

  return { playing, toggle, play, pause, volume, setVolume, audio };
}
