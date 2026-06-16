'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const NAV_LINKS = [
  { href: '/memories', label: 'Memories' },
  { href: '/letter',   label: 'Letter'   },
  { href: '/cake',     label: 'Cake'     },
  { href: '/final',    label: 'Final'    },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

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

        /* Desktop nav links */
        .nav-desktop-links {
          display: flex;
          gap: 18px;
        }

        /* Hamburger button — hidden on desktop */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 70;
        }
        .nav-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: rgba(255,255,255,0.85);
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
        }
        .nav-hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .nav-hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .nav-hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile overlay menu — hidden on desktop */
        .nav-mobile-overlay {
          display: none;
        }

        /* ── Show hamburger & overlay on mobile/tablet ── */
        @media (max-width: 768px) {
          .nav-desktop-links {
            display: none;
          }
          .nav-hamburger {
            display: flex;
          }
          .nav-mobile-overlay {
            display: flex;
            position: fixed;
            inset: 0;
            z-index: 60;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 28px;
            background: rgba(5,5,5,0.92);
            backdrop-filter: blur(28px);
            -webkit-backdrop-filter: blur(28px);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.35s ease;
          }
          .nav-mobile-overlay.open {
            opacity: 1;
            pointer-events: auto;
          }
          .nav-mobile-overlay a {
            font-family: 'Cormorant Garamond', serif;
            font-size: 32px;
            font-weight: 500;
            color: rgba(255,255,255,0.85);
            letter-spacing: 2px;
            transition: color 0.3s, transform 0.3s;
          }
          .nav-mobile-overlay a:hover {
            color: #d8b4a0;
            transform: translateX(6px);
          }
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
          onClick={closeMenu}
        >
          Komal
        </Link>

        {/* Desktop Links */}
        <div className="nav-desktop-links">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </div>

        {/* Hamburger Button (mobile only) */}
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div className={`nav-mobile-overlay${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href} onClick={closeMenu}>
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}
