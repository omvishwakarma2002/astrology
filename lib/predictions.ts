// Future predictions based on current planetary transits vs natal chart

import { PlanetPosition, calculatePlanetPositions, getZodiacFromLongitude } from './astrology';

export type LifeArea = 'Love' | 'Career' | 'Money' | 'Health' | 'Spiritual';
export type Timeframe = 'week' | 'month' | 'year';
export type Energy = 'excellent' | 'good' | 'neutral' | 'challenging' | 'intense';

export interface Prediction {
  area: LifeArea;
  icon: string;
  energy: Energy;
  score: number; // 1-10
  headline: string;
  detail: string;
  advice: string;
  luckyDays: string[];
}

export interface DangerWarning {
  icon: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export interface LuckyActivity {
  icon: string;
  activity: string;
  reason: string;
  bestTime: string;
}

export interface FutureForecast {
  week: Prediction[];
  month: Prediction[];
  year: Prediction[];
  overallEnergy: Energy;
  overallScore: number;
  cosmicMessage: string;
  powerDates: { date: string; event: string }[];
  dangers: DangerWarning[];
  luckyActivities: LuckyActivity[];
}

const ENERGY_LABELS: Record<Energy, string> = {
  excellent: 'Excellent',
  good: 'Favourable',
  neutral: 'Steady',
  challenging: 'Challenging',
  intense: 'Transformative',
};

function getAngleDiff(a: number, b: number): number {
  let diff = Math.abs(a - b) % 360;
  if (diff > 180) diff = 360 - diff;
  return diff;
}

type AspectType = 'conjunction' | 'trine' | 'sextile' | 'square' | 'opposition' | 'none';

function getAspect(angle: number): { type: AspectType; harmony: number } {
  if (angle <= 10) return { type: 'conjunction', harmony: 0.5 };
  if (Math.abs(angle - 60) <= 8) return { type: 'sextile', harmony: 1 };
  if (Math.abs(angle - 90) <= 8) return { type: 'square', harmony: -1 };
  if (Math.abs(angle - 120) <= 10) return { type: 'trine', harmony: 1.5 };
  if (Math.abs(angle - 180) <= 10) return { type: 'opposition', harmony: -0.5 };
  return { type: 'none', harmony: 0 };
}

function scoreToEnergy(score: number): Energy {
  if (score >= 8) return 'excellent';
  if (score >= 6.5) return 'good';
  if (score >= 4.5) return 'neutral';
  if (score >= 3) return 'challenging';
  return 'intense';
}

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getLuckyDays(seed: number, count: number): string[] {
  const days: string[] = [];
  const used = new Set<number>();
  let s = seed;
  while (days.length < count) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const d = s % 7;
    if (!used.has(d)) { used.add(d); days.push(DAYS_OF_WEEK[d]); }
  }
  return days;
}

