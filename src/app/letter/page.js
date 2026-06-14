'use client';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/Toast';
import FloatingParticles from '@/components/FloatingParticles';
import AudioPlayer from '@/components/AudioPlayer';

const LETTER = `Happy Birthday! 🎉

I hope this special day brings you endless happiness, beautiful moments, and countless reasons to smile.

May this new year of your life be filled with good health, confidence, success, and wonderful opportunities. I hope you keep chasing your dreams and creating memories that make your heart truly happy.

Thank you for being a kind and wonderful person. May life always surround you with positivity, supportive people, and moments that remind you how special every new day can be.

I hope this birthday becomes the beginning of another beautiful chapter filled with laughter, growth, adventures, and everything you've been wishing for.

Take time to enjoy today, celebrate yourself, and make memories that last forever.

Happy Birthday, Komal. ✨

May this year bring you closer to everything that makes your heart happy. 🌸

Take care and have an amazing year ahead.`;

export default function LetterPage() {
  const container = useRef(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const [started, setStarted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isTyped, setIsTyped] = useState(false);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setShowToast(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowToast(false);
    }
  }, [open]);

  useEffect(() => {
    if (isTyped) {
      // Auto redirect to memories 5 seconds after typing is complete
      const timer = setTimeout(() => {
        router.push('/memories');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isTyped, router]);

  useGSAP(() => {
    gsap.from('.gsap-envelope', {
      y: 30,
      opacity: 0,
      duration: 1.4,
      ease: 'power3.out'
    });
    
    gsap.from('.gsap-paper', {
      y: 40,
      opacity: 0,
      duration: 1.4,
      delay: 0.3,
      ease: 'power3.out'
    });
  }, { scope: container });

  function openEnvelope() {
    if (!open) {
      // Smoother opening animation and gentle bounce
      gsap.fromTo('.gsap-envelope', 
        { scale: 0.97 },
        { scale: 1, duration: 1.2, ease: 'elastic.out(1.2, 0.4)' }
      );
    }
    setOpen(true);
    if (started) return;
    setStarted(true);

    let i = 0;
    const id = setInterval(() => {
      setTyped((prev) => prev + (LETTER[i] || ''));
      i += 1;
      if (i > LETTER.length) {
        clearInterval(id);
        setIsTyped(true);
      }
    }, 35);
  }

  return (
    <main
      ref={container}
      className="relative min-h-screen text-white overflow-x-hidden flex flex-col"
      style={{ 
        background: 'radial-gradient(circle at 50% 30%, #0d0d0d 0%, #020202 70%, #000000 100%)' 
      }}
    >
      <FloatingParticles />
      <AudioPlayer />
      <Toast message="Hey Birthday Girl, Please Open the letter" isVisible={showToast} onClose={() => setShowToast(false)} />
      {/* Subtle warm glow behind the envelope */}
      <div 
        className="absolute left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(216, 180, 160, 0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div
        className="relative z-10 grid items-center w-full flex-1"
        style={{ gridTemplateColumns: '1fr 1.1fr', padding: '160px 9% 40px', gap: '80px' }}
      >
        {/* Envelope */}
        <section
          className={`gsap-envelope envelope${open ? ' open' : ''} transition-all duration-700 hover:drop-shadow-[0_0_25px_rgba(216,180,160,0.3)] cursor-pointer`}
          onClick={openEnvelope}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openEnvelope()}
          aria-label="Click to open the letter"
        >
          <div className="flap" />
          <div className="env-body shadow-[0_30px_70px_rgba(0,0,0,0.3)]">
            <p className="text-cocoa font-medium">{open ? '💌' : 'Click to open'}</p>
          </div>
        </section>

        {/* Letter Paper */}
        <section
          className="gsap-paper min-h-[600px] p-[50px] md:p-[60px] rounded-[34px] w-full max-w-[700px] mx-auto transition-all duration-700"
          style={{ 
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.03)',
          }}
        >
          <p className="font-script text-[#d8b4a0] text-[44px] mb-8 text-center drop-shadow-sm">Dear Komal,</p>
          <p className="font-sans text-[16.5px] leading-[2.2] whitespace-pre-wrap text-white/85 tracking-[0.015em] text-justify drop-shadow-sm">{typed}</p>
        </section>
      </div>

      <footer className="relative z-10 py-10 mt-auto text-center text-white/40 text-sm tracking-[0.1em] uppercase">
        Written with warm wishes for your special day. ✨
      </footer>
    </main>
  );
}
