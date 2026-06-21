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

const ALL_DANGERS_HI: DangerWarning[] = [
  { icon: '💸', title: 'जोखिम भरे वित्तीय निर्णय', description: 'ग्रहों का तनाव आवेगपूर्ण खर्च, जुए या ऐसी चीज़ों में निवेश के खिलाफ चेतावनी देता है जिन्हें आप पूरी तरह नहीं समझते। बिना सावधानीपूर्वक समीक्षा किए दोस्तों को बड़ी रकम उधार देने या वित्तीय समझौतों पर हस्ताक्षर करने से बचें।', severity: 'high' },
  { icon: '🗣️', title: 'तर्क-वितर्क और कटु शब्द', description: 'बुध की वर्तमान स्थिति गलतफहमी और गर्म बहसों के जोखिम को बढ़ाती है। क्रोध में बोले गए शब्द अब स्थायी नुकसान कर सकते हैं। वह संदेश भेजने या वह टकराव करने से पहले दो बार सोचें।', severity: 'high' },
  { icon: '💔', title: 'प्रेम में जल्दबाज़ी', description: 'सितारे अभी प्रेम में बहुत तेज़ी से आगे बढ़ने के खिलाफ सावधान करते हैं। जो गहरा जुड़ाव लग रहा है वह भ्रम हो सकता है। नए रोमांटिक साझेदारों के साथ गंभीर प्रतिबद्धताएं बनाने से पहले समय लें।', severity: 'medium' },
  { icon: '🏃', title: 'शारीरिक अति परिश्रम', description: 'मंगल ऊर्जा अनिश्चित है — अभी शरीर को बहुत कठिन धकेलने से चोट का खतरा है। अत्यधिक खेल, लापरवाह ड्राइविंग, या थकान के संकेत मिलने पर आराम न छोड़ने से बचें।', severity: 'medium' },
  { icon: '🍷', title: 'पलायनवाद और अति भोग', description: 'नेप्च्यून का प्रभाव आपको अति भोग की ओर प्रेरित कर सकता है। ये क्षणिक राहत देते हैं लेकिन मूल समस्याओं को गहरा करते हैं। ज़मीन से जुड़े रहें।', severity: 'medium' },
  { icon: '🤐', title: 'ज़हरीले रहस्य छुपाना', description: 'कुछ छिपा हुआ दबाव बना रहा है। किसी रहस्य या अनकही सच्चाई को अकेले ढोने से तनाव और चिंता बढ़ेगी। किसी विश्वसनीय व्यक्ति से बात करें या डायरी में ईमानदारी से लिखें।', severity: 'medium' },
  { icon: '🌙', title: 'नींद की अनदेखी', description: 'चंद्रमा की वर्तमान स्थिति नींद में खलल की संभावना बढ़ाती है। आराम को नज़रअंदाज़ करने से जीवन की हर अन्य चुनौती और बढ़ जाएगी। रात 10 बजे के बाद स्क्रीन बंद करें।', severity: 'low' },
  { icon: '👥', title: 'ज़हरीले सामाजिक दायरे', description: 'शनि उन लोगों को उजागर कर रहा है जो आपकी ऊर्जा को भरते नहीं बल्कि खाली करते हैं। जो लगातार नाटक करते हैं, हेरफेर करते हैं, या हर बातचीत के बाद आपको बुरा महसूस कराते हैं — उनसे सतर्क रहें।', severity: 'medium' },
  { icon: '📱', title: 'सोशल मीडिया तुलना', description: 'तनावग्रस्त शुक्र आपकी असली ज़िंदगी की दूसरों की हाइलाइट रील से तुलना करने के खिलाफ चेतावनी देता है। इस समय सोशल मीडिया स्क्रॉल करने से अपर्याप्तता और ईर्ष्या की भावना बढ़ेगी।', severity: 'low' },
  { icon: '⚡', title: 'आवेगशील बड़े निर्णय', description: 'यूरेनस आपकी कुंडली को विद्युतीकृत कर रहा है — नौकरी छोड़ना, रिश्ता तोड़ना या अचानक जीवन बदलना आकर्षक लग सकता है। बदलाव ज़रूरी हो सकता है, लेकिन किसी भी भारी आवेग पर कम से कम दो सप्ताह रुककर सोचें।', severity: 'high' },
  { icon: '🤝', title: 'बिना जाँचे व्यावसायिक साझेदारी', description: 'बृहस्पति का वर्ग बिना उचित जाँच-परख के व्यावसायिक सौदों में जल्दबाज़ी के खिलाफ चेतावनी देता है। कोई जितना वास्तव में है उससे अधिक भरोसेमंद दिख सकता है। सब कुछ लिखित में सत्यापित करें।', severity: 'high' },
  { icon: '😤', title: 'क्रोध को दबाना', description: 'अभी निराशा और नाराज़गी को दबाने से बाद में अनियंत्रित विस्फोट होगा। व्यायाम, डायरी लेखन, या ईमानदार बातचीत जैसे स्वस्थ तरीके खोजें।', severity: 'low' },
  { icon: '🏥', title: 'स्वास्थ्य लक्षणों को नज़रअंदाज़ करना', description: '6वां घर ग्रहों के तनाव में है। लगातार शारीरिक लक्षणों को नज़रअंदाज़ न करें। जो अभी छोटा लगता है वह बाद में बढ़ सकता है। आपका शरीर बोल रहा है — सुनें।', severity: 'high' },
  { icon: '🛒', title: 'भावनात्मक खरीदारी', description: 'इस समय भावनात्मक खर्च एक वास्तविक जोखिम है। जब मूड ठीक करने के लिए कुछ अनावश्यक खरीदने का मन हो, तो 24 घंटे रुकें। जो खालीपन खरीदारी से भरता है उसपर गहरा ध्यान चाहिए।', severity: 'low' },
  { icon: '🌀', title: 'अत्यधिक सोच और चिंता', description: 'बुध वक्री ऊर्जा मानसिक बकबक को बढ़ा रही है। पहचानें कि आपका मन कब समस्याएं हल करने की जगह कहानियाँ बना रहा है। सांस लें, ज़मीन से जुड़ें और वर्तमान पर लौटें।', severity: 'medium' },
];

