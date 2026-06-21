'use client';

import { useState, useMemo } from 'react';
import { generateForecast, FutureForecast, Prediction, Timeframe, ENERGY_LABELS, Energy, DangerWarning, LuckyActivity } from '@/lib/predictions';
import { useLanguage } from '@/lib/LanguageContext';
import { t, Lang } from '@/lib/translations';

const DAY_COLORS = [
  { day: 'Sunday',    planet: 'Sun',     symbol: '☉', colors: ['#FF8C00','#FFD700','#FFA500'], names: ['Orange','Gold','Amber'],       hex: '#FFD700', meaning: 'Attracts success, confidence, and vitality. Wear gold or orange to radiate solar energy and draw recognition, leadership opportunities, and joy into your day.', avoid: 'Dark blue or black — they suppress the Sun\'s expansive energy.', tip: 'Gold jewellery amplifies this day\'s power enormously.' },
  { day: 'Monday',    planet: 'Moon',    symbol: '☽', colors: ['#C0C0C0','#E8E8E8','#B0C4DE'], names: ['White','Silver','Pearl'],      hex: '#C0C0C0', meaning: 'Attracts emotional healing, intuition, and inner peace. White and silver align you with lunar energy — perfect for nurturing relationships, creative work, and self-care.', avoid: 'Red or fiery tones — they clash with the Moon\'s gentle, reflective energy.', tip: 'Wearing a pearl or moonstone on Mondays multiplies the Moon\'s blessings.' },
  { day: 'Tuesday',   planet: 'Mars',    symbol: '♂', colors: ['#DC143C','#FF4500','#B22222'], names: ['Red','Crimson','Scarlet'],     hex: '#DC143C', meaning: 'Attracts courage, energy, and determination. Red is the colour of Mars — wear it when you need to be bold, assert yourself, or overcome obstacles.', avoid: 'Pale or pastel shades — they dilute Mars\'s fierce warrior energy.', tip: 'Red clothing in a job interview on Tuesday gives you a powerful competitive edge.' },
  { day: 'Wednesday', planet: 'Mercury', symbol: '☿', colors: ['#00CED1','#32CD32','#98FB98'], names: ['Green','Teal','Emerald'],     hex: '#32CD32', meaning: 'Attracts clear communication, intelligence, and business success. Mercury\'s green shades sharpen your mind and open doors in negotiations, learning, and deals.', avoid: 'Heavy dark tones — they slow Mercury\'s quick, communicative vibration.', tip: 'Wearing green before an exam, pitch, or important conversation is extremely auspicious.' },
  { day: 'Thursday',  planet: 'Jupiter', symbol: '♃', colors: ['#FFD700','#DAA520','#FFA07A'], names: ['Yellow','Golden','Saffron'],  hex: '#DAA520', meaning: 'Attracts abundance, luck, wisdom, and spiritual growth. Jupiter\'s yellow tones are the most powerful for attracting financial prosperity and expanding opportunities.', avoid: 'Grey or dull colours — they dampen Jupiter\'s expansive, generous energy.', tip: 'Yellow is the single luckiest colour of the entire week — Thursday is your golden day.' },
  { day: 'Friday',    planet: 'Venus',   symbol: '♀', colors: ['#FFB6C1','#FF69B4','#DDA0DD'], names: ['Pink','Rose','Lavender'],     hex: '#FFB6C1', meaning: 'Attracts love, beauty, harmony, and social grace. Venus\'s pink shades make you more magnetic and charming — perfect for dates, social events, and creative work.', avoid: 'Black or harsh tones — they block Venus\'s soft, loving vibration.', tip: 'Pink roses or pink quartz crystals worn on Friday powerfully amplify Venus blessings in love.' },
  { day: 'Saturday',  planet: 'Saturn',  symbol: '♄', colors: ['#1a1a2e','#4B0082','#2F4F4F'], names: ['Black','Indigo','Dark Blue'], hex: '#4B0082', meaning: 'Attracts discipline, protection, karmic resolution, and long-term success. Saturn\'s dark colours create a powerful shield and help you focus on serious long-term goals.', avoid: 'Bright colours — they conflict with Saturday\'s serious, concentrated energy.', tip: 'Wearing black or navy while doing serious work or meditation on Saturday is deeply empowering.' },
];

