'use client';

import { useState } from 'react';
import HoroscopeCard from '@/components/HoroscopeCard';
import { horoscopes, ALL_SIGNS } from '@/lib/horoscopes';

export default function HoroscopePage() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const selectedData = selectedSign ? horoscopes[selectedSign] : null;

  return (
    <div className="page-wrapper">
      <div className="section-container">
        {/* Header */}
        <div className="page-header">
          <span className="page-eyebrow">Daily Guidance</span>
          <h1 className="page-title">Your Daily Horoscope</h1>
          <p className="page-date">{today}</p>
          <p className="page-desc">
            Select your zodiac sign to receive a detailed cosmic reading covering love,
            career, and wellbeing for today.
          </p>
        </div>

        {/* Sign selector */}
        <div className="sign-selector">
          {ALL_SIGNS.map(sign => {
            const data = horoscopes[sign];
            return (
              <button
                key={sign}
                onClick={() => setSelectedSign(selectedSign === sign ? null : sign)}
                className={`sign-btn ${selectedSign === sign ? 'sign-btn-active' : ''}`}
              >
                <span className="sign-btn-symbol">{data.symbol}</span>
                <span className="sign-btn-name">{sign}</span>
              </button>
            );
          })}
        </div>

        {/* Selected sign detail */}
        {selectedData && (
          <div className="selected-card-wrap">
            <HoroscopeCard data={selectedData} expanded={true} />
          </div>
        )}

        {/* All signs grid (when none selected) */}
        {!selectedSign && (
          <div className="all-signs-grid">
            {ALL_SIGNS.map(sign => (
              <button
                key={sign}
                onClick={() => setSelectedSign(sign)}
                className="mini-sign-card"
              >
                <span className="mini-symbol">{horoscopes[sign].symbol}</span>
                <span className="mini-name">{sign}</span>
                <span className="mini-dates">{horoscopes[sign].dateRange}</span>
                <span className="mini-mood">{horoscopes[sign].mood}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .page-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .page-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #d4af37;
        }
        .page-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          color: #fff;
          margin: 0.5rem 0 0.5rem;
          letter-spacing: 0.04em;
        }
        .page-date {
          font-size: 0.85rem;
          color: #d4af37;
          letter-spacing: 0.06em;
          margin: 0 0 0.75rem;
        }
        .page-desc {
          color: rgba(255,255,255,0.55);
          font-size: 1rem;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .sign-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 2.5rem;
        }
        .sign-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 40px;
          padding: 0.4rem 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          color: rgba(255,255,255,0.6);
        }
        .sign-btn:hover {
          border-color: rgba(212,175,55,0.4);
          color: #d4af37;
          background: rgba(212,175,55,0.06);
        }
        .sign-btn-active {
          background: rgba(212,175,55,0.12) !important;
          border-color: rgba(212,175,55,0.5) !important;
          color: #d4af37 !important;
        }
        .sign-btn-symbol { font-size: 1rem; }
        .sign-btn-name { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.04em; }
        .selected-card-wrap {
          max-width: 780px;
          margin: 0 auto;
          animation: fadeIn 0.5s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .all-signs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          animation: fadeIn 0.5s ease;
        }
        @media (min-width: 480px) {
          .all-signs-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 768px) {
          .all-signs-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .mini-sign-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(212,175,55,0.15);
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          cursor: pointer;
          transition: all 0.25s;
          text-align: center;
        }
        .mini-sign-card:hover {
          background: rgba(212,175,55,0.07);
          border-color: rgba(212,175,55,0.35);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .mini-symbol { font-size: 2rem; color: #d4af37; }
        .mini-name {
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.05em;
        }
        .mini-dates { font-size: 0.7rem; color: rgba(255,255,255,0.35); }
        .mini-mood {
          font-size: 0.72rem;
          color: #d4af37;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 0.2rem;
        }
      `}</style>
    </div>
  );
}
