'use client';
import { useState, useRef, useEffect } from 'react';

export default function MusicBtn() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Only create Audio object on client side
    audioRef.current = new Audio('/assets/memories/song03.mp3.mpeg');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    setPlaying(!playing);
  };

  return (
    <>
      <style>{`
        .global-music-btn {
          position: fixed;
          right: 28px;
          bottom: 28px;
          z-index: 90;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #3e3232;
          color: #fff;
          font-size: 22px;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          box-shadow: 0 18px 42px rgba(62,50,50,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s, background 0.3s;
        }
        .global-music-btn:hover {
          transform: translateY(-4px);
          background: #4a3c3c;
        }
        @media (max-width: 640px) {
          .global-music-btn {
            right: 20px;
            bottom: 20px;
            width: 48px;
            height: 48px;
            font-size: 18px;
          }
        }
      `}</style>
      <button
        id="musicBtn"
        className="global-music-btn"
        onClick={toggleMusic}
        aria-label="Toggle music"
      >
        {playing ? '⏸' : '♪'}
      </button>
    </>
  );
}
