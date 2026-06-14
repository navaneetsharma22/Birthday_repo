'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

const SECRET_CODE = ['b', 'u', 'l', 'b', 'u', 'l'];

export default function EasterEgg() {
  const router = useRouter();
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    function handleKeyDown(e) {
      // Ignore if typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, key].slice(-SECRET_CODE.length);
        
        // Check if the sequence matches
        if (newKeys.join('') === SECRET_CODE.join('')) {
          triggerExplosion();
          return [];
        }
        
        return newKeys;
      });
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  function triggerExplosion() {
    // Create 50 hearts
    for (let i = 0; i < 50; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.style.position = 'fixed';
      heart.style.left = '50%';
      heart.style.top = '50%';
      heart.style.fontSize = `${Math.random() * 40 + 20}px`;
      heart.style.zIndex = '9999';
      heart.style.pointerEvents = 'none';
      heart.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(heart);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 500 + 200;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      gsap.to(heart, {
        x: tx,
        y: ty,
        rotation: Math.random() * 360 - 180,
        opacity: 0,
        duration: Math.random() * 1 + 1.5,
        ease: 'power3.out',
        onComplete: () => heart.remove()
      });
    }

    // Flash screen white
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.inset = '0';
    flash.style.backgroundColor = 'white';
    flash.style.zIndex = '9998';
    document.body.appendChild(flash);

    gsap.fromTo(flash, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.2, yoyo: true, repeat: 1, onComplete: () => {
        flash.remove();
        router.push('/secret');
      }}
    );
  }

  return null;
}