const ALL_LUCKY_ACTIVITIES_HI: LuckyActivity[] = [
  { icon: '🧘', activity: 'सुबह का ध्यान', reason: 'बृहस्पति आपके जन्म चंद्रमा के साथ संरेखित है, आंतरिक स्पष्टता और आध्यात्मिक ग्रहणशीलता को बढ़ाता है। सूर्योदय पर सिर्फ 10 मिनट का ध्यान पूरे दिन के लिए आपकी अंतर्ज्ञान शक्ति को सुपरचार्ज करेगा।', bestTime: 'सूर्योदय, फोन देखने से पहले' },
  { icon: '✍️', activity: 'सपनों की डायरी', reason: 'नेप्च्यून आपकी कुंडली में सक्रिय है, जो स्वप्न जगत को मार्गदर्शन से असाधारण रूप से समृद्ध बनाता है। बिस्तर के पास डायरी रखें और जागते ही तुरंत लिखें।', bestTime: 'जागने के 5 मिनट के भीतर' },
  { icon: '🌿', activity: 'प्रकृति में नंगे पैर चलना', reason: 'शुक्र आपके पृथ्वी ग्रहों के साथ त्रिकोण बनाता है। घास या मिट्टी से सीधा संपर्क आपकी ऊर्जा को स्थिर करता है और संचित तनाव को कोशिकीय स्तर पर घोल देता है।', bestTime: 'सूर्यास्त से 1 घंटे पहले' },
  { icon: '🎨', activity: 'रचनात्मक अभिव्यक्ति', reason: 'सूर्य-नेप्च्यून योग आपकी कुंडली को रचनात्मक प्रेरणा से भर देता है। चित्रकारी, लेखन, नृत्य या संगीत न केवल आनंद लाएगा बल्कि आपकी अब तक की श्रेष्ठ कृति हो सकती है।', bestTime: 'दोपहर में, जब रचनात्मक प्रवाह चरम पर हो' },
  { icon: '💌', activity: 'प्रिय व्यक्ति से संपर्क', reason: 'शुक्र आपके संचार क्षेत्र को आशीर्वाद दे रहा है। किसी प्रिय को हृदय से भेजा संदेश, कॉल या मुलाकात रिश्ते को गहरा करेगी।', bestTime: 'शाम को, जब दिल सबसे खुले होते हैं' },
  { icon: '📚', activity: 'कुछ नया सीखें', reason: 'बुध अभी ज्ञान अवशोषण के लिए अच्छे पहलू में है। कोई कोर्स शुरू करना, चुनौतीपूर्ण किताब पढ़ना असामान्य रूप से संतोषजनक लगेगा।', bestTime: 'सुबह, जब मन सबसे तेज़ होता है' },
  { icon: '🛁', activity: 'नमक स्नान अनुष्ठान', reason: 'चंद्रमा आपके ऊर्जावान क्षेत्र को शुद्ध कर रहा है। इरादे के साथ स्नान — सभी तनाव और नकारात्मकता को बहते हुए कल्पना करना — अभी शक्तिशाली शुद्धिकारक ऊर्जा वहन करता है।', bestTime: 'शाम को, सोने से पहले' },
  { icon: '💰', activity: 'समझदारी से बचत या निवेश', reason: 'बृहस्पति आपके जन्म शनि के साथ त्रिकोण बनाता है, जो धैर्य और ज्ञान से किए गए वित्तीय निर्णयों के लिए वर्ष की सबसे शुभ खिड़की बनाता है।', bestTime: 'बुधवार या गुरुवार' },
  { icon: '🤸', activity: 'हल्का योग या स्ट्रेचिंग', reason: 'मंगल अभी सचेत शारीरिक अभ्यास का समर्थन कर रहा है। योग, ताई ची, या सिर्फ 10 मिनट की स्ट्रेच दिनचर्या आपकी ऊर्जा को नाटकीय रूप से बढ़ाएगी।', bestTime: 'सुबह जल्दी या दोपहर के खाने से पहले' },
  { icon: '🌱', activity: 'नया प्रोजेक्ट शुरू करें', reason: 'अमावस्या ऊर्जा और बृहस्पति के विस्तार का मतलब है कि अभी बोया गया कोई भी बीज — एक व्यावसायिक विचार, रचनात्मक परियोजना, स्वास्थ्य आदत — असामान्य रूप से उपजाऊ जमीन पाता है।', bestTime: 'आपकी रीडिंग के 48 घंटों के भीतर' },
  { icon: '🙏', activity: 'कृतज्ञता अभ्यास', reason: 'शुक्र और बृहस्पति मिलकर आपकी कुंडली में एक शक्तिशाली कृतज्ञता भंवर बनाते हैं। हर शाम 5 विशिष्ट चीज़ें लिखना जिनके लिए आप आभारी हैं, चुंबकीय रूप से और अधिक आकर्षित करेगा।', bestTime: 'सोने से पहले अंतिम काम' },
  { icon: '🧹', activity: 'अपना स्थान साफ करें', reason: 'शनि आपको जो अब उपयोगी नहीं है उसे छोड़ने के लिए प्रेरित कर रहा है। घर या कार्यस्थान से भौतिक अव्यवस्था हटाने से नई आशीष, अवसरों और स्पष्टता के लिए शाब्दिक और ऊर्जावान जगह बनती है।', bestTime: 'सप्ताहांत की सुबह' },
  { icon: '🤝', activity: 'नेटवर्किंग और सामाजिक जुड़ाव', reason: 'मजबूत स्थिति में सूर्य आपको असामान्य रूप से आकर्षक और यादगार बनाता है। कार्यक्रमों में जाएं, पुराने संपर्कों से जुड़ें — सही लोग आपकी कक्षा में आ रहे हैं।', bestTime: 'शाम के सामाजिक कार्यक्रम' },
  { icon: '🌊', activity: 'तैराकी या पानी के पास समय', reason: 'नेप्च्यून और आपका जन्म चंद्रमा पानी के उपचारकारी गुणों के साथ गहरी अनुनाद बनाते हैं। समुद्र, झील, नदी के पास का समय आपकी भावनात्मक बैटरी रिचार्ज करेगा।', bestTime: 'जब भी भावनात्मक रूप से थका हुआ महसूस करें' },
  { icon: '🎯', activity: 'स्पष्ट इरादे निर्धारित करें', reason: 'मंगल आपकी कुंडली में एकदम केंद्रित है, जो स्पष्ट रूप से बताए गए लक्ष्यों और इरादों को असामान्य शक्ति देता है। अपने शीर्ष 3 लक्ष्य ऐसे लिखें जैसे वे पहले से हासिल हो गए हों।', bestTime: 'अमावस्या, या सप्ताह का पहला दिन' },
  { icon: '🍳', activity: 'पौष्टिक भोजन बनाएं', reason: 'वृष और कर्क ऊर्जा अभी घरेलू गतिविधियों को उपचारकारी शक्ति से आशीर्वादित करती है। ताज़ा, स्वस्थ भोजन खरोंच से तैयार करना आत्म-प्रेम का कार्य और एक प्रकार की जादुई ऊर्जा है।', bestTime: 'रात का खाना, संगीत के साथ' },
];

