'use client';

import { useMemo } from 'react';
import PlanetCard from '@/components/PlanetCard';
import { calculatePlanetPositions, PlanetPosition } from '@/lib/astrology';
import { useLanguage } from '@/lib/LanguageContext';
import { t } from '@/lib/translations';

export default function PlanetsPage() {
  const { lang } = useLanguage();
  const now = new Date();
  const planets: PlanetPosition[] = useMemo(() => {
    return calculatePlanetPositions(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      now.getHours() + now.getMinutes() / 60
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // Element tallies
  const elementCounts = planets.reduce<Record<string, number>>((acc, p) => {
    acc[p.element] = (acc[p.element] || 0) + 1;
    return acc;
  }, {});

  const elementColors: Record<string, string> = {
    Fire: '#ef4444', Earth: '#22c55e', Air: '#eab308', Water: '#3b82f6',
  };

  return (
    <div className="page-wrapper">
      <div className="section-container">
        {/* Header */}
        <div className="page-header">
          <span className="page-eyebrow">{t('planets.eyebrow', lang)}</span>
          <h1 className="page-title">{t('planets.title', lang)}</h1>
          <div className="time-display">
            <span className="time-icon">◎</span>
            <span className="time-str">{dateStr} · {timeStr}</span>
          </div>
          <p className="page-desc">{t('planets.desc', lang)}</p>
        </div>

        {/* Element summary */}
        <div className="element-summary">
          {Object.entries(elementCounts).map(([element, count]) => (
            <div key={element} className="element-pill" style={{ borderColor: `${elementColors[element]}40` }}>
              <span className="element-dot" style={{ background: elementColors[element] }} />
              <span className="element-name" style={{ color: elementColors[element] }}>{element}</span>
              <span className="element-count">{count} {count === 1 ? 'planet' : 'planets'}</span>
            </div>
          ))}
        </div>

        {/* Planet grid */}
        <div className="planets-grid">
          {planets.map(planet => (
            <PlanetCard key={planet.name} planet={planet} />
          ))}
        </div>

        {/* Sky story */}
        <div className="glass-card sky-story">
          <h2 className="sky-story-title">Today&apos;s Celestial Story</h2>
          <p className="sky-story-text">
            The planetary alignment on <strong style={{ color: '#d4af37' }}>{dateStr}</strong> reveals
            the current cosmic weather shaping collective and personal experience.
            Each planet occupies a specific degree within a zodiac sign, colouring
            its archetypal energy with that sign&apos;s particular flavour.
          </p>
          <p className="sky-story-text">
            The <strong style={{ color: '#f59e0b' }}>Sun</strong> in{' '}
            <strong style={{ color: '#fff' }}>{planets.find(p => p.name === 'Sun')?.sign}</strong>{' '}
            anchors the collective identity, while the{' '}
            <strong style={{ color: '#c4b5fd' }}>Moon</strong> in{' '}
            <strong style={{ color: '#fff' }}>{planets.find(p => p.name === 'Moon')?.sign}</strong>{' '}
            guides emotional currents. Together, they weave the fabric of today&apos;s cosmic tapestry.
          </p>
          <div className="sky-note">
            <span className="sky-note-icon">✦</span>
            Positions calculated using mean longitude formulas accurate to within 1–2° for personal planets
            and within 3–5° for outer planets.
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-header {
          text-align: center;
          margin-bottom: 2rem;
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
        .time-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .time-icon { color: #d4af37; font-size: 1rem; }
        .time-str {
          font-size: 0.85rem;
          color: #d4af37;
          letter-spacing: 0.06em;
        }
        .page-desc {
          color: rgba(255,255,255,0.55);
          font-size: 1rem;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .element-summary {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 2rem;
        }
        .element-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid;
          border-radius: 40px;
          padding: 0.4rem 1rem;
          background: rgba(255,255,255,0.03);
        }
        .element-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .element-name {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.06em;
        }
        .element-count {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
        }
        .planets-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.9rem;
          margin-bottom: 2.5rem;
        }
        @media (min-width: 640px) {
          .planets-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .planets-grid { grid-template-columns: 1fr 1fr 1fr; }
        }
        .sky-story {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 780px;
          margin: 0 auto;
        }
        .sky-story-title {
          font-family: 'Cinzel', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #d4af37;
          letter-spacing: 0.08em;
          margin: 0;
        }
        .sky-story-text {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.8;
          margin: 0;
        }
        .sky-note {
          display: flex;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.35);
          line-height: 1.6;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(212,175,55,0.1);
        }
        .sky-note-icon { color: #d4af37; flex-shrink: 0; }
      `}</style>
    </div>
  );
}
