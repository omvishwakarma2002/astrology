'use client';

import { CompatibilityResult as CompatResult } from '@/lib/compatibility';

interface Props {
  result: CompatResult;
}

function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? '#d4af37' : score >= 55 ? '#f97316' : '#8b5cf6';

  return (
    <div className="score-ring-wrapper">
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
        <circle
          cx="65" cy="65" r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${circ}`}
          strokeDashoffset={offset}
          transform="rotate(-90 65 65)"
          style={{ transition: 'stroke-dashoffset 1.2s ease', filter: `drop-shadow(0 0 6px ${color})` }}
        />
        <text x="65" y="60" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="700" fontFamily="Cinzel, serif">{score}</text>
        <text x="65" y="78" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="11" fontFamily="sans-serif">/ 100</text>
      </svg>
      <style jsx>{`
        .score-ring-wrapper { display: flex; justify-content: center; }
      `}</style>
    </div>
  );
}

export default function CompatibilityResult({ result }: Props) {
  const ratingColor = result.score >= 75 ? '#d4af37' : result.score >= 55 ? '#f97316' : '#8b5cf6';

  return (
    <div className="compat-result">
      <div className="compat-hero">
        <div className="compat-signs">
          <div className="compat-sign-box">
            <span className="sign-label">{result.sign1}</span>
          </div>
          <span className="compat-x">✦</span>
          <div className="compat-sign-box">
            <span className="sign-label">{result.sign2}</span>
          </div>
        </div>

        <ScoreRing score={result.score} />

        <div className="compat-rating" style={{ color: ratingColor }}>
          {result.rating}
        </div>
      </div>

      <p className="compat-summary">{result.summary}</p>

      <div className="compat-grid">
        <div className="compat-section compat-strengths">
          <h3 className="section-title strength-title">✦ Strengths</h3>
          <ul className="section-list">
            {result.strengths.map((s, i) => (
              <li key={i} className="section-item strength-item">{s}</li>
            ))}
          </ul>
        </div>

        <div className="compat-section compat-challenges">
          <h3 className="section-title challenge-title">⊕ Challenges</h3>
          <ul className="section-list">
            {result.challenges.map((c, i) => (
              <li key={i} className="section-item challenge-item">{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="compat-elements">
        <div className="element-card">
          <span className="element-card-label">Element Dynamics</span>
          <p className="element-card-text">{result.elementCompatibility}</p>
        </div>
        <div className="element-card">
          <span className="element-card-label">Modality Blend</span>
          <p className="element-card-text">{result.modalityCompatibility}</p>
        </div>
      </div>

      <div className="compat-advice">
        <h3 className="advice-title">Cosmic Counsel</h3>
        <p className="advice-text">{result.advice}</p>
      </div>

      <style jsx>{`
        .compat-result {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .compat-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .compat-signs {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .compat-sign-box {
          background: rgba(212,175,55,0.08);
          border: 1px solid rgba(212,175,55,0.25);
          border-radius: 10px;
          padding: 0.5rem 1.25rem;
        }
        .sign-label {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.06em;
        }
        .compat-x {
          font-size: 1.4rem;
          color: #d4af37;
        }
        .compat-rating {
          font-family: 'Cinzel', serif;
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-align: center;
        }
        .compat-summary {
          color: rgba(255,255,255,0.75);
          line-height: 1.8;
          font-size: 0.95rem;
          margin: 0;
          text-align: center;
          padding: 0 0.5rem;
        }
        .compat-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .compat-grid { grid-template-columns: 1fr 1fr; }
        }
        .compat-section {
          border-radius: 12px;
          padding: 1.25rem;
        }
        .compat-strengths {
          background: rgba(34,197,94,0.06);
          border: 1px solid rgba(34,197,94,0.2);
        }
        .compat-challenges {
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.2);
        }
        .section-title {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin: 0 0 0.75rem;
        }
        .strength-title { color: #4ade80; }
        .challenge-title { color: #f87171; }
        .section-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .section-item {
          font-size: 0.85rem;
          line-height: 1.5;
          color: rgba(255,255,255,0.75);
          padding-left: 1rem;
          position: relative;
        }
        .section-item::before {
          content: '·';
          position: absolute;
          left: 0;
        }
        .strength-item::before { color: #4ade80; }
        .challenge-item::before { color: #f87171; }
        .compat-elements {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .compat-elements { grid-template-columns: 1fr 1fr; }
        }
        .element-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(212,175,55,0.12);
          border-radius: 10px;
          padding: 1rem 1.25rem;
        }
        .element-card-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #d4af37;
          margin-bottom: 0.4rem;
        }
        .element-card-text {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.65);
          line-height: 1.6;
          margin: 0;
        }
        .compat-advice {
          background: linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04));
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
        }
        .advice-title {
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #d4af37;
          letter-spacing: 0.08em;
          margin: 0 0 0.6rem;
        }
        .advice-text {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.75;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
