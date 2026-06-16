'use client';
import { useEffect, useState } from 'react';
import Toast from './Toast';

export default function GlobalLock() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      // Find closest anchor or button
      const element = e.target.closest('a') || e.target.closest('button');
      if (!element) return;

      // Only care about anchor tags that navigate away
      if (element.tagName === 'A') {
        const href = element.getAttribute('href');
        // If navigating to anything other than home
        if (href && href !== '/' && !href.startsWith('http')) {
          const PRIMARY_BIRTHDAY = new Date('2026-06-22T00:00:00').getTime();
          if (Date.now() < PRIMARY_BIRTHDAY) {
            e.preventDefault();
            e.stopPropagation();
            setShowToast(true);
          }
        }
      }
    };

    // Use capture phase to intercept before Next.js Link handles it
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return (
    <Toast 
      message="Patience... It's not your birthday yet! ⏳" 
      isVisible={showToast} 
      onClose={() => setShowToast(false)} 
      position="bottom-right"
    />
  );
}
