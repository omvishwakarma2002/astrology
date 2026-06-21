'use client';

import { PlanetPosition } from '@/lib/astrology';

interface Props {
  planets: PlanetPosition[];
  name?: string;
}

const ZODIAC_SYMBOLS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
const ZODIAC_NAMES   = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const ELEMENT_COLORS: Record<string, string> = {
  Fire:  '#ef4444',
  Earth: '#22c55e',
  Air:   '#eab308',
  Water: '#3b82f6',
};
const ELEMENT_DIM: Record<string, string> = {
  Fire:  'rgba(239,68,68,0.15)',
  Earth: 'rgba(34,197,94,0.15)',
  Air:   'rgba(234,179,8,0.15)',
  Water: 'rgba(59,130,246,0.15)',
};
const SIGN_ELEMENTS = ['Fire','Earth','Air','Water','Fire','Earth','Air','Water','Fire','Earth','Air','Water'];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * Math.PI / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polarToCartesian(cx, cy, r, endDeg);
  const end   = polarToCartesian(cx, cy, r, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
}

export default function ChartWheel({ planets, name }: Props) {
  const size = 420;
  const cx = size / 2;
  const cy = size / 2;

  const rOuter     = 190;
  const rZodiac    = 170;
  const rZodiacIn  = 145;
  const rPlanet    = 118;
  const rInner     = 90;
  const rCore      = 50;

  return (
    <div className="wheel-wrapper">
      {name && <p className="wheel-name">{name}&apos;s Birth Chart</p>}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        style={{ maxWidth: 420, display: 'block', margin: '0 auto' }}
      >
        {/* Outer glow ring */}
        <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="2" />

        {/* Zodiac segments */}
        {ZODIAC_NAMES.map((sign, i) => {
          const startDeg = i * 30;
          const endDeg   = (i + 1) * 30;
          const midDeg   = startDeg + 15;
          const elem     = SIGN_ELEMENTS[i];

          // Segment fill
          const p1 = polarToCartesian(cx, cy, rZodiacIn,  startDeg);
          const p2 = polarToCartesian(cx, cy, rZodiac,    startDeg);
          const p3 = polarToCartesian(cx, cy, rZodiac,    endDeg);
          const p4 = polarToCartesian(cx, cy, rZodiacIn,  endDeg);

          const segPath = [
            `M ${p1.x} ${p1.y}`,
            `L ${p2.x} ${p2.y}`,
            `A ${rZodiac} ${rZodiac} 0 0 1 ${p3.x} ${p3.y}`,
            `L ${p4.x} ${p4.y}`,
            `A ${rZodiacIn} ${rZodiacIn} 0 0 0 ${p1.x} ${p1.y}`,
            'Z',
          ].join(' ');

          // Symbol position
          const labelR = (rZodiac + rZodiacIn) / 2;
          const lp = polarToCartesian(cx, cy, labelR, midDeg);

          // Divider line
          const lineOuter = polarToCartesian(cx, cy, rZodiac,  startDeg);
          const lineInner = polarToCartesian(cx, cy, rZodiacIn, startDeg);

          return (
            <g key={sign}>
              <path d={segPath} fill={ELEMENT_DIM[elem]} stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
              <line
                x1={lineInner.x} y1={lineInner.y}
                x2={lineOuter.x} y2={lineOuter.y}
                stroke="rgba(212,175,55,0.3)" strokeWidth="0.5"
              />
              <text
                x={lp.x} y={lp.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="13"
                fill={ELEMENT_COLORS[elem]}
                fontFamily="serif"
              >
                {ZODIAC_SYMBOLS[i]}
              </text>
            </g>
          );
        })}

        {/* Inner ring border */}
        <circle cx={cx} cy={cy} r={rZodiacIn} fill="rgba(15,12,41,0.9)" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />

        {/* Degree tick marks */}
        {Array.from({ length: 36 }, (_, i) => {
          const deg  = i * 10;
          const rT1  = rZodiacIn;
          const rT2  = rZodiacIn - 6;
          const pt1  = polarToCartesian(cx, cy, rT1, deg);
          const pt2  = polarToCartesian(cx, cy, rT2, deg);
          return (
            <line key={i} x1={pt1.x} y1={pt1.y} x2={pt2.x} y2={pt2.y}
              stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
          );
        })}

        {/* Planet ring */}
        <circle cx={cx} cy={cy} r={rPlanet + 16} fill="none" stroke="rgba(212,175,55,0.08)" strokeWidth="20" />

        {/* Planet positions */}
        {planets.map((planet, i) => {
          const deg = planet.longitude;
          const pp  = polarToCartesian(cx, cy, rPlanet, deg);
          const color = ELEMENT_COLORS[planet.element];

          return (
            <g key={planet.name}>
              {/* Spoke line */}
              <line
                x1={cx} y1={cy}
                x2={pp.x} y2={pp.y}
                stroke={`${color}30`} strokeWidth="0.5"
                strokeDasharray="3,4"
              />
              {/* Dot */}
              <circle cx={pp.x} cy={pp.y} r={10} fill={`${color}20`} stroke={color} strokeWidth="1.5" />
              {/* Planet symbol */}
              <text
                x={pp.x} y={pp.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="9"
                fill={color}
                fontFamily="serif"
              >
                {planet.symbol}
              </text>
            </g>
          );
        })}

        {/* Core circle */}
        <circle cx={cx} cy={cy} r={rInner} fill="rgba(15,12,41,0.95)" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={rCore}  fill="rgba(212,175,55,0.05)" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" />

        {/* Centre star */}
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize="22" fill="#d4af37" fontFamily="serif" opacity="0.8">
          ✦
        </text>

        {/* Cross hairs */}
        {[0, 90, 180, 270].map(deg => {
          const outerP = polarToCartesian(cx, cy, rInner - 4, deg);
          const innerP = polarToCartesian(cx, cy, rCore  + 4, deg);
          return (
            <line key={deg}
              x1={innerP.x} y1={innerP.y}
              x2={outerP.x} y2={outerP.y}
              stroke="rgba(212,175,55,0.25)" strokeWidth="0.5"
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div className="wheel-legend">
        {planets.slice(0, 7).map(p => (
          <div key={p.name} className="legend-item">
            <span className="legend-symbol" style={{ color: ELEMENT_COLORS[p.element] }}>{p.symbol}</span>
            <span className="legend-name">{p.name}</span>
            <span className="legend-sign">{p.signSymbol} {p.sign}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .wheel-wrapper { display: flex; flex-direction: column; gap: 1.25rem; }
        .wheel-name {
          text-align: center;
          font-family: 'Cinzel', serif;
          font-size: 1.1rem;
          color: #d4af37;
          letter-spacing: 0.08em;
          margin: 0;
        }
        .wheel-legend {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.4rem 1rem;
        }
        @media (min-width: 480px) {
          .wheel-legend { grid-template-columns: 1fr 1fr 1fr; }
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
        }
        .legend-symbol { font-size: 1rem; }
        .legend-name { color: rgba(255,255,255,0.7); flex: 1; }
        .legend-sign { color: rgba(255,255,255,0.45); font-size: 0.75rem; }
      `}</style>
    </div>
  );
}
