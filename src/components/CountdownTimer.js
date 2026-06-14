'use client';
import { useState, useEffect } from 'react';

const BIRTHDAY = new Date('2026-06-22T00:00:00').getTime();

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function CountdownTimer() {
  const [time, setTime] = useState({ days: '00', hours: '00', mins: '00', secs: '00' });

  useEffect(() => {
    function tick() {
      const diff = Math.max(BIRTHDAY - Date.now(), 0);
      setTime({
        days:  pad(Math.floor(diff / 86400000)),
        hours: pad(Math.floor((diff % 86400000) / 3600000)),
        mins:  pad(Math.floor((diff % 3600000) / 60000)),
        secs:  pad(Math.floor((diff % 60000) / 1000)),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Days',  value: time.days  },
    { label: 'Hours', value: time.hours },
    { label: 'Mins',  value: time.mins  },
    { label: 'Secs',  value: time.secs  },
  ];

  return (
    <aside
      className="gsap-slide-in justify-self-end"
      style={{
        maxWidth: '460px',
        width: '100%',
        padding: '32px',
        borderRadius: '32px',
        background: 'rgba(20,20,20,0.45)',
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 24px 70px rgba(0,0,0,0.4)',
      }}
    >
      {/* Label */}
      <p
        className="font-script text-center"
        style={{ fontSize: '28px', color: '#d8b4a0', marginBottom: '24px' }}
      >
        birthday countdown
      </p>

      {/* Grid of 4 units */}
      <div className="grid grid-cols-4 gap-3">
        {units.map(({ label, value }) => (
          <div
            key={label}
            className="text-center"
            style={{
              padding: '16px 8px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '20px',
            }}
          >
            <strong
              className="block font-serif"
              style={{ fontSize: '34px', lineHeight: 1, color: 'rgba(255,255,255,0.95)' }}
            >
              {value}
            </strong>
            <span
              style={{ display: 'block', fontSize: '11px', marginTop: '4px', color: 'rgba(255,255,255,0.6)', textTransform: 'capitalize' }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
