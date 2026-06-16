'use client';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ReasonCard from '@/components/ReasonCard';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  'Your smile feels like sunshine.',
  'You make people feel safe.',
  'Your laugh is unforgettable.',
  'You turn simple days into stories.',
  'You care deeply.',
  'Your vibe is soft and magical.',
  'You are beautifully genuine.',
  'You make memories feel golden.',
  'Your heart is rare.',
  'You are my favorite person to annoy.',
  'You glow without trying.',
  'You make everything better.',
  'You listen like home.',
  'You are effortlessly classy.',
  'You deserve the prettiest life.',
  'You are a whole comfort place.',
  'Your presence feels peaceful.',
  'You are pure main character energy.',
  'You make friendship feel precious.',
  'You are loved more than words.',
  'You bring calm into chaos.',
  'You make every photo feel special.',
  'You have the cutest little habits.',
  'You make boring days memorable.',
  'You are gentle but strong.',
  'Your friendship feels like a blessing.',
  'You understand things without words.',
  'You make silence feel comfortable.',
  'You are a walking soft glow.',
  'You make people believe in kindness.',
  'You are so easy to love.',
  'You make celebrations feel brighter.',
  'You carry warmth wherever you go.',
  'You make tiny moments feel cinematic.',
  'You have a beautiful soul.',
  'You make me laugh at random times.',
  'You are honest in the sweetest way.',
  'You are my comfort notification.',
  'You make the world less heavy.',
  'You deserve flowers every day.',
  'You make love feel simple.',
  'You are soft, rare, and precious.',
  'You make every plan more exciting.',
  'You are naturally elegant.',
  'You care even when nobody notices.',
  'You are full of pretty energy.',
  'You make friendship feel magical.',
  'You are the reason behind many smiles.',
  'You make ordinary chats memorable.',
  'You are a safe place.',
  'You look beautiful being yourself.',
  'You make every goodbye feel hard.',
  'You are thoughtful in little ways.',
  'You make life feel warmer.',
  'You are my favorite kind of person.',
  'You make memories worth saving.',
  'You are sunshine with a little drama.',
  'You make birthdays feel meaningful.',
  'You are a beautiful chapter.',
  'You make every corner feel like home.',
  'You are cute without even trying.',
  'You have the prettiest heart.',
  'You make people feel noticed.',
  'You bring sparkle into simple things.',
  'You are love in human form.',
  'You make every story better.',
  'You are someone I am grateful for.',
  'You make emotions feel safe.',
  'You have a rare kind of grace.',
  'You make the day softer.',
  'You are a forever kind of friend.',
  'You make everyone around you happier.',
  'You are pure golden-hour energy.',
  'You make small surprises feel huge.',
  'You are beautifully dramatic sometimes.',
  'You make life feel like a cute vlog.',
  'You are my favorite memory keeper.',
  'You make even chaos look pretty.',
  'You are special in every season.',
  'You make me proud to know you.',
  'You carry love in your details.',
  'You make every laugh feel louder.',
  'You are a little universe of warmth.',
  'You make everything feel less lonely.',
  'You are rare, real, and radiant.',
  'You make wishes feel possible.',
  'You are the prettiest comfort zone.',
  'You make every message feel sweet.',
  'You turn moments into keepsakes.',
  'You are always worth celebrating.',
  'You make kindness look beautiful.',
  'You are a blessing in soft colors.',
  'You make every page of life prettier.',
  'You are deeply loved.',
  'You make my heart smile.',
  'You deserve all the magic.',
  'You make today feel golden.',
  'You are unforgettable.',
  'You are my favorite birthday girl.',
  'You are more loved than 100 reasons can say.',
];

export default function ReasonsPage() {
  const container = useRef(null);
  const [random, setRandom] = useState('You make ordinary things magical.');

  useGSAP(() => {
    // Header entrance
    gsap.from('.gsap-header > *', {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power2.out',
    });

    // Batch ScrollTrigger for the 100 cards
    ScrollTrigger.batch('.gsap-card', {
      interval: 0.1, // time window (in seconds) for batching
      batchMax: 4,   // maximum batch size
      onEnter: batch => gsap.to(batch, {
        opacity: 1, 
        y: 0, 
        stagger: 0.08, 
        duration: 0.8,
        ease: 'power2.out'
      }),
    });
    
    // Set initial state for cards
    gsap.set('.gsap-card', { y: 50, opacity: 0 });

  }, { scope: container });

  function showRandom() {
    setRandom(reasons[Math.floor(Math.random() * reasons.length)]);
    // Add a tiny bounce to the result div
    gsap.fromTo('.gsap-random-result', 
      { scale: 0.95 }, 
      { scale: 1, duration: 0.4, ease: 'back.out(2)' }
    );
  }

  return (
    <main
      ref={container}
      className="relative min-h-screen text-white overflow-x-hidden"
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

      <header className="reasons-header gsap-header relative z-10 text-center">
        <style>{`
          .reasons-header {
            padding: 150px 8% 20px;
          }
          @media (max-width: 768px) {
            .reasons-header {
              padding: 110px 6% 16px;
            }
          }
          @media (max-width: 640px) {
            .reasons-header {
              padding: 100px 5% 12px;
            }
          }
        `}</style>
        <p className="font-script text-[#d8b4a0] text-3xl">one hundred tiny Reasons Why</p>
        <h1
          className="font-serif font-semibold leading-[0.86] tracking-[-3px] mt-2 text-white/95"
          style={{ fontSize: 'clamp(52px, 9vw, 128px)' }}
        >
          I Love You
        </h1>
        <p className="mt-4 mb-6 text-base text-white/70">Tap and smile</p>
        <button
          id="randomReasonBtn"
          onClick={showRandom}
          className="inline-flex items-center justify-center relative z-[8] text-base sm:text-lg font-semibold cursor-pointer rounded-full transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_15px_40px_rgba(255,255,255,0.15)]"
          style={{ 
            padding: '16px 36px',
            color: 'rgba(255,255,255,0.9)',
            background: 'rgba(20,20,20,0.45)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          <span className="relative z-10 tracking-wide">Click to know the Reasons</span>
        </button>
        <div 
          className="gsap-random-result max-w-[560px] mx-auto mt-6 p-5 rounded-[28px] text-base min-h-[56px] flex items-center justify-center text-white/90"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {random}
        </div>
      </header>

      {/* 100 Flip Cards */}
      <section
        className="reasons-grid grid gap-6 sm:gap-8"
      >
        <style>{`
          .reasons-grid {
            padding: 20px 8% 90px;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
          @media (max-width: 768px) {
            .reasons-grid {
              padding: 20px 5% 60px;
              grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            }
          }
          @media (max-width: 480px) {
            .reasons-grid {
              padding: 16px 4% 50px;
              grid-template-columns: 1fr;
            }
          }
        `}</style>
        {reasons.map((reason, i) => (
          <div key={i} className="gsap-card">
            <ReasonCard
              number={i + 1}
              reason={reason}
              image={`/assets/${(i % 100) + 1}.jpg`}
            />
          </div>
        ))}
      </section>

      <footer className="py-9 text-center text-white/70">
        100 reasons and still not enough ✦
      </footer>
    </main>
  );
}
