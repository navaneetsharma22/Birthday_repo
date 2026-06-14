'use client';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Navbar() {
  const navRef = useRef(null);

  useGSAP(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });
    }
  }, []);

  return (
    <>
      <style>{`
        .nav-link {
          color: rgba(255,255,255,0.78);
          opacity: 0.78;
          transition: opacity 0.25s, color 0.25s;
          font-size: 13px;
          font-weight: 500;
        }
        .nav-link:hover {
          opacity: 1;
          color: #fff;
        }
      `}</style>
      <nav
        ref={navRef}
        className="fixed top-[22px] left-1/2 -translate-x-1/2 z-50 flex items-center justify-between"
        style={{
          width: 'min(1120px, 92%)',
          padding: '13px 26px',
          borderRadius: '999px',
          background: 'rgba(20,20,20,0.45)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-script font-bold"
          style={{ fontSize: '28px', color: '#fff' }}
        >
          Komal
        </Link>

        {/* Links */}
        <div className="flex gap-[18px]">
          {[
            { href: '/memories', label: 'Memories' },
            { href: '/letter',   label: 'Letter'   },
            { href: '/cake',     label: 'Cake'      },
            { href: '/final',    label: 'Final'     },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