function addDays(date: Date, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

// ─── Area-specific prediction generators ─────────────────────────────────────

function lovePrediction(
  harmony: number, sunSign: string, venusSign: string,
  transitVenus: string, timeframe: Timeframe, seed: number
): Prediction {
  const base = 5 + harmony * 1.5 + (venusSign === transitVenus ? 1.5 : 0);
  const score = Math.min(10, Math.max(1, Math.round(base * 10) / 10));
  const energy = scoreToEnergy(score);

  const headlines: Record<Energy, string[]> = {
    excellent: ['Hearts align — a magical time for love', 'Venus blesses your romantic life', 'Love blooms in unexpected ways'],
    good: ['Warmth and connection flow freely', 'Romantic opportunities are opening up', 'Your charm is at its peak'],
    neutral: ['Love life is stable and steady', 'A quiet but comfortable time in romance', 'Nurture existing bonds'],
    challenging: ['Relationship tensions may surface', 'Communication in love needs extra care', 'Old wounds may seek healing'],
    intense: ['Deep transformation in matters of the heart', 'A relationship reaches a turning point', 'Love demands honesty and courage'],
  };

  const details: Record<Energy, string> = {
    excellent: `Venus and the cosmic forces are aligning beautifully with your natal chart. If you are single, this ${timeframe} holds real potential for a meaningful new connection — someone who genuinely resonates with your soul. If you are in a relationship, expect deeper intimacy, renewed passion, and beautiful moments of genuine understanding with your partner. Express your feelings openly — the stars strongly support it.`,
    good: `The energy around your love life is warm and inviting this ${timeframe}. You are radiating an attractive and magnetic quality that draws people toward you. This is a good time to take a small romantic risk — ask someone out, plan a special date, or have a heartfelt conversation you've been putting off. Your natural charm is working quietly in your favour.`,
    neutral: `Love life is in a steady, comfortable phase. There are no dramatic highs or lows — just the solid, quiet beauty of dependable connection. Use this ${timeframe} to invest in the foundation of your relationships through small, consistent acts of love and appreciation. Stability is a gift — don't overlook it.`,
    challenging: `Some friction may arise in your romantic life this ${timeframe}. Old unresolved issues could resurface demanding your honest attention. Avoid the temptation to suppress feelings — bringing things into the open, though uncomfortable, leads to genuine healing. Approach relationship challenges as opportunities to grow closer, not further apart.`,
    intense: `This is a deeply transformative ${timeframe} for your heart. A relationship — with another or with yourself — is undergoing profound change. What no longer serves your highest good is falling away to make room for something truer. This process can feel painful but it is ultimately liberating. Trust the transformation.`,
  };

  const advice: Record<Energy, string> = {
    excellent: 'Be open, be present, and let love find you. Say yes to social invitations.',
    good: 'Take one small romantic initiative this week — reach out, plan something special.',
    neutral: 'Show appreciation to those you love through small, thoughtful gestures.',
    challenging: 'Listen more than you speak. Understanding, not winning, is the goal.',
    intense: 'Be radically honest about what you truly want and need from love.',
  };

  const pool = headlines[energy];
  const headline = pool[seed % pool.length];

  return {
    area: 'Love',
    icon: '💕',
    energy,
    score,
    headline,
    detail: details[energy],
    advice: advice[energy],
    luckyDays: getLuckyDays(seed + 1, 2),
  };
}

function careerPrediction(
  harmony: number, sunSign: string, marsSign: string,
  transitMars: string, timeframe: Timeframe, seed: number
): Prediction {
  const base = 5 + harmony * 1.3 + (marsSign === transitMars ? 1.2 : 0);
  const score = Math.min(10, Math.max(1, Math.round(base * 10) / 10));
  const energy = scoreToEnergy(score);

  const headlines: Record<Energy, string[]> = {
    excellent: ['Your professional star is rising fast', 'Career breakthroughs are within reach', 'Recognition and opportunity align'],
    good: ['Steady progress and positive momentum', 'Your efforts are being noticed', 'A promising time to advance'],
    neutral: ['Career is on a stable footing', 'Focus on skill-building and preparation', 'Plant seeds for future growth'],
    challenging: ['Workplace tensions may test your patience', 'Career obstacles require strategic thinking', 'Avoid hasty professional decisions'],
    intense: ['A major career turning point approaches', 'Old professional structures are shifting', 'Bold change leads to reinvention'],
  };

  const details: Record<Energy, string> = {
    excellent: `The planetary energies are powerfully supporting your professional ambitions this ${timeframe}. Your ideas are sharp, your confidence is high, and the people around you — colleagues, superiors, clients — are receptive to what you bring. This is an excellent time to pitch a bold idea, apply for a promotion, start a new project, or make a move you've been planning. Fortune favours the bold right now.`,
    good: `Positive professional momentum is building around you this ${timeframe}. Your hard work is beginning to bear fruit and the right people are starting to take notice. Stay consistent, show up with your best energy, and don't be afraid to speak up in meetings or advocate for your ideas. A gradual but real upward movement is underway in your career path.`,
    neutral: `Your career is in a consolidation phase — steady, reliable, but not dramatically eventful. This ${timeframe} is best used for deepening skills, organizing your work systems, and building the competence that will fuel your next leap forward. The quiet seasons in our professional life are where the real foundations are built.`,
    challenging: `Some friction or obstacles may appear in your professional world this ${timeframe}. A difficult colleague, a stalled project, or unexpected complications may test your resolve. The key is to stay calm, think strategically, and avoid burning bridges. Every career challenge carries a hidden lesson — ask yourself what this situation is teaching you.`,
    intense: `A significant shift is occurring in your professional life this ${timeframe}. This could mean a dramatic change of direction, the end of one chapter and the beginning of another, or a moment of reckoning about what you truly want from your work life. Though unsettling, this kind of upheaval ultimately leads to a career that is much more authentically aligned with who you are.`,
  };

  const advice: Record<Energy, string> = {
    excellent: 'Act on your biggest professional ambition this period — the stars are behind you.',
    good: 'Speak up and share your ideas — your credibility is growing.',
    neutral: 'Invest in learning a new skill or deepening your expertise.',
    challenging: 'Document everything, stay professional, and choose your battles wisely.',
    intense: 'Be honest about whether your current path truly aligns with your purpose.',
  };

  const pool = headlines[energy];
  const headline = pool[seed % pool.length];

  return { area: 'Career', icon: '🚀', energy, score, headline, detail: details[energy], advice: advice[energy], luckyDays: getLuckyDays(seed + 3, 2) };
}

function moneyPrediction(
  harmony: number, sunSign: string, jupiterSign: string,
  transitJupiter: string, timeframe: Timeframe, seed: number
): Prediction {
  const base = 5 + harmony * 1.4 + (jupiterSign === transitJupiter ? 1.8 : 0);
  const score = Math.min(10, Math.max(1, Math.round(base * 10) / 10));
  const energy = scoreToEnergy(score);

  const headlines: Record<Energy, string[]> = {
    excellent: ['Financial abundance is flowing toward you', 'Jupiter opens doors to prosperity', 'A windfall or opportunity is near'],
    good: ['Finances are improving steadily', 'Smart decisions bring real rewards', 'Money flows more freely now'],
    neutral: ['Finances are stable and manageable', 'A time for careful, steady stewardship', 'Small savings compound into security'],
    challenging: ['Unexpected expenses may arise', 'Financial caution is strongly advised', 'Review and tighten your budget'],
    intense: ['Major financial restructuring is at hand', 'Old financial patterns must change', 'Crisis can become opportunity'],
  };

  const details: Record<Energy, string> = {
    excellent: `Jupiter's blessings are touching your financial sector this ${timeframe}. Unexpected income, a beneficial investment, a raise, a sale, or a lucrative opportunity may materialize seemingly out of nowhere. Your money instincts are sharp right now — trust them. This is a favourable time to make smart financial moves, expand your income streams, or invest in yourself.`,
    good: `A gentle but real improvement in your financial situation is underway this ${timeframe}. The effort you have been putting in is beginning to translate into tangible reward. Continue making responsible, forward-thinking choices with your money. Avoid unnecessary luxuries for now and let the momentum build naturally — it is heading in the right direction.`,
    neutral: `Your financial situation is stable and manageable this ${timeframe}. Nothing spectacular but nothing alarming either. Use this period of equilibrium to organize your finances, create or review a budget, and make sure your money is working as efficiently as possible for your future goals. Steady stewardship now builds lasting security.`,
    challenging: `Some financial strain or unexpected expenses may emerge this ${timeframe}. This is a time to be cautious, avoid impulsive spending, and steer clear of risky investments or financial agreements you don't fully understand. Review your outgoings carefully. Though tight, this period has a lesson about what you truly value and where your money should flow.`,
    intense: `A significant financial upheaval or turning point is present this ${timeframe}. Old financial habits or structures that no longer serve you are being forcibly transformed. Though this can feel deeply stressful, it is an opportunity to rebuild your relationship with money from a place of greater wisdom and intentionality. What you emerge with will be more solid than what is being dismantled.`,
  };

  const advice: Record<Energy, string> = {
    excellent: 'Say yes to unexpected financial opportunities — but read the fine print.',
    good: 'Automate one small saving or investment this period.',
    neutral: 'Track your spending for one week — awareness is the first step to abundance.',
    challenging: 'Pause all non-essential spending and build a small emergency reserve.',
    intense: 'Seek financial advice and create a clear plan to address the root issue.',
  };

  const pool = headlines[energy];
  const headline = pool[seed % pool.length];

  return { area: 'Money', icon: '💰', energy, score, headline, detail: details[energy], advice: advice[energy], luckyDays: getLuckyDays(seed + 5, 2) };
}

function healthPrediction(
  harmony: number, moonSign: string, transitMoon: string,
  timeframe: Timeframe, seed: number
): Prediction {
  const base = 5 + harmony * 1.2 + (moonSign === transitMoon ? 0.8 : 0);
  const score = Math.min(10, Math.max(1, Math.round(base * 10) / 10));
  const energy = scoreToEnergy(score);

  const headlines: Record<Energy, string[]> = {
    excellent: ['Vitality and energy are at their peak', 'Your body and mind are in perfect harmony', 'A powerful time for wellness goals'],
    good: ['Health and energy are strong and steady', 'Positive momentum in your wellbeing', 'Your healthy habits are paying off'],
    neutral: ['Health is stable — maintain your routines', 'A good time for gentle self-care', 'Rest and restoration serve you well'],
    challenging: ['Energy levels may dip — listen to your body', 'Stress may affect your physical health', 'Prioritize sleep and nourishment'],
    intense: ['The body is signalling a need for deeper care', 'A health matter demands honest attention', 'Rest is not weakness — it is wisdom'],
  };

  const details: Record<Energy, string> = {
    excellent: `Your physical and mental vitality is exceptional this ${timeframe}. Your energy reserves are full, your immune system is strong, and your body feels powerful and alive. This is an ideal time to start a new fitness routine, commit to a health goal, or push yourself a little harder in your workouts. Your body is ready and willing — honour it with movement and good fuel.`,
    good: `Your health and energy are in good shape this ${timeframe}. You are reaping the rewards of the healthy habits you have been building. Keep your routines consistent and continue listening to your body's signals. This is also a great time to upgrade one aspect of your wellness — better sleep hygiene, a dietary improvement, or adding more movement to your days.`,
    neutral: `Your health is stable and manageable this ${timeframe}. Energy levels are moderate — neither soaring nor depleted. Use this time for gentle, restorative self-care: quality sleep, nourishing food, time in nature, and activities that calm your nervous system. The body doesn't always need to be pushed — sometimes it needs to be restored.`,
    challenging: `Your energy levels may feel lower than usual this ${timeframe}, and stress may be taking a physical toll. Your body is signalling that it needs more care and rest. Prioritize sleep above everything else. Reduce stimulants, be gentle with your diet, and carve out quiet time to decompress. Pushing through will only prolong the depletion.`,
    intense: `Your body is speaking loudly this ${timeframe} and it is asking for your full, undivided attention. There may be a health matter — physical, mental, or emotional — that can no longer be ignored or deferred. This is not a time for pushing through or minimizing symptoms. Seek professional guidance if needed. Attending to your health now prevents much larger challenges later.`,
  };

  const advice: Record<Energy, string> = {
    excellent: 'Channel this peak energy into one bold health or fitness goal.',
    good: 'Add one small healthy habit — it will compound into something transformative.',
    neutral: 'Prioritize 8 hours of sleep and gentle daily movement.',
    challenging: 'Cut one stressor from your week and protect your rest fiercely.',
    intense: 'See a doctor or health professional. Do not delay care for your body.',
  };

  const pool = headlines[energy];
  const headline = pool[seed % pool.length];

  return { area: 'Health', icon: '🌿', energy, score, headline, detail: details[energy], advice: advice[energy], luckyDays: getLuckyDays(seed + 7, 2) };
}

function spiritualPrediction(
  harmony: number, moonSign: string, neptuneSign: string,
  timeframe: Timeframe, seed: number
): Prediction {
  const base = 5 + harmony * 1.1 + (moonSign === neptuneSign ? 1.0 : 0);
  const score = Math.min(10, Math.max(1, Math.round(base * 10) / 10));
  const energy = scoreToEnergy(score);

  const headlines: Record<Energy, string[]> = {
    excellent: ['A profound spiritual awakening is near', 'The universe is speaking directly to you', 'Intuition reaches extraordinary heights'],
    good: ['Spiritual insights are flowing freely', 'A beautiful time for growth and reflection', 'Your inner compass is crystal clear'],
    neutral: ['Steady spiritual growth continues quietly', 'Meditation and reflection bring clarity', 'Trust the path unfolding before you'],
    challenging: ['Spiritual tests are building your faith', 'Doubt is the doorway to deeper belief', 'Sit with the questions — the answers will come'],
    intense: ['A dark night of the soul brings breakthrough', 'Everything is being stripped to reveal truth', 'Surrender is your greatest spiritual act'],
  };

  const details: Record<Energy, string> = {
    excellent: `The veil between the ordinary and the extraordinary is unusually thin for you this ${timeframe}. Synchronicities, meaningful dreams, sudden insights, and moments of inexplicable knowing are all gifts available to you right now. Your intuition is exceptionally reliable — trust the quiet voice within. Meditation, time in nature, journaling, and any creative or spiritual practice will be profoundly rewarding.`,
    good: `A beautiful period of spiritual growth and inner clarity is unfolding this ${timeframe}. Your awareness is heightened and your intuition is giving you clear, reliable guidance. This is a wonderful time to deepen your spiritual practice, explore new philosophical or metaphysical ideas, or simply spend more time in quiet reflection. Pay attention to your dreams — they carry important messages.`,
    neutral: `Your spiritual life is in a steady, quietly productive phase this ${timeframe}. Growth is happening beneath the surface even when it is not dramatically visible. Maintain your spiritual practices — meditation, gratitude, mindfulness, prayer, journaling — even when they feel routine. The consistency of your inner work is building something beautiful and lasting within you.`,
    challenging: `This ${timeframe} may bring spiritual tests — moments of doubt, confusion about your purpose, or a sense of disconnection from the divine or from yourself. These experiences are not signs that you are lost — they are signs that you are deepening. The faith that survives questioning is the most unshakeable kind. Stay with your practice. The light returns.`,
    intense: `You may be passing through what the mystics call a 'dark night of the soul' this ${timeframe}. Old beliefs, identities, and spiritual frameworks are crumbling to make way for something profoundly more authentic and alive. This dissolution, while painful, is the most sacred kind of growth. You are not falling apart — you are breaking open. What emerges will be extraordinary.`,
  };

  const advice: Record<Energy, string> = {
    excellent: 'Meditate daily this period — even 10 minutes will yield remarkable insight.',
    good: 'Start a dream journal or gratitude practice — your inner wisdom is flowing.',
    neutral: 'Show up for your spiritual practice even on the days it feels mechanical.',
    challenging: 'Write your doubts and fears — externalizing them robs them of their power.',
    intense: 'Surrender the need to understand. Trust the process completely.',
  };

  const pool = headlines[energy];
  const headline = pool[seed % pool.length];

  return { area: 'Spiritual', icon: '🔮', energy, score, headline, detail: details[energy], advice: advice[energy], luckyDays: getLuckyDays(seed + 9, 2) };
}

// ─── Danger warnings ─────────────────────────────────────────────────────────

const ALL_DANGERS: DangerWarning[] = [
  { icon: '💸', title: 'Risky Financial Decisions', description: 'Planetary tension warns against impulsive spending, gambling, or investing in things you don\'t fully understand. Avoid lending large sums to friends or signing financial agreements without careful review.', severity: 'high' },
  { icon: '🗣️', title: 'Arguments & Harsh Words', description: 'Mercury\'s current position heightens the risk of miscommunication and heated arguments. Words spoken in anger now may cause lasting damage. Think twice before sending that message or having that confrontation.', severity: 'high' },
  { icon: '💔', title: 'Rushing into Romance', description: 'The stars caution against moving too fast in love right now. What feels like intense connection may be projection or illusion. Take your time before making serious commitments to new romantic partners.', severity: 'medium' },
  { icon: '🏃', title: 'Physical Overexertion', description: 'Mars energy is erratic — pushing your body too hard right now risks injury, particularly to muscles, joints, or the head. Avoid extreme sports, reckless driving, or skipping rest when your body signals fatigue.', severity: 'medium' },
  { icon: '🍷', title: 'Escapism & Excess', description: 'Neptune\'s influence may tempt you toward overindulgence — alcohol, social media spirals, binge-watching, or other forms of escape. These provide momentary relief but deepen the underlying issues. Stay grounded.', severity: 'medium' },
  { icon: '🤐', title: 'Keeping Toxic Secrets', description: 'Something hidden is building pressure. Carrying a secret or unspoken truth alone right now will only amplify stress and anxiety. Find a trusted person to confide in, or journal honestly to release the weight.', severity: 'medium' },
  { icon: '🌙', title: 'Sleep Neglect', description: 'The Moon\'s current position makes sleep disruption more likely. Ignoring rest will compound every other challenge in your life right now. Guard your sleep like the sacred medicine it is — no screens after 10pm.', severity: 'low' },
  { icon: '👥', title: 'Toxic Social Circles', description: 'Saturn is highlighting the people in your life who drain rather than replenish your energy. Be cautious of those who consistently create drama, manipulate, or leave you feeling worse about yourself after every interaction.', severity: 'medium' },
  { icon: '📱', title: 'Social Media Comparison', description: 'Venus in a tense aspect warns against comparing your real life to others\' highlight reels. Scrolling through social media this period will stoke feelings of inadequacy and envy. Use the time for something that builds you up instead.', severity: 'low' },
  { icon: '⚡', title: 'Impulsive Major Decisions', description: 'Uranus is electrifying your chart, making spontaneous and drastic decisions tempting — quitting your job, ending a relationship, or making sudden life changes. While change may be needed, wait at least two weeks before acting on any urge that feels overwhelming.', severity: 'high' },
  { icon: '🤝', title: 'Unvetted Business Partnerships', description: 'Jupiter\'s square warns against rushing into business deals, partnerships, or contracts without thorough due diligence. Someone may appear more trustworthy or capable than they truly are. Verify everything in writing.', severity: 'high' },
  { icon: '😤', title: 'Suppressing Anger', description: 'Bottling up frustration and resentment right now will lead to an uncontrolled explosion later. Find healthy outlets — exercise, journaling, honest conversation — to release pent-up anger before it turns toxic.', severity: 'low' },
  { icon: '🏥', title: 'Ignoring Health Symptoms', description: 'The 6th house is under planetary stress. Do not ignore persistent physical symptoms or postpone medical check-ups. What seems minor now could escalate if left unattended. Your body is speaking — listen to it.', severity: 'high' },
  { icon: '🛒', title: 'Retail Therapy', description: 'Emotional spending is a real risk this period. When you feel the urge to buy something unnecessary to lift your mood, pause for 24 hours. The emptiness that shopping temporarily fills requires deeper attention.', severity: 'low' },
  { icon: '🌀', title: 'Overthinking & Anxiety Spirals', description: 'Mercury retrograde energy is amplifying mental chatter and worst-case-scenario thinking. Recognize when your mind is spinning stories rather than solving problems. Breathe, ground yourself, and return to what is actually real right now.', severity: 'medium' },
];

const ALL_LUCKY_ACTIVITIES: LuckyActivity[] = [
  { icon: '🧘', activity: 'Morning Meditation', reason: 'Jupiter aligns with your natal Moon, amplifying inner clarity and spiritual receptivity. Even 10 minutes at sunrise will supercharge your intuition for the entire day.', bestTime: 'Sunrise, before checking your phone' },
  { icon: '✍️', activity: 'Journaling Your Dreams', reason: 'Neptune is activated in your chart, making the dream world extraordinarily rich with guidance. Keep a journal by your bed and write immediately upon waking — the messages are literal gold.', bestTime: 'Within 5 minutes of waking' },
  { icon: '🌿', activity: 'Walking Barefoot in Nature', reason: 'Venus trines your Earth planets, creating a powerful connection to nature\'s healing energy. Direct contact with grass or soil grounds your energy and dissolves accumulated stress at the cellular level.', bestTime: 'Golden hour — 1 hour before sunset' },
  { icon: '🎨', activity: 'Creative Expression', reason: 'The Sun-Neptune aspect floods your chart with creative inspiration. Painting, drawing, writing poetry, dancing, or making music will not only bring joy but may produce your finest work yet.', bestTime: 'Afternoon, when creative flow peaks' },
  { icon: '💌', activity: 'Reaching Out to Someone You Love', reason: 'Venus is blessing your communication sector. A heartfelt message, call, or visit to someone who matters to you will deepen the bond and bring unexpected warmth back to you in return.', bestTime: 'Evening, when hearts are most open' },
  { icon: '📚', activity: 'Learning Something New', reason: 'Mercury is well-aspected for knowledge absorption right now. Starting a course, reading a challenging book, or watching an educational documentary will feel unusually satisfying and the information will stick.', bestTime: 'Morning, when the mind is sharpest' },
  { icon: '🛁', activity: 'Salt Bath or Shower Ritual', reason: 'The Moon is cleansing your energetic field. A bath or shower with intention — imagining all stress and negativity washing away — carries powerful purifying energy right now. Add sea salt for extra potency.', bestTime: 'Evening, before bed' },
  { icon: '💰', activity: 'Saving or Investing Wisely', reason: 'Jupiter trines your natal Saturn, creating one of the most auspicious windows of the year for financial decisions made from a place of patience and wisdom. Even a small investment now grows disproportionately.', bestTime: 'Wednesday or Thursday' },
  { icon: '🤸', activity: 'Gentle Yoga or Stretching', reason: 'Mars is supporting mindful physical practice right now. Yoga, tai chi, or even a simple 10-minute stretch routine will dramatically increase your energy, reduce tension, and align your body with cosmic flow.', bestTime: 'Early morning or before lunch' },
  { icon: '🌱', activity: 'Starting a New Project', reason: 'The New Moon energy combined with Jupiter\'s expansion means any seed you plant right now — a business idea, a creative project, a health habit — has unusually fertile ground to grow from.', bestTime: 'Within 48 hours of your reading' },
  { icon: '🙏', activity: 'Gratitude Practice', reason: 'Venus and Jupiter together create a powerful gratitude vortex in your chart. Writing down 5 specific things you are grateful for each evening will magnetically attract more of the same into your life at an accelerated rate.', bestTime: 'Last thing before sleep' },
  { icon: '🧹', activity: 'Decluttering Your Space', reason: 'Saturn is pushing you to release what no longer serves. Clearing physical clutter from your home or workspace creates literal and energetic space for new blessings, opportunities, and clarity to enter your life.', bestTime: 'Weekend morning' },
  { icon: '🤝', activity: 'Networking & Social Connection', reason: 'The Sun in a strong position makes you unusually magnetic and memorable to others right now. Attend events, reach out to old contacts, or simply show up more visibly — the right people are being drawn into your orbit.', bestTime: 'Evening social events' },
  { icon: '🌊', activity: 'Swimming or Time Near Water', reason: 'Neptune and your natal Moon create a deep resonance with water\'s healing properties. Time near the ocean, a lake, river, or even your local pool will recharge your emotional batteries and restore your sense of peace.', bestTime: 'Any time you feel emotionally depleted' },
  { icon: '🎯', activity: 'Setting Clear Intentions', reason: 'Mars is razor-focused in your chart, giving unusual power to clearly stated goals and intentions. Write your top 3 goals as if already achieved, post them somewhere visible, and review them each morning.', bestTime: 'New Moon, or first day of the week' },
  { icon: '🍳', activity: 'Cooking a Nourishing Meal', reason: 'Taurus and Cancer energy bless domestic activities with healing power right now. Preparing fresh, wholesome food from scratch is both an act of self-love and a form of magic — infuse it with positive intention as you cook.', bestTime: 'Dinner time, with music playing' },
];

function selectDangers(sunSign: string, harmony: number, seed: number): DangerWarning[] {
  // More challenging harmony = more/higher severity warnings
  const count = harmony < -1 ? 4 : harmony < 0 ? 3 : 2;
  const selected: DangerWarning[] = [];
  const used = new Set<number>();
  let s = seed * 7 + sunSign.length * 13;
  while (selected.length < count) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const idx = s % ALL_DANGERS.length;
    if (!used.has(idx)) { used.add(idx); selected.push(ALL_DANGERS[idx]); }
  }
  // Sort: high severity first
  return selected.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.severity] - order[b.severity];
  });
}

