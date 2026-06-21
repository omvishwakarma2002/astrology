'use client';

import { useState } from 'react';
import { PlanetPosition } from '@/lib/astrology';
import { getPlanetInterpretation, getOverallSummary } from '@/lib/interpretations';

interface Props {
  planets: PlanetPosition[];
  name: string;
}

const PLANET_ORDER = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

const PLANET_ROLES: Record<string, string> = {
  Sun:     'Your Core Identity',
  Moon:    'Your Inner Emotional World',
  Mercury: 'Your Mind & Communication',
  Venus:   'Your Love & Beauty',
  Mars:    'Your Drive & Action',
  Jupiter: 'Your Growth & Luck',
  Saturn:  'Your Life Lessons',
  Uranus:  'Your Generation\'s Revolution',
  Neptune: 'Your Generation\'s Dreams',
};

const PLANET_COLORS: Record<string, string> = {
  Sun:     '#f59e0b',
  Moon:    '#c4b5fd',
  Mercury: '#67e8f9',
  Venus:   '#f9a8d4',
  Mars:    '#f87171',
  Jupiter: '#86efac',
  Saturn:  '#fcd34d',
  Uranus:  '#5eead4',
  Neptune: '#818cf8',
};

export default function PersonalitySummary({ planets, name }: Props) {
  const [expanded, setExpanded] = useState<string | null>('Sun');

  const orderedPlanets = PLANET_ORDER
    .map(name => planets.find(p => p.name === name))
    .filter(Boolean) as PlanetPosition[];

  const overallSummary = getOverallSummary(planets);

  return (
    <div className="summary-wrapper">
      {/* Overall cosmic summary */}
      <div className="overall-card">
        <div className="overall-header">
          <span className="star-icon">✦</span>
          <h2 className="overall-title">Your Cosmic Blueprint, {name}</h2>
          <span className="star-icon">✦</span>
        </div>
        <p className="overall-text">{overallSummary}</p>
      </div>

      {/* Section title */}
      <h3 className="planets-heading">What Each Planet Says About You</h3>
      <p className="planets-sub">Tap any planet to reveal its influence on your personality</p>

      {/* Planet accordion */}
      <div className="planets-accordion">
        {orderedPlanets.map(planet => {
          const interp = getPlanetInterpretation(planet.name, planet.sign);
          if (!interp) return null;
          const isOpen = expanded === planet.name;
          const color = PLANET_COLORS[planet.name] || '#d4af37';

          return (
            <div key={planet.name} className={`planet-item ${isOpen ? 'open' : ''}`}>
              <button
                className="planet-header"
                onClick={() => setExpanded(isOpen ? null : planet.name)}
                style={{ borderLeftColor: color }}
              >
                <div className="planet-left">
                  <span className="planet-symbol" style={{ color }}>{planet.symbol}</span>
                  <div className="planet-info">
                    <span className="planet-role">{PLANET_ROLES[planet.name]}</span>
                    <span className="planet-name-sign">
                      {planet.name} in {planet.signSymbol} {planet.sign}
                      <span className="planet-archetype"> — {interp.title}</span>
                    </span>
                  </div>
                </div>
                <span className="chevron" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▾
                </span>
              </button>

              {isOpen && (
                <div className="planet-body">
                  <p className="planet-meaning">{interp.meaning}</p>
                  <div className="traits-row">
                    {interp.traits.map(trait => (
                      <span key={trait} className="trait-tag" style={{ borderColor: color + '44', color }}>
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .summary-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .overall-card {
          background: linear-gradient(135deg, rgba(212,175,55,0.08), rgba(139,92,246,0.08));
          border: 1px solid rgba(212,175,55,0.25);
          border-radius: 16px;
          padding: 2rem;
        }
        .overall-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .star-icon {
          color: #d4af37;
          font-size: 1rem;
        }
        .overall-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1rem, 3vw, 1.3rem);
          font-weight: 700;
          color: #fff;
          margin: 0;
          letter-spacing: 0.03em;
        }
        .overall-text {
          color: rgba(255,255,255,0.75);
          font-size: 0.97rem;
          line-height: 1.85;
          white-space: pre-line;
          margin: 0;
        }
        .planets-heading {
          font-family: 'Cinzel', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #d4af37;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
          text-align: center;
        }
        .planets-sub {
          text-align: center;
          color: rgba(255,255,255,0.4);
          font-size: 0.85rem;
          margin: 0;
        }
        .planets-accordion {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .planet-item {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .planet-item.open {
          border-color: rgba(255,255,255,0.15);
        }
        .planet-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: transparent;
          border: none;
          border-left: 3px solid transparent;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s;
        }
        .planet-header:hover {
          background: rgba(255,255,255,0.04);
        }
        .planet-left {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }
        .planet-symbol {
          font-size: 1.6rem;
          width: 2rem;
          text-align: center;
          flex-shrink: 0;
        }
        .planet-info {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .planet-role {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .planet-name-sign {
          font-size: 0.95rem;
          font-weight: 600;
          color: #fff;
        }
        .planet-archetype {
          color: rgba(255,255,255,0.5);
          font-weight: 400;
        }
        .chevron {
          color: rgba(255,255,255,0.4);
          font-size: 1rem;
          transition: transform 0.25s ease;
          flex-shrink: 0;
        }
        .planet-body {
          padding: 0 1.25rem 1.25rem 4.1rem;
          animation: slideDown 0.25s ease;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .planet-meaning {
          color: rgba(255,255,255,0.72);
          font-size: 0.93rem;
          line-height: 1.8;
          margin: 0 0 1rem;
        }
        .traits-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .trait-tag {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border: 1px solid;
          border-radius: 20px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
