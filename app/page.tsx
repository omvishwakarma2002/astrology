'use client';

import { useMemo } from 'react';
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

const DAY_COLORS = [
  {
    day: 'Sunday',
    planet: 'Sun', symbol: '☉',
    colors: ['#FF8C00', '#FFD700', '#FFA500'],
    colorNames: ['Orange', 'Gold', 'Amber'],
    hex: '#FFD700',
    meaning: 'Attracts success, confidence, and vitality. Wear gold or orange to radiate solar energy and draw recognition, leadership opportunities, and joy into your day.',
    avoid: 'Dark blue or black — they suppress the Sun\'s expansive energy.',
    lucky: 'Gold jewellery amplifies this day\'s power enormously.',
  },
  {
    day: 'Monday',
    planet: 'Moon', symbol: '☽',
    colors: ['#C0C0C0', '#E8E8E8', '#B0C4DE'],
    colorNames: ['White', 'Silver', 'Pearl'],
    hex: '#C0C0C0',
    meaning: 'Attracts emotional healing, intuition, and inner peace. White and silver align you with lunar energy — perfect for nurturing relationships, creative work, and self-care.',
    avoid: 'Red or fiery tones — they clash with the Moon\'s gentle, reflective energy.',
    lucky: 'Wearing a pearl or moonstone on Mondays multiplies the Moon\'s blessings.',
  },
  {
    day: 'Tuesday',
    planet: 'Mars', symbol: '♂',
    colors: ['#DC143C', '#FF4500', '#B22222'],
    colorNames: ['Red', 'Crimson', 'Scarlet'],
    hex: '#DC143C',
    meaning: 'Attracts courage, energy, and determination. Red is the colour of Mars — wear it when you need to be bold, assert yourself, win competitions, or overcome obstacles.',
    avoid: 'Pale or pastel shades — they dilute Mars\'s fierce warrior energy.',
    lucky: 'Red clothing in a job interview or important meeting on Tuesday gives you a powerful edge.',
  },
  {
    day: 'Wednesday',
    planet: 'Mercury', symbol: '☿',
    colors: ['#00CED1', '#32CD32', '#98FB98'],
    colorNames: ['Green', 'Teal', 'Emerald'],
    hex: '#32CD32',
    meaning: 'Attracts clear communication, intelligence, and business success. Mercury\'s green and teal shades sharpen your mind and open doors in negotiations, learning, and deals.',
    avoid: 'Heavy dark tones — they slow Mercury\'s quick, communicative vibration.',
    lucky: 'Wearing green on Wednesday before an exam, pitch, or important conversation is extremely auspicious.',
  },
  {
    day: 'Thursday',
    planet: 'Jupiter', symbol: '♃',
    colors: ['#FFD700', '#DAA520', '#FFA07A'],
    colorNames: ['Yellow', 'Golden', 'Saffron'],
    hex: '#DAA520',
    meaning: 'Attracts abundance, luck, wisdom, and spiritual growth. Jupiter\'s yellow and saffron tones are the most powerful for attracting financial prosperity and expanding opportunities.',
    avoid: 'Grey or dull colours — they dampen Jupiter\'s expansive, generous energy.',
    lucky: 'Yellow is considered the single luckiest colour of the entire week — Thursday is your golden day.',
  },
  {
    day: 'Friday',
    planet: 'Venus', symbol: '♀',
    colors: ['#FFB6C1', '#FF69B4', '#DDA0DD'],
    colorNames: ['Pink', 'Rose', 'Lavender'],
    hex: '#FFB6C1',
    meaning: 'Attracts love, beauty, harmony, and social grace. Venus\'s pink and pastel shades make you more magnetic, charming, and appealing — perfect for dates, social events, and creative work.',
    avoid: 'Black or harsh tones — they block Venus\'s soft, loving vibration.',
    lucky: 'Pink roses or pink quartz crystals worn on Friday powerfully amplify Venus blessings in love.',
  },
  {
    day: 'Saturday',
    planet: 'Saturn', symbol: '♄',
    colors: ['#1a1a2e', '#4B0082', '#2F4F4F'],
    colorNames: ['Black', 'Dark Blue', 'Indigo'],
    hex: '#4B0082',
    meaning: 'Attracts discipline, protection, karmic resolution, and long-term success. Saturn\'s dark colours create a powerful shield and help you focus on serious, long-term goals and important work.',
    avoid: 'Bright colours — they conflict with Saturday\'s serious, concentrated energy.',
    lucky: 'Wearing black or navy on Saturday while doing serious work or meditation is deeply empowering.',
  },
];

