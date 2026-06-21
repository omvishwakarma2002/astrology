'use client';

import { HoroscopeData } from '@/lib/horoscopes';

interface Props {
  data: HoroscopeData;
  expanded?: boolean;
}

const ELEMENT_GRADIENTS: Record<string, string> = {
  Fire:  'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(251,146,60,0.1))',
  Earth: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(101,163,13,0.1))',
  Air:   'linear-gradient(135deg, rgba(234,179,8,0.15), rgba(250,204,21,0.1))',
  Water: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(99,102,241,0.1))',
};
const ELEMENT_COLORS: Record<string, string> = {
  Fire: '#ef4444', Earth: '#22c55e', Air: '#eab308', Water: '#3b82f6',
};

export default function HoroscopeCard({ data, expanded = false }: Props) {
  return (
    <div className="horo-card" style={{ background: ELEMENT_GRADIENTS[data.element] }}>
      <div className="horo-header">
        <div className="horo-symbol" style={{ color: ELEMENT_COLORS[data.element] }}>
          {data.symbol}
        </div>
        <div className="horo-title-group">
          <h2 className="horo-sign">{data.sign}</h2>
          <p className="horo-date-range">{data.dateRange}</p>
        </div>
        <div className="horo-meta">
          <span className="horo-badge" style={{ borderColor: ELEMENT_COLORS[data.element], color: ELEMENT_COLORS[data.element] }}>
            {data.element}
          </span>
          <span className="horo-ruler">♆ {data.ruling}</span>
        </div>
      </div>

      <div className="horo-mood">
        <span className="mood-label">Today&apos;s Mood</span>
        <span className="mood-value">{data.mood}</span>
        <span className="mood-divider">·</span>
        <span className="lucky-label">Lucky #</span>
        <span className="lucky-value">{data.luckyNumber}</span>
        <span className="mood-divider">·</span>
        <span className="color-dot" style={{ background: ELEMENT_COLORS[data.element] }} />
        <span className="lucky-color">{data.luckyColor}</span>
      </div>

      <p className="horo-today">{data.today}</p>

      {expanded && (
        <div className="horo-sections">
          <div className="horo-section">
            <h3 className="section-title">
              <span className="section-icon">♡</span> Love
            </h3>
            <p className="section-text">{data.love}</p>
          </div>
          <div className="horo-section">
            <h3 className="section-title">
              <span className="section-icon">✦</span> Career
            </h3>
            <p className="section-text">{data.career}</p>
          </div>
          <div className="horo-section">
            <h3 className="section-title">
              <span className="section-icon">◎</span> Health
            </h3>
            <p className="section-text">{data.health}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .horo-card {
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 16px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .horo-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
        }
        .horo-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .horo-symbol {
          font-size: 2.8rem;
          line-height: 1;
          flex-shrink: 0;
          filter: drop-shadow(0 0 8px currentColor);
        }
        .horo-title-group {
          flex: 1;
          min-width: 0;
        }
        .horo-sign {
          font-family: 'Cinzel', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
          letter-spacing: 0.05em;
        }
        .horo-date-range {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.45);
          margin: 0.15rem 0 0;
          letter-spacing: 0.04em;
        }
        .horo-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.3rem;
        }
        .horo-badge {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid;
          border-radius: 20px;
          padding: 0.15rem 0.6rem;
        }
        .horo-ruler {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
        }
        .horo-mood {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          font-size: 0.8rem;
          padding: 0.6rem 0.9rem;
          background: rgba(255,255,255,0.04);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .mood-label, .lucky-label, .lucky-color {
          color: rgba(255,255,255,0.45);
        }
        .mood-value, .lucky-value {
          color: #d4af37;
          font-weight: 600;
        }
        .mood-divider { color: rgba(255,255,255,0.2); }
        .color-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .horo-today {
          line-height: 1.8;
          color: rgba(255,255,255,0.8);
          font-size: 0.95rem;
          margin: 0;
        }
        .horo-sections {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border-top: 1px solid rgba(212,175,55,0.12);
          padding-top: 1rem;
        }
        .horo-section {}
        .section-title {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #d4af37;
          letter-spacing: 0.08em;
          margin: 0 0 0.4rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .section-icon { font-size: 1rem; }
        .section-text {
          color: rgba(255,255,255,0.75);
          line-height: 1.7;
          font-size: 0.9rem;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