const ENERGY_COLORS: Record<Energy, string> = {
  excellent:   '#22c55e',
  good:        '#84cc16',
  neutral:     '#94a3b8',
  challenging: '#f59e0b',
  intense:     '#a855f7',
};

const ENERGY_BG: Record<Energy, string> = {
  excellent:   'rgba(34,197,94,0.1)',
  good:        'rgba(132,204,22,0.1)',
  neutral:     'rgba(148,163,184,0.08)',
  challenging: 'rgba(245,158,11,0.1)',
  intense:     'rgba(168,85,247,0.1)',
};

function ScoreRing({ score, energy }: { score: number; energy: Energy }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const fill = circ * (score / 10);
  const color = ENERGY_COLORS[energy];

  return (
    <svg width="90" height="90" viewBox="0 0 90 90">
      <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
      <circle
        cx="45" cy="45" r={r} fill="none"
        stroke={color} strokeWidth="6"
        strokeDasharray={`${fill} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 45 45)"
        style={{ transition: 'stroke-dasharray 1s ease' }}
      />
      <text x="45" y="49" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700">{score}</text>
      <text x="45" y="60" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">/10</text>
    </svg>
  );
}

function PredictionCard({ pred, defaultOpen = false, lang = 'en' }: { pred: Prediction; defaultOpen?: boolean; lang?: Lang }) {
  const [open, setOpen] = useState(defaultOpen);
  const color = ENERGY_COLORS[pred.energy];
  const bg = ENERGY_BG[pred.energy];

  return (
    <div className="pred-card" style={{ borderColor: color + '33', background: bg }}>
      <button className="pred-header" onClick={() => setOpen(o => !o)}>
        <div className="pred-left">
          <span className="pred-icon">{pred.icon}</span>
          <div>
            <div className="pred-area">{pred.area}</div>
            <div className="pred-headline">{pred.headline}</div>
          </div>
        </div>
        <div className="pred-right">
          <span className="energy-badge" style={{ color, borderColor: color + '55' }}>
            {ENERGY_LABELS[pred.energy]}
          </span>
          <ScoreRing score={pred.score} energy={pred.energy} />
          <span className="chevron" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
        </div>
      </button>

      {open && (
        <div className="pred-body">
          <p className="pred-detail">{pred.detail}</p>
          <div className="pred-footer">
            <div className="advice-box">
              <span className="advice-label">{t('pred.cosmicAdvice', lang)}</span>
              <span className="advice-text">{pred.advice}</span>
            </div>
            <div className="lucky-days">
              <span className="advice-label">{t('pred.luckyDays', lang)}</span>
              <div className="days-row">
                {pred.luckyDays.map(d => (
                  <span key={d} className="day-chip" style={{ borderColor: color + '55', color }}>{d}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .pred-card {
          border: 1px solid;
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .pred-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: transparent;
          border: none;
          cursor: pointer;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .pred-left {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          text-align: left;
        }
        .pred-icon { font-size: 1.8rem; flex-shrink: 0; }
        .pred-area {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.2rem;
        }
        .pred-headline {
          font-family: 'Cinzel', serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.3;
        }
        .pred-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }
        .energy-badge {
          font-size: 0.72rem;
          font-weight: 700;
          border: 1px solid;
          border-radius: 20px;
          padding: 0.2rem 0.65rem;
          white-space: nowrap;
        }
        .chevron {
          color: rgba(255,255,255,0.4);
          font-size: 1rem;
          transition: transform 0.25s ease;
        }
        .pred-body {
          padding: 0 1.25rem 1.25rem;
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pred-detail {
          color: rgba(255,255,255,0.72);
          font-size: 0.93rem;
          line-height: 1.85;
          margin: 0 0 1.25rem;
        }
        .pred-footer {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .advice-box {
          background: rgba(255,255,255,0.04);
          border-radius: 10px;
          padding: 0.85rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .advice-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #d4af37;
        }
        .advice-text {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.8);
          font-style: italic;
        }
        .lucky-days { display: flex; flex-direction: column; gap: 0.4rem; }
        .days-row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .day-chip {
          font-size: 0.75rem;
          font-weight: 600;
          border: 1px solid;
          border-radius: 20px;
          padding: 0.2rem 0.65rem;
        }
      `}</style>
    </div>
  );
}

