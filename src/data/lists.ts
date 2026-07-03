export const listsByCategory: Record<
  string,
  { name: string; icon: string; products: number; isFavorite: boolean }[]
> = {
  Lebensmittel: [
    { name: 'REWE', icon: '🛒', products: 5, isFavorite: false },
    { name: 'EDEKA', icon: '🛒', products: 5, isFavorite: false },
    { name: 'Kaufland', icon: '🛒', products: 6, isFavorite: false },
    { name: 'Obst', icon: '🍎', products: 4, isFavorite: false },
    { name: 'Getränke', icon: '🥤', products: 4, isFavorite: false },
  ],

  Bücher: [
    { name: 'Uni Bücher', icon: '📚', products: 5, isFavorite: false },
    { name: 'Romane', icon: '📖', products: 6, isFavorite: false },
    { name: 'Wishlist', icon: '⭐', products: 4, isFavorite: false },
  ],

  'Make-up': [
    { name: 'Douglas', icon: '💄', products: 5, isFavorite: false },
    { name: 'DM Beauty', icon: '🧴', products: 4, isFavorite: false },
    { name: 'Sephora', icon: '✨', products: 5, isFavorite: false },
    { name: 'Skincare', icon: '🫧', products: 6, isFavorite: false },
  ],

  Klamotten: [
    { name: 'Sommer', icon: '☀️', products: 6, isFavorite: false },
    { name: 'Winter', icon: '❄️', products: 5,isFavorite: false },
    { name: 'Zara', icon: '👗', products: 4, isFavorite: false },
    { name: 'H&M', icon: '👕', products: 5, isFavorite: false },
    { name: 'Sport', icon: '🏃', products: 4, isFavorite: false },
    { name: 'Urlaub', icon: '🏖️', products: 4, isFavorite: false },
  ],

  Schuhe: [
    { name: 'Sneaker', icon: '👟', products: 5, isFavorite: false },
    { name: 'High Heels', icon: '👠', products: 4, isFavorite: false },
  ],

  Drogerie: [
    { name: 'DM', icon: '🧴', products: 5, isFavorite: false },
    { name: 'Rossmann', icon: '🧼', products: 4, isFavorite: false },
    { name: 'Pflege', icon: '🧴', products: 4, isFavorite: false },
    { name: 'Haare', icon: '💇', products: 5, isFavorite: false },
    { name: 'Parfum', icon: '🌸', products: 4, isFavorite: false },
  ],

  Haushalt: [
    { name: 'Küche', icon: '🍽️', products: 5, isFavorite: false },
    { name: 'Bad', icon: '🛁', products: 4, isFavorite: false },
    { name: 'Wohnzimmer', icon: '🛋️', products: 4, isFavorite: false },
    { name: 'Schlafzimmer', icon: '🛏️', products: 4, isFavorite: false },
  ],

  Geschenke: [
    { name: 'Geburtstag', icon: '🎂', products: 5, isFavorite: false },
    { name: 'Weihnachten', icon: '🎄', products: 6, isFavorite: false },
    { name: 'Hochzeit', icon: '💍', products: 4, isFavorite: false },
  ],
}
