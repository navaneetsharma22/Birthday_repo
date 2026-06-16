'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function SecretPage() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from('.secret-img', {
      scale: 0.5,
      opacity: 0,
      rotation: () => Math.random() * 40 - 20,
      duration: 1.2,
      stagger: 0.15,
      ease: 'back.out(1.5)',
      delay: 0.2
    });

    gsap.from('.secret-header', {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  }, { scope: container });

  return (
    <main
      ref={container}
      className="relative min-h-screen text-white overflow-hidden"
      style={{ 
        background: 'radial-gradient(circle at 50% 40%, #1a1a1a 0%, #050505 80%, #000000 100%)' 
      }}
    >

      <header className="secret-header relative z-10 text-center" style={{ padding: '100px 8% 20px' }}>
        <style>{`
          @media (max-width: 768px) {
            .secret-header {
              padding: 100px 6% 16px !important;
            }
          }
          @media (max-width: 640px) {
            .secret-header {
              padding: 90px 5% 12px !important;
            }
          }
        `}</style>
        <p className="font-script text-[#d8b4a0] text-2xl sm:text-3xl">you found it</p>
        <h1
          className="font-serif font-semibold leading-[0.86] tracking-[-3px] mt-2 text-white/95"
          style={{ fontSize: 'clamp(42px, 7vw, 90px)' }}
        >
          The Secret Gallery
        </h1>
        <p className="mt-4 mb-6 text-sm sm:text-base text-white/70 max-w-[500px] mx-auto leading-relaxed">
          Only the true owner of this heart knows the password. Welcome to our hidden memories.
        </p>
      </header>

      <section className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-8 max-w-[1000px] mx-auto pb-32 mt-10">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div 
            key={item} 
            className="secret-img relative aspect-[4/5] rounded-[16px] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] group"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: 'url("/assets/ak.jpeg")' }}
            />
            {/* Dark glass overlay that fades on hover */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        ))}
      </section>
    </main>
  );
}
