'use client';
import { useState, useRef, useEffect } from 'react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Try to load the audio file. If the user hasn't added it yet, it will just quietly fail to play later.
    audioRef.current = new Audio('/assets/background-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Audio play failed (maybe missing file):', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button 
        onClick={togglePlay}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 border backdrop-blur-xl ${
          isPlaying 
            ? 'bg-white/10 border-white/30 shadow-[0_0_20px_rgba(216,180,160,0.2)] animate-pulse' 
            : 'bg-black/40 border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
        }`}
        aria-label="Toggle background music"
      >
        <span className={`text-xl transition-all duration-300 ${isPlaying ? 'opacity-80' : 'opacity-50'}`}>
          {isPlaying ? '⏸' : '🎵'}
        </span>
      </button>
    </div>
  );
}
