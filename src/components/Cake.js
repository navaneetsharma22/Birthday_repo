'use client';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

export default function Cake({ onCutComplete, flavor = 'vanilla' }) {
  const container = useRef(null);
  const cakeWrapper = useRef(null);
  const [stage, setStage] = useState('idle'); // idle | blow | knife-in | sliced
  const [stageText, setStageText] = useState('🥳');
  const [btnText, setBtnText] = useState('Start Cake Cutting 🎂');
  const [disabled, setDisabled] = useState(false);

  const flavorStyles = {
    vanilla: {
      bottom: 'linear-gradient(135deg, #e8cfc1, #c8937a)',
      middle: 'linear-gradient(135deg, #f8edeb, #e7b7aa)',
      top: 'linear-gradient(135deg, #fff5f2, #f1c8bb)',
      slice: 'linear-gradient(135deg, #fff5f2 0 30%, #f8edeb 30% 63%, #e8cfc1 63% 100%)'
    },
    chocolate: {
      bottom: 'linear-gradient(135deg, #4a3024, #2a1b14)',
      middle: 'linear-gradient(135deg, #5c3c2d, #3c261c)',
      top: 'linear-gradient(135deg, #6e4835, #4e3024)',
      slice: 'linear-gradient(135deg, #6e4835 0 30%, #5c3c2d 30% 63%, #4a3024 63% 100%)'
    },
    redVelvet: {
      bottom: 'linear-gradient(135deg, #611824, #3d0d15)',
      middle: 'linear-gradient(135deg, #7c1f2e, #55131e)',
      top: 'linear-gradient(135deg, #962839, #6a1a26)',
      slice: 'linear-gradient(135deg, #962839 0 30%, #7c1f2e 30% 63%, #611824 63% 100%)'
    }
  };
  const activeStyle = flavorStyles[flavor] || flavorStyles.vanilla;

  const cakeClass = `cake`;

  useGSAP(() => {
    // Gentle floating animation for the cake
    gsap.to(cakeWrapper.current, {
      y: -10,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    // Premium breathing glow for the button
    gsap.to('.cut-cake-btn', {
      boxShadow: '0 12px 40px rgba(255,255,255,0.14)',
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });
  }, { scope: container });

  async function handleCut() {
    if (disabled) return;
    setDisabled(true);

    const tl = gsap.timeline();

    // Disable CSS transitions so GSAP can take full control
    tl.set('.knife, .cake-slice, .flame, .smoke, .cut-line, .candles, .cake-top, .cake-middle, .cake-bottom', { transition: 'none' });

    // 1. Blow Candles
    setStageText('blowing the candles... 🌬️');
    setBtnText('Blowing Candles...');
    setStage('blow');

    tl.to('.flame', { 
      opacity: 0, 
      y: 12, 
      scale: 0.1, 
      rotation: 18, 
      boxShadow: 'none', 
      animation: 'none',
      duration: 0.5, 
      stagger: 0.1, 
      ease: 'power2.out' 
    });
    
    tl.fromTo('.smoke', 
      { opacity: 0, y: 0, x: '-50%', scale: 0.35 }, 
      { opacity: 0.8, y: -30, scale: 1.5, duration: 0.8, stagger: 0.15, ease: 'power1.out' }, 
      "<0.2"
    );
    tl.to('.smoke', { opacity: 0, y: -60, scale: 2.3, duration: 0.8, stagger: 0.1, ease: 'power1.in' }, "-=0.2");

    // 2. Knife appears
    tl.call(() => {
      setStageText(' cake is cutting 🔪');
      setBtnText('');
      setStage('knife-in');
    });

    tl.set('.knife', { opacity: 1 });
    tl.fromTo('.knife', 
      { x: 80, y: -20, rotation: -34 },
      { x: -205, y: 128, rotation: -21, duration: 1.2, ease: 'power3.out' }
    );

    // 3. Cut line traces down
    tl.set('.cut-line', { opacity: 1 });
    tl.fromTo('.cut-line', 
      { scaleY: 0 }, 
      { scaleY: 1, duration: 0.75, ease: 'power2.inOut' }, 
      "-=0.4"
    );

    // 4. Sliced and removed
    tl.call(() => {
      setStageText(' into a slice... 🍰');
      setBtnText('Cutting Slice...');
      setStage('sliced');
    });

    // Knife leaves
    tl.to('.knife', { x: -245, y: 170, rotation: -12, opacity: 0, duration: 0.8, ease: 'power2.in' });

    // Clip the main cake (simulate piece missing)
    tl.to(['.cake-top', '.cake-middle', '.cake-bottom'], {
      clipPath: 'polygon(0% 0%, 62% 0%, 52% 100%, 0% 100%)',
      duration: 1,
      ease: 'power3.inOut'
    }, "-=0.6");

    // Slice pulls out
    tl.set('.cake-slice', { opacity: 1 });
    tl.to('.cake-slice', { 
      x: 78, y: 34, rotation: 12, scale: 1, 
      duration: 1.2, ease: 'back.out(1.2)' 
    }, "-=0.8");
    
    // Shift candles slightly to match the missing slice
    tl.to('.candles', { 
      x: '-83%', y: -4, rotation: -5, 
      duration: 1, ease: 'power3.inOut' 
    }, "-=1.2");

    // 5. Completion
    tl.call(async () => {
      setStageText('first slice for my Babuuu 🎉');
      setBtnText('Cake Cut 🎉');

      // Joyful bounce
      gsap.fromTo(cakeWrapper.current, 
        { scale: 0.92 },
        { scale: 1.05, duration: 0.9, ease: 'elastic.out(1.2, 0.4)' }
      );

      const confetti = (await import('canvas-confetti')).default;
      confetti({ particleCount: 350, spread: 130, origin: { y: 0.6 } });

      if (onCutComplete) {
        onCutComplete();
      }
    });
  }

  return (
    <div ref={container} className="cake-section relative flex flex-col items-center justify-center min-h-[62vh] overflow-visible">
      <div className="cake-glow" />

      <div
        className="relative z-[8] my-5 mb-7 max-w-[620px] border border-white/30 rounded-full text-white/90 text-sm transition-opacity duration-500"
        style={{ 
          background: 'rgba(255,255,255,0.13)', 
          backdropFilter: 'blur(14px)',
          padding: '14px 22px',
          opacity: stage === 'idle' ? 0 : 1
        }}
      >
        {stage !== 'idle' ? stageText : '🥳'}
      </div>

      <div ref={cakeWrapper}>
        <div className={cakeClass} id="birthdayCake" aria-label="birthday cake cutting animation">
          {/* Knife */}
          <div className="knife" aria-hidden="true">
            <span className="knife-blade" />
            <span className="knife-handle" />
          </div>
          {/* Candles */}
          <div className="candles" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className="candle">
                <i className="flame" />
                <i className="smoke" />
              </span>
            ))}
          </div>
          <div className="cut-line" />
          <div className="cake-bottom" style={{ background: activeStyle.bottom }} />
          <div className="cake-middle" style={{ background: activeStyle.middle }} />
          <div className="cake-top" style={{ background: activeStyle.top }} />
          <div className="cake-slice" style={{ background: activeStyle.slice }} />
          <div className="plate" />
        </div>
      </div>

      <button
        onClick={handleCut}
        disabled={disabled}
        className={`cut-cake-btn mt-8 relative z-[8] text-lg font-semibold cursor-pointer rounded-full transition-all duration-500 overflow-hidden ${disabled ? 'opacity-80 scale-[0.96]' : 'hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_15px_40px_rgba(255,255,255,0.15)]'}`}
        style={{ 
          padding: '18px 44px',
          color: 'rgba(255,255,255,0.9)',
          background: 'rgba(20,20,20,0.45)',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          transform: disabled ? 'scale(0.96)' : 'scale(1)',
        }}
      >
        <span className="relative z-10 tracking-wide">{btnText}</span>
      </button>
    </div>
  );
}