function TodayHighlight({ lang = 'en' }: { lang?: Lang }) {
  const today = useMemo(() => DAY_COLORS[new Date().getDay()], []);
  const dayKey = `day.${today.day}` as const;
  return (
    <div className="today-highlight" style={{ borderColor: today.hex + '55', background: `linear-gradient(135deg, ${today.hex}14, ${today.colors[1]}08)` }}>
      <div className="th-left">
        <span className="th-label">{t('pred.todayIs', lang)} — {t(dayKey, lang)}</span>
        <div className="th-wear">{t('pred.wear', lang)} <span style={{ color: today.hex, fontWeight: 700 }}>{today.names.join(', ')}</span></div>
        <div className="th-planet">{today.symbol} {t('pred.ruledBy', lang)} {today.planet}</div>
        <p className="th-meaning">{today.meaning}</p>
        <div className="th-avoid">❌ {t('pred.avoid', lang)} {today.avoid}</div>
      </div>
      <div className="th-swatches">
        {today.colors.map((c, i) => (
          <div key={i} className="th-swatch-wrap">
            <div className="th-swatch" style={{ background: c }} />
            <span className="th-swatch-name">{today.names[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PredictionsPage() {
  const { lang } = useLanguage();
  const [form, setForm] = useState({ name: '', date: '', time: '12:00' });
  const [forecast, setForecast] = useState<FutureForecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Timeframe>('week');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date) return;
    setLoading(true);
    setTimeout(() => {
      const [y, m, d] = form.date.split('-').map(Number);
      const [h, min] = form.time.split(':').map(Number);
      setForecast(generateForecast(y, m, d, h + min / 60, lang));
      setLoading(false);
    }, 900);
  };

  const currentPreds = forecast ? forecast[tab] : [];
  const tabLabels: { key: Timeframe; label: string }[] = [
    { key: 'week', label: t('pred.thisWeek', lang) },
    { key: 'month', label: t('pred.thisMonth', lang) },
    { key: 'year', label: t('pred.thisYear', lang) },
  ];

  return (
    <div className="page-wrapper">
      <div className="section-container">

        {/* Header */}
        <div className="page-header">
          <span className="eyebrow">{t('pred.eyebrow', lang)}</span>
          <h1 className="page-title">{t('pred.title', lang)}</h1>
          <p className="page-desc">{t('pred.desc', lang)}</p>
        </div>

        {/* Form */}
        <form className="glass-card form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label className="label">{t('pred.name', lang)}</label>
              <input
                className="input"
                type="text"
                placeholder={t('birthChart.form.namePlaceholder', lang)}
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="field">
              <label className="label">{t('pred.date', lang)}</label>
              <input
                className="input"
                type="date"
                required
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
            </div>
            <div className="field">
              <label className="label">{t('pred.time', lang)}</label>
              <input
                className="input"
                type="time"
                value={form.time}
                onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
              />
            </div>
          </div>
          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? t('pred.loading', lang) : t('pred.submit', lang)}
          </button>
        </form>

        {/* Results */}
        {forecast && (
          <div className="results">

            {/* Overall energy banner */}
            <div className="overall-banner" style={{
              borderColor: ENERGY_COLORS[forecast.overallEnergy] + '44',
              background: ENERGY_BG[forecast.overallEnergy],
            }}>
              <div className="banner-top">
                <div>
                  <div className="banner-label">{t('pred.overallEnergy', lang)}</div>
                  <div className="banner-energy" style={{ color: ENERGY_COLORS[forecast.overallEnergy] }}>
                    {ENERGY_LABELS[forecast.overallEnergy]}
                  </div>
                </div>
                <ScoreRing score={forecast.overallScore} energy={forecast.overallEnergy} />
              </div>
              <p className="cosmic-message">{forecast.cosmicMessage}</p>
            </div>

            {/* Power dates */}
            <div className="glass-card power-card">
              <h3 className="section-title">{t('pred.powerDates', lang)}</h3>
              <div className="dates-list">
                {forecast.powerDates.map((pd, i) => (
                  <div key={i} className="power-date">
                    <span className="pd-date">{pd.date}</span>
                    <span className="pd-event">{pd.event}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="tabs-row">
              {tabLabels.map(({ key, label }) => (
                <button
                  key={key}
                  className={`tab-btn ${tab === key ? 'active' : ''}`}
                  onClick={() => setTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Predictions */}
            <div className="preds-list">
              {currentPreds.map((pred, i) => (
                <PredictionCard key={pred.area} pred={pred} defaultOpen={i === 0} lang={lang} />
              ))}
            </div>

            {/* Danger warnings */}
            <div className="glass-card danger-card">
              <h3 className="section-title danger-title">{t('pred.dangers', lang)}</h3>
              <p className="section-sub">{t('pred.dangersDesc', lang)}</p>
              <div className="danger-list">
                {forecast.dangers.map((d, i) => (
                  <div key={i} className={`danger-item severity-${d.severity}`}>
                    <div className="danger-header">
                      <span className="danger-icon">{d.icon}</span>
                      <div className="danger-info">
                        <span className={`severity-badge badge-${d.severity}`}>
                          {d.severity === 'high' ? t('pred.highRisk', lang) : d.severity === 'medium' ? t('pred.caution', lang) : t('pred.mildWarning', lang)}
                        </span>
                        <span className="danger-title-text">{d.title}</span>
                      </div>
                    </div>
                    <p className="danger-desc">{d.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lucky activities */}
            <div className="glass-card lucky-card">
              <h3 className="section-title lucky-title">{t('pred.lucky', lang)}</h3>
              <p className="section-sub">{t('pred.luckyDesc', lang)}</p>
              <div className="lucky-grid">
                {forecast.luckyActivities.map((a, i) => (
                  <div key={i} className="lucky-item">
                    <div className="lucky-top">
                      <span className="lucky-icon">{a.icon}</span>
                      <span className="lucky-activity">{a.activity}</span>
                    </div>
                    <p className="lucky-reason">{a.reason}</p>
                    <div className="lucky-time">
                      <span className="clock-icon">🕐</span>
                      <span className="best-time">{t('pred.bestTime', lang)} {a.bestTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lucky colors by day */}
            <div className="glass-card colors-card">
              <h3 className="section-title colors-title">{t('pred.colors', lang)}</h3>
              <p className="section-sub">{t('pred.colorsDesc', lang)}</p>

              {/* Today highlight */}
              <TodayHighlight lang={lang} />

              {/* All 7 days */}
              <div className="week-swatches">
                {DAY_COLORS.map((d) => (
                  <div key={d.day} className="swatch-col">
                    <div className="swatch-circle" style={{ background: `linear-gradient(135deg, ${d.colors[0]}, ${d.colors[1]})` }}>
                      <span className="swatch-symbol">{d.symbol}</span>
                    </div>
                    <span className="swatch-day">{d.day.slice(0,3)}</span>
                    <span className="swatch-color-name">{d.names[0]}</span>
                  </div>
                ))}
              </div>

              {/* Detail rows */}
              <div className="color-details">
                {DAY_COLORS.map((d) => (
                  <div key={d.day} className="color-detail-row" style={{ borderLeftColor: d.hex }}>
                    <div className="cdr-header">
                      <div className="cdr-dot" style={{ background: `linear-gradient(135deg, ${d.colors[0]}, ${d.colors[1]})` }}>
                        <span className="cdr-sym">{d.symbol}</span>
                      </div>
                      <div>
                        <span className="cdr-day" style={{ color: d.hex }}>{d.day}</span>
                        <span className="cdr-planet"> · {d.planet} · </span>
                        <span className="cdr-names">{d.names.join(', ')}</span>
                      </div>
                    </div>
                    <p className="cdr-meaning">{d.meaning}</p>
                    <div className="cdr-footer">
                      <span className="cdr-avoid">❌ Avoid: {d.avoid}</span>
                      <span className="cdr-tip">✦ {d.tip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="disclaimer">{t('pred.disclaimer', lang)}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .page-header { text-align: center; margin-bottom: 2.5rem; }
        .eyebrow {
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #d4af37;
        }
        .page-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700; color: #fff;
          margin: 0.5rem 0 0.75rem; letter-spacing: 0.04em;
        }
        .page-desc {
          color: rgba(255,255,255,0.55); font-size: 1rem;
          max-width: 540px; margin: 0 auto; line-height: 1.7;
        }
        .form-card { padding: 2rem; max-width: 680px; margin: 0 auto 2.5rem; }
        .form-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; margin-bottom: 1.5rem; }
        @media (min-width: 640px) { .form-grid { grid-template-columns: 1fr 1fr 1fr; } }
        .field { display: flex; flex-direction: column; gap: 0.4rem; }
        .label { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.5); }
        .input {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 0.7rem 1rem;
          color: #fff; font-size: 0.95rem; outline: none;
          transition: border-color 0.2s;
        }
        .input:focus { border-color: rgba(212,175,55,0.5); }
        .submit-btn {
          width: 100%; padding: 0.9rem;
          background: linear-gradient(135deg, #d4af37, #b8962e);
          border: none; border-radius: 12px;
          color: #1a1a2e; font-weight: 700; font-size: 1rem;
          cursor: pointer; transition: opacity 0.2s;
          font-family: 'Cinzel', serif; letter-spacing: 0.05em;
        }
        .submit-btn:hover { opacity: 0.9; }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .results { display: flex; flex-direction: column; gap: 1.75rem; animation: fadeIn 0.5s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .overall-banner {
          border: 1px solid; border-radius: 16px; padding: 1.75rem;
        }
        .banner-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
        .banner-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 0.3rem; }
        .banner-energy { font-family: 'Cinzel', serif; font-size: 1.6rem; font-weight: 700; }
        .cosmic-message { color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.85; margin: 0; font-style: italic; }
        .power-card { padding: 1.5rem; }
        .section-title { font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 700; color: #d4af37; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 1rem; }
        .dates-list { display: flex; flex-direction: column; gap: 0.6rem; }
        .power-date { display: flex; align-items: flex-start; gap: 1rem; padding: 0.6rem 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .power-date:last-child { border-bottom: none; }
        .pd-date { font-size: 0.8rem; font-weight: 700; color: #d4af37; white-space: nowrap; min-width: 60px; }
        .pd-event { font-size: 0.88rem; color: rgba(255,255,255,0.65); line-height: 1.4; }
        .tabs-row { display: flex; gap: 0.5rem; background: rgba(255,255,255,0.04); border-radius: 12px; padding: 4px; }
        .tab-btn {
          flex: 1; padding: 0.6rem 1rem; border: none; border-radius: 10px;
          font-size: 0.88rem; font-weight: 600; cursor: pointer;
          background: transparent; color: rgba(255,255,255,0.5);
          transition: all 0.2s; font-family: inherit;
        }
        .tab-btn.active { background: rgba(212,175,55,0.15); color: #d4af37; }
        .preds-list { display: flex; flex-direction: column; gap: 0.75rem; }
        /* Danger section */
        .danger-card { padding: 1.75rem; }
        .danger-title { color: #f87171 !important; }
        .lucky-title { color: #34d399 !important; }
        .section-sub { color: rgba(255,255,255,0.4); font-size: 0.85rem; margin: -0.5rem 0 1.25rem; }
        .danger-list { display: flex; flex-direction: column; gap: 0.9rem; }
        .danger-item {
          border-radius: 12px;
          padding: 1rem 1.15rem;
          border-left: 4px solid;
        }
        .severity-high { background: rgba(248,113,113,0.08); border-color: #f87171; }
        .severity-medium { background: rgba(251,191,36,0.08); border-color: #fbbf24; }
        .severity-low { background: rgba(148,163,184,0.08); border-color: #94a3b8; }
        .danger-header { display: flex; align-items: flex-start; gap: 0.85rem; margin-bottom: 0.6rem; }
        .danger-icon { font-size: 1.5rem; flex-shrink: 0; margin-top: 2px; }
        .danger-info { display: flex; flex-direction: column; gap: 0.2rem; }
        .severity-badge { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; }
        .danger-title-text { font-family: 'Cinzel', serif; font-size: 0.95rem; font-weight: 700; color: #fff; }
        .danger-desc { color: rgba(255,255,255,0.65); font-size: 0.88rem; line-height: 1.75; margin: 0; padding-left: 2.35rem; }

        /* Lucky activities section */
        .lucky-card { padding: 1.75rem; }
        .lucky-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        @media (min-width: 640px) { .lucky-grid { grid-template-columns: 1fr 1fr; } }
        .lucky-item {
          background: rgba(52,211,153,0.06);
          border: 1px solid rgba(52,211,153,0.2);
          border-radius: 12px;
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .lucky-top { display: flex; align-items: center; gap: 0.7rem; }
        .lucky-icon { font-size: 1.6rem; }
        .lucky-activity { font-family: 'Cinzel', serif; font-size: 0.95rem; font-weight: 700; color: #34d399; }
        .lucky-reason { color: rgba(255,255,255,0.65); font-size: 0.86rem; line-height: 1.75; margin: 0; }
        .lucky-time { display: flex; align-items: center; gap: 0.4rem; margin-top: auto; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.06); }
        .clock-icon { font-size: 0.8rem; }
        .best-time { font-size: 0.78rem; font-weight: 600; color: #d4af37; }

        /* Colors section */
        .colors-card { padding: 1.75rem; }
        .colors-title { color: #a78bfa !important; }

        .today-highlight {
          border: 1px solid;
          border-radius: 14px;
          padding: 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          margin: 1rem 0 1.5rem;
          flex-wrap: wrap;
        }
        .th-left { flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 0.4rem; }
        .th-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.4); }
        .th-wear { font-family: 'Cinzel', serif; font-size: 1.15rem; font-weight: 700; color: #fff; }
        .th-planet { font-size: 0.82rem; color: rgba(255,255,255,0.45); }
        .th-meaning { color: rgba(255,255,255,0.68); font-size: 0.87rem; line-height: 1.78; margin: 0.25rem 0; }
        .th-avoid { font-size: 0.8rem; color: rgba(255,120,120,0.75); font-style: italic; }
        .th-swatches { display: flex; gap: 0.75rem; flex-shrink: 0; }
        .th-swatch-wrap { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; }
        .th-swatch { width: 48px; height: 48px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.12); box-shadow: 0 4px 16px rgba(0,0,0,0.35); }
        .th-swatch-name { font-size: 0.65rem; font-weight: 600; color: rgba(255,255,255,0.45); }

        .week-swatches {
          display: flex;
          justify-content: space-between;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .swatch-col { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; flex: 1; min-width: 40px; }
        .swatch-circle { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 12px rgba(0,0,0,0.3); }
        .swatch-symbol { font-size: 1rem; filter: drop-shadow(0 0 3px rgba(0,0,0,0.6)); }
        .swatch-day { font-family: 'Cinzel', serif; font-size: 0.65rem; font-weight: 700; color: rgba(255,255,255,0.7); }
        .swatch-color-name { font-size: 0.6rem; color: rgba(255,255,255,0.38); }

        .color-details { display: flex; flex-direction: column; gap: 0.75rem; }
        .color-detail-row {
          border-left: 3px solid;
          border-radius: 0 10px 10px 0;
          padding: 0.9rem 1rem;
          background: rgba(255,255,255,0.02);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .cdr-header { display: flex; align-items: center; gap: 0.65rem; }
        .cdr-dot { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .cdr-sym { font-size: 0.9rem; }
        .cdr-day { font-family: 'Cinzel', serif; font-size: 0.92rem; font-weight: 700; }
        .cdr-planet { font-size: 0.78rem; color: rgba(255,255,255,0.4); }
        .cdr-names { font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.55); }
        .cdr-meaning { color: rgba(255,255,255,0.65); font-size: 0.85rem; line-height: 1.75; margin: 0; }
        .cdr-footer { display: flex; flex-direction: column; gap: 0.3rem; }
        .cdr-avoid { font-size: 0.78rem; color: rgba(255,110,110,0.75); }
        .cdr-tip { font-size: 0.78rem; color: rgba(212,175,55,0.85); }

        .disclaimer { text-align: center; color: rgba(255,255,255,0.3); font-size: 0.8rem; line-height: 1.6; padding: 0 1rem; }
      `}</style>
    </div>
  );
}
