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

  const containerClass = `bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center gap-2.5 sm:gap-3.5 max-w-[90vw] sm:max-w-md ${
    rounded ? 'rounded-full' : 'rounded-xl'
  } ${
    size === 'large' 
      ? 'px-4 sm:px-6 py-2.5 sm:py-3.5 min-h-[46px] sm:min-h-[52px] justify-center' 
      : 'px-3.5 sm:px-4 py-2 sm:py-2.5 min-h-[38px] sm:min-h-[42px]'
  }`;

  const textClass = `font-serif tracking-wide text-white/95 leading-snug ${
    size === 'large' ? 'text-[14px] sm:text-[16px]' : 'text-[13px] sm:text-[14px]'
  }`;

  const iconClass = `animate-pulse shrink-0 ${
    size === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
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
