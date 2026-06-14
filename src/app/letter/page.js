'use client';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/Toast';

const LETTER = `You are one of those rare people who make the world feel gentler just by being in it. Your presence brings a kind of warmth, peace, and beauty that words can never fully explain.

On your birthday, I just want you to know how deeply you are loved, not just today, but every single day. You deserve happiness that feels real, dreams that slowly turn into reality, and moments so beautiful that your heart wants to keep them forever.

I hope this year gives you soft mornings, peaceful nights, unexpected smiles, and every little thing your soul has been waiting for.

Happy Birthday Babuuuuuuuuuuu! You are special in ways you may never fully realize, and you deserve magic, love, and endless happiness in every chapter of your life. I Love You 🫶`;

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
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
    
    gsap.from('.gsap-paper', {
      x: 50,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out'
    });
  }, { scope: container });

  function openEnvelope() {
    if (!open) {
      // Small bounce on open
      gsap.fromTo('.gsap-envelope', 
        { scale: 0.95 },
        { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' }
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
      <Toast message="Hey bithday GIrl Please Open the letter" isVisible={showToast} onClose={() => setShowToast(false)} />
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
          className={`gsap-envelope envelope${open ? ' open' : ''}`}
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
          className="gsap-paper min-h-[600px] p-[50px] rounded-[34px] w-full max-w-[700px] mx-auto"
          style={{ 
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.02)',
          }}
        >
          <p className="font-script text-[#d8b4a0] text-[40px] mb-8 text-center">Dear Komal,</p>
          <p className="text-[17px] leading-[2] whitespace-pre-wrap text-white/80 font-light tracking-wide text-justify">{typed}</p>
        </section>
      </div>

      <footer className="relative z-10 py-10 mt-auto text-center text-white/50 text-sm tracking-wide">
        Written with all the love words could hold ✦
      </footer>
    </main>
  );
}
