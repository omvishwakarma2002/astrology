'use client';

import { useState } from 'react';
import CompatibilityResultComponent from '@/components/CompatibilityResult';
import { calculateCompatibility, ALL_SIGNS, CompatibilityResult } from '@/lib/compatibility';

const SIGN_SYMBOLS: Record<string, string> = {
  Aries:'♈',Taurus:'♉',Gemini:'♊',Cancer:'♋',Leo:'♌',Virgo:'♍',
  Libra:'♎',Scorpio:'♏',Sagittarius:'♐',Capricorn:'♑',Aquarius:'♒',Pisces:'♓',
};

export default function CompatibilityPage() {
  const [sign1, setSign1] = useState('');
  const [sign2, setSign2] = useState('');
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const handleCheck = () => {
    if (sign1 && sign2) {
      setResult(calculateCompatibility(sign1, sign2));
    }
  };

  const handleReset = () => {
    setSign1('');
    setSign2('');
    setResult(null);
  };

  return (
    <div className="page-wrapper">
      <div className="section-container">
        {/* Header */}
        <div className="page-header">
          <span className="page-eyebrow">Cosmic Chemistry</span>
          <h1 className="page-title">Compatibility Checker</h1>
          <p className="page-desc">
            Explore the elemental and modal dynamics between two zodiac signs.
            Discover what the stars reveal about your cosmic connection.
          </p>
        </div>

        {/* Selector */}
        <div className="glass-card selector-card">
          <div className="selector-row">
            <div className="selector-group">
              <label className="selector-label">First Sign</label>
              <div className="signs-grid">
                {ALL_SIGNS.map(sign => (
                  <button
                    key={sign}
                    onClick={() => { setSign1(sign); setResult(null); }}
                    className={`sign-chip ${sign1 === sign ? 'sign-chip-active' : ''}`}
                  >
                    <span>{SIGN_SYMBOLS[sign]}</span>
                    <span className="chip-name">{sign}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="selector-divider">
              <span className="divider-symbol">♾</span>
            </div>

            <div className="selector-group">
              <label className="selector-label">Second Sign</label>
              <div className="signs-grid">
                {ALL_SIGNS.map(sign => (
                  <button
                    key={sign}
                    onClick={() => { setSign2(sign); setResult(null); }}
                    className={`sign-chip ${sign2 === sign ? 'sign-chip-active' : ''}`}
                  >
                    <span>{SIGN_SYMBOLS[sign]}</span>
                    <span className="chip-name">{sign}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="selector-actions">
            {sign1 && sign2 && (
              <div className="selected-preview">
                <span>{SIGN_SYMBOLS[sign1]} {sign1}</span>
                <span className="preview-x">✦</span>
                <span>{SIGN_SYMBOLS[sign2]} {sign2}</span>
              </div>
            )}
            <button
              onClick={handleCheck}
              disabled={!sign1 || !sign2}
              className="check-btn"
            >
              Reveal Compatibility
            </button>
            {result && (
              <button onClick={handleReset} className="reset-btn">
                Start Over
              </button>
            )}
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="result-wrap">
            <div className="glass-card result-card">
              <CompatibilityResultComponent result={result} />
            </div>
          </div>
        )}

        {/* Info boxes */}
        {!result && (
          <div className="info-grid">
            {[
              { icon: '🔥', label: 'Fire Signs', signs: 'Aries · Leo · Sagittarius', desc: 'Passionate, dynamic, and full of creative energy.' },
              { icon: '🌿', label: 'Earth Signs', signs: 'Taurus · Virgo · Capricorn', desc: 'Grounded, reliable, and deeply sensual.' },
              { icon: '💨', label: 'Air Signs',   signs: 'Gemini · Libra · Aquarius',  desc: 'Intellectual, communicative, and socially gifted.' },
              { icon: '🌊', label: 'Water Signs', signs: 'Cancer · Scorpio · Pisces',  desc: 'Intuitive, emotional, and deeply empathetic.' },
            ].map(el => (
              <div key={el.label} className="info-card">
                <span className="info-icon">{el.icon}</span>
                <h3 className="info-label">{el.label}</h3>
                <p className="info-signs">{el.signs}</p>
                <p className="info-desc">{el.desc}</p>
              </div>
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
          margin: 0.5rem 0 0.75rem;
          letter-spacing: 0.04em;
        }
        .page-desc {
          color: rgba(255,255,255,0.55);
          font-size: 1rem;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .selector-card {
          padding: 2rem;
          margin-bottom: 2.5rem;
        }
        .selector-row {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 1.5rem;
          align-items: start;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 640px) {
          .selector-row {
            grid-template-columns: 1fr;
          }
          .selector-divider { display: none; }
        }
        .selector-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .selector-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #d4af37;
        }
        .signs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.4rem;
        }
        @media (min-width: 480px) {
          .signs-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .sign-chip {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.1rem;
          padding: 0.5rem 0.25rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
          color: rgba(255,255,255,0.6);
        }
        .sign-chip:hover {
          background: rgba(212,175,55,0.07);
          border-color: rgba(212,175,55,0.35);
          color: #d4af37;
        }
        .sign-chip-active {
          background: rgba(212,175,55,0.12) !important;
          border-color: rgba(212,175,55,0.5) !important;
          color: #d4af37 !important;
        }
        .chip-name {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: inherit;
        }
        .selector-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 1.8rem;
        }
        .divider-symbol {
          font-size: 1.5rem;
          color: rgba(212,175,55,0.4);
        }
        .selector-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          border-top: 1px solid rgba(212,175,55,0.1);
          padding-top: 1.5rem;
        }
        .selected-preview {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'Cinzel', serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #fff;
        }
        .preview-x { color: #d4af37; font-size: 0.75rem; }
        .check-btn {
          background: linear-gradient(135deg, #d4af37, #b8960c);
          color: #0f0c29;
          border: none;
          border-radius: 8px;
          padding: 0.75rem 1.75rem;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 16px rgba(212,175,55,0.25);
        }
        .check-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212,175,55,0.4);
        }
        .check-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .reset-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.5);
          border-radius: 8px;
          padding: 0.75rem 1.25rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .reset-btn:hover {
          border-color: rgba(212,175,55,0.3);
          color: #d4af37;
        }
        .result-wrap {
          animation: fadeIn 0.6s ease;
        }
        .result-card {
          padding: 2rem;
          max-width: 760px;
          margin: 0 auto;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          animation: fadeIn 0.5s ease;
        }
        @media (min-width: 768px) {
          .info-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .info-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(212,175,55,0.12);
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .info-icon { font-size: 1.5rem; }
        .info-label {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: #d4af37;
          margin: 0;
        }
        .info-signs {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.5);
          margin: 0;
        }
        .info-desc {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
