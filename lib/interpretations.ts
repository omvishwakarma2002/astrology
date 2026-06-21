// Planet-in-sign personality interpretations

export interface PlanetInterpretation {
  title: string;
  meaning: string;
  traits: string[];
}

type SignName =
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo'
  | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

type PlanetName =
  | 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars'
  | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune';

const interpretations: Record<PlanetName, Record<SignName, PlanetInterpretation>> = {
  Sun: {
    Aries: {
      title: 'The Pioneer',
      meaning: 'Your core identity is bold, energetic, and fiercely independent. You were born to lead and initiate. You have an unstoppable drive to start new things and forge your own path in life. Challenges excite rather than deter you.',
      traits: ['Natural-born leader', 'Courageous & fearless', 'Highly competitive', 'Impulsive but passionate'],
    },
    Taurus: {
      title: 'The Builder',
      meaning: 'Your core identity is grounded, patient, and deeply devoted to comfort and beauty. You build lasting things — relationships, wealth, and art. You are reliable like the earth itself, and once committed, almost impossible to move.',
      traits: ['Extremely patient', 'Sensual & pleasure-loving', 'Stubborn but dependable', 'Appreciates beauty & luxury'],
    },
    Gemini: {
      title: 'The Communicator',
      meaning: 'Your core identity is quick-witted, curious, and endlessly adaptable. You are a natural storyteller with a gift for connecting ideas and people. Your mind races with possibilities and you thrive on variety and intellectual stimulation.',
      traits: ['Highly intelligent', 'Social & charming', 'Adaptable & versatile', 'Can be indecisive'],
    },
    Cancer: {
      title: 'The Nurturer',
      meaning: 'Your core identity is deeply emotional, protective, and attuned to others feelings. Home and family are sacred to you. You have a powerful intuition and can sense what others need before they ask. Your love runs extraordinarily deep.',
      traits: ['Deeply empathetic', 'Fiercely protective', 'Highly intuitive', 'Emotionally sensitive'],
    },
    Leo: {
      title: 'The Royalty',
      meaning: 'Your core identity is radiant, generous, and magnetic. You were born to shine and inspire others. You have a natural flair for drama and creativity, and when you walk into a room, people notice. Your warmth draws others to you like moths to a flame.',
      traits: ['Charismatic & confident', 'Generous to a fault', 'Creative & expressive', 'Craves recognition'],
    },
    Virgo: {
      title: 'The Analyst',
      meaning: 'Your core identity is sharp, discerning, and devoted to improvement. You have an exceptional eye for detail and a gift for problem-solving. You are most fulfilled when you are being genuinely useful and making things better — in yourself and in the world.',
      traits: ['Highly analytical', 'Practical & hardworking', 'Health-conscious', 'Perfectionistic'],
    },
    Libra: {
      title: 'The Diplomat',
      meaning: 'Your core identity is charming, fair-minded, and driven by a deep need for harmony and justice. You are a natural peacemaker who sees all sides of every situation. Beauty, balance, and meaningful partnerships are at the heart of who you are.',
      traits: ['Charming & graceful', 'Fair & just', 'Romantic at heart', 'Struggles with decisions'],
    },
    Scorpio: {
      title: 'The Transformer',
      meaning: 'Your core identity is intense, magnetic, and profoundly perceptive. You see through surface appearances straight to the truth beneath. You are drawn to life\'s deepest mysteries and have the power to transform yourself and others through sheer will.',
      traits: ['Intensely perceptive', 'Powerfully magnetic', 'Loyal to the death', 'Can be obsessive'],
    },
    Sagittarius: {
      title: 'The Explorer',
      meaning: 'Your core identity is adventurous, philosophical, and eternally optimistic. You are on a lifelong quest for truth, meaning, and experience. Boundaries feel like challenges to cross rather than limits to respect. Your enthusiasm for life is contagious.',
      traits: ['Adventurous & free', 'Highly optimistic', 'Philosophically minded', 'Bluntly honest'],
    },
    Capricorn: {
      title: 'The Achiever',
      meaning: 'Your core identity is disciplined, ambitious, and built for long-term success. You have an old soul quality — mature beyond your years, with a strategic mind that plays the long game. You are willing to sacrifice short-term pleasure for long-term mastery.',
      traits: ['Incredibly disciplined', 'Highly ambitious', 'Responsible & reliable', 'Can be emotionally reserved'],
    },
    Aquarius: {
      title: 'The Visionary',
      meaning: 'Your core identity is original, humanitarian, and ahead of your time. You march to the beat of your own drum and feel a deep calling to contribute to the greater good. You see the world not as it is, but as it could be, and you work to close that gap.',
      traits: ['Brilliantly original', 'Humanitarian values', 'Independent thinker', 'Emotionally detached'],
    },
    Pisces: {
      title: 'The Mystic',
      meaning: 'Your core identity is dreamy, compassionate, and deeply spiritual. You experience the world through feeling and intuition rather than logic. You are the most empathetic sign of the zodiac — you absorb the emotions of those around you like a sponge.',
      traits: ['Deeply compassionate', 'Highly creative', 'Spiritually gifted', 'Can lose sense of self'],
    },
  },

  Moon: {
    Aries: {
      title: 'Emotionally Bold',
      meaning: 'Your emotional world is fast, fierce, and direct. You feel things instantly and intensely, and you need to act on your feelings right away. You don\'t brood — you react. Anger flares quickly but passes just as fast. You need emotional independence.',
      traits: ['Reacts quickly to emotions', 'Emotionally independent', 'Needs action & movement', 'Anger is short-lived'],
    },
    Taurus: {
      title: 'Emotionally Steadfast',
      meaning: 'Your emotional world is calm, steady, and deeply connected to the physical senses. You find comfort in routine, good food, nature, and physical affection. You are emotionally reliable — slow to anger and slow to change. Security is your deepest need.',
      traits: ['Emotionally stable', 'Comforted by routine', 'Sensual & tactile', 'Resistant to emotional change'],
    },
    Gemini: {
      title: 'Emotionally Curious',
      meaning: 'Your emotional world is quick-moving and intellectually driven. You process feelings by talking about them and analyzing them. Your moods shift frequently, reflecting your curious and adaptable nature. Connection through communication is your emotional love language.',
      traits: ['Talks through feelings', 'Emotionally versatile', 'Needs mental stimulation', 'Mood changes quickly'],
    },
    Cancer: {
      title: 'Emotionally Deep',
      meaning: 'Your Moon is in its home sign, making you extraordinarily emotional, intuitive, and nurturing. You feel everything profoundly. Your home and family are your emotional anchor. You are deeply empathetic — sometimes absorbing others\' emotions as your own.',
      traits: ['Powerfully intuitive', 'Deeply nurturing', 'Homebody at heart', 'Highly sensitive to criticism'],
    },
    Leo: {
      title: 'Emotionally Expressive',
      meaning: 'Your emotional world is warm, theatrical, and generous. You feel emotions vividly and express them dramatically. You need to feel special, seen, and appreciated by those you love. When you feel ignored, it wounds your heart deeply.',
      traits: ['Dramatic emotional expression', 'Needs recognition', 'Warm & generous heart', 'Pride can be easily hurt'],
    },
    Virgo: {
      title: 'Emotionally Analytical',
      meaning: 'Your emotional world is practical and thoughtful. You process feelings by analyzing them and finding solutions. You show love through acts of service and attention to detail. You can be overly self-critical about your own emotional responses.',
      traits: ['Analyzes feelings carefully', 'Shows love through service', 'Worries frequently', 'High emotional standards'],
    },
    Libra: {
      title: 'Emotionally Harmonious',
      meaning: 'Your emotional world thrives on balance, beauty, and partnership. Conflict disturbs you deeply, and you will go to great lengths to restore peace. You are at your happiest when in a loving, fair, and aesthetically pleasing relationship.',
      traits: ['Craves emotional harmony', 'Emotionally fair-minded', 'Loves partnership', 'Avoids conflict at all costs'],
    },
    Scorpio: {
      title: 'Emotionally Intense',
      meaning: 'Your emotional world runs extraordinarily deep — like an ocean. You feel things with volcanic intensity that you rarely show on the surface. You need complete emotional trust before you open up. Betrayal is something you never forget.',
      traits: ['Feels deeply but hides it', 'Needs emotional trust', 'Intensely loyal', 'Never forgets emotional wounds'],
    },
    Sagittarius: {
      title: 'Emotionally Free',
      meaning: 'Your emotional world craves freedom, adventure, and optimism. You bounce back from difficulties quickly because you always find a philosophical perspective. You need emotional space and independence — feeling caged makes you restless.',
      traits: ['Emotionally optimistic', 'Bounces back quickly', 'Needs emotional freedom', 'Honest to a fault'],
    },
    Capricorn: {
      title: 'Emotionally Reserved',
      meaning: 'Your emotional world is controlled, private, and deeply tied to achievement. You tend to keep emotions in check, preferring to show love through acts of responsibility and provision. You may find vulnerability difficult, but you feel deeply within.',
      traits: ['Controls emotions publicly', 'Shows love through action', 'Needs to feel accomplished', 'Slow to open up'],
    },
    Aquarius: {
      title: 'Emotionally Detached',
      meaning: 'Your emotional world is unique and unconventional. You often experience feelings intellectually rather than viscerally. You care deeply about humanity in the abstract but can struggle with personal emotional intimacy. Independence is an emotional necessity.',
      traits: ['Emotionally independent', 'Humanitarian instincts', 'Struggles with intimacy', 'Thinks about feelings'],
    },
    Pisces: {
      title: 'Emotionally Boundless',
      meaning: 'Your emotional world is vast, fluid, and deeply spiritual. You feel everything — including the emotions of people around you. Boundaries between your feelings and others\' can dissolve. You are enormously compassionate but must protect your sensitive heart.',
      traits: ['Deeply empathetic', 'Psychically sensitive', 'Needs creative outlets', 'Absorbs others\' emotions'],
    },
  },

  Mercury: {
    Aries: { title: 'Thinks Fast & Direct', meaning: 'Your mind is lightning-fast, decisive, and straight to the point. You hate lengthy explanations — you want the bottom line immediately. You have original ideas and aren\'t afraid to defend them fiercely.', traits: ['Blunt communicator', 'Quick decision-maker', 'Original thinker', 'Impatient with detail'] },
    Taurus: { title: 'Thinks Slowly & Surely', meaning: 'Your mind works methodically and thoroughly. You don\'t rush to conclusions — you think things through carefully. Once your mind is made up, it\'s very hard to change. You have excellent practical judgment.', traits: ['Methodical thinker', 'Excellent memory', 'Slow but thorough', 'Very hard to persuade'] },
    Gemini: { title: 'Thinks in All Directions', meaning: 'Mercury is at home in Gemini. Your mind is razor-sharp, endlessly curious, and capable of holding multiple ideas at once. You are a gifted communicator, writer, and conversationalist who can talk to anyone about anything.', traits: ['Brilliantly versatile mind', 'Natural communicator', 'Loves learning everything', 'Can lack focus'] },
    Cancer: { title: 'Thinks with the Heart', meaning: 'Your mind is deeply intuitive and emotionally intelligent. You pick up on unspoken feelings and read between the lines effortlessly. Memory is tied to emotion — you remember how things felt more than what was said.', traits: ['Intuitive intelligence', 'Excellent memory for feelings', 'Protective in communication', 'Can be subjective'] },
    Leo: { title: 'Thinks Dramatically', meaning: 'Your mind is creative, confident, and built for storytelling. You communicate with flair and love to entertain with your words. You have strong opinions and aren\'t shy about expressing them. You speak to inspire.', traits: ['Natural storyteller', 'Speaks with authority', 'Creative and dramatic', 'Loves the spotlight in conversation'] },
    Virgo: { title: 'Thinks with Precision', meaning: 'Mercury is at home in Virgo. Your mind is analytical, precise, and extraordinarily detail-oriented. You notice things others miss. You communicate clearly and practically, and you have a gift for editing, analysis, and critique.', traits: ['Exceptionally detail-oriented', 'Practical communicator', 'Critical thinker', 'High standards for accuracy'] },
    Libra: { title: 'Thinks in Balance', meaning: 'Your mind naturally weighs all sides of every issue. You are a fair, diplomatic communicator who can see multiple perspectives simultaneously. You have a gift for mediation and finding middle ground. Decisions can be agonizing.', traits: ['Fair-minded thinker', 'Diplomatic communicator', 'Sees all perspectives', 'Struggles to decide'] },
    Scorpio: { title: 'Thinks Deeply', meaning: 'Your mind cuts straight to the core of any matter. You are a natural investigator who doesn\'t accept surface explanations. You see through pretense and deception easily. Your words carry weight and intensity.', traits: ['Penetrating intellect', 'Investigative mind', 'Speaks with intensity', 'Keeps thoughts private'] },
    Sagittarius: { title: 'Thinks Expansively', meaning: 'Your mind is philosophical, optimistic, and drawn to the big picture. You love learning about other cultures, belief systems, and grand ideas. You communicate enthusiastically and inspire others with your vision.', traits: ['Big-picture thinker', 'Enthusiastic communicator', 'Loves philosophy & travel', 'Can overlook details'] },
    Capricorn: { title: 'Thinks Strategically', meaning: 'Your mind is disciplined, practical, and long-term focused. You think before you speak and choose your words carefully. You excel at strategic planning and breaking complex problems into actionable steps.', traits: ['Strategic thinker', 'Measured communicator', 'Long-term planner', 'Serious and reserved in expression'] },
    Aquarius: { title: 'Thinks Originally', meaning: 'Your mind is ahead of its time. You think in revolutionary, unconventional ways that others often don\'t understand until years later. You love experimenting with ideas and are drawn to science, technology, and social innovation.', traits: ['Revolutionary thinker', 'Highly original ideas', 'Interested in technology', 'Can seem eccentric'] },
    Pisces: { title: 'Thinks Imaginatively', meaning: 'Your mind works through intuition, symbol, and imagination rather than linear logic. You are a natural poet, artist, or visionary. Your thinking can be brilliant but hard to explain in concrete terms — you think in feelings and images.', traits: ['Highly imaginative', 'Intuitive intelligence', 'Creative communicator', 'Can be vague or scattered'] },
  },

  Venus: {
    Aries: { title: 'Loves Boldly', meaning: 'You love passionately and impulsively. You pursue who you want with confidence and directness. You are attracted to strength and energy, and you need a partner who keeps up with you. Romance must feel like an adventure.', traits: ['Pursues love fearlessly', 'Needs excitement in love', 'Direct about attraction', 'Can rush into relationships'] },
    Taurus: { title: 'Loves Sensually', meaning: 'Venus is at home in Taurus. You love deeply, loyally, and with all five senses. Physical affection, beautiful environments, and shared pleasures are how you express love. Once committed, you are devoted and incredibly reliable.', traits: ['Deeply loyal partner', 'Highly sensual', 'Values stability in love', 'Can be possessive'] },
    Gemini: { title: 'Loves Intellectually', meaning: 'You fall in love with minds first. Stimulating conversation is your greatest aphrodisiac. You need a partner who is witty, curious, and ever-changing. You can be flirtatious by nature, and you love keeping things light and playful.', traits: ['Needs mental connection', 'Playfully flirtatious', 'Loves variety in love', 'Commitment can feel restrictive'] },
    Cancer: { title: 'Loves Deeply', meaning: 'You love with your whole soul and need deep emotional security in relationships. You are nurturing, protective, and devoted. Home-building and creating a safe emotional nest with your partner is your greatest romantic goal.', traits: ['Intensely nurturing', 'Needs emotional security', 'Deeply devoted', 'Can cling when insecure'] },
    Leo: { title: 'Loves Grandly', meaning: 'You love dramatically, generously, and with enormous warmth. You want to be adored and to adore in return. Grand gestures, loyalty, and passion define your love style. You are fiercely devoted and expect the same devotion back.', traits: ['Grand romantic gestures', 'Fiercely loyal', 'Needs admiration', 'Proud in love'] },
    Virgo: { title: 'Loves Through Service', meaning: 'You show love through acts of care, attention to detail, and practical devotion. You may seem reserved at first, but you love deeply and consistently. You notice every little thing about those you care for and express love by helping and improving their lives.', traits: ['Shows love through service', 'Critically loving', 'Quiet but devoted', 'High standards in love'] },
    Libra: { title: 'Loves Beautifully', meaning: 'Venus is at home in Libra. You are a natural romantic who thrives in partnership. Beauty, fairness, and harmony in relationships are essential to you. You are charming, gracious, and excel at making your partner feel cherished.', traits: ['Natural romantic', 'Craves partnership', 'Charming & gracious', 'Avoids conflict in love'] },
    Scorpio: { title: 'Loves Intensely', meaning: 'You love with a consuming intensity that goes far beyond the ordinary. For you, love is a total merger of souls. You need complete loyalty and emotional depth. Surface-level connections bore you — you want transformation through love.', traits: ['All-or-nothing in love', 'Intensely jealous', 'Seeks soul-deep connection', 'Transformation through relationships'] },
    Sagittarius: { title: 'Loves Freely', meaning: 'You love adventure, honesty, and freedom in relationships. You need a partner who is a fellow explorer — someone who grows with you intellectually and spiritually. Clingy or controlling partners are dealbreakers for you.', traits: ['Needs freedom in love', 'Adventurous partner', 'Brutally honest', 'Love through shared exploration'] },
    Capricorn: { title: 'Loves Seriously', meaning: 'You approach love seriously and with long-term intentions. You aren\'t interested in flings — you want a partner you can build a life with. You show love through responsibility, ambition on behalf of your family, and quiet, consistent devotion.', traits: ['Long-term commitment focused', 'Shows love through provision', 'Traditional romantic', 'Takes time to open up'] },
    Aquarius: { title: 'Loves Uniquely', meaning: 'You love unconventionally and need a partner who respects your fierce independence. Friendship is the foundation of romance for you. You are drawn to unique, unusual people who challenge your thinking. Emotional neediness pushes you away.', traits: ['Needs emotional independence', 'Friendship before romance', 'Attracted to the unusual', 'Struggles with emotional depth'] },
    Pisces: { title: 'Loves Spiritually', meaning: 'You love with an almost divine compassion and selflessness. You are the hopeless romantic of the zodiac — you believe in soulmates. You idealize your partners and love through spiritual and artistic connection. Guard your heart from those who take advantage of your giving nature.', traits: ['Deeply romantic idealist', 'Compassionate lover', 'Spiritually connected', 'Can be easily deceived'] },
  },

  Mars: {
    Aries: { title: 'Acts with Fire', meaning: 'Mars is at home in Aries. You have explosive energy, fierce drive, and a warrior spirit. When you want something, you go after it immediately with full force. You have more raw courage than almost anyone around you.', traits: ['Explosive energy', 'Fearless in action', 'Natural warrior', 'Impatient'] },
    Taurus: { title: 'Acts with Persistence', meaning: 'Your energy is slow to start but impossible to stop once moving. You pursue goals with incredible patience and stamina. You don\'t rush — but nothing and no one can make you quit once you\'ve committed to something.', traits: ['Unstoppable persistence', 'Slow but powerful', 'Motivated by security', 'Stubborn in pursuit'] },
    Gemini: { title: 'Acts with Curiosity', meaning: 'Your energy is mental and scattered across many interests simultaneously. You are driven by curiosity and ideas. You work best when you have variety and can multi-task. Your words can be your greatest weapon.', traits: ['Mentally driven', 'Multi-tasker', 'Quick but scattered', 'Words as action'] },
    Cancer: { title: 'Acts Protectively', meaning: 'Your drive is motivated by emotional security and protecting those you love. You work hardest for family and home. Anger tends to simmer beneath the surface and can come out sideways. Your persistence comes from feeling, not logic.', traits: ['Protectively motivated', 'Anger can be passive', 'Works hard for family', 'Emotionally driven action'] },
    Leo: { title: 'Acts with Drama', meaning: 'You pursue your goals with flair, confidence, and a desire to be recognized. You put your heart into everything you do and inspire others through your passion. You need to feel pride in your work — half-hearted effort isn\'t in your vocabulary.', traits: ['Pursues goals with passion', 'Needs recognition for effort', 'Inspiring energy', 'Dramatic in action'] },
    Virgo: { title: 'Acts with Precision', meaning: 'You direct your energy towards improvement, analysis, and getting things exactly right. You are a hard, efficient worker with high standards. You become frustrated by sloppiness and inefficiency. Your efforts are disciplined and methodical.', traits: ['Precise & efficient', 'High work standards', 'Analytical approach', 'Critical of poor effort'] },
    Libra: { title: 'Acts with Diplomacy', meaning: 'You are driven by fairness and partnership. You prefer to take action collaboratively and struggle to act alone. Your energy comes in bursts followed by periods of indecision. You fight for justice and beauty in the world.', traits: ['Collaborative action', 'Fights for fairness', 'Indecisive at times', 'Charming in assertion'] },
    Scorpio: { title: 'Acts with Intensity', meaning: 'Your drive is focused, relentless, and almost supernatural in its depth. When you set your sights on something, your willpower is without equal. You operate from the shadows and play the long game. Nothing is done halfway.', traits: ['Laser-focused will', 'Strategic & calculated', 'Relentless drive', 'Secretive in action'] },
    Sagittarius: { title: 'Acts with Enthusiasm', meaning: 'Your energy is expansive, adventurous, and fueled by optimism and a love of freedom. You are motivated by exploration — of ideas, places, and beliefs. You inspire others with your enthusiasm and willingness to take risks.', traits: ['Adventurous energy', 'Inspired by freedom', 'Risk-taker', 'Can lack follow-through'] },
    Capricorn: { title: 'Acts with Ambition', meaning: 'Mars is exalted in Capricorn. Your drive is disciplined, strategic, and relentlessly focused on achievement. You combine raw energy with practical planning to reach the top of any mountain you choose to climb. Nothing is wasted.', traits: ['Supremely ambitious', 'Disciplined action', 'Strategic energy', 'Built for long-term success'] },
    Aquarius: { title: 'Acts with Revolution', meaning: 'Your drive is fueled by ideals, innovation, and a desire to shake up the status quo. You fight for collective causes rather than personal glory. Your energy can be erratic — bursting forward in flashes of brilliance and then going quiet.', traits: ['Idealistic drive', 'Fights for change', 'Erratic energy', 'Original approach to action'] },
    Pisces: { title: 'Acts with Intuition', meaning: 'Your drive is flowing, spiritual, and often hard to pin down. You are motivated by compassion and creative vision. You work best when you feel emotionally and spiritually connected to your purpose. Direct confrontation drains you.', traits: ['Spiritually motivated', 'Creative drive', 'Avoids direct conflict', 'Energy tied to emotional state'] },
  },

  Jupiter: {
    Aries: { title: 'Grows through Initiative', meaning: 'Your greatest luck and growth comes through bold action, leadership, and taking the first step. The universe rewards your courage.', traits: ['Lucky in leadership', 'Grows through courage', 'Expands through initiative'] },
    Taurus: { title: 'Grows through Abundance', meaning: 'Your greatest growth and luck comes through material building, patience, and appreciating life\'s pleasures. Wealth can accumulate steadily for you.', traits: ['Lucky in finances', 'Grows through patience', 'Abundant in material life'] },
    Gemini: { title: 'Grows through Learning', meaning: 'Your luck expands through communication, education, and sharing ideas. Writing, teaching, and connecting people bring you the greatest rewards.', traits: ['Lucky in communication', 'Grows through learning', 'Luck through connections'] },
    Cancer: { title: 'Grows through Nurturing', meaning: 'Your greatest expansion comes through home, family, and emotional generosity. Taking care of others brings abundance back to you.', traits: ['Lucky in family matters', 'Grows through giving', 'Abundance through home'] },
    Leo: { title: 'Grows through Creativity', meaning: 'Your luck comes through creative self-expression, leadership, and following your heart. When you shine authentically, doors open.', traits: ['Lucky in creativity', 'Grows through self-expression', 'Luck follows passion'] },
    Virgo: { title: 'Grows through Service', meaning: 'Your greatest growth comes through improving systems, being of service, and doing precise, excellent work. Helping others elevates you.', traits: ['Lucky in health & work', 'Grows through service', 'Luck through detail'] },
    Libra: { title: 'Grows through Partnership', meaning: 'Your luck expands through relationships, collaboration, and creating beauty. Strong partnerships are your greatest resource.', traits: ['Lucky in relationships', 'Grows through fairness', 'Luck in legal matters'] },
    Scorpio: { title: 'Grows through Transformation', meaning: 'Your luck comes through deep transformation, shared resources, and uncovering hidden truths. You can regenerate from any crisis and emerge more powerful.', traits: ['Lucky in investments', 'Grows through transformation', 'Luck through research'] },
    Sagittarius: { title: 'Grows through Exploration', meaning: 'Jupiter is at home in Sagittarius. You are extraordinarily lucky, optimistic, and blessed with the ability to inspire others. Travel, philosophy, and higher education bring enormous rewards.', traits: ['Naturally very lucky', 'Grows through travel', 'Luck through optimism'] },
    Capricorn: { title: 'Grows through Achievement', meaning: 'Your luck comes through discipline, hard work, and long-term planning. What you build slowly lasts forever. The universe rewards your effort and responsibility.', traits: ['Luck through hard work', 'Grows through discipline', 'Achievement brings rewards'] },
    Aquarius: { title: 'Grows through Innovation', meaning: 'Your greatest luck comes through original ideas, humanitarian work, and embracing your uniqueness. Being ahead of your time pays off.', traits: ['Lucky in innovation', 'Grows through originality', 'Luck in group endeavors'] },
    Pisces: { title: 'Grows through Compassion', meaning: 'Jupiter at home in Pisces brings luck through spiritual growth, creative work, and compassionate giving. The more you give without expectation, the more the universe returns to you.', traits: ['Spiritually blessed', 'Luck through giving', 'Grows through creativity'] },
  },

  Saturn: {
    Aries: { title: 'Learns Self-Discipline', meaning: 'Your life lesson involves learning to channel your fire constructively rather than impulsively. Mastering patience and strategic action transforms your frustration into unstoppable achievement.', traits: ['Lesson: patience', 'Builds through discipline', 'Mastery through strategy'] },
    Taurus: { title: 'Learns True Value', meaning: 'Your life lesson involves building real, lasting security through your own efforts. You learn what truly has value — beyond the material. Financial mastery comes through discipline and patience.', traits: ['Lesson: self-sufficiency', 'Builds financial wisdom', 'Mastery through patience'] },
    Gemini: { title: 'Learns Focused Thinking', meaning: 'Your life lesson involves developing focused, disciplined thinking and communication. Learning to commit to one idea and go deep rather than spreading thin brings mastery.', traits: ['Lesson: mental focus', 'Builds communication skills', 'Mastery through depth'] },
    Cancer: { title: 'Learns Emotional Strength', meaning: 'Your life lesson involves developing emotional maturity and healthy boundaries. Learning to nurture without losing yourself, and to build a secure foundation, are your greatest challenges and triumphs.', traits: ['Lesson: emotional boundaries', 'Builds inner security', 'Mastery through vulnerability'] },
    Leo: { title: 'Learns Authentic Confidence', meaning: 'Your life lesson involves earning genuine confidence through demonstrated skill and character, rather than seeking external validation. True leadership comes from humility and mastery.', traits: ['Lesson: true confidence', 'Builds through achievement', 'Mastery through humility'] },
    Virgo: { title: 'Learns Healthy Perfection', meaning: 'Your life lesson involves learning to be excellently, without self-destruction. You are learning that good enough done is better than perfect undone. Mastery through practical service and healthy self-care.', traits: ['Lesson: self-acceptance', 'Builds through service', 'Mastery through health'] },
    Libra: { title: 'Learns True Fairness', meaning: 'Your life lesson involves developing authentic independence within relationships. You learn that true partnership comes from two whole people, not two halves. Justice and balance are earned through experience.', traits: ['Lesson: independence', 'Builds through relationships', 'Mastery through balance'] },
    Scorpio: { title: 'Learns to Surrender', meaning: 'Your life lesson involves learning to release control and trust in transformation. Your greatest growth comes through facing your deepest fears and allowing yourself to be changed by life\'s unavoidable turning points.', traits: ['Lesson: letting go', 'Builds through transformation', 'Mastery through surrender'] },
    Sagittarius: { title: 'Learns True Wisdom', meaning: 'Your life lesson involves developing genuine wisdom rather than mere knowledge. Your beliefs are tested by experience. You learn that real freedom comes from inner discipline, not from escaping responsibility.', traits: ['Lesson: earned wisdom', 'Builds through experience', 'Mastery through belief'] },
    Capricorn: { title: 'Masters Ambition', meaning: 'Saturn is at home in Capricorn. You are built for achievement and mastery. Your life lesson is learning to build lasting structures — in career, reputation, and character — through consistent effort and integrity.', traits: ['Natural mastery of discipline', 'Builds lasting legacy', 'Mastery through perseverance'] },
    Aquarius: { title: 'Learns Community', meaning: 'Saturn at home in Aquarius. Your life lesson involves building lasting structures for collective benefit. You learn that true freedom comes through responsible innovation and that lasting change requires disciplined commitment.', traits: ['Lesson: collective responsibility', 'Builds through innovation', 'Mastery through community'] },
    Pisces: { title: 'Learns Boundaries', meaning: 'Your life lesson involves developing healthy boundaries without losing compassion. You learn to serve without martyrdom, and to navigate the spiritual realm with groundedness. Mastery through merging discipline with surrender.', traits: ['Lesson: healthy boundaries', 'Builds through spirituality', 'Mastery through compassion'] },
  },

  Uranus: {
    Aries: { title: 'Revolutionizes Identity', meaning: 'Your generation is redefining what it means to be an individual. You collectively challenge outdated norms around identity and pioneer new ways of expressing the self.', traits: ['Pioneering generation', 'Redefines individuality', 'Breaks identity norms'] },
    Taurus: { title: 'Revolutionizes Values', meaning: 'Your generation is disrupting systems of value — money, earth, and resources. You collectively are transforming the economy and humanity\'s relationship with the natural world.', traits: ['Financial disruption', 'Earth-conscious generation', 'Redefines wealth'] },
    Gemini: { title: 'Revolutionizes Communication', meaning: 'Your generation transformed communication and information sharing. New media, new languages, and new ways of connecting emerged through your collective.', traits: ['Communication innovators', 'Media revolution', 'New language forms'] },
    Cancer: { title: 'Revolutionizes Home', meaning: 'Your generation is redefining family, home, and belonging. Traditional family structures are questioned and new forms of community emerge.', traits: ['Redefines family', 'Home innovation', 'Community reimagined'] },
    Leo: { title: 'Revolutionizes Creativity', meaning: 'Your generation brought radical changes to self-expression, entertainment, and what it means to be a star. New art forms and creative revolutions define your cohort.', traits: ['Creative revolution', 'Reinvents entertainment', 'New self-expression'] },
    Virgo: { title: 'Revolutionizes Health', meaning: 'Your generation is transforming healthcare, work, and daily life. Innovative approaches to wellness, technology in work, and new definitions of service define your era.', traits: ['Health innovation', 'Work revolution', 'Service transformation'] },
    Libra: { title: 'Revolutionizes Relationships', meaning: 'Your generation is redefining partnership, justice, and beauty. New relationship structures and revolutions in law and aesthetics mark your collective mission.', traits: ['Relationship revolution', 'Justice reimagined', 'Beauty redefined'] },
    Scorpio: { title: 'Revolutionizes Power', meaning: 'Your generation is transforming systems of power, sexuality, and shared resources. Deep structural change — financial, psychological, and sexual — defines your era.', traits: ['Power transformation', 'Sexual revolution', 'Financial disruption'] },
    Sagittarius: { title: 'Revolutionizes Belief', meaning: 'Your generation is challenging established religions, philosophies, and educational systems. New ways of seeking truth and expanding consciousness define your cohort.', traits: ['Belief systems challenged', 'Educational revolution', 'New philosophies'] },
    Capricorn: { title: 'Revolutionizes Structure', meaning: 'Your generation is dismantling outdated governmental and corporate structures. You collectively are rebuilding societal foundations from the ground up.', traits: ['Government disruption', 'Corporate revolution', 'Structure rebuilding'] },
    Aquarius: { title: 'Revolutionizes Society', meaning: 'Uranus at home in Aquarius. Your generation is the most revolutionary — bringing radical changes to technology, humanity, and collective consciousness. You are the architects of the future.', traits: ['Technological revolution', 'Humanitarian innovation', 'Future architects'] },
    Pisces: { title: 'Revolutionizes Spirit', meaning: 'Your generation is transforming spirituality, art, and the unconscious. New spiritual movements, artistic revolutions, and changes in how humanity relates to the invisible world define your era.', traits: ['Spiritual revolution', 'Artistic transformation', 'Consciousness shifts'] },
  },

  Neptune: {
    Aries: { title: 'Dreams of Heroism', meaning: 'Your generation idealizes courage, independence, and pioneering spirit. Collective dreams revolve around the heroic individual who changes the world.', traits: ['Collective heroic ideals', 'Dreams of independence', 'Spiritual pioneers'] },
    Taurus: { title: 'Dreams of Beauty', meaning: 'Your generation is collectively enchanted by beauty, nature, and material comfort. Art, music, and the senses are spiritualized. There is a collective longing for a paradise of earthly abundance.', traits: ['Collective aesthetic ideals', 'Dreams of abundance', 'Nature spiritualized'] },
    Gemini: { title: 'Dreams of Connection', meaning: 'Your generation is collectively fascinated by communication, ideas, and connection. There is a spiritual dimension to information and language in your era.', traits: ['Idealized communication', 'Dreams of knowledge', 'Spiritual ideas'] },
    Cancer: { title: 'Dreams of Home', meaning: 'Your generation collectively idealizes home, family, and belonging. There is a spiritual longing for the perfect nurturing community and a sense of roots.', traits: ['Idealized family', 'Dreams of belonging', 'Spiritual home'] },
    Leo: { title: 'Dreams of Glory', meaning: 'Your generation collectively idealizes fame, creativity, and the power of love. There is a spiritual dimension to art, entertainment, and the expression of the heart.', traits: ['Idealized fame', 'Dreams of love', 'Spiritual creativity'] },
    Virgo: { title: 'Dreams of Perfection', meaning: 'Your generation collectively seeks spiritual perfection through service, health, and right living. There is a collective longing to make the world work better.', traits: ['Idealized service', 'Dreams of health', 'Spiritual perfection'] },
    Libra: { title: 'Dreams of Harmony', meaning: 'Your generation collectively idealizes peace, beauty, and perfect partnership. The spiritual quest is for a world of justice and aesthetic harmony.', traits: ['Idealized peace', 'Dreams of perfect love', 'Spiritual beauty'] },
    Scorpio: { title: 'Dreams of Transformation', meaning: 'Your generation is collectively drawn to the mysteries of life and death, power, and the occult. There is a spiritual dimension to darkness and transformation in your era.', traits: ['Idealized depth', 'Dreams of transformation', 'Spiritual mystery'] },
    Sagittarius: { title: 'Dreams of Truth', meaning: 'Your generation collectively yearns for a spiritual truth that transcends all boundaries. There is an idealized vision of a world where all beliefs unite in universal wisdom.', traits: ['Idealized wisdom', 'Dreams of freedom', 'Spiritual expansion'] },
    Capricorn: { title: 'Dreams of Order', meaning: 'Your generation collectively idealizes strong, wise, and just leadership. There is a spiritual dimension to achievement, discipline, and building lasting structures for humanity.', traits: ['Idealized leadership', 'Dreams of order', 'Spiritual achievement'] },
    Aquarius: { title: 'Dreams of Utopia', meaning: 'Your generation collectively dreams of a perfect society built on brotherhood, technology, and freedom. The spiritual quest is for a utopian future where all are equal and free.', traits: ['Idealized community', 'Dreams of utopia', 'Spiritual revolution'] },
    Pisces: { title: 'Dreams of Oneness', meaning: 'Neptune at home in Pisces. Your generation experiences the most profound collective spiritual awakening. The boundaries between self and universe dissolve. Compassion, art, and transcendence define the spiritual quest of your era.', traits: ['Profound collective spirituality', 'Dreams of oneness', 'Spiritual transcendence'] },
  },
};