function selectLuckyActivities(sunSign: string, harmony: number, seed: number): LuckyActivity[] {
  const count = 4;
  const selected: LuckyActivity[] = [];
  const used = new Set<number>();
  let s = seed * 11 + sunSign.length * 17 + 999;
  while (selected.length < count) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const idx = s % ALL_LUCKY_ACTIVITIES.length;
    if (!used.has(idx)) { used.add(idx); selected.push(ALL_LUCKY_ACTIVITIES[idx]); }
  }
  return selected;
}

// ─── Main forecast engine ─────────────────────────────────────────────────────

export function generateForecast(
  birthYear: number, birthMonth: number, birthDay: number,
  birthHour: number = 12
): FutureForecast {
  const now = new Date();
  const natal = calculatePlanetPositions(birthYear, birthMonth, birthDay, birthHour);
  const current = calculatePlanetPositions(now.getFullYear(), now.getMonth() + 1, now.getDate(), 12);

  // One month ahead
  const nextMonth = new Date(now); nextMonth.setMonth(nextMonth.getMonth() + 1);
  const future1m = calculatePlanetPositions(nextMonth.getFullYear(), nextMonth.getMonth() + 1, nextMonth.getDate(), 12);

  // One year ahead
  const nextYear = new Date(now); nextYear.setFullYear(nextYear.getFullYear() + 1);
  const future1y = calculatePlanetPositions(nextYear.getFullYear(), nextYear.getMonth() + 1, nextYear.getDate(), 12);

  function getPlanet(positions: PlanetPosition[], name: string) {
    return positions.find(p => p.name === name)!;
  }

  function calcHarmony(natalPositions: PlanetPosition[], transitPositions: PlanetPosition[]): number {
    let total = 0;
    const pairs = [
      ['Sun', 'Sun'], ['Sun', 'Jupiter'], ['Moon', 'Venus'], ['Moon', 'Moon'],
      ['Venus', 'Venus'], ['Mars', 'Jupiter'], ['Jupiter', 'Sun'],
    ];
    pairs.forEach(([n, t]) => {
      const nP = getPlanet(natalPositions, n);
      const tP = getPlanet(transitPositions, t);
      if (nP && tP) {
        const diff = getAngleDiff(nP.longitude, tP.longitude);
        total += getAspect(diff).harmony;
      }
    });
    return total;
  }

  const natalSun = getPlanet(natal, 'Sun');
  const natalMoon = getPlanet(natal, 'Moon');
  const natalVenus = getPlanet(natal, 'Venus');
  const natalMars = getPlanet(natal, 'Mars');
  const natalJupiter = getPlanet(natal, 'Jupiter');
  const natalNeptune = getPlanet(natal, 'Neptune');

  function buildPredictions(transitPositions: PlanetPosition[], timeframe: Timeframe, seedOffset: number): Prediction[] {
    const harmony = calcHarmony(natal, transitPositions);
    const tVenus = getPlanet(transitPositions, 'Venus').sign;
    const tMars = getPlanet(transitPositions, 'Mars').sign;
    const tJupiter = getPlanet(transitPositions, 'Jupiter').sign;
    const tMoon = getPlanet(transitPositions, 'Moon').sign;
    const seed = (birthYear + birthMonth * 13 + birthDay * 31 + seedOffset) % 97 + 1;

    return [
      lovePrediction(harmony, natalSun.sign, natalVenus.sign, tVenus, timeframe, seed),
      careerPrediction(harmony, natalSun.sign, natalMars.sign, tMars, timeframe, seed + 1),
      moneyPrediction(harmony, natalSun.sign, natalJupiter.sign, tJupiter, timeframe, seed + 2),
      healthPrediction(harmony, natalMoon.sign, tMoon, timeframe, seed + 3),
      spiritualPrediction(harmony, natalMoon.sign, natalNeptune.sign, timeframe, seed + 4),
    ];
  }

  const weekPredictions = buildPredictions(current, 'week', 0);
  const monthPredictions = buildPredictions(future1m, 'month', 50);
  const yearPredictions = buildPredictions(future1y, 'year', 100);

  const avgScore = weekPredictions.reduce((s, p) => s + p.score, 0) / weekPredictions.length;
  const overallEnergy = scoreToEnergy(avgScore);

  const cosmicMessages: Record<Energy, string> = {
    excellent: `The cosmos is arranging itself in your favour right now, ${natalSun.sign}. The planets are whispering your name. Step forward with confidence — this is your time to shine, to love boldly, and to reach for what you have always deserved.`,
    good: `The stars are gently supporting you, ${natalSun.sign}. You are in a period of genuine positive momentum. Trust the quiet signs of progress around you, stay consistent with your intentions, and allow good things to arrive in their perfect timing.`,
    neutral: `The universe is holding space for your growth, ${natalSun.sign}. This is a season of preparation and inner cultivation. What you tend to in the quiet times blooms magnificently in the seasons of light. Trust the process.`,
    challenging: `The planets are presenting you with the kind of friction that forges diamonds, ${natalSun.sign}. These challenges are not punishments — they are initiations. The strength you develop now will serve you for years to come. You are more capable than you know.`,
    intense: `You are in the crucible of transformation, ${natalSun.sign}. The cosmos rarely puts us through intense change without profound purpose. Everything that is falling away is making room for something that is more authentically, powerfully you. Trust the fire.`,
  };

  // Power dates — upcoming notable transit points
  const powerDates = [
    { date: addDays(now, 3), event: `Venus enters favourable aspect with your natal Sun in ${natalSun.sign}` },
    { date: addDays(now, 7), event: `New Moon creates fresh energy in your career sector` },
    { date: addDays(now, 14), event: `Mars activates your natal ${natalMars.sign} placement — energy peaks` },
    { date: addDays(now, 21), event: `Full Moon illuminates your ${natalMoon.sign} Moon — emotional clarity` },
    { date: addDays(now, 28), event: `Jupiter's blessing touches your financial sector` },
  ];

  const harmony = weekPredictions.reduce((s, p) => s + (p.score - 5), 0);
  const seed = (birthYear + birthMonth * 13 + birthDay * 31) % 97 + 1;

  return {
    week: weekPredictions,
    month: monthPredictions,
    year: yearPredictions,
    overallEnergy,
    overallScore: Math.round(avgScore * 10) / 10,
    cosmicMessage: cosmicMessages[overallEnergy],
    powerDates,
    dangers: selectDangers(natalSun.sign, harmony, seed),
    luckyActivities: selectLuckyActivities(natalSun.sign, harmony, seed),
  };
}

export { ENERGY_LABELS };
