'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Toast({ 
  message, 
  isVisible, 
  onClose,
  position = 'top-right',
  rounded = false,
  size = 'large',
  duration = 4000
}) {
  const toastRef = useRef(null);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
  };

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(toastRef.current, 
        { y: -50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }
      );

      startTimer();
      return () => clearTimer();
    } else if (toastRef.current && toastRef.current.style.opacity !== "0" && toastRef.current.style.opacity !== "") {
      gsap.to(toastRef.current, {
        y: -50, opacity: 0, scale: 0.9, duration: 0.4, ease: 'power2.in'
      });
    }
  }, [isVisible, onClose, duration]);

  const positionClass = position === 'top-right' 
    ? 'fixed top-[120px] right-8 z-[100]'
    : 'fixed top-[30px] left-1/2 -translate-x-1/2 z-[100]';

  const containerClass = `bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex items-center gap-5 ${
    rounded ? 'rounded-full' : 'rounded-xl'
  } ${
    size === 'large' ? 'px-16 py-8 min-h-[100px] min-w-[500px] justify-center' : 'px-7 py-4'
  }`;

  const textClass = `font-serif tracking-wide text-white/95 ${
    size === 'large' ? 'text-[24px]' : 'text-[18px]'
  }`;

  const iconClass = `animate-pulse ${
    size === 'large' ? 'text-3xl' : 'text-xl'
  }`;

  return (
    <div
      ref={toastRef}
      className={positionClass}
      style={{ opacity: 0, transform: 'translateY(-100px)' }}
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
    >
      <div className={containerClass}>
        <span className={iconClass}>✨</span>
        <p className={textClass}>{message}</p>
      </div>
    </div>
  );
}