const interpretationsHi: Partial<Record<PlanetName, Partial<Record<SignName, PlanetInterpretation>>>> = {
  Sun: {
    Aries:       { title: 'अग्रदूत', meaning: 'आपकी मूल पहचान साहसी, ऊर्जावान और स्वतंत्र है। आप नेतृत्व और नई शुरुआत के लिए जन्मे हैं। चुनौतियाँ आपको हतोत्साहित नहीं करतीं, बल्कि उत्साहित करती हैं।', traits: ['प्राकृतिक नेता', 'साहसी व निडर', 'अत्यधिक प्रतिस्पर्धी', 'आवेगशील किंतु जोशीले'] },
    Taurus:      { title: 'निर्माता', meaning: 'आपकी मूल पहचान स्थिर, धैर्यवान और सौंदर्य के प्रति समर्पित है। आप स्थायी चीज़ें बनाते हैं — रिश्ते, धन और कला। आप पृथ्वी की तरह विश्वसनीय हैं।', traits: ['अत्यंत धैर्यवान', 'संवेदनशील व सुख-प्रिय', 'जिद्दी किंतु भरोसेमंद', 'सौंदर्य व विलासिता-प्रेमी'] },
    Gemini:      { title: 'संचारकर्ता', meaning: 'आपकी मूल पहचान तीव्र बुद्धिमान, जिज्ञासु और अनुकूलनशील है। आप एक प्राकृतिक कथाकार हैं जो विचारों और लोगों को जोड़ने में माहिर हैं।', traits: ['अत्यधिक बुद्धिमान', 'सामाजिक व आकर्षक', 'अनुकूलनशील', 'कभी-कभी अनिर्णायक'] },
    Cancer:      { title: 'पालनकर्ता', meaning: 'आपकी मूल पहचान गहरी भावनात्मक, सुरक्षात्मक और दूसरों की भावनाओं के प्रति संवेदनशील है। घर और परिवार आपके लिए पवित्र हैं।', traits: ['गहरा सहानुभूतिपूर्ण', 'बेहद सुरक्षात्मक', 'सहज ज्ञानी', 'भावनात्मक रूप से संवेदनशील'] },
    Leo:         { title: 'राजसी', meaning: 'आपकी मूल पहचान तेजस्वी, उदार और आकर्षक है। आप चमकने और दूसरों को प्रेरित करने के लिए जन्मे हैं। आपकी गर्मजोशी लोगों को खींचती है।', traits: ['करिश्माई व आत्मविश्वासी', 'बेहद उदार', 'रचनात्मक', 'पहचान की चाह'] },
    Virgo:       { title: 'विश्लेषक', meaning: 'आपकी मूल पहचान तीव्र, विवेकी और सुधार के प्रति समर्पित है। आपके पास विवरण के लिए असाधारण दृष्टि है और समस्या सुलझाने का उपहार है।', traits: ['अत्यधिक विश्लेषणात्मक', 'व्यावहारिक व मेहनती', 'स्वास्थ्य-सचेत', 'पूर्णतावादी'] },
    Libra:       { title: 'कूटनीतिज्ञ', meaning: 'आपकी मूल पहचान संतुलन, सद्भाव और न्याय के प्रति समर्पित है। आप एक प्राकृतिक मध्यस्थ हैं जो सभी पक्षों में सुंदरता देखते हैं।', traits: ['न्याय-प्रिय', 'सामाजिक रूप से कुशल', 'संतुलन-साधक', 'निर्णय लेने में धीमे'] },
    Scorpio:     { title: 'रूपांतरणकर्ता', meaning: 'आपकी मूल पहचान तीव्र, रहस्यमयी और परिवर्तन के प्रति प्रतिबद्ध है। आप सतह से परे देखते हैं और छिपी सच्चाइयों को उजागर करते हैं।', traits: ['तीव्र व भावुक', 'तीक्ष्ण अंतर्ज्ञान', 'परिवर्तनकारी', 'रहस्यमय'] },
    Sagittarius: { title: 'दार्शनिक', meaning: 'आपकी मूल पहचान आशावादी, जिज्ञासु और स्वतंत्रता-प्रेमी है। आप ज्ञान, सत्य और उन अनुभवों की तलाश में हैं जो आपकी सीमाओं को खींचते हैं।', traits: ['आशावादी', 'स्वतंत्रता-प्रेमी', 'दार्शनिक', 'कभी-कभी बेचैन'] },
    Capricorn:   { title: 'उपलब्धिकर्ता', meaning: 'आपकी मूल पहचान अनुशासित, महत्वाकांक्षी और दृढ़ है। आप वह पर्वत चढ़ते हैं जिसे दूसरे असाध्य मानते हैं, और आप हर बार शीर्ष पर पहुँचते हैं।', traits: ['अत्यंत अनुशासित', 'महत्वाकांक्षी', 'जिम्मेदार', 'धैर्यवान'] },
    Aquarius:    { title: 'दूरदर्शी', meaning: 'आपकी मूल पहचान अभिनव, मानवतावादी और आगे की सोच वाली है। आप भविष्य की कल्पना कर सकते हैं जो दूसरे नहीं देख सकते।', traits: ['अत्यधिक मौलिक', 'मानवतावादी', 'स्वतंत्र विचारक', 'कभी-कभी अलग-थलग'] },
    Pisces:      { title: 'स्वप्नद्रष्टा', meaning: 'आपकी मूल पहचान करुणाशील, कलात्मक और आध्यात्मिक रूप से गहरी है। आप उन क्षेत्रों में महसूस कर सकते हैं जो दूसरों के लिए अदृश्य हैं।', traits: ['अत्यधिक सहानुभूतिपूर्ण', 'कलात्मक', 'आध्यात्मिक', 'अंतर्ज्ञानी'] },
  },
  Moon: {
    Aries:       { title: 'उग्र आत्मा', meaning: 'आपकी भावनात्मक दुनिया तीव्र, तत्काल और ऊर्जा से भरी है। आप भावनाओं को तुरंत महसूस करते हैं और उतनी ही तेज़ी से आगे बढ़ जाते हैं।', traits: ['भावनात्मक रूप से जोशीले', 'तत्काल प्रतिक्रिया', 'स्वतंत्र', 'साहसी'] },
    Taurus:      { title: 'शांत संवेदना', meaning: 'आपकी भावनात्मक दुनिया स्थिर, संवेदनशील और आरामदायक अनुभवों की ओर आकर्षित है। आपको सुरक्षा और स्थिरता से गहरी शांति मिलती है।', traits: ['भावनात्मक स्थिरता', 'आरामदायकता-प्रिय', 'वफ़ादार', 'धैर्यवान'] },
    Gemini:      { title: 'जिज्ञासु मन', meaning: 'आपकी भावनात्मक दुनिया मानसिक उत्तेजना और विविधता से पोषित होती है। बातचीत और विचारों का आदान-प्रदान आपको भावनात्मक रूप से तृप्त करता है।', traits: ['मानसिक रूप से चपल', 'जिज्ञासु', 'सामाजिक', 'अनुकूलनशील'] },
    Cancer:      { title: 'गहरी करुणा', meaning: 'चंद्रमा अपने घर में है — आप असाधारण रूप से सहज ज्ञानी, पोषणकारी और भावनात्मक रूप से गहरे हैं। आपकी सहानुभूति की कोई सीमा नहीं है।', traits: ['गहरी सहानुभूति', 'सहज ज्ञानी', 'पोषणकारी', 'भावनात्मक स्मृति'] },
    Leo:         { title: 'उज्ज्वल हृदय', meaning: 'आपकी भावनात्मक दुनिया गर्म, उदार और पहचाने जाने की चाहत से भरी है। आप प्यार और प्रशंसा देना और पाना दोनों पसंद करते हैं।', traits: ['भावनात्मक रूप से उदार', 'नाटकीय', 'गर्मजोश', 'प्रशंसा-प्रिय'] },
    Virgo:       { title: 'विश्लेषणात्मक भावना', meaning: 'आपकी भावनात्मक दुनिया को सेवा और सुधार के माध्यम से सुकून मिलता है। आप दूसरों की देखभाल व्यावहारिक तरीकों से करते हैं।', traits: ['व्यावहारिक', 'विश्लेषणात्मक', 'सेवा-उन्मुख', 'स्वास्थ्य-सचेत'] },
    Libra:       { title: 'सामंजस्यपूर्ण आत्मा', meaning: 'आपकी भावनात्मक दुनिया को सामंजस्य, सुंदरता और साझेदारी की ज़रूरत है। टकराव आपको गहरी तकलीफ देता है।', traits: ['सामंजस्य-साधक', 'कूटनीतिक', 'संबंध-उन्मुख', 'सौंदर्य-प्रेमी'] },
    Scorpio:     { title: 'गहरी तीव्रता', meaning: 'आपकी भावनात्मक दुनिया गहरी, तीव्र और परिवर्तनकारी है। आप उथले संबंधों से संतुष्ट नहीं होते — आपको आत्मा की गहराई चाहिए।', traits: ['गहराई से भावुक', 'तीव्र', 'रहस्यमय', 'परिवर्तनकारी'] },
    Sagittarius: { title: 'स्वतंत्र आत्मा', meaning: 'आपकी भावनात्मक दुनिया को स्वतंत्रता, रोमांच और दार्शनिक अन्वेषण की आवश्यकता है। सीमाएं आपको घुटन महसूस कराती हैं।', traits: ['स्वतंत्रता-प्रेमी', 'आशावादी', 'साहसी', 'दार्शनिक'] },
    Capricorn:   { title: 'भावनात्मक धैर्य', meaning: 'आपकी भावनात्मक दुनिया संयमित, जिम्मेदार और दीर्घकालिक सोच से प्रेरित है। आप भावनाओं को काम में लगाते हैं।', traits: ['संयमित', 'जिम्मेदार', 'व्यावहारिक', 'धैर्यवान'] },
    Aquarius:    { title: 'मानवतावादी हृदय', meaning: 'आपकी भावनात्मक दुनिया बौद्धिक और मानवतावादी आदर्शों से पोषित है। आप समूह की भलाई की परवाह व्यक्तिगत भावनाओं से अधिक करते हैं।', traits: ['मानवतावादी', 'बौद्धिक', 'स्वतंत्र', 'अभिनव'] },
    Pisces:      { title: 'सहानुभूति का सागर', meaning: 'आपकी भावनात्मक दुनिया असाधारण रूप से संवेदनशील और करुणाशील है। आप दूसरों की पीड़ा को लगभग शारीरिक रूप से महसूस करते हैं।', traits: ['गहरी सहानुभूति', 'आध्यात्मिक', 'कलात्मक', 'अत्यधिक संवेदनशील'] },
  },
  Mercury: {
    Aries:       { title: 'त्वरित विचारक', meaning: 'आपका मन तेज़, सीधा और कार्योन्मुख है। आप सोचते नहीं, करते हैं। आपके विचार पहले आते हैं और आप उन्हें तुरंत व्यक्त करते हैं।', traits: ['त्वरित विचारक', 'सीधा-सपाट', 'कार्योन्मुख', 'साहसी वक्ता'] },
    Taurus:      { title: 'स्थिर मन', meaning: 'आपका मन धीमा लेकिन गहरा है। आप जल्दी निर्णय नहीं लेते लेकिन एक बार तय करने के बाद अटल रहते हैं।', traits: ['व्यावहारिक सोच', 'धैर्यवान', 'स्थिर', 'विश्वसनीय'] },
    Gemini:      { title: 'तीव्र बुद्धि', meaning: 'बुध अपने घर में है — आप असाधारण रूप से त्वरित बुद्धि, वाकपटु और बहुमुखी हैं। आपका मन कई विचारों को एक साथ संभाल सकता है।', traits: ['तीव्र बुद्धि', 'वाकपटु', 'जिज्ञासु', 'बहुमुखी'] },
    Cancer:      { title: 'सहज ज्ञानी मन', meaning: 'आपका मन भावनाओं और अंतर्ज्ञान से प्रेरित है। आप तथ्यों से अधिक भावनाओं को याद रखते हैं।', traits: ['सहज ज्ञानी', 'भावनात्मक स्मृति', 'सहानुभूतिपूर्ण', 'रचनात्मक'] },
    Leo:         { title: 'रचनात्मक वक्ता', meaning: 'आप नाटकीय, प्रेरणादायक और आत्मविश्वास से भरे वक्ता हैं। आपके शब्दों में दिल जीतने की शक्ति है।', traits: ['करिश्माई वक्ता', 'रचनात्मक', 'प्रेरणादायक', 'आत्मविश्वासी'] },
    Virgo:       { title: 'विश्लेषणात्मक मन', meaning: 'बुध कन्या राशि में अत्यंत शक्तिशाली है। आपका मन सटीक, व्यवस्थित और विवरण-उन्मुख है।', traits: ['अत्यंत सटीक', 'व्यवस्थित', 'विश्लेषणात्मक', 'व्यावहारिक'] },
    Libra:       { title: 'संतुलित विचारक', meaning: 'आप सभी पक्षों को तौलकर सोचते हैं। आप एक कुशल वार्ताकार और मध्यस्थ हैं जो सभी को सुनते हैं।', traits: ['संतुलित', 'कूटनीतिक', 'निष्पक्ष', 'सामाजिक'] },
    Scorpio:     { title: 'गहन शोधकर्ता', meaning: 'आपका मन गहरा, तीक्ष्ण और रहस्यों की तह तक जाने वाला है। आप जो कुछ भी सुनते हैं उसके पीछे की सच्चाई खोजते हैं।', traits: ['तीक्ष्ण', 'खोजी', 'रहस्यमय', 'रणनीतिक'] },
    Sagittarius: { title: 'दार्शनिक मन', meaning: 'आपका मन बड़ी तस्वीर देखता है। आप दार्शनिक, आशावादी और नए विचारों के प्रति उत्साहित रहते हैं।', traits: ['दार्शनिक', 'आशावादी', 'व्यापक दृष्टि', 'स्वतंत्र विचारक'] },
    Capricorn:   { title: 'व्यावहारिक योजनाकार', meaning: 'आपका मन अनुशासित, व्यावहारिक और दीर्घकालिक लक्ष्यों पर केंद्रित है। आप ठोस और मापनयोग्य परिणामों में सोचते हैं।', traits: ['अनुशासित', 'व्यावहारिक', 'दीर्घकालिक सोच', 'संगठित'] },
    Aquarius:    { title: 'अभिनव विचारक', meaning: 'आपका मन भविष्य की ओर देखता है। आप पारंपरिक सोच से परे जाकर क्रांतिकारी विचार उत्पन्न करते हैं।', traits: ['अभिनव', 'भविष्यवादी', 'मानवतावादी', 'मौलिक'] },
    Pisces:      { title: 'कल्पनाशील मन', meaning: 'आपका मन काव्यात्मक, कल्पनाशील और आध्यात्मिक रूप से उन्मुख है। आपकी रचनात्मकता असीमित है।', traits: ['कल्पनाशील', 'काव्यात्मक', 'आध्यात्मिक', 'सहज ज्ञानी'] },
  },
  Venus: {
    Aries:       { title: 'उत्साही प्रेमी', meaning: 'आप प्रेम में साहसी, जोशीले और तत्काल हैं। आप पीछा करने का रोमांच पसंद करते हैं और चाहते हैं कि आपका प्रेम भी उतना ही जोशीला हो।', traits: ['साहसी', 'जोशीले', 'स्वतंत्र', 'तत्काल'] },
    Taurus:      { title: 'संवेदनशील प्रेमी', meaning: 'शुक्र अपने घर में है। आप प्रेम में स्थिर, संवेदनशील और भौतिक सुखों से जुड़े हुए हैं। आप गहरी वफ़ादारी और स्थायित्व चाहते हैं।', traits: ['वफ़ादार', 'संवेदनशील', 'सौंदर्य-प्रिय', 'स्थिर'] },
    Gemini:      { title: 'मानसिक प्रेमी', meaning: 'आपके लिए बौद्धिक संगतता सबसे बड़ा आकर्षण है। आप बातचीत और विचारों के आदान-प्रदान से प्यार में पड़ते हैं।', traits: ['बौद्धिक', 'सामाजिक', 'चंचल', 'जिज्ञासु'] },
    Cancer:      { title: 'पोषणकारी प्रेमी', meaning: 'आप प्रेम में गहरे, देखभाल करने वाले और भावनात्मक सुरक्षा चाहने वाले हैं। घर और परिवार आपके प्रेम का केंद्र है।', traits: ['पोषणकारी', 'गहरे भावुक', 'सुरक्षात्मक', 'वफ़ादार'] },
    Leo:         { title: 'राजसी प्रेमी', meaning: 'आप प्रेम में भव्य, उदार और नाटकीय हैं। आप चाहते हैं कि आपके प्रेमी आपको उतने ही जोश के साथ प्यार करें।', traits: ['उदार', 'भव्य', 'जोशीले', 'वफ़ादार'] },
    Virgo:       { title: 'सेवाशील प्रेमी', meaning: 'आप प्रेम व्यावहारिक तरीकों से व्यक्त करते हैं — छोटे-छोटे विचारशील कार्यों के माध्यम से। आप ऐसे साथी चाहते हैं जो ईमानदार और विश्वसनीय हों।', traits: ['सेवाशील', 'व्यावहारिक', 'विचारशील', 'विश्वसनीय'] },
    Libra:       { title: 'रोमांटिक आदर्शवादी', meaning: 'शुक्र अपने घर में है। आप प्रेम के सबसे बड़े आदर्शवादी हैं। आप सुंदरता, सामंजस्य और सच्ची साझेदारी चाहते हैं।', traits: ['रोमांटिक', 'आदर्शवादी', 'सौंदर्य-प्रिय', 'कूटनीतिक'] },
    Scorpio:     { title: 'तीव्र प्रेमी', meaning: 'आप प्रेम में सर्वस्व देते हैं या कुछ नहीं। आप उथले संबंधों से संतुष्ट नहीं होते — आपको आत्मा का जुड़ाव चाहिए।', traits: ['तीव्र', 'जोशीले', 'वफ़ादार', 'परिवर्तनकारी'] },
    Sagittarius: { title: 'साहसी प्रेमी', meaning: 'आप प्रेम में स्वतंत्रता और रोमांच चाहते हैं। आपका साथी आपका बौद्धिक मित्र और यात्रा का साथी होना चाहिए।', traits: ['स्वतंत्रता-प्रिय', 'साहसी', 'आशावादी', 'दार्शनिक'] },
    Capricorn:   { title: 'प्रतिबद्ध प्रेमी', meaning: 'आप प्रेम में गंभीर, जिम्मेदार और दीर्घकालिक प्रतिबद्धता चाहते हैं। आप प्यार दिखाते हैं व्यावहारिक समर्थन के माध्यम से।', traits: ['प्रतिबद्ध', 'जिम्मेदार', 'व्यावहारिक', 'वफ़ादार'] },
    Aquarius:    { title: 'अपरंपरागत प्रेमी', meaning: 'आप प्रेम में अद्वितीय और अपरंपरागत हैं। मित्रता आपके गहरे रोमांटिक संबंधों की नींव है।', traits: ['मौलिक', 'मानवतावादी', 'स्वतंत्र', 'बौद्धिक'] },
    Pisces:      { title: 'स्वप्निल प्रेमी', meaning: 'आप प्रेम के सबसे रोमांटिक सपने देखते हैं। आपकी करुणा और सहानुभूति असीमित है। आप दूसरों में सर्वश्रेष्ठ देखते हैं।', traits: ['रोमांटिक', 'करुणाशील', 'कलात्मक', 'स्वप्निल'] },
  },
  Mars: {
    Aries:       { title: 'उग्र योद्धा', meaning: 'मंगल अपने घर में है। आपकी ऊर्जा अदम्य, सीधी और लक्ष्य के प्रति तीव्र है। आप पहले कार्य करते हैं और बाद में सोचते हैं।', traits: ['अदम्य ऊर्जा', 'सीधा', 'साहसी', 'नेता'] },
    Taurus:      { title: 'धैर्यवान निर्माता', meaning: 'आपकी ऊर्जा धीमी लेकिन अटल है। आप धैर्य के साथ अपने लक्ष्यों की ओर बढ़ते हैं और कभी नहीं रुकते।', traits: ['धैर्यवान', 'अटल', 'व्यावहारिक', 'दृढ़'] },
    Gemini:      { title: 'बौद्धिक लड़ाकू', meaning: 'आप शब्दों से लड़ते हैं — वाद-विवाद, तर्क और त्वरित बुद्धि आपके हथियार हैं।', traits: ['मानसिक चपलता', 'बहुकार्यी', 'जिज्ञासु', 'अनुकूलनशील'] },
    Cancer:      { title: 'सुरक्षात्मक योद्धा', meaning: 'आप उन लोगों के लिए लड़ते हैं जिन्हें आप प्यार करते हैं। आपकी ऊर्जा भावनाओं से प्रेरित है।', traits: ['सुरक्षात्मक', 'भावना-प्रेरित', 'दृढ़', 'पोषणकारी'] },
    Leo:         { title: 'राजसी योद्धा', meaning: 'आप करिश्मे और आत्मविश्वास के साथ आगे बढ़ते हैं। आप ध्यान का केंद्र बनते हैं और नेतृत्व करते हैं।', traits: ['करिश्माई', 'साहसी', 'रचनात्मक', 'महत्वाकांक्षी'] },
    Virgo:       { title: 'कुशल कार्यकर्ता', meaning: 'आपकी ऊर्जा पद्धतिबद्ध और विवरण-उन्मुख है। आप सही काम, सही समय पर, सही तरीके से करते हैं।', traits: ['पद्धतिबद्ध', 'सटीक', 'मेहनती', 'विश्लेषणात्मक'] },
    Libra:       { title: 'न्यायप्रिय योद्धा', meaning: 'आप न्याय और सामंजस्य के लिए लड़ते हैं। आप कूटनीति से काम करते हैं लेकिन ज़रूरत पड़ने पर दृढ़ रहते हैं।', traits: ['न्यायप्रिय', 'कूटनीतिक', 'संतुलित', 'सामाजिक'] },
    Scorpio:     { title: 'शक्तिशाली रणनीतिकार', meaning: 'मंगल वृश्चिक में अत्यंत शक्तिशाली है। आपकी ऊर्जा केंद्रित, तीव्र और अदृश्य है। आप पर्दे के पीछे से रणनीति बनाते हैं।', traits: ['तीव्र', 'रणनीतिक', 'दृढ़', 'परिवर्तनकारी'] },
    Sagittarius: { title: 'साहसी अन्वेषक', meaning: 'आपकी ऊर्जा आशावादी और साहसी है। आप बड़े लक्ष्यों का पीछा करते हैं और यात्रा और रोमांच में जोश पाते हैं।', traits: ['साहसी', 'आशावादी', 'स्वतंत्र', 'उत्साही'] },
    Capricorn:   { title: 'महत्वाकांक्षी पर्वतारोही', meaning: 'मंगल मकर में उच्च है। आपकी ऊर्जा अनुशासित, धैर्यवान और अत्यंत लक्ष्य-केंद्रित है।', traits: ['अनुशासित', 'महत्वाकांक्षी', 'धैर्यवान', 'जिम्मेदार'] },
    Aquarius:    { title: 'क्रांतिकारी', meaning: 'आपकी ऊर्जा मानवतावादी कारणों और सामाजिक परिवर्तन की ओर निर्देशित है।', traits: ['मौलिक', 'मानवतावादी', 'स्वतंत्र', 'भविष्यवादी'] },
    Pisces:      { title: 'सहज ज्ञानी योद्धा', meaning: 'आपकी ऊर्जा तरंगों में आती है और आपके सहज ज्ञान से प्रेरित होती है। आप आध्यात्मिक और रचनात्मक लक्ष्यों की ओर बढ़ते हैं।', traits: ['सहज ज्ञानी', 'कलात्मक', 'करुणाशील', 'आध्यात्मिक'] },
  },
  Jupiter: {
    Aries:       { title: 'साहसी विस्तारक', meaning: 'बृहस्पति की वृद्धि आपके साहस और स्वतंत्र उद्यमों के माध्यम से आती है।', traits: ['साहसी', 'उद्यमशील', 'आशावादी', 'अग्रणी'] },
    Taurus:      { title: 'भौतिक समृद्धि', meaning: 'आपकी वृद्धि भौतिक संसाधनों और व्यावहारिक प्रयासों के माध्यम से आती है।', traits: ['समृद्धि-उन्मुख', 'व्यावहारिक', 'धैर्यवान', 'स्थिर'] },
    Gemini:      { title: 'ज्ञान-वाहक', meaning: 'आपकी वृद्धि संचार, शिक्षा और विविध रुचियों के माध्यम से आती है।', traits: ['बहुमुखी', 'जिज्ञासु', 'संचारक', 'शिक्षाप्रिय'] },
    Cancer:      { title: 'पोषणकारी विस्तारक', meaning: 'आपकी वृद्धि घर, परिवार और भावनात्मक सुरक्षा के माध्यम से आती है।', traits: ['पोषणकारी', 'सुरक्षात्मक', 'सहज ज्ञानी', 'पारिवारिक'] },
    Leo:         { title: 'रचनात्मक उपकारी', meaning: 'आपकी वृद्धि रचनात्मक अभिव्यक्ति और नेतृत्व के माध्यम से आती है।', traits: ['रचनात्मक', 'उदार', 'नेतृत्वकारी', 'करिश्माई'] },
    Virgo:       { title: 'सेवा के माध्यम से विकास', meaning: 'आपकी वृद्धि कौशल, स्वास्थ्य और सेवा के माध्यम से आती है।', traits: ['सेवाशील', 'विश्लेषणात्मक', 'स्वास्थ्य-सचेत', 'मेहनती'] },
    Libra:       { title: 'साझेदारी से समृद्धि', meaning: 'आपकी वृद्धि साझेदारी, कला और न्याय के माध्यम से आती है।', traits: ['साझेदारी-उन्मुख', 'न्यायप्रिय', 'कूटनीतिक', 'सौंदर्य-प्रिय'] },
    Scorpio:     { title: 'गहन परिवर्तन', meaning: 'आपकी वृद्धि गहरे परिवर्तन और छिपे संसाधनों की खोज के माध्यम से आती है।', traits: ['परिवर्तनकारी', 'गहन', 'रहस्यमय', 'दृढ़'] },
    Sagittarius: { title: 'अनंत विस्तारक', meaning: 'बृहस्पति अपने घर में है। आशावाद, दर्शन और यात्रा के माध्यम से असीमित वृद्धि।', traits: ['आशावादी', 'दार्शनिक', 'यात्री', 'स्वतंत्र'] },
    Capricorn:   { title: 'व्यावहारिक विजेता', meaning: 'आपकी वृद्धि अनुशासन और दीर्घकालिक प्रयास के माध्यम से आती है।', traits: ['अनुशासित', 'महत्वाकांक्षी', 'जिम्मेदार', 'व्यावहारिक'] },
    Aquarius:    { title: 'मानवतावादी विस्तारक', meaning: 'आपकी वृद्धि सामाजिक सुधार और मानवतावादी कार्यों के माध्यम से आती है।', traits: ['मानवतावादी', 'अभिनव', 'सामाजिक', 'दूरदर्शी'] },
    Pisces:      { title: 'आध्यात्मिक विस्तारक', meaning: 'बृहस्पति मीन में उच्च है। आपकी वृद्धि आध्यात्मिक जागृति और करुणा के माध्यम से आती है।', traits: ['आध्यात्मिक', 'करुणाशील', 'कलात्मक', 'सहज ज्ञानी'] },
  },
  Saturn: {
    Aries:       { title: 'अनुशासित अग्रणी', meaning: 'आपका जीवन पाठ आवेग पर नियंत्रण और धैर्य से नेतृत्व करना है।', traits: ['अनुशासित', 'धैर्यवान', 'नेता', 'जिम्मेदार'] },
    Taurus:      { title: 'वित्तीय अनुशासन', meaning: 'आपका जीवन पाठ वित्तीय सुरक्षा का निर्माण करना और भौतिक दुनिया में जिम्मेदार होना है।', traits: ['वित्तीय रूप से अनुशासित', 'व्यावहारिक', 'धैर्यवान', 'स्थिर'] },
    Gemini:      { title: 'संचार में अनुशासन', meaning: 'आपका जीवन पाठ अपने विचारों को अनुशासित करना और गहराई से संचार करना है।', traits: ['अनुशासित विचारक', 'व्यवस्थित', 'गहन', 'जिम्मेदार'] },
    Cancer:      { title: 'भावनात्मक परिपक्वता', meaning: 'आपका जीवन पाठ भावनात्मक परिपक्वता और पारिवारिक जिम्मेदारियों को स्वीकार करना है।', traits: ['भावनात्मक परिपक्वता', 'जिम्मेदार', 'पोषणकारी', 'सुरक्षात्मक'] },
    Leo:         { title: 'विनम्र नेतृत्व', meaning: 'आपका जीवन पाठ अहंकार के बिना नेतृत्व करना और दूसरों को सशक्त बनाना है।', traits: ['विनम्र', 'जिम्मेदार', 'रचनात्मक', 'अनुशासित'] },
    Virgo:       { title: 'सेवा की महारत', meaning: 'आपका जीवन पाठ विस्तार पर ध्यान देना, स्वास्थ्य का ध्यान रखना और निःस्वार्थ सेवा करना है।', traits: ['अनुशासित', 'सेवाशील', 'स्वास्थ्य-सचेत', 'विस्तार-उन्मुख'] },
    Libra:       { title: 'न्याय की जिम्मेदारी', meaning: 'आपका जीवन पाठ न्याय, साझेदारी और संतुलन में महारत हासिल करना है।', traits: ['न्यायप्रिय', 'जिम्मेदार', 'कूटनीतिक', 'संतुलित'] },
    Scorpio:     { title: 'परिवर्तन की महारत', meaning: 'आपका जीवन पाठ शक्ति, नियंत्रण और गहरे परिवर्तन को जिम्मेदारी से संभालना है।', traits: ['गहन', 'जिम्मेदार', 'परिवर्तनकारी', 'दृढ़'] },
    Sagittarius: { title: 'ज्ञान की जिम्मेदारी', meaning: 'आपका जीवन पाठ अपने दार्शनिक विश्वासों को अनुशासन के साथ जीना है।', traits: ['दार्शनिक', 'जिम्मेदार', 'अनुशासित', 'ज्ञानी'] },
    Capricorn:   { title: 'सर्वोच्च उपलब्धि', meaning: 'शनि अपने घर में है। आप जीवन में संरचना और अनुशासन के माध्यम से सर्वोच्च सफलता प्राप्त करते हैं।', traits: ['अत्यंत अनुशासित', 'महत्वाकांक्षी', 'जिम्मेदार', 'धैर्यवान'] },
    Aquarius:    { title: 'सामाजिक जिम्मेदारी', meaning: 'शनि कुंभ में अपने घर में है। आपका जीवन पाठ सामाजिक संरचनाओं में सुधार लाना है।', traits: ['मानवतावादी', 'जिम्मेदार', 'अभिनव', 'सामाजिक'] },
    Pisces:      { title: 'आध्यात्मिक अनुशासन', meaning: 'आपका जीवन पाठ आध्यात्मिक अनुशासन और सेवा के माध्यम से ज्ञान प्राप्त करना है।', traits: ['आध्यात्मिक', 'अनुशासित', 'करुणाशील', 'जिम्मेदार'] },
  },
  Uranus: {
    Aries:       { title: 'क्रांतिकारी पीढ़ी', meaning: 'आपकी पीढ़ी पुरानी संरचनाओं को तोड़कर नई शुरुआत करती है।', traits: ['क्रांतिकारी', 'अग्रणी', 'साहसी', 'मौलिक'] },
    Taurus:      { title: 'पृथ्वी क्रांति', meaning: 'आपकी पीढ़ी वित्त, प्रकृति और भौतिक दुनिया में आमूल परिवर्तन लाती है।', traits: ['अभिनव', 'व्यावहारिक', 'पर्यावरण-प्रेमी', 'क्रांतिकारी'] },
    Gemini:      { title: 'संचार क्रांति', meaning: 'आपकी पीढ़ी संचार और जानकारी की दुनिया को बदलती है।', traits: ['अभिनव', 'जिज्ञासु', 'संचारक', 'बौद्धिक'] },
    Cancer:      { title: 'पारिवारिक क्रांति', meaning: 'आपकी पीढ़ी परिवार और घर की अवधारणाओं को पुनर्परिभाषित करती है।', traits: ['पोषणकारी', 'क्रांतिकारी', 'सहज ज्ञानी', 'सुरक्षात्मक'] },
    Leo:         { title: 'रचनात्मक क्रांति', meaning: 'आपकी पीढ़ी रचनात्मकता और स्व-अभिव्यक्ति में क्रांति लाती है।', traits: ['रचनात्मक', 'क्रांतिकारी', 'करिश्माई', 'अभिनव'] },
    Virgo:       { title: 'स्वास्थ्य क्रांति', meaning: 'आपकी पीढ़ी स्वास्थ्य, कार्य और सेवा में क्रांतिकारी बदलाव लाती है।', traits: ['विश्लेषणात्मक', 'स्वास्थ्य-सचेत', 'अभिनव', 'सेवाशील'] },
    Libra:       { title: 'सामाजिक क्रांति', meaning: 'आपकी पीढ़ी सामाजिक न्याय और साझेदारियों में क्रांति लाती है।', traits: ['न्यायप्रिय', 'सामाजिक', 'क्रांतिकारी', 'कूटनीतिक'] },
    Scorpio:     { title: 'परिवर्तन की पीढ़ी', meaning: 'आपकी पीढ़ी गहरे सामाजिक परिवर्तन और शक्ति संरचनाओं को चुनौती देती है।', traits: ['परिवर्तनकारी', 'गहन', 'क्रांतिकारी', 'रहस्यमय'] },
    Sagittarius: { title: 'दार्शनिक क्रांति', meaning: 'आपकी पीढ़ी धर्म, दर्शन और उच्च शिक्षा में क्रांतिकारी बदलाव लाती है।', traits: ['दार्शनिक', 'स्वतंत्र', 'क्रांतिकारी', 'आशावादी'] },
    Capricorn:   { title: 'संस्थागत क्रांति', meaning: 'आपकी पीढ़ी सरकारी और कॉर्पोरेट संरचनाओं में आमूल परिवर्तन लाती है।', traits: ['महत्वाकांक्षी', 'क्रांतिकारी', 'व्यावहारिक', 'अनुशासित'] },
    Aquarius:    { title: 'डिजिटल क्रांतिकारी', meaning: 'यूरेनस अपने घर में है। आपकी पीढ़ी तकनीक और मानवतावाद में अभूतपूर्व क्रांति लाती है।', traits: ['तकनीकी', 'मानवतावादी', 'क्रांतिकारी', 'अभिनव'] },
    Pisces:      { title: 'आध्यात्मिक क्रांति', meaning: 'आपकी पीढ़ी आध्यात्मिकता और कलात्मक अभिव्यक्ति में क्रांति लाती है।', traits: ['आध्यात्मिक', 'कलात्मक', 'करुणाशील', 'सहज ज्ञानी'] },
  },
  Neptune: {
    Aries:       { title: 'आदर्शवादी योद्धा', meaning: 'आपकी पीढ़ी एक आदर्श दुनिया के लिए लड़ती है।', traits: ['आदर्शवादी', 'साहसी', 'स्वप्नद्रष्टा', 'अग्रणी'] },
    Taurus:      { title: 'भौतिक स्वप्न', meaning: 'आपकी पीढ़ी भौतिक जगत और प्रकृति के साथ गहरे आध्यात्मिक संबंध की तलाश करती है।', traits: ['आध्यात्मिक', 'प्रकृति-प्रेमी', 'कलात्मक', 'स्वप्निल'] },
    Gemini:      { title: 'विचारों के स्वप्नद्रष्टा', meaning: 'आपकी पीढ़ी विचारों और संचार के माध्यम से एक बेहतर दुनिया की कल्पना करती है।', traits: ['जिज्ञासु', 'स्वप्निल', 'संचारक', 'कल्पनाशील'] },
    Cancer:      { title: 'पोषणकारी स्वप्न', meaning: 'आपकी पीढ़ी घर, परिवार और भावनात्मक उपचार के माध्यम से एक बेहतर दुनिया की कल्पना करती है।', traits: ['पोषणकारी', 'सहज ज्ञानी', 'करुणाशील', 'स्वप्निल'] },
    Leo:         { title: 'रचनात्मक स्वप्न', meaning: 'आपकी पीढ़ी रचनात्मकता और कला के माध्यम से एक बेहतर दुनिया की कल्पना करती है।', traits: ['रचनात्मक', 'कलात्मक', 'स्वप्निल', 'उदार'] },
    Virgo:       { title: 'सेवा का आदर्श', meaning: 'आपकी पीढ़ी स्वास्थ्य और सेवा के माध्यम से एक बेहतर दुनिया की कल्पना करती है।', traits: ['सेवाशील', 'स्वास्थ्य-सचेत', 'आदर्शवादी', 'विश्लेषणात्मक'] },
    Libra:       { title: 'सामंजस्य का स्वप्न', meaning: 'आपकी पीढ़ी न्याय और सामंजस्य के माध्यम से एक बेहतर दुनिया की कल्पना करती है।', traits: ['न्यायप्रिय', 'आदर्शवादी', 'सामाजिक', 'कलात्मक'] },
    Scorpio:     { title: 'परिवर्तन का स्वप्न', meaning: 'आपकी पीढ़ी गहरे मनोवैज्ञानिक परिवर्तन के माध्यम से एक बेहतर दुनिया की कल्पना करती है।', traits: ['परिवर्तनकारी', 'गहन', 'रहस्यमय', 'आदर्शवादी'] },
    Sagittarius: { title: 'दार्शनिक स्वप्न', meaning: 'आपकी पीढ़ी दर्शन और आध्यात्मिकता के माध्यम से एक बेहतर दुनिया की कल्पना करती है।', traits: ['दार्शनिक', 'आशावादी', 'आदर्शवादी', 'स्वतंत्र'] },
    Capricorn:   { title: 'व्यावहारिक स्वप्न', meaning: 'आपकी पीढ़ी संरचना और व्यावहारिकता के माध्यम से एक बेहतर दुनिया की कल्पना करती है।', traits: ['व्यावहारिक', 'अनुशासित', 'आदर्शवादी', 'जिम्मेदार'] },
    Aquarius:    { title: 'मानवतावादी स्वप्न', meaning: 'आपकी पीढ़ी तकनीक और मानवतावाद के माध्यम से एक बेहतर दुनिया की कल्पना करती है।', traits: ['मानवतावादी', 'अभिनव', 'आदर्शवादी', 'सामाजिक'] },
    Pisces:      { title: 'परम आध्यात्मिकता', meaning: 'नेप्च्यून अपने घर में है। आपकी पीढ़ी आध्यात्मिक जागृति और सार्वभौमिक प्रेम के माध्यम से एक बेहतर दुनिया की कल्पना करती है।', traits: ['आध्यात्मिक', 'करुणाशील', 'कलात्मक', 'आदर्शवादी'] },
  },
};

