'use client';
import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CountdownTimer from '@/components/CountdownTimer';
import { useAutoNavigate } from '@/hooks/useAutoNavigate';

export default function HomePage() {
  useAutoNavigate('/cake');
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial state setup for animation
    gsap.set('.gsap-fade-up', { y: 30, opacity: 0 });
    gsap.set('.gsap-title', { y: 50, opacity: 0, scale: 0.95 });
    gsap.set('.gsap-span', { y: 30, opacity: 0 });
    gsap.set('.gsap-slide-in', { x: 50, opacity: 0 });

    tl.to('.gsap-fade-up', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.15,
      ease: 'power2.out',
    })
    .to('.gsap-title', {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'back.out(1.4)',
    }, '-=0.8')
    .to('.gsap-span', {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'back.out(1.2)',
    }, '-=0.9')
    .to('.gsap-slide-in', {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
    }, '-=1');
  }, { scope: container });

  return (
    <main
      ref={container}
      className="relative min-h-screen flex items-center"
      style={{
        padding: '130px 9% 70px',
        backgroundImage: "url('/assets/home-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#050505',
      }}
    >
      {/* Dark gradient overlay to make text readable on the left, while showing the image on the right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.75) 45%, rgba(5,5,5,0.2) 100%)',
        }}
      />

      {/* Floating decorative symbols */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          top: '18%', left: '7%',
          color: 'rgba(255,255,255,0.15)',
          fontSize: '34px',
          animation: 'float 8s infinite ease-in-out',
          zIndex: 0,
        }}
      >
        ✦ ♥ ✧
      </div>
      <div
        className="absolute pointer-events-none select-none"
        style={{
          right: '8%', bottom: '18%',
          color: 'rgba(255,255,255,0.15)',
          fontSize: '34px',
          animation: 'float 8s 2s infinite ease-in-out',
          zIndex: 0,
        }}
      >
        ✦ ♥ ✧
      </div>

      {/* Two-column layout */}
      <div
        className="relative z-10 w-full grid items-center"
        style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: '48px' }}
      >
        {/* ── Left: Hero Content ── */}
        <section>
          {/* Script subtitle */}
          <p
            className="font-script gsap-fade-up"
            style={{ fontSize: '30px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}
          >
            a little universe made just for you
          </p>

          {/* Main heading */}
          <h1
            className="font-serif font-semibold gsap-title"
            style={{
              fontSize: 'clamp(62px, 9vw, 128px)',
              lineHeight: 0.86,
              letterSpacing: '-3px',
              color: 'rgba(255,255,255,0.95)',
            }}
          >
            Happy Birthday
            <span 
              className="gsap-span"
              style={{ 
                color: '#d8b4a0', 
                fontStyle: 'italic', 
                display: 'block', 
                fontSize: 'clamp(72px, 10vw, 142px)', 
                marginTop: '-8px',
                fontWeight: 500
              }}
            >
              My Love
            </span>
          </h1>

          {/* Description */}
          <p
            className="gsap-fade-up"
            style={{
              maxWidth: '560px',
              marginTop: '28px',
              marginBottom: '32px',
              fontSize: '18px',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            Today is wrapped in blush light, tiny stars, warm memories,
            <br />
            and all the love you deserve.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 gsap-fade-up">
            <style>{`
              .btn-primary {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 14px 32px;
                border-radius: 999px;
                font-weight: 600;
                font-size: 16px;
                background: #3e3232;
                color: #fff;
                box-shadow: 0 18px 45px rgba(62,50,50,0.28);
                transition: transform 0.3s;
                text-decoration: none;
              }
              .btn-primary:hover {
                transform: translateY(-4px);
              }
              .btn-ghost {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 14px 32px;
                border-radius: 999px;
                font-weight: 600;
                font-size: 16px;
                background: rgba(255,255,255,0.50);
                border: 1px solid rgba(62,50,50,0.14);
                color: #3e3232;
                transition: transform 0.3s;
                text-decoration: none;
              }
              .btn-ghost:hover {
                transform: translateY(-4px);
              }
            `}</style>
            <Link
              href="/cake"
              className="btn-primary"
            >
              Cut the Cake
            </Link>
            <Link
              href="/letter"
              className="btn-ghost"
            >
              Read Letter
            </Link>
          </div>
        </section>

        {/* ── Right: Countdown Card ── */}
        <CountdownTimer />
      </div>
    </main>
  );
}
