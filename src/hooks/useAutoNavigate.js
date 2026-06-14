'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAutoNavigate(nextRoute, delay = 5000) {
  const router = useRouter();

  useEffect(() => {
    let timeoutId;

    const navigate = () => {
      router.push(nextRoute);
    };

    // Start the timer
    timeoutId = setTimeout(navigate, delay);

    // If the user interacts with the page, cancel the auto-navigation
    const handleInteraction = () => {
      clearTimeout(timeoutId);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [nextRoute, delay, router]);
}