export function getPlanetInterpretation(planet: string, sign: string, lang: 'en' | 'hi' = 'en'): PlanetInterpretation | null {
  if (lang === 'hi') {
    const hiP = interpretationsHi[planet as PlanetName];
    const hiEntry = hiP?.[sign as SignName];
    if (hiEntry) return hiEntry;
  }
  const p = interpretations[planet as PlanetName];
  if (!p) return null;
  return p[sign as SignName] || null;
}

export function getOverallSummary(planets: { name: string; sign: string; element: string }[]): string {
  const sun = planets.find(p => p.name === 'Sun');
  const moon = planets.find(p => p.name === 'Moon');
  const mercury = planets.find(p => p.name === 'Mercury');
  const venus = planets.find(p => p.name === 'Venus');
  const mars = planets.find(p => p.name === 'Mars');

  const elementCount: Record<string, number> = {};
  planets.forEach(p => {
    elementCount[p.element] = (elementCount[p.element] || 0) + 1;
  });
  const dominantElement = Object.entries(elementCount).sort((a, b) => b[1] - a[1])[0][0];

  const elementDesc: Record<string, string> = {
    Fire: 'passionate, action-oriented, and driven by inspiration',
    Earth: 'grounded, practical, and motivated by tangible results',
    Air: 'intellectually driven, social, and motivated by ideas and connection',
    Water: 'emotionally deep, intuitive, and driven by feeling and empathy',
  };

  return `At the moment of your birth, the cosmos painted a unique and irrepeatable portrait of your soul.
Your Sun in ${sun?.sign} forms the bedrock of your identity — the conscious self you are here to express and grow into.
Your Moon in ${moon?.sign} reveals your inner emotional world — the part of you that feels, remembers, and needs.
With Mercury in ${mercury?.sign}, your mind operates with a distinct style that shapes how you think, speak, and learn.
Venus in ${venus?.sign} shows how you love and what you find beautiful and valuable in life.
And Mars in ${mars?.sign} is the engine of your drive — how you pursue what you want and assert yourself in the world.

Overall, your chart is strongly ${dominantElement}-influenced, making you ${elementDesc[dominantElement]}.
This cosmic fingerprint is yours alone — a map not of who you must be, but of the extraordinary potential you carry within you.`;
}