function selectDangers(sunSign: string, harmony: number, seed: number, lang: 'en' | 'hi' = 'en'): DangerWarning[] {
  const pool = lang === 'hi' ? ALL_DANGERS_HI : ALL_DANGERS;
  const count = harmony < -1 ? 4 : harmony < 0 ? 3 : 2;
  const selected: DangerWarning[] = [];
  const used = new Set<number>();
  let s = seed * 7 + sunSign.length * 13;
  while (selected.length < count) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const idx = s % pool.length;
    if (!used.has(idx)) { used.add(idx); selected.push(pool[idx]); }
  }
  return selected.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.severity] - order[b.severity];
  });
}

function selectLuckyActivities(sunSign: string, harmony: number, seed: number, lang: 'en' | 'hi' = 'en'): LuckyActivity[] {
  const pool = lang === 'hi' ? ALL_LUCKY_ACTIVITIES_HI : ALL_LUCKY_ACTIVITIES;
  const count = 4;
  const selected: LuckyActivity[] = [];
  const used = new Set<number>();
  let s = seed * 11 + sunSign.length * 17 + 999;
  while (selected.length < count) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const idx = s % pool.length;
    if (!used.has(idx)) { used.add(idx); selected.push(pool[idx]); }
  }
  return selected;
}

// ─── Main forecast engine ─────────────────────────────────────────────────────

