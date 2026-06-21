export type Lang = 'en' | 'hi';

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.birthChart': { en: 'Birth Chart', hi: 'जन्म कुंडली' },
  'nav.horoscope': { en: 'Horoscope', hi: 'राशिफल' },
  'nav.compatibility': { en: 'Compatibility', hi: 'राशि मिलान' },
  'nav.planets': { en: 'Planets', hi: 'ग्रह' },
  'nav.future': { en: 'Future', hi: 'भविष्य' },
  'nav.brand': { en: 'Celestial', hi: 'सेलेस्टियल' },

  // Home hero
  'home.hero.eyebrow': { en: 'Ancient Wisdom. Modern Clarity.', hi: 'प्राचीन ज्ञान। आधुनिक स्पष्टता।' },
  'home.hero.title1': { en: 'Discover Your', hi: 'जानें अपना' },
  'home.hero.title2': { en: 'Cosmic Blueprint', hi: 'ब्रह्मांडीय नक्शा' },
  'home.hero.subtitle': {
    en: 'Ancient wisdom. Modern clarity. Explore the celestial forces that shape your destiny through personalised birth charts, daily horoscopes, and live planetary positions.',
    hi: 'प्राचीन ज्ञान। आधुनिक स्पष्टता। अपनी जन्म कुंडली, दैनिक राशिफल और ग्रहों की वर्तमान स्थिति के माध्यम से अपनी नियति को आकार देने वाली ब्रह्मांडीय शक्तियों को जानें।',
  },
  'home.hero.cta1': { en: '✦ Reveal My Chart', hi: '✦ मेरी कुंडली देखें' },
  'home.hero.cta2': { en: "Today's Horoscope", hi: 'आज का राशिफल' },
  'home.hero.cta3': { en: '🔮 Predict Future', hi: '🔮 भविष्य जानें' },

  // Home features section
  'home.features.eyebrow': { en: 'Navigate the Stars', hi: 'सितारों की राह' },
  'home.features.title': { en: 'Your Celestial Toolkit', hi: 'आपका ज्योतिष केंद्र' },
  'home.features.desc': {
    en: 'Five powerful gateways to deeper self-understanding and cosmic awareness',
    hi: 'पांच शक्तिशाली द्वार — गहरी आत्म-समझ और ब्रह्मांडीय जागरूकता की ओर',
  },

  // Home danger section
  'home.danger.eyebrow': { en: 'Cosmic Warnings', hi: 'ब्रह्मांडीय चेतावनियाँ' },
  'home.danger.title': { en: '⚠️ What to Stay Away From', hi: '⚠️ किन चीज़ों से बचें' },
  'home.danger.desc': {
    en: 'The planets reveal hidden dangers and situations to avoid — personalised to your birth chart',
    hi: 'ग्रह छुपे हुए खतरों और बचने वाली परिस्थितियों को प्रकट करते हैं — आपकी जन्म कुंडली के अनुसार',
  },
  'home.danger.cta': { en: 'Get My Personal Warnings →', hi: 'मेरी व्यक्तिगत चेतावनियाँ →' },

  // Home lucky section
  'home.lucky.eyebrow': { en: 'Cosmic Blessings', hi: 'ब्रह्मांडीय आशीर्वाद' },
  'home.lucky.title': { en: '✨ Good Luck Activities', hi: '✨ शुभ कार्य' },
  'home.lucky.desc': {
    en: 'Planetary-aligned actions that amplify your fortune — personalised to your birth chart',
    hi: 'ग्रहों के अनुकूल कार्य जो आपके भाग्य को बढ़ाते हैं — आपकी जन्म कुंडली के अनुसार',
  },
  'home.lucky.cta': { en: 'Get My Lucky Activities →', hi: 'मेरे शुभ कार्य →' },

  // Home colors section
  'home.colors.eyebrow': { en: 'Planetary Colours', hi: 'ग्रहों के रंग' },
  'home.colors.title': { en: '🎨 What Colour to Wear Each Day', hi: '🎨 हर दिन कौन सा रंग पहनें' },
  'home.colors.desc': {
    en: "Every day of the week is ruled by a planet — wearing its colour aligns you with that planet's energy and invites its blessings",
    hi: 'सप्ताह का हर दिन एक ग्रह द्वारा शासित होता है — उसका रंग पहनने से आप उस ग्रह की ऊर्जा से जुड़ते हैं',
  },

  // Home footer
  'home.footer.text': {
    en: 'Planetary positions calculated using astronomical algorithms. For entertainment and self-reflection purposes.',
    hi: 'ग्रहों की स्थिति खगोलीय गणनाओं द्वारा परिकलित। मनोरंजन और आत्म-चिंतन के उद्देश्य से।',
  },

  // Feature cards
  'feature.birthChart.title': { en: 'Birth Chart', hi: 'जन्म कुंडली' },
  'feature.birthChart.subtitle': { en: 'Your Cosmic Blueprint', hi: 'आपका ब्रह्मांडीय नक्शा' },
  'feature.birthChart.desc': {
    en: 'Enter your birth date, time, and place to generate a personalised natal chart. Discover the exact positions of the Sun, Moon, and planets at the moment you arrived in the world.',
    hi: 'अपनी जन्म तिथि, समय और स्थान दर्ज करें और अपनी व्यक्तिगत जन्म कुंडली बनाएं। जानें कि आपके जन्म के समय सूर्य, चंद्रमा और ग्रह किस स्थान पर थे।',
  },
  'feature.horoscope.title': { en: 'Daily Horoscope', hi: 'दैनिक राशिफल' },
  'feature.horoscope.subtitle': { en: 'Celestial Guidance', hi: 'ज्योतिषीय मार्गदर्शन' },
  'feature.horoscope.desc': {
    en: 'Receive detailed daily readings for all twelve zodiac signs covering love, career, and wellbeing — channelling the ancient wisdom of the stars into practical, inspiring guidance.',
    hi: 'सभी बारह राशियों के लिए प्रेम, करियर और स्वास्थ्य पर विस्तृत दैनिक राशिफल प्राप्त करें — सितारों की प्राचीन बुद्धिमत्ता को व्यावहारिक मार्गदर्शन में बदलें।',
  },
  'feature.compatibility.title': { en: 'Compatibility', hi: 'राशि मिलान' },
  'feature.compatibility.subtitle': { en: 'Cosmic Chemistry', hi: 'ब्रह्मांडीय रसायन' },
  'feature.compatibility.desc': {
    en: 'Explore the elemental and modal dynamics between any two zodiac signs. Uncover your strengths, challenges, and the deeper cosmic forces that shape your most important relationships.',
    hi: 'किन्हीं भी दो राशियों के बीच तात्विक और मॉडल गतिशीलता का अन्वेषण करें। अपनी शक्तियों, चुनौतियों और महत्वपूर्ण संबंधों को आकार देने वाली ब्रह्मांडीय शक्तियों को जानें।',
  },
  'feature.planets.title': { en: 'Live Planets', hi: 'ग्रह स्थिति' },
  'feature.planets.subtitle': { en: 'The Celestial Stage', hi: 'ब्रह्मांडीय मंच' },
  'feature.planets.desc': {
    en: "Track the current positions of all major planets in real time. Understand how today's planetary alignments are shaping collective energy and your personal experience.",
    hi: 'सभी प्रमुख ग्रहों की वर्तमान स्थिति को रियल टाइम में ट्रैक करें। जानें कि आज के ग्रह योग सामूहिक ऊर्जा और आपके व्यक्तिगत अनुभव को कैसे प्रभावित कर रहे हैं।',
  },
  'feature.predictions.title': { en: 'Predict Future', hi: 'भविष्यवाणी' },
  'feature.predictions.subtitle': { en: 'Cosmic Forecast', hi: 'ब्रह्मांडीय भविष्य' },
  'feature.predictions.desc': {
    en: 'Discover what the planets have in store for you. Get personalised predictions for love, career, money, health, and spiritual growth — this week, this month, and this year.',
    hi: 'जानें ग्रहों ने आपके लिए क्या तय किया है। प्रेम, करियर, धन, स्वास्थ्य और आध्यात्मिक विकास के लिए व्यक्तिगत भविष्यवाणियाँ पाएं — इस सप्ताह, इस माह और इस वर्ष।',
  },
  'feature.explore': { en: 'Explore', hi: 'देखें' },

  // Birth Chart page
  'birthChart.eyebrow': { en: 'Natal Astrology', hi: 'जन्म ज्योतिष' },
  'birthChart.title': { en: 'Birth Chart Calculator', hi: 'जन्म कुंडली कैलकुलेटर' },
  'birthChart.desc': {
    en: 'Enter your birth details to reveal the exact positions of the planets at the moment of your arrival, forming the cosmic signature that is uniquely yours.',
    hi: 'अपने जन्म का विवरण दर्ज करें और जन्म के समय ग्रहों की सटीक स्थिति जानें — यही आपकी अनूठी ब्रह्मांडीय पहचान है।',
  },
  'birthChart.form.name': { en: 'Your Name', hi: 'आपका नाम' },
  'birthChart.form.namePlaceholder': { en: 'Enter your name', hi: 'नाम दर्ज करें' },
  'birthChart.form.date': { en: 'Date of Birth', hi: 'जन्म तिथि' },
  'birthChart.form.time': { en: 'Time of Birth', hi: 'जन्म का समय' },
  'birthChart.form.city': { en: 'Birth City', hi: 'जन्म स्थान' },
  'birthChart.form.cityPlaceholder': { en: 'Enter city', hi: 'शहर दर्ज करें' },
  'birthChart.form.submit': { en: '✦ Calculate My Chart', hi: '✦ मेरी कुंडली बनाएं' },
  'birthChart.form.loading': { en: 'Reading the stars...', hi: 'सितारे पढ़े जा रहे हैं...' },
  'birthChart.sunIn': { en: 'Sun in', hi: 'सूर्य' },
  'birthChart.moonIn': { en: 'Moon in', hi: 'चंद्रमा' },
  'birthChart.planetaryPositions': { en: 'Planetary Positions', hi: 'ग्रहों की स्थिति' },
  'birthChart.cosmicBlueprint': { en: 'Your Cosmic Blueprint', hi: 'आपका ब्रह्मांडीय नक्शा' },
  'birthChart.whatPlanets': { en: 'What Each Planet Says About You', hi: 'हर ग्रह आपके बारे में क्या कहता है' },
  'birthChart.tapToReveal': { en: 'Tap any planet to reveal its influence', hi: 'किसी ग्रह पर टैप करें' },

  // Horoscope page
  'horoscope.eyebrow': { en: 'Daily Reading', hi: 'दैनिक पाठ' },
  'horoscope.title': { en: 'Daily Horoscope', hi: 'दैनिक राशिफल' },
  'horoscope.desc': {
    en: 'Select your zodiac sign to receive a detailed cosmic reading covering love, career, and wellbeing for today.',
    hi: 'अपनी राशि चुनें और आज के प्रेम, करियर और स्वास्थ्य पर विस्तृत ब्रह्मांडीय पाठ प्राप्त करें।',
  },
  'horoscope.selectSign': { en: 'Select Your Sign', hi: 'अपनी राशि चुनें' },
  'horoscope.today': { en: 'Today', hi: 'आज' },
  'horoscope.love': { en: 'Love', hi: 'प्रेम' },
  'horoscope.career': { en: 'Career', hi: 'करियर' },
  'horoscope.health': { en: 'Health', hi: 'स्वास्थ्य' },

  // Compatibility page
  'compat.eyebrow': { en: 'Cosmic Chemistry', hi: 'ब्रह्मांडीय मेल' },
  'compat.title': { en: 'Compatibility Checker', hi: 'राशि मिलान' },
  'compat.desc': {
    en: 'Explore the elemental and modal dynamics between two zodiac signs. Discover what the stars reveal about your cosmic connection.',
    hi: 'दो राशियों के बीच तात्विक और मॉडल गतिशीलता का अन्वेषण करें। जानें सितारे आपके ब्रह्मांडीय संबंध के बारे में क्या बताते हैं।',
  },
  'compat.person1': { en: 'Person 1', hi: 'व्यक्ति 1' },
  'compat.person2': { en: 'Person 2', hi: 'व्यक्ति 2' },
  'compat.submit': { en: 'Check Compatibility', hi: 'मिलान जांचें' },

  // Predictions page
  'pred.eyebrow': { en: 'Cosmic Forecast', hi: 'ब्रह्मांडीय भविष्य' },
  'pred.title': { en: 'Predict Your Future', hi: 'अपना भविष्य जानें' },
  'pred.desc': {
    en: 'Enter your birth details and the planets will reveal what lies ahead — in love, career, money, health, and your spiritual path.',
    hi: 'अपना जन्म विवरण दर्ज करें और ग्रह बताएंगे कि आगे क्या है — प्रेम, करियर, धन, स्वास्थ्य और आध्यात्मिक मार्ग में।',
  },
  'pred.name': { en: 'Your Name', hi: 'आपका नाम' },
  'pred.date': { en: 'Date of Birth', hi: 'जन्म तिथि' },
  'pred.time': { en: 'Time of Birth', hi: 'जन्म का समय' },
  'pred.submit': { en: '🔮 Reveal My Future', hi: '🔮 मेरा भविष्य देखें' },
  'pred.loading': { en: 'Reading the stars...', hi: 'सितारे पढ़े जा रहे हैं...' },
  'pred.overallEnergy': { en: 'Overall Cosmic Energy', hi: 'समग्र ब्रह्मांडीय ऊर्जा' },
  'pred.powerDates': { en: '⚡ Upcoming Power Dates', hi: '⚡ आने वाली शक्तिशाली तिथियाँ' },
  'pred.thisWeek': { en: 'This Week', hi: 'इस सप्ताह' },
  'pred.thisMonth': { en: 'This Month', hi: 'इस माह' },
  'pred.thisYear': { en: 'This Year', hi: 'इस वर्ष' },
  'pred.dangers': { en: '⚠️ What to Stay Away From', hi: '⚠️ किन चीज़ों से दूर रहें' },
  'pred.dangersDesc': {
    en: 'The planets reveal energies and situations to avoid right now',
    hi: 'ग्रह उन ऊर्जाओं और परिस्थितियों को प्रकट करते हैं जिनसे अभी बचना चाहिए',
  },
  'pred.lucky': { en: '✨ Good Luck Activities', hi: '✨ शुभ कार्य' },
  'pred.luckyDesc': {
    en: 'Cosmic-aligned actions that will amplify your fortune right now',
    hi: 'ब्रह्मांडीय रूप से संरेखित कार्य जो अभी आपके भाग्य को बढ़ाएंगे',
  },
  'pred.colors': { en: '🎨 What Colour to Wear Each Day', hi: '🎨 हर दिन कौन सा रंग पहनें' },
  'pred.colorsDesc': {
    en: "Every day is ruled by a planet — wearing its colour aligns you with that energy",
    hi: 'हर दिन एक ग्रह द्वारा शासित होता है — उसका रंग पहनने से आप उस ऊर्जा से जुड़ते हैं',
  },
  'pred.todayIs': { en: 'Today is', hi: 'आज है' },
  'pred.wear': { en: 'Wear', hi: 'पहनें' },
  'pred.ruledBy': { en: 'Ruled by', hi: 'शासक ग्रह' },
  'pred.avoid': { en: 'Avoid:', hi: 'बचें:' },
  'pred.bestTime': { en: 'Best time:', hi: 'सर्वोत्तम समय:' },
  'pred.disclaimer': {
    en: '✦ These predictions are based on planetary transits and are intended for reflection and inspiration. Your free will is always the most powerful force in your life.',
    hi: '✦ ये भविष्यवाणियाँ ग्रह गोचर पर आधारित हैं और चिंतन व प्रेरणा के लिए हैं। आपकी स्वतंत्र इच्छा सदैव आपके जीवन की सबसे शक्तिशाली शक्ति है।',
  },
  'pred.cosmicAdvice': { en: '✦ Cosmic Advice', hi: '✦ ज्योतिषीय सलाह' },
  'pred.luckyDays': { en: 'Lucky Days', hi: 'शुभ दिन' },
  'pred.highRisk': { en: '🔴 High Risk', hi: '🔴 उच्च जोखिम' },
  'pred.caution': { en: '🟡 Caution', hi: '🟡 सावधानी' },
  'pred.mildWarning': { en: '🟢 Mild Warning', hi: '🟢 हल्की चेतावनी' },

  // Planets page
  'planets.eyebrow': { en: 'Real-Time Positions', hi: 'वास्तविक समय' },
  'planets.title': { en: 'Live Planetary Positions', hi: 'ग्रहों की वर्तमान स्थिति' },
  'planets.desc': {
    en: 'The current positions of all major planets through the zodiac, calculated in real time from precise astronomical formulas.',
    hi: 'राशि चक्र में सभी प्रमुख ग्रहों की वर्तमान स्थिति, सटीक खगोलीय सूत्रों से रियल टाइम में परिकलित।',
  },
  'planets.currentSign': { en: 'Currently in', hi: 'वर्तमान राशि' },
  'planets.element': { en: 'Element', hi: 'तत्व' },

  // Day names
  'day.Sunday': { en: 'Sunday', hi: 'रविवार' },
  'day.Monday': { en: 'Monday', hi: 'सोमवार' },
  'day.Tuesday': { en: 'Tuesday', hi: 'मंगलवार' },
  'day.Wednesday': { en: 'Wednesday', hi: 'बुधवार' },
  'day.Thursday': { en: 'Thursday', hi: 'गुरुवार' },
  'day.Friday': { en: 'Friday', hi: 'शुक्रवार' },
  'day.Saturday': { en: 'Saturday', hi: 'शनिवार' },

  // Energy labels
  'energy.excellent': { en: 'Excellent', hi: 'उत्कृष्ट' },
  'energy.good': { en: 'Favourable', hi: 'अनुकूल' },
  'energy.neutral': { en: 'Steady', hi: 'स्थिर' },
  'energy.challenging': { en: 'Challenging', hi: 'चुनौतीपूर्ण' },
  'energy.intense': { en: 'Transformative', hi: 'परिवर्तनकारी' },
};

export function t(key: string, lang: Lang): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] ?? entry['en'] ?? key;
}