function TodayColorCard() {
  const today = useMemo(() => DAY_COLORS[new Date().getDay()], []);
  return (
    <div className="today-color-banner" style={{ borderColor: today.hex + '66', background: `linear-gradient(135deg, ${today.hex}18, ${today.colors[1]}10)` }}>
      <div className="today-left">
        <div className="today-label">Today is {today.day}</div>
        <h3 className="today-title" style={{ color: today.hex }}>Wear {today.colorNames.join(', ')}</h3>
        <div className="today-planet">
          <span className="today-planet-symbol">{today.symbol}</span>
          Ruled by {today.planet}
        </div>
        <p className="today-meaning">{today.meaning}</p>
        <div className="today-avoid">❌ Avoid: {today.avoid}</div>
      </div>
      <div className="today-swatches">
        {today.colors.map((c, i) => (
          <div key={i} className="today-swatch-wrap">
            <div className="today-swatch" style={{ background: c }} />
            <span className="today-swatch-name">{today.colorNames[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

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

      {/* Danger preview */}
      <section className="section-container teaser-section">
        <div className="teaser-header">
          <span className="features-eyebrow">Cosmic Warnings</span>
          <h2 className="features-title">⚠️ What to Stay Away From</h2>
          <p className="features-desc">The planets reveal hidden dangers and situations to avoid — personalised to your birth chart</p>
        </div>
        <div className="danger-preview-grid">
          {[
            { icon: '💸', title: 'Risky Financial Decisions', tag: '🔴 High Risk', desc: 'Planetary tension warns against impulsive spending, gambling, or investing in things you don\'t fully understand. Avoid signing financial agreements without careful review.' },
            { icon: '🗣️', title: 'Arguments & Harsh Words', tag: '🔴 High Risk', desc: 'Mercury\'s position heightens the risk of miscommunication. Words spoken in anger now may cause lasting damage — think twice before sending that message.' },
            { icon: '💔', title: 'Rushing into Romance', tag: '🟡 Caution', desc: 'The stars caution against moving too fast in love. What feels like intense connection may be illusion. Take your time before making serious commitments.' },
            { icon: '⚡', title: 'Impulsive Major Decisions', tag: '🔴 High Risk', desc: 'Uranus is electrifying your chart — drastic decisions like quitting your job or ending a relationship may feel urgent. Wait at least two weeks before acting.' },
            { icon: '🌀', title: 'Overthinking & Anxiety', tag: '🟡 Caution', desc: 'Mercury energy is amplifying worst-case thinking. Recognize when your mind is spinning stories rather than solving real problems. Breathe and return to the present.' },
            { icon: '🍷', title: 'Escapism & Excess', tag: '🟡 Caution', desc: 'Neptune\'s influence may tempt you toward overindulgence. These provide momentary relief but deepen the underlying issues. Stay grounded.' },
          ].map((d, i) => (
            <div key={i} className="danger-preview-card">
              <div className="dp-top">
                <span className="dp-icon">{d.icon}</span>
                <div>
                  <span className="dp-tag">{d.tag}</span>
                  <div className="dp-title">{d.title}</div>
                </div>
              </div>
              <p className="dp-desc">{d.desc}</p>
            </div>
          ))}
        </div>
        <div className="teaser-cta-row">
          <Link href="/predictions" className="teaser-cta">Get My Personal Warnings →</Link>
        </div>
      </section>

      {/* Lucky activities preview */}
      <section className="section-container teaser-section">
        <div className="teaser-header">
          <span className="features-eyebrow">Cosmic Blessings</span>
          <h2 className="features-title">✨ Good Luck Activities</h2>
          <p className="features-desc">Planetary-aligned actions that amplify your fortune — personalised to your birth chart</p>
        </div>
        <div className="lucky-preview-grid">
          {[
            { icon: '🧘', activity: 'Morning Meditation', time: 'Sunrise, before checking your phone', desc: 'Jupiter aligns with your natal Moon, amplifying inner clarity. Even 10 minutes at sunrise will supercharge your intuition for the entire day.' },
            { icon: '✍️', activity: 'Journaling Your Dreams', time: 'Within 5 minutes of waking', desc: 'Neptune is activated in your chart, making the dream world rich with guidance. Write immediately upon waking — the messages are literal gold.' },
            { icon: '🌿', activity: 'Walking Barefoot in Nature', time: 'Golden hour — 1 hour before sunset', desc: 'Venus trines your Earth planets. Direct contact with grass or soil grounds your energy and dissolves accumulated stress at the cellular level.' },
            { icon: '🎨', activity: 'Creative Expression', time: 'Afternoon, when creative flow peaks', desc: 'The Sun-Neptune aspect floods your chart with creative inspiration. Painting, writing, dancing or music will not only bring joy but may produce your finest work yet.' },
            { icon: '💰', activity: 'Saving or Investing Wisely', time: 'Wednesday or Thursday', desc: 'Jupiter trines your natal Saturn, creating one of the most auspicious windows of the year for financial decisions made from patience and wisdom.' },
            { icon: '🙏', activity: 'Gratitude Practice', time: 'Last thing before sleep', desc: 'Venus and Jupiter together create a powerful gratitude vortex. Writing 5 specific things you\'re grateful for each evening will magnetically attract more of the same.' },
            { icon: '🌱', activity: 'Starting a New Project', time: 'Within 48 hours of your reading', desc: 'New Moon energy combined with Jupiter\'s expansion means any seed you plant right now has unusually fertile ground to grow from.' },
            { icon: '🧹', activity: 'Decluttering Your Space', time: 'Weekend morning', desc: 'Saturn is pushing you to release what no longer serves. Clearing physical clutter creates energetic space for new blessings and opportunities to enter.' },
          ].map((a, i) => (
            <div key={i} className="lucky-preview-card">
              <div className="lp-top">
                <span className="lp-icon">{a.icon}</span>
                <span className="lp-activity">{a.activity}</span>
              </div>
              <p className="lp-desc">{a.desc}</p>
              <div className="lp-time">🕐 Best time: {a.time}</div>
            </div>
          ))}
        </div>
        <div className="teaser-cta-row">
          <Link href="/predictions" className="teaser-cta lucky-cta">Get My Lucky Activities →</Link>
        </div>
      </section>

      {/* Lucky colors by day */}
      <section className="section-container teaser-section">
        <div className="teaser-header">
          <span className="features-eyebrow">Planetary Colours</span>
          <h2 className="features-title">🎨 What Colour to Wear Each Day</h2>
          <p className="features-desc">Every day of the week is ruled by a planet — wearing its colour aligns you with that planet&apos;s energy and invites its blessings</p>
        </div>

        {/* Today's highlight */}
        <TodayColorCard />

        {/* All 7 days */}
        <div className="color-week-grid">
          {DAY_COLORS.map((d) => (
            <div key={d.day} className="color-day-card">
              <div className="color-swatch" style={{ background: `linear-gradient(135deg, ${d.colors[0]}, ${d.colors[1]})` }}>
                <span className="color-planet-symbol">{d.symbol}</span>
              </div>
              <div className="color-day-info">
                <div className="color-day-name">{d.day}</div>
                <div className="color-planet-name">{d.planet}</div>
                <div className="color-names-row">
                  {d.colorNames.map(c => (
                    <span key={c} className="color-name-chip">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded detail cards */}
        <div className="color-detail-grid">
          {DAY_COLORS.map((d) => (
            <div key={d.day} className="color-detail-card" style={{ borderColor: d.hex + '44' }}>
              <div className="cd-header">
                <div className="cd-swatch" style={{ background: `linear-gradient(135deg, ${d.colors[0]}, ${d.colors[1]})` }}>
                  <span className="cd-symbol">{d.symbol}</span>
                </div>
                <div>
                  <div className="cd-day" style={{ color: d.hex }}>{d.day}</div>
                  <div className="cd-planet">Ruled by {d.planet}</div>
                  <div className="cd-colornames">{d.colorNames.join(' · ')}</div>
                </div>
              </div>
              <p className="cd-meaning">{d.meaning}</p>
              <div className="cd-avoid">
                <span className="cd-avoid-label">❌ Avoid:</span> {d.avoid}
              </div>
              <div className="cd-lucky">
                <span className="cd-lucky-label">✦ Pro tip:</span> {d.lucky}
              </div>
            </div>
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

        /* Teaser sections */
        .teaser-section { padding-top: 0; padding-bottom: 5rem; }
        .teaser-header { text-align: center; margin-bottom: 2.5rem; }
        .teaser-cta-row { text-align: center; margin-top: 2rem; }
        .teaser-cta {
          display: inline-block;
          background: linear-gradient(135deg, rgba(248,113,113,0.15), rgba(248,113,113,0.05));
          border: 1px solid rgba(248,113,113,0.35);
          color: #f87171;
          text-decoration: none;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
          transition: all 0.2s;
        }
        .teaser-cta:hover { background: rgba(248,113,113,0.2); transform: translateY(-2px); }
        .lucky-cta {
          background: linear-gradient(135deg, rgba(52,211,153,0.15), rgba(52,211,153,0.05));
          border-color: rgba(52,211,153,0.35);
          color: #34d399;
        }
        .lucky-cta:hover { background: rgba(52,211,153,0.2); }

        /* Danger preview */
        .danger-preview-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) { .danger-preview-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .danger-preview-grid { grid-template-columns: 1fr 1fr 1fr; } }
        .danger-preview-card {
          background: rgba(248,113,113,0.05);
          border: 1px solid rgba(248,113,113,0.18);
          border-left: 4px solid #f87171;
          border-radius: 12px;
          padding: 1.1rem 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          transition: background 0.2s;
        }
        .danger-preview-card:hover { background: rgba(248,113,113,0.09); }
        .dp-top { display: flex; align-items: flex-start; gap: 0.75rem; }
        .dp-icon { font-size: 1.5rem; flex-shrink: 0; }
        .dp-tag { font-size: 0.68rem; font-weight: 700; color: rgba(255,255,255,0.45); display: block; margin-bottom: 0.15rem; }
        .dp-title { font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 700; color: #fff; }
        .dp-desc { color: rgba(255,255,255,0.58); font-size: 0.83rem; line-height: 1.7; margin: 0; }

        /* Lucky preview */
        .lucky-preview-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) { .lucky-preview-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .lucky-preview-grid { grid-template-columns: 1fr 1fr 1fr 1fr; } }
        .lucky-preview-card {
          background: rgba(52,211,153,0.05);
          border: 1px solid rgba(52,211,153,0.18);
          border-radius: 12px;
          padding: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          transition: background 0.2s;
        }
        .lucky-preview-card:hover { background: rgba(52,211,153,0.1); }
        .lp-top { display: flex; align-items: center; gap: 0.6rem; }
        .lp-icon { font-size: 1.4rem; }
        .lp-activity { font-family: 'Cinzel', serif; font-size: 0.88rem; font-weight: 700; color: #34d399; }
        .lp-desc { color: rgba(255,255,255,0.58); font-size: 0.82rem; line-height: 1.7; margin: 0; flex: 1; }
        .lp-time { font-size: 0.75rem; font-weight: 600; color: #d4af37; margin-top: auto; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.06); }

        /* Today color banner */
        .today-color-banner {
          border: 1px solid;
          border-radius: 18px;
          padding: 2rem;
          display: flex;
          align-items: flex-start;
          gap: 2rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .today-left { flex: 1; min-width: 220px; }
        .today-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 0.35rem; }
        .today-title { font-family: 'Cinzel', serif; font-size: clamp(1.3rem, 3vw, 1.9rem); font-weight: 700; margin: 0 0 0.5rem; }
        .today-planet { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-bottom: 0.85rem; }
        .today-planet-symbol { font-size: 1.1rem; }
        .today-meaning { color: rgba(255,255,255,0.7); font-size: 0.9rem; line-height: 1.8; margin: 0 0 0.85rem; }
        .today-avoid { font-size: 0.82rem; color: rgba(255,255,255,0.45); font-style: italic; }
        .today-swatches { display: flex; gap: 1rem; align-items: flex-start; flex-shrink: 0; }
        .today-swatch-wrap { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }
        .today-swatch { width: 56px; height: 56px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.15); box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
        .today-swatch-name { font-size: 0.7rem; color: rgba(255,255,255,0.5); font-weight: 600; }

        /* Week grid */
        .color-week-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.6rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 640px) { .color-week-grid { grid-template-columns: repeat(4, 1fr); } }
        .color-day-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 0.5rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          transition: background 0.2s;
        }
        .color-day-card:hover { background: rgba(255,255,255,0.07); }
        .color-swatch { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
        .color-planet-symbol { font-size: 1.1rem; filter: drop-shadow(0 0 4px rgba(0,0,0,0.5)); }
        .color-day-info { text-align: center; }
        .color-day-name { font-family: 'Cinzel', serif; font-size: 0.72rem; font-weight: 700; color: #fff; }
        .color-planet-name { font-size: 0.65rem; color: rgba(255,255,255,0.4); margin-bottom: 0.3rem; }
        .color-names-row { display: flex; flex-direction: column; gap: 0.15rem; align-items: center; }
        .color-name-chip { font-size: 0.6rem; color: rgba(255,255,255,0.5); }

        /* Detail cards */
        .color-detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) { .color-detail-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .color-detail-grid { grid-template-columns: 1fr 1fr 1fr; } }
        .color-detail-card {
          border: 1px solid;
          border-radius: 14px;
          padding: 1.25rem;
          background: rgba(255,255,255,0.02);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          transition: background 0.2s;
        }
        .color-detail-card:hover { background: rgba(255,255,255,0.05); }
        .cd-header { display: flex; align-items: center; gap: 0.85rem; }
        .cd-swatch { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
        .cd-symbol { font-size: 1.2rem; }
        .cd-day { font-family: 'Cinzel', serif; font-size: 1.05rem; font-weight: 700; }
        .cd-planet { font-size: 0.75rem; color: rgba(255,255,255,0.45); }
        .cd-colornames { font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.6); margin-top: 0.1rem; }
        .cd-meaning { color: rgba(255,255,255,0.68); font-size: 0.86rem; line-height: 1.75; margin: 0; }
        .cd-avoid { font-size: 0.8rem; color: rgba(255,120,120,0.8); background: rgba(255,100,100,0.07); border-radius: 8px; padding: 0.5rem 0.75rem; }
        .cd-avoid-label { font-weight: 700; margin-right: 0.3rem; }
        .cd-lucky { font-size: 0.8rem; color: rgba(212,175,55,0.9); background: rgba(212,175,55,0.07); border-radius: 8px; padding: 0.5rem 0.75rem; }
        .cd-lucky-label { font-weight: 700; margin-right: 0.3rem; color: #d4af37; }

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