export function generateForecast(
  birthYear: number, birthMonth: number, birthDay: number,
  birthHour: number = 12,
  lang: 'en' | 'hi' = 'en'
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

  const cosmicMessages: Record<Energy, string> = lang === 'hi' ? {
    excellent: `ब्रह्मांड अभी आपके पक्ष में खुद को व्यवस्थित कर रहा है, ${natalSun.sign}। ग्रह आपका नाम फुसफुसा रहे हैं। आत्मविश्वास के साथ आगे बढ़ें — यह आपका समय है चमकने का, साहसपूर्वक प्रेम करने का, और वह हासिल करने का जिसके आप हमेशा से हकदार थे।`,
    good: `सितारे धीरे से आपका साथ दे रहे हैं, ${natalSun.sign}। आप वास्तविक सकारात्मक गति के दौर में हैं। अपने आसपास प्रगति के शांत संकेतों पर भरोसा करें, अपने इरादों के साथ निरंतर रहें, और अच्छी चीज़ों को सही समय पर आने दें।`,
    neutral: `ब्रह्मांड आपके विकास के लिए जगह बना रहा है, ${natalSun.sign}। यह तैयारी और आंतरिक खेती का मौसम है। जो आप शांत समय में संजोते हैं वह प्रकाश के मौसमों में शानदार तरीके से खिलता है। प्रक्रिया पर भरोसा करें।`,
    challenging: `ग्रह आपके सामने वह घर्षण प्रस्तुत कर रहे हैं जो हीरे बनाता है, ${natalSun.sign}। ये चुनौतियाँ दंड नहीं हैं — ये दीक्षाएं हैं। आप जो ताकत अभी विकसित करते हैं वह आपकी आने वाले वर्षों तक सेवा करेगी। आप जितना जानते हैं उससे कहीं अधिक सक्षम हैं।`,
    intense: `आप परिवर्तन की भट्टी में हैं, ${natalSun.sign}। ब्रह्मांड हमें गहरे उद्देश्य के बिना तीव्र बदलाव से शायद ही गुज़ारता है। जो कुछ भी दूर जा रहा है वह किसी ऐसी चीज़ के लिए जगह बना रहा है जो अधिक प्रामाणिक रूप से, शक्तिशाली रूप से आप हैं। आग पर भरोसा करें।`,
  } : {
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
    dangers: selectDangers(natalSun.sign, harmony, seed, lang),
    luckyActivities: selectLuckyActivities(natalSun.sign, harmony, seed, lang),
  };
}

export { ENERGY_LABELS };
