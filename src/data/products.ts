export type Product = {
  article: string
  category: string
  quantity: string
  price: string
  priority: string
  status: string
}

export const productsByList: Record<string, Product[]> = {
    'Lebensmittel-REWE': [
      {
        article: 'Milch',
        category: 'Milchprodukte',
        quantity: '2 Stück',
        price: '1,79 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Tomaten',
        category: 'Gemüse',
        quantity: '1,5 kg',
        price: '3,99 €/kg',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Brot',
        category: 'Backwaren',
        quantity: '1 Stück',
        price: '2,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Bananen',
        category: 'Obst',
        quantity: '2 kg',
        price: '1,99 €/kg',
        priority: 'Mittel',
        status: 'Gekauft'
      },
      {
        article: 'Eier',
        category: 'Lebensmittel',
        quantity: '10 Stück',
        price: '3,29 €',
        priority: 'Hoch',
        status: 'Offen'
      },
    ],
    'Lebensmittel-EDEKA': [
      {
        article: 'Käse',
        category: 'Milchprodukte',
        quantity: '2 Packungen',
        price: '4,99 €/Pkg',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Gurken',
        category: 'Gemüse',
        quantity: '2 Stück',
        price: '0,99 €/Stk',
        priority: 'Niedrig',
        status: 'Gekauft'
      },
      {
        article: 'Paprika',
        category: 'Gemüse',
        quantity: '1 kg',
        price: '4,49 €/kg',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Butter',
        category: 'Milchprodukte',
        quantity: '1 Stück',
        price: '2,49 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Nudeln',
        category: 'Vorräte',
        quantity: '2 Packungen',
        price: '1,19 €/Pkg',
        priority: 'Hoch',
        status: 'Offen'
      },
    ],
    'Lebensmittel-Kaufland': [
      {
        article: 'Reis',
        category: 'Vorräte',
        quantity: '2 Packungen',
        price: '3,49 €/Pkg',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Öl',
        category: 'Vorräte',
        quantity: '1 Liter',
        price: '4,29 €/L',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Kartoffeln',
        category: 'Gemüse',
        quantity: '2 kg',
        price: '1,79 €/kg',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Hähnchen',
        category: 'Fleisch',
        quantity: '1 kg',
        price: '8,99 €/kg',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Joghurt',
        category: 'Milchprodukte',
        quantity: '4 Stück',
        price: '0,89 €/Stk',
        priority: 'Niedrig',
        status: 'Gekauft'
      },
      {
        article: 'Wasser',
        category: 'Getränke',
        quantity: '6 Flaschen',
        price: '0,69 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
    ],
    'Lebensmittel-Obst': [
      {
        article: 'Äpfel',
        category: 'Obst',
        quantity: '2 kg',
        price: '2,99 €/kg',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Erdbeeren',
        category: 'Obst',
        quantity: '500 g',
        price: '4,49 €/Schale',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Trauben',
        category: 'Obst',
        quantity: '1 kg',
        price: '3,99 €/kg',
        priority: 'Niedrig',
        status: 'Gekauft'
      },
      {
        article: 'Orangen',
        category: 'Obst',
        quantity: '1,5 kg',
        price: '2,49 €/kg',
        priority: 'Mittel',
        status: 'Offen'
      },
    ],
    'Lebensmittel-Getränke': [
      {
        article: 'Wasser',
        category: 'Getränke',
        quantity: '12 Flaschen',
        price: '0,69 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Cola',
        category: 'Getränke',
        quantity: '4 Flaschen',
        price: '1,29 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
      {
        article: 'Orangensaft',
        category: 'Getränke',
        quantity: '2 Liter',
        price: '1,99 €/L',
        priority: 'Mittel',
        status: 'Gekauft'
      },
      {
        article: 'Eistee',
        category: 'Getränke',
        quantity: '3 Flaschen',
        price: '1,49 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
    ],

    'Bücher-Uni Bücher': [
      {
        article: 'Wirtschaftsinformatik',
        category: 'Uni',
        quantity: '1 Stück',
        price: '29,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Java Grundlagen',
        category: 'Informatik',
        quantity: '1 Stück',
        price: '34,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'BWL Einführung',
        category: 'Uni',
        quantity: '1 Stück',
        price: '24,99 €/Stk',
        priority: 'Mittel',
        status: 'Gekauft'
      },
      {
        article: 'Mathematik Skript',
        category: 'Uni',
        quantity: '1 Stück',
        price: '12,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Projektmanagement',
        category: 'Uni',
        quantity: '1 Stück',
        price: '19,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
    ],
    'Bücher-Romane': [
      {
        article: 'Liebesroman',
        category: 'Roman',
        quantity: '1 Stück',
        price: '14,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Krimi',
        category: 'Roman',
        quantity: '1 Stück',
        price: '12,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Fantasy Buch',
        category: 'Roman',
        quantity: '1 Stück',
        price: '16,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Drama',
        category: 'Roman',
        quantity: '1 Stück',
        price: '10,99 €/Stk',
        priority: 'Niedrig',
        status: 'Gekauft'
      },
      {
        article: 'Thriller',
        category: 'Roman',
        quantity: '1 Stück',
        price: '13,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Klassiker',
        category: 'Roman',
        quantity: '1 Stück',
        price: '9,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
    ],
    'Bücher-Wishlist': [
      {
        article: 'Notizbuch',
        category: 'Wunschliste',
        quantity: '1 Stück',
        price: '7,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
      {
        article: 'Kalender',
        category: 'Wunschliste',
        quantity: '1 Stück',
        price: '12,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Study Planner',
        category: 'Wunschliste',
        quantity: '1 Stück',
        price: '15,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Lesezeichen Set',
        category: 'Wunschliste',
        quantity: '1 Set',
        price: '4,99 €/Set',
        priority: 'Niedrig',
        status: 'Gekauft'
      },
    ],

    'Make-up-Douglas': [
      {
        article: 'Foundation',
        category: 'Teint',
        quantity: '1 Stück',
        price: '39,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Concealer',
        category: 'Teint',
        quantity: '1 Stück',
        price: '19,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Lipgloss',
        category: 'Lippen',
        quantity: '2 Stück',
        price: '12,99 €/Stk',
        priority: 'Mittel',
        status: 'Gekauft'
      },
      {
        article: 'Mascara',
        category: 'Augen',
        quantity: '1 Stück',
        price: '16,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Puder',
        category: 'Teint',
        quantity: '1 Stück',
        price: '24,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
    ],
    'Make-up-DM Beauty': [
      {
        article: 'Augenbrauengel',
        category: 'Augen',
        quantity: '1 Stück',
        price: '3,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Lipliner',
        category: 'Lippen',
        quantity: '2 Stück',
        price: '2,49 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
      {
        article: 'Make-up Schwamm',
        category: 'Zubehör',
        quantity: '1 Stück',
        price: '4,99 €/Stk',
        priority: 'Mittel',
        status: 'Gekauft'
      },
      {
        article: 'Fixing Spray',
        category: 'Finish',
        quantity: '1 Stück',
        price: '5,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
    ],
    'Make-up-Sephora': [
      {
        article: 'Highlighter',
        category: 'Teint',
        quantity: '1 Stück',
        price: '29,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Bronzer',
        category: 'Teint',
        quantity: '1 Stück',
        price: '31,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Eyeshadow Palette',
        category: 'Augen',
        quantity: '1 Stück',
        price: '44,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Blush',
        category: 'Teint',
        quantity: '1 Stück',
        price: '25,99 €/Stk',
        priority: 'Mittel',
        status: 'Gekauft'
      },
      {
        article: 'Setting Powder',
        category: 'Teint',
        quantity: '1 Stück',
        price: '27,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
    ],
    'Make-up-Skincare': [
      {
        article: 'Cleanser',
        category: 'Pflege',
        quantity: '1 Stück',
        price: '9,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Serum',
        category: 'Pflege',
        quantity: '1 Stück',
        price: '14,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Feuchtigkeitscreme',
        category: 'Pflege',
        quantity: '1 Stück',
        price: '12,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Sonnencreme',
        category: 'Pflege',
        quantity: '1 Stück',
        price: '11,99 €/Stk',
        priority: 'Hoch',
        status: 'Gekauft'
      },
      {
        article: 'Toner',
        category: 'Pflege',
        quantity: '1 Stück',
        price: '8,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
      {
        article: 'Maske',
        category: 'Pflege',
        quantity: '3 Stück',
        price: '2,49 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
    ],

    'Klamotten-Sommer': [
      {
        article: 'Kleid',
        category: 'Sommer',
        quantity: '1 Stück',
        price: '29,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Shorts',
        category: 'Sommer',
        quantity: '2 Stück',
        price: '19,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Top',
        category: 'Sommer',
        quantity: '3 Stück',
        price: '9,99 €/Stk',
        priority: 'Mittel',
        status: 'Gekauft'
      },
      {
        article: 'Sonnenhut',
        category: 'Accessoire',
        quantity: '1 Stück',
        price: '14,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
      {
        article: 'Bikini',
        category: 'Sommer',
        quantity: '1 Set',
        price: '24,99 €/Set',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Leinenhose',
        category: 'Sommer',
        quantity: '1 Stück',
        price: '34,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
    ],
    'Klamotten-Winter': [
      {
        article: 'Mantel',
        category: 'Winter',
        quantity: '1 Stück',
        price: '89,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Schal',
        category: 'Accessoire',
        quantity: '1 Stück',
        price: '12,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Pullover',
        category: 'Winter',
        quantity: '2 Stück',
        price: '24,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Handschuhe',
        category: 'Accessoire',
        quantity: '1 Paar',
        price: '9,99 €/Paar',
        priority: 'Niedrig',
        status: 'Gekauft'
      },
      {
        article: 'Thermoleggings',
        category: 'Winter',
        quantity: '1 Stück',
        price: '17,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
    ],
    'Klamotten-Zara': [
      {
        article: 'Blazer',
        category: 'Oberteil',
        quantity: '1 Stück',
        price: '49,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Jeans',
        category: 'Hose',
        quantity: '1 Stück',
        price: '39,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Bluse',
        category: 'Oberteil',
        quantity: '1 Stück',
        price: '29,99 €/Stk',
        priority: 'Niedrig',
        status: 'Gekauft'
      },
      {
        article: 'Rock',
        category: 'Unterteil',
        quantity: '1 Stück',
        price: '25,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
    ],
    'Klamotten-H&M': [
      {
        article: 'Basic Shirt',
        category: 'Oberteil',
        quantity: '3 Stück',
        price: '7,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Jogginghose',
        category: 'Hose',
        quantity: '1 Stück',
        price: '24,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Cardigan',
        category: 'Oberteil',
        quantity: '1 Stück',
        price: '19,99 €/Stk',
        priority: 'Mittel',
        status: 'Gekauft'
      },
      {
        article: 'Socken',
        category: 'Basics',
        quantity: '1 Packung',
        price: '6,99 €/Pkg',
        priority: 'Niedrig',
        status: 'Offen'
      },
      {
        article: 'Leggings',
        category: 'Hose',
        quantity: '1 Stück',
        price: '14,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
    ],
    'Klamotten-Sport': [
      {
        article: 'Sport-BH',
        category: 'Sport',
        quantity: '1 Stück',
        price: '24,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Trainingshose',
        category: 'Sport',
        quantity: '1 Stück',
        price: '29,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Sportshirt',
        category: 'Sport',
        quantity: '2 Stück',
        price: '14,99 €/Stk',
        priority: 'Mittel',
        status: 'Gekauft'
      },
      {
        article: 'Gym Tasche',
        category: 'Sport',
        quantity: '1 Stück',
        price: '19,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
    ],
    'Klamotten-Urlaub': [
      {
        article: 'Strandkleid',
        category: 'Urlaub',
        quantity: '1 Stück',
        price: '22,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Badeanzug',
        category: 'Urlaub',
        quantity: '1 Stück',
        price: '27,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Sonnenbrille',
        category: 'Accessoire',
        quantity: '1 Stück',
        price: '15,99 €/Stk',
        priority: 'Mittel',
        status: 'Gekauft'
      },
      {
        article: 'Strandtuch',
        category: 'Urlaub',
        quantity: '1 Stück',
        price: '12,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
    ],

    'Schuhe-Sneaker': [
      {
        article: 'Weiße Sneaker',
        category: 'Sneaker',
        quantity: '1 Paar',
        price: '89,99 €/Paar',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Laufschuhe',
        category: 'Sport',
        quantity: '1 Paar',
        price: '79,99 €/Paar',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Plateau Sneaker',
        category: 'Sneaker',
        quantity: '1 Paar',
        price: '59,99 €/Paar',
        priority: 'Mittel',
        status: 'Gekauft'
      },
      {
        article: 'Schuhreiniger',
        category: 'Pflege',
        quantity: '1 Stück',
        price: '8,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
      {
        article: 'Einlegesohlen',
        category: 'Zubehör',
        quantity: '1 Paar',
        price: '6,99 €/Paar',
        priority: 'Niedrig',
        status: 'Offen'
      },
    ],
    'Schuhe-High Heels': [
      {
        article: 'Schwarze Heels',
        category: 'High Heels',
        quantity: '1 Paar',
        price: '49,99 €/Paar',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Nude Heels',
        category: 'High Heels',
        quantity: '1 Paar',
        price: '44,99 €/Paar',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Gel-Einlagen',
        category: 'Zubehör',
        quantity: '1 Paar',
        price: '5,99 €/Paar',
        priority: 'Niedrig',
        status: 'Gekauft'
      },
      {
        article: 'Schutzspray',
        category: 'Pflege',
        quantity: '1 Stück',
        price: '7,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
    ],

    'Drogerie-DM': [
      {
        article: 'Shampoo',
        category: 'Haare',
        quantity: '2 Stück',
        price: '3,49 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Zahnpasta',
        category: 'Pflege',
        quantity: '1 Stück',
        price: '1,99 €/Stk',
        priority: 'Hoch',
        status: 'Gekauft'
      },
      {
        article: 'Duschgel',
        category: 'Pflege',
        quantity: '2 Stück',
        price: '2,49 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Deo',
        category: 'Pflege',
        quantity: '1 Stück',
        price: '1,79 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
      {
        article: 'Wattepads',
        category: 'Beauty',
        quantity: '1 Packung',
        price: '1,29 €/Pkg',
        priority: 'Niedrig',
        status: 'Offen'
      },
    ],
    'Drogerie-Rossmann': [
      {
        article: 'Handcreme',
        category: 'Pflege',
        quantity: '1 Stück',
        price: '2,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Haarkur',
        category: 'Haare',
        quantity: '1 Stück',
        price: '4,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Rasierer',
        category: 'Pflege',
        quantity: '1 Packung',
        price: '5,49 €/Pkg',
        priority: 'Mittel',
        status: 'Gekauft'
      },
      {
        article: 'Mundspülung',
        category: 'Pflege',
        quantity: '1 Stück',
        price: '2,29 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
    ],
    'Drogerie-Pflege': [
      {
        article: 'Bodylotion',
        category: 'Pflege',
        quantity: '1 Stück',
        price: '4,49 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Peeling',
        category: 'Pflege',
        quantity: '1 Stück',
        price: '5,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
      {
        article: 'Gesichtscreme',
        category: 'Pflege',
        quantity: '1 Stück',
        price: '7,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Lippenpflege',
        category: 'Pflege',
        quantity: '2 Stück',
        price: '1,99 €/Stk',
        priority: 'Niedrig',
        status: 'Gekauft'
      },
    ],
    'Drogerie-Haare': [
      {
        article: 'Conditioner',
        category: 'Haare',
        quantity: '1 Stück',
        price: '3,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Haaröl',
        category: 'Haare',
        quantity: '1 Stück',
        price: '6,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Haarspray',
        category: 'Haare',
        quantity: '1 Stück',
        price: '2,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
      {
        article: 'Trockenshampoo',
        category: 'Haare',
        quantity: '1 Stück',
        price: '3,49 €/Stk',
        priority: 'Mittel',
        status: 'Gekauft'
      },
      {
        article: 'Haarmaske',
        category: 'Haare',
        quantity: '1 Stück',
        price: '5,49 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
    ],
    'Drogerie-Parfum': [
      {
        article: 'Alltagsduft',
        category: 'Parfum',
        quantity: '1 Stück',
        price: '24,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Abendduft',
        category: 'Parfum',
        quantity: '1 Stück',
        price: '39,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Bodyspray',
        category: 'Parfum',
        quantity: '1 Stück',
        price: '6,99 €/Stk',
        priority: 'Niedrig',
        status: 'Gekauft'
      },
      {
        article: 'Mini Parfum',
        category: 'Parfum',
        quantity: '1 Stück',
        price: '9,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
    ],

    'Haushalt-Küche': [
      {
        article: 'Spülmittel',
        category: 'Küche',
        quantity: '1 Stück',
        price: '2,49 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Müllbeutel',
        category: 'Küche',
        quantity: '1 Rolle',
        price: '3,99 €/Rolle',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Schwämme',
        category: 'Küche',
        quantity: '1 Packung',
        price: '1,99 €/Pkg',
        priority: 'Niedrig',
        status: 'Gekauft'
      },
      {
        article: 'Backpapier',
        category: 'Küche',
        quantity: '1 Rolle',
        price: '1,49 €/Rolle',
        priority: 'Niedrig',
        status: 'Offen'
      },
      {
        article: 'Alufolie',
        category: 'Küche',
        quantity: '1 Rolle',
        price: '2,29 €/Rolle',
        priority: 'Mittel',
        status: 'Offen'
      },
    ],
    'Haushalt-Bad': [
      {
        article: 'WC-Reiniger',
        category: 'Bad',
        quantity: '1 Stück',
        price: '2,49 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Handseife',
        category: 'Bad',
        quantity: '2 Stück',
        price: '1,29 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Toilettenpapier',
        category: 'Bad',
        quantity: '1 Packung',
        price: '4,99 €/Pkg',
        priority: 'Hoch',
        status: 'Gekauft'
      },
      {
        article: 'Badreiniger',
        category: 'Bad',
        quantity: '1 Stück',
        price: '2,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
    ],
    'Haushalt-Wohnzimmer': [
      {
        article: 'Kerzen',
        category: 'Deko',
        quantity: '3 Stück',
        price: '2,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
      {
        article: 'Batterien',
        category: 'Technik',
        quantity: '1 Packung',
        price: '4,49 €/Pkg',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Raumspray',
        category: 'Deko',
        quantity: '1 Stück',
        price: '3,99 €/Stk',
        priority: 'Niedrig',
        status: 'Gekauft'
      },
      {
        article: 'Servietten',
        category: 'Deko',
        quantity: '1 Packung',
        price: '2,49 €/Pkg',
        priority: 'Niedrig',
        status: 'Offen'
      },
    ],
    'Haushalt-Schlafzimmer': [
      {
        article: 'Bettwäsche',
        category: 'Schlafzimmer',
        quantity: '1 Set',
        price: '29,99 €/Set',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Kleiderbügel',
        category: 'Schlafzimmer',
        quantity: '1 Packung',
        price: '5,99 €/Pkg',
        priority: 'Niedrig',
        status: 'Offen'
      },
      {
        article: 'Duftkerze',
        category: 'Deko',
        quantity: '1 Stück',
        price: '6,99 €/Stk',
        priority: 'Niedrig',
        status: 'Gekauft'
      },
      {
        article: 'Kissenbezug',
        category: 'Schlafzimmer',
        quantity: '2 Stück',
        price: '7,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
    ],

    'Geschenke-Geburtstag': [
      {
        article: 'Parfum',
        category: 'Beauty',
        quantity: '1 Stück',
        price: '59,99 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Blumen',
        category: 'Deko',
        quantity: '1 Strauß',
        price: '19,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Karte',
        category: 'Papier',
        quantity: '1 Stück',
        price: '2,99 €/Stk',
        priority: 'Niedrig',
        status: 'Gekauft'
      },
      {
        article: 'Schokolade',
        category: 'Süßes',
        quantity: '1 Packung',
        price: '6,99 €/Pkg',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Geschenktüte',
        category: 'Verpackung',
        quantity: '1 Stück',
        price: '1,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
    ],
    'Geschenke-Weihnachten': [
      {
        article: 'Duftset',
        category: 'Beauty',
        quantity: '1 Set',
        price: '24,99 €/Set',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Kerzenset',
        category: 'Deko',
        quantity: '1 Set',
        price: '14,99 €/Set',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Geschenkpapier',
        category: 'Verpackung',
        quantity: '2 Rollen',
        price: '2,99 €/Rolle',
        priority: 'Hoch',
        status: 'Gekauft'
      },
      {
        article: 'Pralinen',
        category: 'Süßes',
        quantity: '2 Packungen',
        price: '7,99 €/Pkg',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Schmuckbox',
        category: 'Accessoire',
        quantity: '1 Stück',
        price: '19,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
      {
        article: 'Weihnachtskarte',
        category: 'Papier',
        quantity: '3 Stück',
        price: '1,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      },
    ],
    'Geschenke-Hochzeit': [
      {
        article: 'Gutschein',
        category: 'Geschenk',
        quantity: '1 Stück',
        price: '50,00 €/Stk',
        priority: 'Hoch',
        status: 'Offen'
      },
      {
        article: 'Blumenstrauß',
        category: 'Deko',
        quantity: '1 Strauß',
        price: '29,99 €/Stk',
        priority: 'Mittel',
        status: 'Offen'
      },
      {
        article: 'Glückwunschkarte',
        category: 'Papier',
        quantity: '1 Stück',
        price: '3,99 €/Stk',
        priority: 'Niedrig',
        status: 'Gekauft'
      },
      {
        article: 'Geschenkbox',
        category: 'Verpackung',
        quantity: '1 Stück',
        price: '6,99 €/Stk',
        priority: 'Niedrig',
        status: 'Offen'
      }
  ],

  'WG Einkauf': [
  { article: 'Milch', category: 'Milchprodukte', quantity: '2 Stück', price: '1,79 €/Stk', priority: 'Mittel', status: 'Offen' },
  { article: 'Toast', category: 'Backwaren', quantity: '1 Packung', price: '2,29 €/Pkg', priority: 'Hoch', status: 'Offen' },
  { article: 'Käse', category: 'Milchprodukte', quantity: '1 Packung', price: '3,49 €/Pkg', priority: 'Mittel', status: 'Offen' },
  { article: 'Cola', category: 'Getränke', quantity: '2 Flaschen', price: '1,29 €/Stk', priority: 'Niedrig', status: 'Offen' },
  { article: 'Eier', category: 'Lebensmittel', quantity: '10 Stück', price: '3,29 €', priority: 'Mittel', status: 'Gekauft' },
],

  Geburtstag: [
  { article: 'Kuchen', category: 'Party', quantity: '1 Stück', price: '25,00 €/Stk', priority: 'Hoch', status: 'Offen' },
  { article: 'Kerzen', category: 'Dekoration', quantity: '10 Stück', price: '0,30 €/Stk', priority: 'Mittel', status: 'Offen' },
  { article: 'Luftballons', category: 'Dekoration', quantity: '20 Stück', price: '0,25 €/Stk', priority: 'Niedrig', status: 'Offen' },
  { article: 'Geschenkpapier', category: 'Verpackung', quantity: '2 Rollen', price: '2,99 €/Rolle', priority: 'Niedrig', status: 'Gekauft' },
],

  Urlaub: [
  { article: 'Sonnencreme', category: 'Drogerie', quantity: '2 Stück', price: '11,99 €/Stk', priority: 'Hoch', status: 'Offen' },
  { article: 'Ladegerät', category: 'Technik', quantity: '1 Stück', price: '19,99 €/Stk', priority: 'Hoch', status: 'Offen' },
  { article: 'Reisepass', category: 'Dokumente', quantity: '1 Stück', price: '0,00 €', priority: 'Hoch', status: 'Gekauft' },
  { article: 'Badesachen', category: 'Kleidung', quantity: '3 Stück', price: '0,00 €', priority: 'Mittel', status: 'Gekauft' },
  { article: 'Powerbank', category: 'Technik', quantity: '1 Stück', price: '24,99 €/Stk', priority: 'Mittel', status: 'Offen' },
  { article: 'Handtücher', category: 'Haushalt', quantity: '2 Stück', price: '7,99 €/Stk', priority: 'Niedrig', status: 'Offen' },
],
}
