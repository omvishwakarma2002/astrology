'use client';

import { PlanetPosition } from '@/lib/astrology';

interface Props {
  planet: PlanetPosition;
}

const ELEMENT_GRADIENTS: Record<string, string> = {
  Fire:  'linear-gradient(135deg, rgba(239,68,68,0.12), rgba(251,146,60,0.07))',
  Earth: 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(101,163,13,0.07))',
  Air:   'linear-gradient(135deg, rgba(234,179,8,0.12), rgba(250,204,21,0.07))',
  Water: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(99,102,241,0.07))',
};

const PLANET_MEANINGS: Record<string, string> = {
  Sun:     'Core identity, vitality, and life purpose',
  Moon:    'Emotions, instincts, and subconscious mind',
  Mercury: 'Communication, thought, and mental agility',
  Venus:   'Love, beauty, pleasure, and values',
  Mars:    'Drive, desire, ambition, and action',
  Jupiter: 'Expansion, wisdom, luck, and growth',
  Saturn:  'Discipline, karma, structure, and lessons',
  Uranus:  'Innovation, revolution, and sudden change',
  Neptune: 'Dreams, intuition, spirituality, and illusion',
};

const ELEMENT_COLORS: Record<string, string> = {
  Fire: '#ef4444', Earth: '#22c55e', Air: '#eab308', Water: '#3b82f6',
};

export default function PlanetCard({ planet }: Props) {
  const degreesInSign = planet.longitude % 30;
  const color = ELEMENT_COLORS[planet.element];

  return (
    <div className="planet-card" style={{ background: ELEMENT_GRADIENTS[planet.element] }}>
      <div className="planet-header">
        <span className="planet-symbol" style={{ color }}>{planet.symbol}</span>
        <div className="planet-info">
          <span className="planet-name">{planet.name}</span>
          <span className="planet-meaning">{PLANET_MEANINGS[planet.name]}</span>
        </div>
        <div className="planet-position">
          <span className="position-sign" style={{ color }}>
            {planet.signSymbol} {planet.sign}
          </span>
          <span className="position-deg">{degreesInSign.toFixed(1)}°</span>
        </div>
      </div>

      <div className="planet-progress">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${(degreesInSign / 30) * 100}%`,
              background: `linear-gradient(90deg, ${color}60, ${color})`,
            }}
          />
        </div>
        <span className="progress-label">Progress through {planet.sign}</span>
      </div>

      <div className="planet-tags">
        <span className="tag" style={{ borderColor: `${color}40`, color }}>
          {planet.element}
        </span>
        <span className="tag tag-dim">
          {planet.longitude.toFixed(2)}° Ecliptic
        </span>
      </div>

      <style jsx>{`
        .planet-card {
          border: 1px solid rgba(212,175,55,0.15);
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .planet-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }
        .planet-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .planet-symbol {
          font-size: 2rem;
          line-height: 1;
          flex-shrink: 0;
          filter: drop-shadow(0 0 6px currentColor);
          width: 36px;
          text-align: center;
        }
        .planet-info {
          flex: 1;
          min-width: 0;
        }
        .planet-name {
          display: block;
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.05em;
        }
        .planet-meaning {
          display: block;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
          margin-top: 0.15rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .planet-position {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.15rem;
        }
        .position-sign {
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.04em;
        }
        .position-deg {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.35);
        }
        .planet-progress {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .progress-track {
          height: 4px;
          background: rgba(255,255,255,0.07);
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.8s ease;
        }
        .progress-label {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.3);
        }
        .planet-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .tag {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid;
          border-radius: 20px;
          padding: 0.15rem 0.6rem;
        }
        .tag-dim {
          border-color: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.35);
        }
      `}</style>
    </div>
  );
}
