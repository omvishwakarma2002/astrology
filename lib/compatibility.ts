export interface CompatibilityResult {
  sign1: string;
  sign2: string;
  score: number; // 0-100
  rating: string;
  summary: string;
  strengths: string[];
  challenges: string[];
  advice: string;
  elementCompatibility: string;
  modalityCompatibility: string;
}

type Element = 'Fire' | 'Earth' | 'Air' | 'Water';
type Modality = 'Cardinal' | 'Fixed' | 'Mutable';

interface SignData {
  element: Element;
  modality: Modality;
  traits: string[];
  description: string;
}

const SIGN_DATA: Record<string, SignData> = {
  Aries:       { element: 'Fire',  modality: 'Cardinal', traits: ['Bold', 'Independent', 'Pioneering', 'Impulsive'],      description: 'fiercely independent and driven by instinct' },
  Taurus:      { element: 'Earth', modality: 'Fixed',    traits: ['Patient', 'Loyal', 'Sensual', 'Stubborn'],             description: 'grounded, dependable, and pleasure-seeking' },
  Gemini:      { element: 'Air',   modality: 'Mutable',  traits: ['Witty', 'Adaptable', 'Curious', 'Inconsistent'],       description: 'endlessly curious and socially magnetic' },
  Cancer:      { element: 'Water', modality: 'Cardinal', traits: ['Nurturing', 'Intuitive', 'Protective', 'Moody'],        description: 'deeply empathetic and fiercely protective of loved ones' },
  Leo:         { element: 'Fire',  modality: 'Fixed',    traits: ['Generous', 'Charismatic', 'Proud', 'Dramatic'],         description: 'radiant, generous, and born to lead' },
  Virgo:       { element: 'Earth', modality: 'Mutable',  traits: ['Analytical', 'Devoted', 'Modest', 'Critical'],         description: 'methodically devoted and precision-driven' },
  Libra:       { element: 'Air',   modality: 'Cardinal', traits: ['Diplomatic', 'Charming', 'Fair-minded', 'Indecisive'], description: 'graceful, romantic, and justice-seeking' },
  Scorpio:     { element: 'Water', modality: 'Fixed',    traits: ['Intense', 'Perceptive', 'Loyal', 'Secretive'],          description: 'magnetically intense and transformatively powerful' },
  Sagittarius: { element: 'Fire',  modality: 'Mutable',  traits: ['Optimistic', 'Adventurous', 'Honest', 'Restless'],     description: 'freedom-loving and philosophically expansive' },
  Capricorn:   { element: 'Earth', modality: 'Cardinal', traits: ['Ambitious', 'Disciplined', 'Patient', 'Reserved'],      description: 'relentlessly ambitious and profoundly responsible' },
  Aquarius:    { element: 'Air',   modality: 'Fixed',    traits: ['Innovative', 'Humanitarian', 'Eccentric', 'Detached'],  description: 'visionary, rebellious, and ahead of their time' },
  Pisces:      { element: 'Water', modality: 'Mutable',  traits: ['Compassionate', 'Mystical', 'Selfless', 'Escapist'],    description: 'profoundly empathetic and creatively inspired' },
};

const ELEMENT_COMPATIBILITY: Record<Element, Record<Element, number>> = {
  Fire:  { Fire: 85, Earth: 40, Air: 80, Water: 45 },
  Earth: { Fire: 40, Earth: 80, Air: 55, Water: 75 },
  Air:   { Fire: 80, Earth: 55, Air: 82, Water: 50 },
  Water: { Fire: 45, Earth: 75, Air: 50, Water: 85 },
};

const ELEMENT_ANALYSIS: Record<Element, Record<Element, string>> = {
  Fire: {
    Fire:  'Two fire signs create a passionate, dynamic bond — an unstoppable force of energy and enthusiasm.',
    Earth: 'Fire and Earth can create something enduring, but require patience — Earth grounds Fire while Fire inspires Earth.',
    Air:   'Fire and Air are naturally complementary — Air fans Fire\'s flames, creating an exciting, intellectually alive pairing.',
    Water: 'Fire and Water require conscious effort — Water can either douse Fire or create steam; emotional awareness is essential.',
  },
  Earth: {
    Fire:  'Earth and Fire offer each other balance — Fire brings excitement to Earth\'s stability, while Earth anchors Fire\'s ambitions.',
    Earth: 'Two Earth signs share deep values of security, loyalty, and pragmatism — a slow-building, profoundly reliable love.',
    Air:   'Earth and Air complement each other beautifully — Air brings lightness and ideas while Earth provides structure and follow-through.',
    Water: 'Earth and Water are naturally nourishing together — Water keeps Earth fertile, while Earth gives Water safe shores to rest upon.',
  },
  Air: {
    Fire:  'Air and Fire ignite each other brilliantly — a meeting of inspiration and action, wit and warmth.',
    Earth: 'Air and Earth balance mind and matter — Air expands Earth\'s horizons while Earth keeps Air connected to reality.',
    Air:   'Two Air signs create a stimulating, endlessly communicative partnership rich with shared ideas and social adventures.',
    Water: 'Air and Water can create beautiful clouds or turbulent storms — emotional depth meets intellectual distance.',
  },
  Water: {
    Fire:  'Water and Fire are a passionate challenge — intensity meets sensitivity in a dynamic dance of opposites.',
    Earth: 'Water and Earth are among the most naturally compatible — nurturing, stable, and emotionally sustaining for both.',
    Air:   'Water and Air can be inspiring or frustrating — emotional Water may find cerebral Air distant; communication bridges the gap.',
    Water: 'Two Water signs share an almost telepathic emotional understanding — deeply empathetic and intuitively connected.',
  },
};

