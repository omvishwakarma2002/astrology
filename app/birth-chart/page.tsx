'use client';

import { useState } from 'react';
import BirthChartForm, { BirthChartFormData } from '@/components/BirthChartForm';
import ChartWheel from '@/components/ChartWheel';
import PlanetCard from '@/components/PlanetCard';
import { calculatePlanetPositions, PlanetPosition } from '@/lib/astrology';

interface ChartResult {
  name: string;
  planets: PlanetPosition[];
  date: string;
  time: string;
  city: string;
}

export default function BirthChartPage() {
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState<ChartResult | null>(null);

  const handleSubmit = (data: BirthChartFormData) => {
    setLoading(true);
    setTimeout(() => {
      const [year, month, day] = data.date.split('-').map(Number);
      const [hour, min]        = data.time.split(':').map(Number);
      const hourDecimal        = hour + min / 60;
      const planets            = calculatePlanetPositions(year, month, day, hourDecimal);
      setResult({ name: data.name, planets, date: data.date, time: data.time, city: data.city });
      setLoading(false);
    }, 800);
  };

  const sunPlanet  = result?.planets.find(p => p.name === 'Sun');
  const moonPlanet = result?.planets.find(p => p.name === 'Moon');

  return (
    <div className="page-wrapper">
      <div className="section-container">
        {/* Header */}
        <div className="page-header">
          <span className="page-eyebrow">Natal Astrology</span>
          <h1 className="page-title">Birth Chart Calculator</h1>
          <p className="page-desc">
            Enter your birth details to reveal the exact positions of the planets at the moment
            of your arrival, forming the cosmic signature that is uniquely yours.
          </p>
        </div>

        {/* Form card */}
        <div className="glass-card form-card">
          <BirthChartForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Results */}
        {result && (
          <div className="results-section">
            {/* Sun/Moon summary */}
            {sunPlanet && moonPlanet && (
              <div className="sun-moon-row">
                <div className="summary-pill">
                  <span className="pill-icon" style={{ color: '#f59e0b' }}>☉</span>
                  <span className="pill-label">Sun in</span>
                  <span className="pill-value">{sunPlanet.signSymbol} {sunPlanet.sign}</span>
                </div>
                <div className="summary-divider">✦</div>
                <div className="summary-pill">
                  <span className="pill-icon" style={{ color: '#c4b5fd' }}>☽</span>
                  <span className="pill-label">Moon in</span>
                  <span className="pill-value">{moonPlanet.signSymbol} {moonPlanet.sign}</span>
                </div>
              </div>
            )}

            <div className="results-grid">
              {/* Wheel */}
              <div className="glass-card wheel-card">
                <ChartWheel planets={result.planets} name={result.name} />
              </div>

              {/* Planet list */}
              <div className="planets-list">
                <h2 className="section-heading">Planetary Positions</h2>
                <div className="planet-cards-grid">
                  {result.planets.map(p => (
                    <PlanetCard key={p.name} planet={p} />
                  ))}
                </div>
              </div>
            </div>
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
          max-width: 540px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .form-card {
          padding: 2rem;
          max-width: 680px;
          margin: 0 auto 3rem;
        }
        .results-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          animation: fadeIn 0.6s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sun-moon-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .summary-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 40px;
          padding: 0.5rem 1.25rem;
        }
        .pill-icon { font-size: 1.2rem; }
        .pill-label { font-size: 0.85rem; color: rgba(255,255,255,0.5); }
        .pill-value {
          font-family: 'Cinzel', serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #fff;
        }
        .summary-divider { font-size: 1.2rem; color: rgba(212,175,55,0.4); }
        .results-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 900px) {
          .results-grid { grid-template-columns: 420px 1fr; align-items: start; }
        }
        .wheel-card { padding: 1.75rem; }
        .section-heading {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #d4af37;
          letter-spacing: 0.1em;
          margin: 0 0 1rem;
          text-transform: uppercase;
        }
        .planet-cards-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
      `}</style>
    </div>
  );
}
