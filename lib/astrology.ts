// Core astrology calculations using the astronomia package

export interface PlanetPosition {
  name: string;
  symbol: string;
  sign: string;
  signSymbol: string;
  longitude: number; // 0-360 degrees
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  color: string;
}

export interface BirthChartData {
  planets: PlanetPosition[];
  sunSign: string;
  moonSign: string;
  ascendant?: string;
}

const ZODIAC_SIGNS = [
  { name: 'Aries',       symbol: '♈', element: 'Fire'  as const, color: '#ef4444' },
  { name: 'Taurus',      symbol: '♉', element: 'Earth' as const, color: '#22c55e' },
  { name: 'Gemini',      symbol: '♊', element: 'Air'   as const, color: '#eab308' },
  { name: 'Cancer',      symbol: '♋', element: 'Water' as const, color: '#3b82f6' },
  { name: 'Leo',         symbol: '♌', element: 'Fire'  as const, color: '#ef4444' },
  { name: 'Virgo',       symbol: '♍', element: 'Earth' as const, color: '#22c55e' },
  { name: 'Libra',       symbol: '♎', element: 'Air'   as const, color: '#eab308' },
  { name: 'Scorpio',     symbol: '♏', element: 'Water' as const, color: '#3b82f6' },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire'  as const, color: '#ef4444' },
  { name: 'Capricorn',   symbol: '♑', element: 'Earth' as const, color: '#22c55e' },
  { name: 'Aquarius',    symbol: '♒', element: 'Air'   as const, color: '#eab308' },
  { name: 'Pisces',      symbol: '♓', element: 'Water' as const, color: '#3b82f6' },
];

export function getZodiacFromLongitude(longitudeDeg: number): typeof ZODIAC_SIGNS[0] {
  const normalized = ((longitudeDeg % 360) + 360) % 360;
  const index = Math.floor(normalized / 30);
  return ZODIAC_SIGNS[index];
}

function calendarGregorianToJD(year: number, month: number, day: number): number {
  // Meeus, Astronomical Algorithms, Chapter 7
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5;
}

function jdToJ2000Centuries(jd: number): number {
  return (jd - 2451545.0) / 36525.0;
}

function meanLongitude(L0: number, rate: number, T: number): number {
  return ((L0 + rate * T) % 360 + 360) % 360;
}

export function calculatePlanetPositions(
  year: number,
  month: number,
  day: number,
  hour: number = 12
): PlanetPosition[] {
  const dayFraction = day + hour / 24;
  const jd = calendarGregorianToJD(year, month, dayFraction);
  const T = jdToJ2000Centuries(jd);

  // Sun: use accurate formula
  const L0sun = ((280.46646 + 36000.76983 * T + 0.0003032 * T * T) % 360 + 360) % 360;
  const mSun = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) * Math.PI / 180;
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(mSun)
    + (0.019993 - 0.000101 * T) * Math.sin(2 * mSun)
    + 0.000289 * Math.sin(3 * mSun);
  const sunLon = ((L0sun + C) % 360 + 360) % 360;

  // Moon: simplified but reasonable approximation
  const moonL = ((218.3165 + 481267.8813 * T) % 360 + 360) % 360;
  const moonM = ((134.9634 + 477198.8676 * T) % 360 + 360) % 360;
  const moonF = ((93.2721 + 483202.0175 * T) % 360 + 360) % 360;
  const moonD = ((297.8502 + 445267.1115 * T) % 360 + 360) % 360;
  const moonLon = ((moonL
    + 6.2886 * Math.sin(moonM * Math.PI / 180)
    + 1.2740 * Math.sin((2 * moonD - moonM) * Math.PI / 180)
    + 0.6583 * Math.sin(2 * moonD * Math.PI / 180)
    + 0.2136 * Math.sin(2 * moonM * Math.PI / 180)
    - 0.1851 * Math.sin((moonD) * Math.PI / 180)
    - 0.1143 * Math.sin(2 * moonF * Math.PI / 180)
    + 0.0588 * Math.sin((2 * moonD - 2 * moonM) * Math.PI / 180)
  ) % 360 + 360) % 360;

  // Mean longitude formulas for other planets (Meeus, simplified)
  const mercuryLon = meanLongitude(252.25, 149472.67, T);
  const venusLon   = meanLongitude(181.98,  58517.81, T);
  const marsLon    = meanLongitude(355.43,  19140.30, T);
  const jupiterLon = meanLongitude( 34.35,   3034.91, T);
  const saturnLon  = meanLongitude( 50.08,   1222.11, T);
  const uranusLon  = meanLongitude(314.06,    428.48, T);
  const neptuneLon = meanLongitude(304.35,    218.47, T);

  const raw: { name: string; symbol: string; longitude: number }[] = [
    { name: 'Sun',     symbol: '☉', longitude: sunLon     },
    { name: 'Moon',    symbol: '☽', longitude: moonLon    },
    { name: 'Mercury', symbol: '☿', longitude: mercuryLon },
    { name: 'Venus',   symbol: '♀', longitude: venusLon   },
    { name: 'Mars',    symbol: '♂', longitude: marsLon    },
    { name: 'Jupiter', symbol: '♃', longitude: jupiterLon },
    { name: 'Saturn',  symbol: '♄', longitude: saturnLon  },
    { name: 'Uranus',  symbol: '⛢', longitude: uranusLon  },
    { name: 'Neptune', symbol: '♆', longitude: neptuneLon },
  ];

  return raw.map(p => {
    const zodiac = getZodiacFromLongitude(p.longitude);
    return {
      name: p.name,
      symbol: p.symbol,
      sign: zodiac.name,
      signSymbol: zodiac.symbol,
      longitude: p.longitude,
      element: zodiac.element,
      color: zodiac.color,
    };
  });
}

export function getSunSign(month: number, day: number): string {
  const dates = [
    { sign: 'Capricorn',   end: [1, 19] },
    { sign: 'Aquarius',    end: [2, 18] },
    { sign: 'Pisces',      end: [3, 20] },
    { sign: 'Aries',       end: [4, 19] },
    { sign: 'Taurus',      end: [5, 20] },
    { sign: 'Gemini',      end: [6, 20] },
    { sign: 'Cancer',      end: [7, 22] },
    { sign: 'Leo',         end: [8, 22] },
    { sign: 'Virgo',       end: [9, 22] },
    { sign: 'Libra',       end: [10, 22] },
    { sign: 'Scorpio',     end: [11, 21] },
    { sign: 'Sagittarius', end: [12, 21] },
    { sign: 'Capricorn',   end: [12, 31] },
  ];
  for (const entry of dates) {
    const [m, d] = entry.end;
    if (month < m || (month === m && day <= d)) {
      return entry.sign;
    }
  }
  return 'Capricorn';
}

export const ALL_SIGNS = ZODIAC_SIGNS.map(z => z.name);

export function getSignInfo(sign: string) {
  return ZODIAC_SIGNS.find(z => z.name === sign) || ZODIAC_SIGNS[0];
}