const MODALITY_COMPATIBILITY: Record<Modality, Record<Modality, number>> = {
  Cardinal: { Cardinal: 60, Fixed: 70, Mutable: 80 },
  Fixed:    { Cardinal: 70, Fixed: 55, Mutable: 75 },
  Mutable:  { Cardinal: 80, Fixed: 75, Mutable: 70 },
};

function getModalityAnalysis(m1: Modality, m2: Modality): string {
  if (m1 === m2) {
    if (m1 === 'Cardinal') return 'Both being Cardinal signs, you both love to initiate — agree on who leads when to avoid power struggles.';
    if (m1 === 'Fixed') return 'Two Fixed signs bring unwavering loyalty and stability, but both must learn to bend a little when life demands flexibility.';
    return 'Two Mutable signs are wonderfully adaptable together, though you may both need to consciously choose direction over endless options.';
  }
  if ((m1 === 'Cardinal' && m2 === 'Mutable') || (m1 === 'Mutable' && m2 === 'Cardinal')) {
    return 'Cardinal and Mutable energies work beautifully — one initiates while the other adapts, creating elegant forward momentum.';
  }
  if ((m1 === 'Cardinal' && m2 === 'Fixed') || (m1 === 'Fixed' && m2 === 'Cardinal')) {
    return 'Cardinal initiates and Fixed sustains — a powerful pairing where ideas become lasting realities through combined energy.';
  }
  return 'Fixed and Mutable energies complement each other — stability meets adaptability in a relationship that can weather any storm.';
}

function getRating(score: number): string {
  if (score >= 85) return 'Soulmate Connection';
  if (score >= 75) return 'Highly Compatible';
  if (score >= 65) return 'Strong Potential';
  if (score >= 55) return 'Good Foundation';
  if (score >= 45) return 'Requires Effort';
  return 'Growth Opportunity';
}

export function calculateCompatibility(sign1: string, sign2: string): CompatibilityResult {
  const s1 = SIGN_DATA[sign1];
  const s2 = SIGN_DATA[sign2];

  if (!s1 || !s2) {
    return {
      sign1, sign2, score: 50, rating: 'Unknown',
      summary: 'Sign data unavailable.',
      strengths: [], challenges: [], advice: '',
      elementCompatibility: '', modalityCompatibility: '',
    };
  }

  const elementScore  = ELEMENT_COMPATIBILITY[s1.element][s2.element];
  const modalityScore = MODALITY_COMPATIBILITY[s1.modality][s2.modality];

  // Same sign bonus
  const sameSignBonus = sign1 === sign2 ? 5 : 0;

  // Opposite sign bonus (natural polarity)
  const signs = Object.keys(SIGN_DATA);
  const idx1 = signs.indexOf(sign1);
  const idx2 = signs.indexOf(sign2);
  const oppositeBonus = Math.abs(idx1 - idx2) === 6 ? 8 : 0;

  const score = Math.min(100, Math.round(elementScore * 0.55 + modalityScore * 0.35 + sameSignBonus + oppositeBonus + 5));

  const elementAnalysis = ELEMENT_ANALYSIS[s1.element][s2.element];
  const modalityAnalysis = getModalityAnalysis(s1.modality, s2.modality);

  const strengths: string[] = [];
  const challenges: string[] = [];

  // Build strengths from shared or complementary traits
  s1.traits.forEach(t => {
    if (s2.traits.includes(t)) strengths.push(`Shared ${t.toLowerCase()} nature creates immediate understanding`);
  });
  if (strengths.length === 0) {
    strengths.push(`${sign1}'s ${s1.traits[0].toLowerCase()} quality complements ${sign2}'s ${s2.traits[0].toLowerCase()} nature`);
    strengths.push(`Both signs bring unique gifts that, together, create a more complete whole`);
    strengths.push(`The ${s1.element}-${s2.element} elemental dynamic generates creative tension and growth`);
  } else {
    strengths.push(`The ${s1.modality}-${s2.modality} modality blend supports shared goals effectively`);
    strengths.push(`Mutual respect for each other's ${sign1 === sign2 ? 'shared' : 'differing'} perspective deepens the bond`);
  }

  // Challenges based on clashing traits
  const allTraits1 = s1.traits;
  const allTraits2 = s2.traits;
  challenges.push(`${sign1}'s ${allTraits1[allTraits1.length - 1].toLowerCase()} tendency may occasionally clash with ${sign2}'s ${allTraits2[allTraits2.length - 1].toLowerCase()} nature`);
  challenges.push(`Balancing the ${s1.element} and ${s2.element} elemental needs requires conscious attention`);
  challenges.push(`${s1.modality === s2.modality ? `Two ${s1.modality} signs may compete in similar ways` : `Different approaches to initiating vs. sustaining can create friction`}`);

  const summary = `${sign1}, ${s1.description}, meets ${sign2}, ${s2.description}. ${elementAnalysis} ${modalityAnalysis}`;

  const advice = score >= 70
    ? `Lean into your natural cosmic alignment. Celebrate your differences as the source of your dynamic energy rather than obstacles to navigate. Regular heart-to-heart conversations will keep this beautiful connection vibrant and growing.`
    : score >= 55
    ? `With conscious effort and genuine curiosity about each other's inner worlds, this pairing can overcome its elemental differences and build something genuinely special. Patience and open communication are your greatest tools.`
    : `This pairing is a powerful teacher. The friction you encounter is the universe inviting both of you to grow beyond your comfort zones. Approach differences with compassion rather than judgment, and transformation becomes possible.`;

  return {
    sign1, sign2, score,
    rating: getRating(score),
    summary,
    strengths,
    challenges,
    advice,
    elementCompatibility: elementAnalysis,
    modalityCompatibility: modalityAnalysis,
  };
}

export const ALL_SIGNS = Object.keys(SIGN_DATA);
export { SIGN_DATA };
