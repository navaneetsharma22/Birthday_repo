'use client';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/Toast';

const PARAGRAPHS = [
  { text: "Happy Birthday! 🎉", type: "emphasis" },
  { text: "I hope your special day is filled with smiles, laughter, and beautiful moments that make your heart happy.", type: "normal" },
  { text: "May today bring you happiness, wonderful surprises, and memories you'll always cherish. I hope you continue to grow, achieve your dreams, and find joy in every little moment life offers.", type: "normal" },
  { text: "May your birthday be surrounded by kindness, positivity, and the people who care about you. Keep shining, believing in yourself, and making the world a brighter place with your smile.", type: "normal" },
  { text: "Take time to enjoy this beautiful day, celebrate yourself, and create memories that will stay with you for years to come.", type: "normal" },
  { text: "Happy Birthday, Komal. ✨", type: "emphasis" },
  { text: "May this birthday bring you endless happiness, beautiful adventures, and countless reasons to smile. 🌸", type: "emphasis" },
  { text: "Wishing you a wonderful day and a year filled with success, peace, and beautiful moments.", type: "blessing" }
];

const totalLength = PARAGRAPHS.reduce((sum, p) => sum + p.text.length, 0);

export default function LetterPage() {
  const container = useRef(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
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
      i += 1;
      setTypedLength(i);
      if (i >= totalLength) {
        clearInterval(id);
        setIsTyped(true);
      }
    }, 20);
  }

  const renderParagraphs = () => {
    let currentSum = 0;
    return PARAGRAPHS.map((p, idx) => {
      const charsToShow = Math.max(0, Math.min(p.text.length, typedLength - currentSum));
      currentSum += p.text.length;
      
      if (charsToShow === 0) return null;
      
      const displayText = p.text.slice(0, charsToShow);
      
      let fontWeightClass = "font-light text-white/80";
      let isItalic = false;
      
      if (p.type === "emphasis") {
        fontWeightClass = "font-semibold text-white";
      } else if (p.type === "blessing") {
        isItalic = true;
      }
      
      // Spacing:
      // - 16px below "Happy Birthday! 🎉" (idx == 0)
      // - 20px between other paragraphs (idx > 0)
      const marginBottom = idx === 0 ? '16px' : '20px';
      
      return (
        <p
          key={idx}
          className={`${fontWeightClass} ${isItalic ? 'italic' : ''} text-left select-none`}
          style={{
            fontSize: '18px',
            lineHeight: '1.8',
            letterSpacing: '0.2px',
            marginBottom: marginBottom,
          }}
        >
          {displayText}
        </p>
      );
    });
  };

  return (
    <main
      ref={container}
      className="relative min-h-screen text-white overflow-x-hidden flex flex-col"
      style={{ 
        background: 'radial-gradient(circle at 50% 30%, #0d0d0d 0%, #020202 70%, #000000 100%)' 
      }}
    >
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
        style={{ gridTemplateColumns: '1fr 1.35fr', padding: '160px 9% 40px', gap: '80px' }}
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
          className="gsap-paper min-h-[730px] rounded-[34px] w-full max-w-[850px] mx-auto"
          style={{ 
            padding: '32px 40px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.02)',
          }}
        >
          <p 
            className="font-script text-[#d8b4a0] text-[40px] text-center"
            style={{ marginBottom: '24px' }}
          >
            Dear Komal,
          </p>
          <div className="mx-auto" style={{ width: '90%' }}>
            {renderParagraphs()}
          </div>
        </section>
      </div>

      <footer className="relative z-10 py-10 mt-auto text-center text-white/50 text-sm tracking-wide">
        Written with all the love words could hold ✦
      </footer>
    </main>
  );
}
