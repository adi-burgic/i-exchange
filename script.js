/* =========================================================
   i-Exchange landing page script
   - translations (EN / SL) + language toggle
   - light / dark theme toggle
   - example listings (rendered safely with textContent)
   - waitlist form -> POST /api/waitlist
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Translations ----------
     Every piece of visible text lives here. Elements in the HTML point to
     a key with data-i18n (text), data-i18n-placeholder or data-i18n-aria-label.
     Keys ending in .one/.two/.few/.other are plural forms (Slovenian has four). */
  const translations = {
    en: {
      'meta.title': 'i-Exchange — No money, no problem.',
      'meta.description': "i-Exchange is a Slovenian marketplace for swapping items. Trade what you don't need for what you do, and balance the difference with tokens.",
      'a11y.skip': 'Skip to content',
      'a11y.language': 'Language',
      'a11y.theme': 'Toggle dark mode',

      'header.cta': 'Join the waitlist',
      'header.ctaShort': 'Join',

      'hero.badge': 'Coming soon to Slovenia',
      'hero.title': 'No money, no problem.',
      'hero.sub': "Swap the things you don't need for the things you do — and balance any difference with tokens instead of cash.",
      'hero.cta': 'Join the waitlist',
      'hero.bonus': 'Get 10 free tokens at launch',
      'hero.visA': 'Used laptop',
      'hero.visB': 'Film camera',
      'hero.visToast': 'Trade accepted',

      'how.eyebrow': 'How it works',
      'how.title': 'Four steps from clutter to swap',
      'how.s1t': 'Post your item',
      'how.s1d': 'Snap a photo, add a short description and set its value in tokens.',
      'how.s2t': 'Find something you need',
      'how.s2d': "Browse by category or city and spot what you've been looking for.",
      'how.s3t': 'Offer an exchange',
      'how.s3d': 'Offer one or more of your items and add tokens to balance the value.',
      'how.s4t': 'Meet up or ship, confirm, rate',
      'how.s4d': 'Swap in person or by parcel, confirm you got your item, and rate each other.',

      'ex.eyebrow': 'Example trade',
      'ex.title': "Values don't match? Tokens make it fair.",
      'ex.offer': "Maja's offer",
      'ex.listing': "Luka's listing",
      'ex.books': 'Books bundle',
      'ex.tokens': 'Tokens',
      'ex.bike': 'Bicycle',
      'ex.total': '50 + 50 = 100 tokens. A fair trade.',
      'ex.caption': "Maja wants Luka's bicycle (100 tokens). She offers a stack of books worth 50 tokens and adds 50 tokens to even it out. Luka accepts — no cash involved.",
      'ex.status': 'The 50 tokens are held safely until both confirm they received their item.',

      'tok.eyebrow': 'Tokens',
      'tok.title': 'Tokens, simply explained',
      'tok.lead': '1 token ≈ 1 EUR. They make uneven trades fair.',
      'tok.buyT': 'Buy',
      'tok.buyD': 'Top up whenever you need a few extra tokens to close a deal.',
      'tok.earnT': 'Earn by trading',
      'tok.earnD': 'Receive tokens when someone adds them to an offer for your item.',
      'tok.spendT': 'Spend',
      'tok.spendD': 'Use them on any listing — or to pay for your shipping.',
      'tok.noCash': "Tokens stay inside i-Exchange and can't be cashed out. That keeps it about swapping, not selling.",
      'tok.starter': 'New here? Verify your phone number and get 10 free starter tokens.',

      'del.eyebrow': 'Delivery',
      'del.title': 'Meet up or ship it',
      'del.lead': "Every listing shows whether it's available for meetup, shipping, or both.",
      'del.meetT': 'Meetup',
      'del.meetD': 'Agree on a time and place, check the item, and swap on the spot.',
      'del.shipT': 'Shipping',
      'del.shipD': 'Send it anywhere in Slovenia. Each person pays to ship their own item — in euros or tokens.',
      'del.lockers': 'Parcel lockers supported',
      'del.slovenia': 'Available in Slovenia only, for now.',

      'trust.eyebrow': 'Trust & safety',
      'trust.title': 'Built so every trade feels safe',
      'trust.lead': "Swapping with strangers should feel like swapping with neighbours. Here's how we make sure it does.",
      'trust.t1': 'Token protection',
      'trust.d1': "Tokens in an offer are held by i-Exchange and only released when both of you confirm you've received your item.",
      'trust.t2': 'Tracking numbers required',
      'trust.d2': 'Every shipped trade needs a tracking number, so you always know where your parcel is.',
      'trust.t3': 'Ratings from real trades',
      'trust.d3': 'After every completed exchange, you rate each other. Only real trades can be rated.',
      'trust.t4': 'Verified profiles',
      'trust.d4': 'Verify your email, phone and ID step by step to earn the Trusted trader badge.',
      'trust.lvEmail': 'Email',
      'trust.lvPhone': 'Phone',
      'trust.lvId': 'ID',
      'trust.lvTrusted': 'Trusted trader',
      'trust.t5': 'Report, block & disputes',
      'trust.d5': "Report or block any user or listing. If an item doesn't arrive or isn't as described, open a dispute.",
      'trust.t6': 'Trade history on every profile',
      'trust.d6': 'See anyone\'s track record at a glance — like “23 successful exchanges”.',

      'cat.eyebrow': 'Categories',
      'cat.title': 'Swap almost anything',
      'cat.clothing': 'Clothing',
      'cat.electronics': 'Electronics',
      'cat.home': 'Home & Garden',
      'cat.sports': 'Sports & Bikes',
      'cat.books': 'Books & Media',
      'cat.kids': 'Kids & Toys',
      'cat.tools': 'Tools',
      'cat.other': 'Other',

      'list.eyebrow': 'Sneak peek',
      'list.title': 'What swapping will look like',
      'list.note': 'Example listings only — the items, people and ratings below are fictional.',
      'list.meetup': 'Meetup',
      'list.shipping': 'Shipping',
      'list.verified': 'Verified',
      'list.offer': 'Offer exchange',
      'list.ratingAria': 'Rated {rating} out of 5 from {count} reviews',
      'list.tokens.one': 'token',
      'list.tokens.other': 'tokens',

      'why.eyebrow': 'Why i-Exchange',
      'why.title': 'Good for you, your wallet and the planet',
      'why.t1': "Reuse, don't throw away",
      'why.d1': 'Give the things in your cupboard a second life instead of sending them to the landfill.',
      'why.t2': 'Get what you need, keep your money',
      'why.d2': 'Trade for what you need using things you already own.',
      'why.t3': 'A community you can trust',
      'why.d3': 'Verified profiles, real ratings and protected tokens make every trade feel safe.',

      'faq.eyebrow': 'FAQ',
      'faq.title': 'Questions, answered',
      'faq.q1': 'What are tokens?',
      'faq.a1': "Tokens are i-Exchange's in-app value. 1 token is roughly 1 EUR. You use them to balance trades when items aren't worth the same, and to pay for shipping.",
      'faq.q2': 'Can I cash out tokens?',
      'faq.a2': 'No. Tokens can only be spent inside i-Exchange — on trades or shipping. That keeps the platform about exchanging, not selling.',
      'faq.q3': 'Is it free to join?',
      'faq.a3': "Yes, joining is free. Verify your phone number and you'll also get 10 starter tokens to make your first trade easier.",
      'faq.q4': 'How does shipping work?',
      'faq.a4': 'If a listing offers shipping, each of you sends your own item with Pošta Slovenije, GLS, DPD or a Packeta parcel locker and adds the tracking number. Each person pays for their own parcel — in euros or tokens.',
      'faq.q5': 'What if something goes wrong?',
      'faq.a5': "Tokens in an offer stay protected until both sides confirm delivery. If an item doesn't arrive or isn't as described, open a dispute and we'll step in. You can also report or block any user or listing.",
      'faq.q6': 'Where does it work?',
      'faq.a6': 'In Slovenia only, for now — anywhere in the country, with meetups or shipping.',
      'faq.q7': 'When does it launch?',
      'faq.a7': "We're getting ready to launch in Slovenia soon. Join the waitlist and we'll email you the moment we go live.",

      'wl.eyebrow': 'Waitlist',
      'wl.title': 'Be first in line',
      'wl.sub': 'Join the waitlist and get 10 free tokens when i-Exchange launches.',
      'wl.count.one': '{n} person is already on the waitlist',
      'wl.count.other': '{n} people are already on the waitlist',

      'form.email': 'Email',
      'form.emailPh': 'you@example.com',
      'form.city': 'City',
      'form.cityPh': 'Choose your city',
      'form.cityOther': 'Other',
      'form.consent': 'I agree that i-Exchange may store my email and city to let me know when it launches.',
      'form.privacy': 'We only use this to contact you about i-Exchange. No spam, never shared, and you can ask us to delete it at any time.',
      'form.submit': 'Join the waitlist',
      'form.sending': 'Joining…',
      'form.success': "You're on the list! We'll email you when i-Exchange launches.",
      'form.duplicate': "You're already on the list — we'll be in touch soon!",
      'form.errEmail': 'Please enter a valid email address.',
      'form.errCity': 'Please choose your city.',
      'form.errConsent': 'Please tick the consent box so we can contact you.',
      'form.errGeneric': 'Something went wrong. Please try again in a moment.',

      'footer.launch': 'Launching in Slovenia'
    },

    sl: {
      'meta.title': 'i-Exchange — Brez denarja, brez skrbi.',
      'meta.description': 'i-Exchange je slovenska tržnica za menjavo stvari. Zamenjaj, česar ne potrebuješ, za tisto, kar ti pride prav, razliko pa poravnaj z žetoni.',
      'a11y.skip': 'Preskoči na vsebino',
      'a11y.language': 'Jezik',
      'a11y.theme': 'Preklopi temni način',

      'header.cta': 'Pridruži se čakalnemu seznamu',
      'header.ctaShort': 'Pridruži se',

      'hero.badge': 'Kmalu v Sloveniji',
      'hero.title': 'Brez denarja, brez skrbi.',
      'hero.sub': 'Zamenjaj stvari, ki jih ne rabiš, za tiste, ki ti pridejo prav — razliko pa poravnaj z žetoni namesto z gotovino.',
      'hero.cta': 'Pridruži se čakalnemu seznamu',
      'hero.bonus': 'Ob zagonu dobiš 10 brezplačnih žetonov',
      'hero.visA': 'Rabljen prenosnik',
      'hero.visB': 'Analogni fotoaparat',
      'hero.visToast': 'Menjava sprejeta',

      'how.eyebrow': 'Kako deluje',
      'how.title': 'Štirje koraki od omare do menjave',
      'how.s1t': 'Objavi svoj predmet',
      'how.s1d': 'Fotografiraj ga, dodaj kratek opis in mu določi vrednost v žetonih.',
      'how.s2t': 'Najdi, kar potrebuješ',
      'how.s2d': 'Brskaj po kategorijah ali mestih in poišči tisto, kar že dolgo iščeš.',
      'how.s3t': 'Ponudi menjavo',
      'how.s3d': 'Ponudi enega ali več svojih predmetov in razliko v vrednosti dopolni z žetoni.',
      'how.s4t': 'Prevzem ali pošiljka, potrditev, ocena',
      'how.s4d': 'Zamenjajta se v živo ali po pošti, potrdita prejem in se ocenita.',

      'ex.eyebrow': 'Primer menjave',
      'ex.title': 'Vrednosti nista enaki? Žetoni poskrbijo za ravnovesje.',
      'ex.offer': 'Majina ponudba',
      'ex.listing': 'Lukov oglas',
      'ex.books': 'Komplet knjig',
      'ex.tokens': 'Žetoni',
      'ex.bike': 'Kolo',
      'ex.total': '50 + 50 = 100 žetonov. Poštena menjava.',
      'ex.caption': 'Maja si želi Lukovo kolo (100 žetonov). Ponudi mu kup knjig v vrednosti 50 žetonov in doda še 50 žetonov, da se vrednosti izenačita. Luka sprejme — brez enega samega evra.',
      'ex.status': 'Teh 50 žetonov je varno shranjenih, dokler oba ne potrdita, da sta prejela svoj predmet.',

      'tok.eyebrow': 'Žetoni',
      'tok.title': 'Žetoni na kratko',
      'tok.lead': '1 žeton ≈ 1 EUR. Z njimi so tudi neenake menjave poštene.',
      'tok.buyT': 'Kupi',
      'tok.buyD': 'Dokupi jih, ko ti za menjavo zmanjka nekaj žetonov.',
      'tok.earnT': 'Zasluži z menjavami',
      'tok.earnD': 'Žetone dobiš, ko jih nekdo doda k ponudbi za tvoj predmet.',
      'tok.spendT': 'Porabi',
      'tok.spendD': 'Porabiš jih lahko pri katerem koli oglasu ali za poštnino.',
      'tok.noCash': 'Žetoni ostanejo znotraj i-Exchange in jih ni mogoče zamenjati za denar. Tako ostaja v ospredju menjava, ne prodaja.',
      'tok.starter': 'Novi uporabniki po potrditvi telefonske številke dobijo 10 brezplačnih začetnih žetonov.',

      'del.eyebrow': 'Prevzem in dostava',
      'del.title': 'Osebni prevzem ali pošiljka',
      'del.lead': 'Pri vsakem oglasu piše, ali je na voljo osebni prevzem, pošiljanje ali oboje.',
      'del.meetT': 'Osebni prevzem',
      'del.meetD': 'Dogovorita se za čas in kraj, preglejta predmet in ga zamenjajta kar na mestu.',
      'del.shipT': 'Pošiljanje',
      'del.shipD': 'Pošlji kamor koli po Sloveniji. Vsak plača pošiljanje svojega predmeta — v evrih ali žetonih.',
      'del.lockers': 'Tudi prek paketomatov',
      'del.slovenia': 'Zaenkrat le v Sloveniji.',

      'trust.eyebrow': 'Zaupanje in varnost',
      'trust.title': 'Vsaka menjava naj bo varna',
      'trust.lead': 'Menjava z neznancem naj bo tako sproščena kot menjava s sosedom. Takole za to poskrbimo.',
      'trust.t1': 'Zaščita žetonov',
      'trust.d1': 'Žetone iz ponudbe hrani i-Exchange in jih sprosti šele, ko oba potrdita, da sta prejela svoj predmet.',
      'trust.t2': 'Obvezna sledilna številka',
      'trust.d2': 'Vsaka menjava s pošiljanjem mora imeti sledilno številko, zato vedno veš, kje je tvoj paket.',
      'trust.t3': 'Ocene samo iz pravih menjav',
      'trust.d3': 'Po vsaki zaključeni menjavi se ocenita. Ocenjevati je mogoče le resnične menjave.',
      'trust.t4': 'Preverjeni profili',
      'trust.d4': 'Korak za korakom potrdi e-pošto, telefon in osebni dokument ter si prisluži značko »Zaupanja vreden menjalec«.',
      'trust.lvEmail': 'E-pošta',
      'trust.lvPhone': 'Telefon',
      'trust.lvId': 'Osebni dokument',
      'trust.lvTrusted': 'Zaupanja vreden menjalec',
      'trust.t5': 'Prijava, blokada in spori',
      'trust.d5': 'Vsakega uporabnika ali oglas lahko prijaviš ali blokiraš. Če predmet ne pride ali ni tak, kot je bil opisan, odpreš spor.',
      'trust.t6': 'Zgodovina menjav na vsakem profilu',
      'trust.d6': 'Na prvi pogled vidiš, s kom imaš opravka — na primer »23 uspešnih menjav«.',

      'cat.eyebrow': 'Kategorije',
      'cat.title': 'Zamenjaš lahko skoraj vse',
      'cat.clothing': 'Oblačila',
      'cat.electronics': 'Elektronika',
      'cat.home': 'Dom in vrt',
      'cat.sports': 'Šport in kolesa',
      'cat.books': 'Knjige in mediji',
      'cat.kids': 'Otroci in igrače',
      'cat.tools': 'Orodje',
      'cat.other': 'Drugo',

      'list.eyebrow': 'Pokukaj naprej',
      'list.title': 'Takole bo videti menjava',
      'list.note': 'Samo primeri oglasov — predmeti, osebe in ocene spodaj so izmišljeni.',
      'list.meetup': 'Osebni prevzem',
      'list.shipping': 'Pošiljanje',
      'list.verified': 'Preverjen',
      'list.offer': 'Ponudi menjavo',
      'list.ratingAria': 'Ocena {rating} od 5, število ocen: {count}',
      'list.tokens.one': 'žeton',
      'list.tokens.two': 'žetona',
      'list.tokens.few': 'žetoni',
      'list.tokens.other': 'žetonov',

      'why.eyebrow': 'Zakaj i-Exchange',
      'why.title': 'Dobro zate, za tvojo denarnico in za planet',
      'why.t1': 'Ponovna raba namesto smetišča',
      'why.d1': 'Stvarem iz omare podari drugo življenje, namesto da končajo na odpadu.',
      'why.t2': 'Dobiš, kar rabiš, denar ostane v žepu',
      'why.d2': 'Do stvari, ki jih potrebuješ, prideš z menjavo tistega, kar že imaš.',
      'why.t3': 'Skupnost, ki ji lahko zaupaš',
      'why.d3': 'Preverjeni profili, resnične ocene in zaščiteni žetoni poskrbijo, da je vsaka menjava varna.',

      'faq.eyebrow': 'Pogosta vprašanja',
      'faq.title': 'Odgovori na tvoja vprašanja',
      'faq.q1': 'Kaj so žetoni?',
      'faq.a1': 'Žetoni so enota vrednosti znotraj i-Exchange. En žeton je vreden približno 1 EUR. Z njimi poravnaš razliko, kadar predmeta nista vredna enako, z njimi pa lahko plačaš tudi poštnino.',
      'faq.q2': 'Ali lahko žetone zamenjam za denar?',
      'faq.a2': 'Ne. Žetone lahko porabiš le znotraj i-Exchange — za menjave ali poštnino. Tako platforma ostaja namenjena menjavi, ne prodaji.',
      'faq.q3': 'Ali je včlanitev brezplačna?',
      'faq.a3': 'Da, včlanitev je brezplačna. Ko potrdiš telefonsko številko, dobiš še 10 začetnih žetonov za lažjo prvo menjavo.',
      'faq.q4': 'Kako poteka pošiljanje?',
      'faq.a4': 'Če oglas omogoča pošiljanje, vsak pošlje svoj predmet s Pošto Slovenije, GLS, DPD ali prek paketomata Packeta in doda sledilno številko. Vsak plača svojo pošiljko — v evrih ali žetonih.',
      'faq.q5': 'Kaj če gre kaj narobe?',
      'faq.a5': 'Žetoni iz ponudbe so zaščiteni, dokler obe strani ne potrdita prejema. Če predmet ne pride ali ni tak, kot je bil opisan, odpri spor in posredovali bomo. Vsakega uporabnika ali oglas lahko tudi prijaviš ali blokiraš.',
      'faq.q6': 'Kje deluje?',
      'faq.a6': 'Zaenkrat le v Sloveniji — kjer koli po državi, z osebnim prevzemom ali pošiljanjem.',
      'faq.q7': 'Kdaj bo zagon?',
      'faq.a7': 'Pripravljamo se na skorajšnji zagon v Sloveniji. Pridruži se čakalnemu seznamu in pisali ti bomo takoj, ko začnemo.',

      'wl.eyebrow': 'Čakalni seznam',
      'wl.title': 'Bodi med prvimi',
      'wl.sub': 'Pridruži se čakalnemu seznamu in ob zagonu i-Exchange dobi 10 brezplačnih žetonov.',
      'wl.count.one': 'Na čakalnem seznamu je že {n} oseba',
      'wl.count.two': 'Na čakalnem seznamu sta že {n} osebi',
      'wl.count.few': 'Na čakalnem seznamu so že {n} osebe',
      'wl.count.other': 'Na čakalnem seznamu je že {n} oseb',

      'form.email': 'E-pošta',
      'form.emailPh': 'ime@primer.si',
      'form.city': 'Mesto',
      'form.cityPh': 'Izberi mesto',
      'form.cityOther': 'Drugo',
      'form.consent': 'Strinjam se, da i-Exchange shrani moj e-naslov in mesto, da me obvesti o zagonu.',
      'form.privacy': 'Podatke uporabimo le za obvestila o i-Exchange. Brez nezaželene pošte, nikoli jih ne delimo z drugimi, izbris pa lahko zahtevaš kadar koli.',
      'form.submit': 'Pridruži se',
      'form.sending': 'Prijavljam …',
      'form.success': 'Na seznamu si! Ko zaženemo i-Exchange, ti pišemo.',
      'form.duplicate': 'Na seznamu si že — kmalu se oglasimo!',
      'form.errEmail': 'Vnesi veljaven e-poštni naslov.',
      'form.errCity': 'Izberi svoje mesto.',
      'form.errConsent': 'Za prijavo označi soglasje, da te lahko obvestimo.',
      'form.errGeneric': 'Nekaj je šlo narobe. Poskusi znova čez trenutek.',

      'footer.launch': 'Kmalu v Sloveniji'
    }
  };

  /* ---------- Example listings (fictional) ---------- */
  const LISTINGS = [
    { icon: 'i-bike',       tone: 'tone-blue',  value: 100, city: 'Ljubljana',   meetup: true,  shipping: false, seller: 'Ana K.',   rating: 4.9, reviews: 23,
      title: { en: 'City bike, 28" wheels', sl: 'Mestno kolo, 28" kolesa' } },
    { icon: 'i-shirt',      tone: 'tone-peach', value: 15,  city: 'Maribor',     meetup: true,  shipping: true,  seller: 'Tilen P.', rating: 4.7, reviews: 9,
      title: { en: "Kids' winter jacket, size 116", sl: 'Otroška zimska bunda, vel. 116' } },
    { icon: 'i-wrench',     tone: 'tone-mint',  value: 40,  city: 'Celje',       meetup: false, shipping: true,  seller: 'Marko B.', rating: 5.0, reviews: 14,
      title: { en: 'Cordless drill with case', sl: 'Akumulatorski vrtalnik s kovčkom' } },
    { icon: 'i-book',       tone: 'tone-lilac', value: 25,  city: 'Koper',       meetup: true,  shipping: true,  seller: 'Nina Š.',  rating: 4.8, reviews: 31,
      title: { en: 'Box of 12 novels', sl: 'Škatla z 12 romani' } },
    { icon: 'i-headphones', tone: 'tone-blue',  value: 45,  city: 'Kranj',       meetup: false, shipping: true,  seller: 'Jure M.',  rating: 4.6, reviews: 7,
      title: { en: 'Wireless headphones', sl: 'Brezžične slušalke' } },
    { icon: 'i-plant',      tone: 'tone-gold',  value: 12,  city: 'Novo mesto',  meetup: true,  shipping: false, seller: 'Eva L.',   rating: 4.9, reviews: 18,
      title: { en: 'Ceramic plant pots (set of 3)', sl: 'Keramični cvetlični lonci (3 kosi)' } }
  ];

  // Same rule the server uses — a simple, practical email check.
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const API_URL = '/api/waitlist';
  const KEYS = { lang: 'ix-lang', theme: 'ix-theme' };

  const root = document.documentElement;

  /* ---------- Small helpers ---------- */

  // localStorage can throw (private mode, blocked storage), so wrap it.
  const store = {
    get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* ignore */ } }
  };

  let lang = pickInitialLanguage();

  function pickInitialLanguage() {
    const saved = store.get(KEYS.lang);
    if (saved === 'en' || saved === 'sl') return saved;
    return (navigator.language || '').toLowerCase().startsWith('sl') ? 'sl' : 'en';
  }

  // Look up a translation and fill in {placeholders}. Falls back to English.
  function t(key, vars) {
    let text = (translations[lang] && translations[lang][key]) || translations.en[key] || key;
    if (vars) {
      Object.keys(vars).forEach(function (name) {
        text = text.split('{' + name + '}').join(String(vars[name]));
      });
    }
    return text;
  }

  // Plural-aware lookup: picks key.one / key.two / key.few / key.other.
  function tPlural(baseKey, n, vars) {
    const category = new Intl.PluralRules(lang === 'sl' ? 'sl' : 'en').select(n);
    const table = translations[lang] || translations.en;
    const key = table[baseKey + '.' + category] ? baseKey + '.' + category : baseKey + '.other';
    return t(key, vars);
  }

  function formatNumber(n) {
    return n.toLocaleString(lang === 'sl' ? 'sl-SI' : 'en-GB');
  }

  // Create an <svg><use href="#id"></svg> icon from the sprite in index.html.
  function icon(id, extraClass) {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'icon' + (extraClass ? ' ' + extraClass : ''));
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(NS, 'use');
    use.setAttribute('href', '#' + id);
    svg.appendChild(use);
    return svg;
  }

  // Create an element with an optional class and text (always via textContent = safe).
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---------- Language ---------- */

  function applyLanguage() {
    root.lang = lang;
    document.title = t('meta.title');
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('meta.description'));

    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      node.textContent = t(node.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (node) {
      node.setAttribute('placeholder', t(node.getAttribute('data-i18n-placeholder')));
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (node) {
      node.setAttribute('aria-label', t(node.getAttribute('data-i18n-aria-label')));
    });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });

    renderListings();
    renderCount();
    renderFormMessage();
    setSubmitting(isSubmitting); // keep the button label in the right language
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      lang = btn.getAttribute('data-lang');
      store.set(KEYS.lang, lang);
      applyLanguage();
    });
  });

  /* ---------- Theme ---------- */
  // The <head> script already set data-theme before paint. Here we handle the
  // toggle and follow system changes until the visitor makes their own choice.

  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#0a1222' : '#ffffff');
  }
  setTheme(root.getAttribute('data-theme') || 'light');

  document.getElementById('theme-toggle').addEventListener('click', function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
    store.set(KEYS.theme, next);
  });

  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = function (e) {
      if (!store.get(KEYS.theme)) setTheme(e.matches ? 'dark' : 'light');
    };
    if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange); // older Safari
  }

  /* ---------- Example listings ---------- */

  const listingsGrid = document.getElementById('listings-grid');

  function renderListings() {
    listingsGrid.textContent = ''; // clear

    LISTINGS.forEach(function (item) {
      const card = el('article', 'listing');

      // Image placeholder with the token value on top
      const img = el('div', 'listing-img ' + item.tone);
      img.appendChild(icon(item.icon));
      const price = el('span', 'tok');
      price.appendChild(el('span', 'coin'));
      price.appendChild(document.createTextNode(formatNumber(item.value) + ' '));
      price.appendChild(el('small', null, tPlural('list.tokens', item.value)));
      img.appendChild(price);
      card.appendChild(img);

      const body = el('div', 'listing-body');
      body.appendChild(el('h3', 'listing-title', item.title[lang] || item.title.en));

      const city = el('p', 'listing-city');
      city.appendChild(icon('i-pin'));
      city.appendChild(document.createTextNode(item.city));
      body.appendChild(city);

      const tags = el('div', 'tags');
      if (item.meetup) {
        const tag = el('span', 'tag');
        tag.appendChild(icon('i-users'));
        tag.appendChild(document.createTextNode(t('list.meetup')));
        tags.appendChild(tag);
      }
      if (item.shipping) {
        const tag = el('span', 'tag tag-ship');
        tag.appendChild(icon('i-truck'));
        tag.appendChild(document.createTextNode(t('list.shipping')));
        tags.appendChild(tag);
      }
      body.appendChild(tags);

      // Seller: avatar initials, name, stars, verified badge
      const seller = el('div', 'seller');
      const initials = item.seller.split(' ').map(function (p) { return p.charAt(0); }).join('');
      seller.appendChild(el('span', 'avatar ' + item.tone, initials));

      const info = el('div', 'seller-info');
      info.appendChild(el('span', 'seller-name', item.seller));
      const stars = el('span', 'stars');
      stars.setAttribute('role', 'img');
      stars.setAttribute('aria-label', t('list.ratingAria', { rating: item.rating.toFixed(1), count: item.reviews }));
      const filled = Math.round(item.rating);
      for (let i = 0; i < 5; i++) stars.appendChild(icon('i-star', i < filled ? 'on' : ''));
      const num = el('span', 'rating-num', item.rating.toFixed(1));
      num.setAttribute('aria-hidden', 'true');
      stars.appendChild(num);
      const cnt = el('span', null, '(' + item.reviews + ')');
      cnt.setAttribute('aria-hidden', 'true');
      stars.appendChild(cnt);
      info.appendChild(stars);
      seller.appendChild(info);

      const badge = el('span', 'verified');
      badge.appendChild(icon('i-badge'));
      badge.appendChild(document.createTextNode(t('list.verified')));
      seller.appendChild(badge);
      body.appendChild(seller);

      // "Offer exchange" just takes you to the waitlist (it's a preview)
      const btn = el('a', 'btn btn-outline', t('list.offer'));
      btn.href = '#waitlist';
      btn.setAttribute('data-join', '');
      body.appendChild(btn);

      card.appendChild(body);
      listingsGrid.appendChild(card);
    });
  }

  /* ---------- Waitlist count ---------- */

  let waitlistCount = null;
  const countBox = document.getElementById('wl-count');
  const countText = document.getElementById('wl-count-text');

  function renderCount() {
    if (typeof waitlistCount !== 'number' || waitlistCount < 1) {
      countBox.hidden = true;
      return;
    }
    countText.textContent = tPlural('wl.count', waitlistCount, { n: formatNumber(waitlistCount) });
    countBox.hidden = false;
  }

  function loadCount() {
    fetch(API_URL, { headers: { Accept: 'application/json' } })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) {
        if (data && typeof data.count === 'number') {
          waitlistCount = data.count;
          renderCount();
        }
      })
      .catch(function () { /* API not reachable (e.g. opened as a file) — just hide the count */ });
  }

  /* ---------- Waitlist form ---------- */

  const form = document.getElementById('waitlist-form');
  const emailInput = document.getElementById('wl-email');
  const citySelect = document.getElementById('wl-city');
  const consentBox = document.getElementById('wl-consent');
  const honeypot = document.getElementById('wl-website');
  const submitBtn = document.getElementById('wl-submit');
  const submitText = document.getElementById('wl-submit-text');
  const msgBox = document.getElementById('wl-msg');

  let isSubmitting = false;
  let formMessage = null; // { type: 'success' | 'info' | 'error', key: 'form.xxx' }

  function renderFormMessage() {
    if (!formMessage) {
      msgBox.hidden = true;
      return;
    }
    msgBox.className = 'form-msg is-' + formMessage.type;
    msgBox.textContent = t(formMessage.key);
    msgBox.hidden = false;
  }

  function showMessage(type, key) {
    formMessage = { type: type, key: key };
    renderFormMessage();
  }

  function setSubmitting(on) {
    isSubmitting = on;
    submitBtn.disabled = on;
    submitText.textContent = t(on ? 'form.sending' : 'form.submit');
  }

  function markInvalid(field, invalid) {
    if (invalid) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
  }

  // Clear the red border as soon as the visitor fixes a field
  [emailInput, citySelect, consentBox].forEach(function (field) {
    field.addEventListener('input', function () { markInvalid(field, false); });
    field.addEventListener('change', function () { markInvalid(field, false); });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (isSubmitting) return;

    const email = emailInput.value.trim();
    const city = citySelect.value;

    // Client-side checks (the server checks again — never trust the browser)
    const emailOk = email.length <= 254 && EMAIL_RE.test(email);
    markInvalid(emailInput, !emailOk);
    markInvalid(citySelect, !city);
    markInvalid(consentBox, !consentBox.checked);

    if (!emailOk) { showMessage('error', 'form.errEmail'); emailInput.focus(); return; }
    if (!city) { showMessage('error', 'form.errCity'); citySelect.focus(); return; }
    if (!consentBox.checked) { showMessage('error', 'form.errConsent'); consentBox.focus(); return; }

    setSubmitting(true);
    formMessage = null;
    renderFormMessage();

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email: email,
        city: city,
        consent: true,
        website: honeypot.value // honeypot: should always be empty for real people
      })
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          return { ok: res.ok, data: data };
        });
      })
      .then(function (result) {
        const data = result.data || {};
        if (typeof data.count === 'number') {
          waitlistCount = data.count;
          renderCount();
        }
        if (result.ok && data.ok) {
          showMessage('success', 'form.success');
          form.reset();
        } else if (data.error === 'duplicate') {
          showMessage('info', 'form.duplicate');
        } else if (data.error === 'invalid_email') {
          markInvalid(emailInput, true);
          showMessage('error', 'form.errEmail');
        } else if (data.error === 'invalid_city') {
          markInvalid(citySelect, true);
          showMessage('error', 'form.errCity');
        } else if (data.error === 'consent_required') {
          markInvalid(consentBox, true);
          showMessage('error', 'form.errConsent');
        } else {
          showMessage('error', 'form.errGeneric');
        }
      })
      .catch(function () {
        showMessage('error', 'form.errGeneric');
      })
      .finally(function () {
        setSubmitting(false);
      });
  });

  /* ---------- "Join" buttons: jump to the form and focus the email field ---------- */
  document.addEventListener('click', function (event) {
    const link = event.target.closest('[data-join]');
    if (!link) return;
    // Let the browser smooth-scroll to #waitlist, then focus without a second jump.
    setTimeout(function () { emailInput.focus({ preventScroll: true }); }, 450);
  });

  /* ---------- Header border on scroll ---------- */
  const header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal-on-scroll ---------- */
  function setupReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (node) { node.classList.add('is-visible'); });
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (node) { observer.observe(node); });
  }

  /* ---------- Start ---------- */
  document.getElementById('year').textContent = String(new Date().getFullYear());
  applyLanguage();
  setupReveal();
  loadCount();
})();
