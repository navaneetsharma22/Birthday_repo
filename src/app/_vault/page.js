'use client';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const LETTERS = [
  {
    id: 1,
    title: "Open when you miss me",
    locked: false,
    message: "Hey baby,\n\nIf you're reading this, it means you're missing me. But I want you to know I'm always with you, right in your heart. Close your eyes, take a deep breath, and imagine me giving you the biggest, warmest hug right now. I'll see you soon, I promise. ❤️"
  },
  {
    id: 2,
    title: "Open when you feel stressed",
    locked: false,
    message: "My beautiful girl,\n\nWhatever is stressing you out right now, I know you can handle it. You are so much stronger and smarter than you give yourself credit for. Take a break, drink some water, and remember that I am so incredibly proud of you. You've got this! ✨"
  },
  {
    id: 3,
    title: "Open on our next anniversary",
    locked: true,
    message: "Nice try! You'll have to wait until our anniversary to read this one! 😉"
  }
];

function VaultEnvelope({ letter, onClick }) {
  return (
    <div 
      className="flex flex-col items-center gsap-env-item cursor-pointer group"
      onClick={() => onClick(letter)}
    >
      <div className="relative w-full sm:w-[220px] h-[130px] sm:h-[160px] transition-transform duration-500 group-hover:-translate-y-2">
        <div className="absolute bottom-0 w-full h-[100px] sm:h-[120px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-10 flex items-center justify-center border border-white/10" style={{ background: 'linear-gradient(135deg, rgba(20,20,20,0.8), rgba(10,10,10,0.9))', backdropFilter: 'blur(12px)' }}>
          {letter.locked ? (
            <svg width="28" height="34" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          ) : (
            <svg width="34" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(216,180,160,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          )}
        </div>
        <div className="absolute top-0 left-[8%] w-[84%] h-[75px] sm:h-[100px] origin-top transition-transform duration-500 group-hover:rotate-x-[180deg]" style={{ background: 'rgba(40,40,40,0.9)', clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />
      </div>
      <p className="mt-6 font-script text-[22px] text-white/80 text-center px-4 transition-colors duration-300 group-hover:text-white">
        {letter.title}
      </p>
    </div>
  );
}

export default function VaultPage() {
  const container = useRef(null);
  const [activeLetter, setActiveLetter] = useState(null);

  useGSAP(() => {
    gsap.fromTo('.gsap-header > *', 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: 'power2.out',
      }
    );

    gsap.fromTo('.gsap-env-item', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.2)',
        delay: 0.4
      }
    );
  }, { scope: container });

  function openLetter(letter) {
    if (letter.locked) {
      // Shake animation for locked letter
      gsap.fromTo('.gsap-env-item', 
        { x: -5 },
        { x: 5, duration: 0.05, yoyo: true, repeat: 5, ease: 'sine.inOut', clearProps: 'x' }
      );
      return;
    }
    setActiveLetter(letter);
  }

  return (
    <main
      ref={container}
      className="relative min-h-screen text-white overflow-hidden"
      style={{ 
        background: 'radial-gradient(circle at 50% 40%, #1a1a1a 0%, #050505 80%, #000000 100%)' 
      }}
    >
      {/* Subtle warm glow behind the title */}
      <div 
        className="absolute left-1/2 top-[200px] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(216, 180, 160, 0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <header className="vault-header gsap-header relative z-10 text-center">
        <style>{`
          .vault-header {
            padding: 150px 8% 20px;
          }
          @media (max-width: 768px) {
            .vault-header {
              padding: 110px 6% 16px;
            }
          }
          @media (max-width: 640px) {
            .vault-header {
              padding: 100px 5% 12px;
            }
          }
        `}</style>
        <p className="font-script text-[#d8b4a0] text-3xl">words for the future</p>
        <h1
          className="font-serif font-semibold leading-[0.86] tracking-[-3px] mt-2 text-white/95"
          style={{ fontSize: 'clamp(52px, 9vw, 128px)' }}
        >
          The Vault
        </h1>
        <p className="mt-4 mb-10 text-base text-white/70 max-w-[500px] mx-auto leading-relaxed">
          Some feelings are meant for right now, and some are waiting for the perfect moment. Open these when the time is right.
        </p>
      </header>

      <section className="relative z-10 flex flex-wrap justify-center gap-8 sm:gap-12 px-4 sm:px-8 pb-32 max-w-[1000px] mx-auto">
        {LETTERS.map(letter => (
          <VaultEnvelope key={letter.id} letter={letter} onClick={openLetter} />
        ))}
      </section>

      {/* Modal Overlay */}
      {activeLetter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div 
            className="relative w-[90%] sm:w-full max-w-[600px] p-8 sm:p-10 md:p-14 rounded-[24px] sm:rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/10"
            style={{ background: 'rgba(20,20,20,0.85)', backdropFilter: 'blur(24px)' }}
          >
            <button 
              onClick={() => setActiveLetter(null)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              ✕
            </button>
            <p className="font-script text-[#d8b4a0] text-3xl mb-6">{activeLetter.title}</p>
            <p className="text-lg leading-[1.9] whitespace-pre-wrap text-white/90">
              {activeLetter.message}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
