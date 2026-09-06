'use client';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/Toast';
import FloatingHearts from '@/components/FloatingHearts';
import LetterFlowerRain from '@/components/LetterFlowerRain';
import { SHOW_MEMORIES } from '@/config/settings';

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
  const typingIntervalRef = useRef(null);

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
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  useGSAP(() => {
    gsap.fromTo('.gsap-envelope', 
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }
    );
    
    gsap.fromTo('.gsap-paper', 
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      }
    );
  }, { scope: container });

  function openEnvelope(e) {
    if (!open) {
      gsap.fromTo('.gsap-envelope', 
        { scale: 0.95 },
        { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' }
      );

      let startX = typeof window !== 'undefined' ? window.innerWidth * 0.3 : 300;
      let startY = typeof window !== 'undefined' ? window.innerHeight * 0.45 : 300;

      if (e && e.currentTarget) {
        const rect = e.currentTarget.getBoundingClientRect();
        startX = rect.left + rect.width / 2;
        startY = rect.top + rect.height * 0.4;
      }

      if (typeof window !== 'undefined' && typeof window.triggerEnvelopeHearts === 'function') {
        window.triggerEnvelopeHearts(startX, startY);
      }
    }
    setOpen(true);
    if (started) return;
    setStarted(true);

    let i = 0;
    typingIntervalRef.current = setInterval(() => {
      i += 1;
      setTypedLength(i);
      if (i >= totalLength) {
        clearInterval(typingIntervalRef.current);
        setIsTyped(true);
      }
    }, 20);
  }

  function skipTyping() {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    setTypedLength(totalLength);
    setIsTyped(true);
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
      <FloatingHearts count={30} />
      <Toast message="Hey Birthday Girl, Please Open the letter" isVisible={showToast} onClose={() => setShowToast(false)} />
      
      {/* Subtle warm glow behind the envelope */}
      <div 
        className="absolute left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(216, 180, 160, 0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="letter-grid relative z-10 grid items-center w-full flex-1">
        <style>{`
          .letter-grid {
            grid-template-columns: 1fr 1.35fr;
            padding: 150px 9% 40px;
            gap: 80px;
          }
          @media (max-width: 768px) {
            .letter-grid {
              grid-template-columns: 1fr;
              padding: 110px 6% 40px;
              gap: 36px;
            }
            .letter-grid .gsap-envelope {
              justify-self: center;
              max-width: 320px;
              width: 100%;
            }
            .letter-grid .gsap-paper {
              min-height: 480px !important;
              padding: 24px 20px !important;
            }
          }
          @media (max-width: 640px) {
            .letter-grid {
              padding: 95px 5% 30px;
              gap: 28px;
            }
            .letter-grid .gsap-envelope {
              max-width: 260px;
            }
            .letter-grid .gsap-paper {
              min-height: auto !important;
              padding: 20px 16px !important;
              border-radius: 24px !important;
            }
          }
        `}</style>

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
          className="gsap-paper relative overflow-hidden min-h-[720px] rounded-[34px] w-full max-w-[850px] mx-auto flex flex-col justify-between"
          style={{ 
            padding: '32px 40px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.02)',
          }}
        >
          {/* Flower Rain specifically over the letter */}
          <LetterFlowerRain isActive={open} />

          <div>
            <div className="flex items-center justify-between relative z-10 mb-6">
              <p className="font-script text-[#d8b4a0] text-[36px] sm:text-[42px] m-0">
                Dear Komal,
              </p>
              {open && !isTyped && (
                <button
                  onClick={skipTyping}
                  className="text-xs text-white/50 hover:text-white/90 border border-white/10 px-3 py-1 rounded-full transition-colors font-sans"
                >
                  Show all ✦
                </button>
              )}
            </div>

            <div className="relative z-10 mx-auto" style={{ width: '95%' }}>
              {renderParagraphs()}
            </div>
          </div>

          {/* User Agency Navigation Button */}
          {isTyped && (
            <div className="relative z-20 mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
              <p className="text-sm font-script text-[#d8b4a0] text-center sm:text-left">
                Every word straight from the heart.
              </p>
              <button
                onClick={() => router.push(SHOW_MEMORIES ? '/memories' : '/final')}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-medium text-sm sm:text-base tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(216, 180, 160, 0.35), rgba(62, 50, 50, 0.8))',
                  border: '1px solid rgba(216, 180, 160, 0.4)',
                  boxShadow: '0 10px 30px rgba(216, 180, 160, 0.25)',
                  color: '#fff',
                }}
              >
                <span>Continue to Celebration</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">✨</span>
              </button>
            </div>
          )}
        </section>
      </div>

      <footer className="relative z-10 py-10 mt-auto text-center text-white/50 text-sm tracking-wide">
        Written with all the love words could hold ✦
      </footer>
    </main>
  );
}
