'use client';
import { useState } from 'react';

export default function MusicBtn() {
  const [playing, setPlaying] = useState(false);

  return (
    <button
      id="musicBtn"
      onClick={() => setPlaying((p) => !p)}
      aria-label="Toggle music"
      style={{
        position: 'fixed',
        right: '28px',
        bottom: '28px',
        zIndex: 60,
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#3e3232',
        color: '#fff',
        fontSize: '22px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 18px 42px rgba(62,50,50,0.28)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {playing ? '♫' : '♪'}
    </button>
  );
}
