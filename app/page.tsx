'use client';

import Link from 'next/link';

const features = [
  {
    href: '/birth-chart',
    icon: '⊕',
    title: 'Birth Chart',
    subtitle: 'Your Cosmic Blueprint',
    description:
      'Enter your birth date, time, and place to generate a personalised natal chart. Discover the exact positions of the Sun, Moon, and planets at the moment you arrived in the world.',
    color: '#d4af37',
    bg: 'rgba(212,175,55,0.08)',
    border: 'rgba(212,175,55,0.25)',
  },
  {
    href: '/horoscope',
    icon: '☽',
    title: 'Daily Horoscope',
    subtitle: 'Celestial Guidance',
    description:
      'Receive detailed daily readings for all twelve zodiac signs covering love, career, and wellbeing — channelling the ancient wisdom of the stars into practical, inspiring guidance.',
    color: '#818cf8',
    bg: 'rgba(129,140,248,0.08)',
    border: 'rgba(129,140,248,0.25)',
  },
  {
    href: '/compatibility',
    icon: '♾',
    title: 'Compatibility',
    subtitle: 'Cosmic Chemistry',
    description:
      'Explore the elemental and modal dynamics between any two zodiac signs. Uncover your strengths, challenges, and the deeper cosmic forces that shape your most important relationships.',
    color: '#f472b6',
    bg: 'rgba(244,114,182,0.08)',
    border: 'rgba(244,114,182,0.25)',
  },
  {
    href: '/planets',
    icon: '⟡',
    title: 'Live Planets',
    subtitle: 'The Celestial Stage',
    description:
      'Track the current positions of all major planets in real time. Understand how today\'s planetary alignments are shaping collective energy and your personal experience.',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.25)',
  },
  {
    href: '/predictions',
    icon: '🔮',
    title: 'Predict Future',
    subtitle: 'Cosmic Forecast',
    description:
      'Discover what the planets have in store for you. Get personalised predictions for love, career, money, health, and spiritual growth — this week, this month, and this year.',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.25)',
  },
];

const signs = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

