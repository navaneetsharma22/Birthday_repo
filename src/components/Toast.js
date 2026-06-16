'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Toast({ 
  message, 
  isVisible, 
  onClose,
  position = 'bottom-right',
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
    const isBottom = position.includes('bottom');
    const startY = isBottom ? 50 : -50;

    if (isVisible) {
      gsap.fromTo(toastRef.current, 
        { y: startY, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }
      );

      startTimer();
      return () => clearTimer();
    } else if (toastRef.current && toastRef.current.style.opacity !== "0" && toastRef.current.style.opacity !== "") {
      gsap.to(toastRef.current, {
        y: startY, opacity: 0, scale: 0.9, duration: 0.4, ease: 'power2.in'
      });
    }
  }, [isVisible, onClose, duration, position]);

  const positionClass = position === 'bottom-right' 
    ? 'fixed bottom-[30px] right-4 left-4 sm:left-auto sm:right-8 z-[100]'
    : position === 'top-right'
    ? 'fixed top-[120px] right-4 left-4 sm:left-auto sm:right-8 z-[100]'
    : 'fixed top-[30px] left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-[100]';

  const containerClass = `bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex items-center gap-3 sm:gap-5 ${
    rounded ? 'rounded-full' : 'rounded-xl'
  } ${
    size === 'large' ? 'px-6 sm:px-16 py-5 sm:py-8 min-h-[70px] sm:min-h-[100px] justify-center' : 'px-5 sm:px-7 py-3 sm:py-4'
  }`;

  const textClass = `font-serif tracking-wide text-white/95 ${
    size === 'large' ? 'text-[16px] sm:text-[24px]' : 'text-[14px] sm:text-[18px]'
  }`;

  const iconClass = `animate-pulse ${
    size === 'large' ? 'text-xl sm:text-3xl' : 'text-lg sm:text-xl'
  }`;

  return (
    <div
      ref={toastRef}
      className={positionClass}
      style={{ opacity: 0 }}
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
