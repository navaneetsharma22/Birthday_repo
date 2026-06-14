'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Toast({ message, isVisible, onClose }) {
  const toastRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(toastRef.current, 
        { y: -100, opacity: 0, scale: 0.9 },
        { y: 30, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }
      );

      // Auto close the toast after 4 seconds
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, 4000);

      return () => clearTimeout(timer);
    } else if (toastRef.current && toastRef.current.style.opacity !== "0" && toastRef.current.style.opacity !== "") {
      gsap.to(toastRef.current, {
        y: -100, opacity: 0, scale: 0.9, duration: 0.4, ease: 'power2.in'
      });
    }
  }, [isVisible, onClose]);

  return (
    <div
      ref={toastRef}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
      style={{ opacity: 0, transform: 'translateY(-100px)' }}
    >
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.6)] px-7 py-4 rounded-full flex items-center gap-4">
        <span className="text-xl animate-pulse">✨</span>
        <p className="font-serif text-[18px] text-white/95 tracking-wide">{message}</p>
      </div>
    </div>
  );
}
