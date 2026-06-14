'use client';
import { useEffect } from 'react';

export default function CursorGlow() {
  useEffect(() => {
    const glow = document.getElementById('cursorGlow');
    const move = (e) => {
      if (!glow) return;
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };
    document.addEventListener('mousemove', move);
    return () => document.removeEventListener('mousemove', move);
  }, []);

  return null;
}