export default function HomePage() {
  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-orb orb-1" />
        <div className="hero-bg-orb orb-2" />

        <div className="hero-content">
          <div className="hero-signs">
            {signs.map((s, i) => (
              <span key={i} className="hero-sign-glyph" style={{ animationDelay: `${i * 0.2}s` }}>
                {s}
              </span>
            ))}
          </div>

          <div className="hero-star">✦</div>

          <h1 className="hero-title">
            Discover Your<br />
            <span className="hero-title-accent">Cosmic Blueprint</span>
          </h1>

          <p className="hero-subtitle">
            Ancient wisdom. Modern clarity. Explore the celestial forces that shape your destiny
            through personalised birth charts, daily horoscopes, and live planetary positions.
          </p>

          <div className="hero-cta">
            <Link href="/birth-chart" className="cta-primary">
              ✦ Reveal My Chart
            </Link>
            <Link href="/horoscope" className="cta-secondary">
              Today&apos;s Horoscope
            </Link>
            <Link href="/predictions" className="cta-secondary">
              🔮 Predict Future
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-container">
        <div className="features-header">
          <span className="features-eyebrow">Navigate the Stars</span>
          <h2 className="features-title">Your Celestial Toolkit</h2>
          <p className="features-desc">
            Five powerful gateways to deeper self-understanding and cosmic awareness
          </p>
        </div>

        <div className="features-grid">
          {features.map(f => (
            <Link key={f.href} href={f.href} className="feature-card" style={{ '--card-color': f.color, '--card-bg': f.bg, '--card-border': f.border } as React.CSSProperties}>
              <div className="feature-icon-wrap" style={{ background: f.bg, border: `1px solid ${f.border}` }}>
                <span className="feature-icon" style={{ color: f.color }}>{f.icon}</span>
              </div>
              <div className="feature-body">
                <span className="feature-subtitle" style={{ color: f.color }}>{f.subtitle}</span>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.description}</p>
              </div>
              <span className="feature-cta" style={{ color: f.color }}>
                Explore {f.title} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Zodiac strip */}
      <section className="zodiac-strip">
        <div className="zodiac-strip-inner">
          {[...signs, ...signs].map((s, i) => (
            <span key={i} className="zodiac-glyph">{s}</span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <p className="footer-brand">✦ Celestial</p>
        <p className="footer-text">
          Planetary positions calculated using astronomical algorithms.
          For entertainment and self-reflection purposes.
        </p>
      </footer>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: calc(100vh - 64px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 4rem 1.5rem;
        }
        .hero-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .orb-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%);
          top: -200px;
          left: -200px;
        }
        .orb-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 70%);
          bottom: -150px;
          right: -150px;
        }
        .hero-content {
          max-width: 720px;
          text-align: center;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .hero-signs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: -0.5rem;
        }
        .hero-sign-glyph {
          font-size: 1.1rem;
          color: rgba(212,175,55,0.4);
          animation: float 4s ease-in-out infinite;
        }
        .hero-star {
          font-size: 3rem;
          color: #d4af37;
          animation: pulse-glow 3s ease-in-out infinite;
          line-height: 1;
        }
        .hero-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.2rem, 6vw, 4rem);
          font-weight: 900;
          line-height: 1.15;
          color: #fff;
          margin: 0;
          letter-spacing: 0.02em;
        }
        .hero-title-accent {
          background: linear-gradient(135deg, #d4af37, #f5e17a, #d4af37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-subtitle {
          font-size: clamp(0.95rem, 2.5vw, 1.15rem);
          color: rgba(255,255,255,0.6);
          max-width: 580px;
          line-height: 1.8;
          margin: 0;
        }
        .hero-cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.5rem;
        }
        .cta-primary {
          background: linear-gradient(135deg, #d4af37, #b8960c);
          color: #0f0c29;
          text-decoration: none;
          padding: 0.875rem 2rem;
          border-radius: 8px;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(212,175,55,0.3);
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(212,175,55,0.45);
        }
        .cta-secondary {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          padding: 0.875rem 2rem;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.15);
          font-size: 0.95rem;
          font-weight: 600;
          transition: all 0.3s;
          letter-spacing: 0.02em;
        }
        .cta-secondary:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(212,175,55,0.35);
          color: #d4af37;
        }

        /* Features */
        .features-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .features-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #d4af37;
        }
        .features-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          font-weight: 700;
          color: #fff;
          margin: 0.5rem 0 0.75rem;
          letter-spacing: 0.04em;
        }
        .features-desc {
          color: rgba(255,255,255,0.5);
          font-size: 1rem;
          max-width: 480px;
          margin: 0 auto;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 640px) {
          .features-grid { grid-template-columns: 1fr 1fr; }
        }
        .feature-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.75rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--card-border);
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.3s;
        }
        .feature-card:hover {
          background: var(--card-bg);
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.5);
        }
        .feature-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .feature-icon {
          font-size: 1.6rem;
          line-height: 1;
        }
        .feature-body {
          flex: 1;
        }
        .feature-subtitle {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.3rem;
        }
        .feature-title {
          font-family: 'Cinzel', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 0.6rem;
          letter-spacing: 0.04em;
        }
        .feature-desc {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          margin: 0;
        }
        .feature-cta {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          transition: opacity 0.2s;
        }
        .feature-card:hover .feature-cta { opacity: 0.8; }

        /* Zodiac strip */
        .zodiac-strip {
          overflow: hidden;
          padding: 2rem 0;
          border-top: 1px solid rgba(212,175,55,0.08);
          border-bottom: 1px solid rgba(212,175,55,0.08);
        }
        .zodiac-strip-inner {
          display: flex;
          gap: 3rem;
          animation: scroll-strip 20s linear infinite;
          width: max-content;
        }
        .zodiac-glyph {
          font-size: 1.8rem;
          color: rgba(212,175,55,0.3);
          flex-shrink: 0;
        }
        @keyframes scroll-strip {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Footer */
        .site-footer {
          padding: 2.5rem 1.5rem;
          text-align: center;
          border-top: 1px solid rgba(212,175,55,0.08);
        }
        .footer-brand {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          color: #d4af37;
          margin: 0 0 0.5rem;
          letter-spacing: 0.1em;
        }
        .footer-text {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.25);
          margin: 0;
          max-width: 480px;
          margin-inline: auto;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(212,175,55,0.5)); }
          50%       { filter: drop-shadow(0 0 16px rgba(212,175,55,0.9)); }
        }
      `}</style>
    </div>
  );
}
