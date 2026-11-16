export interface FlowerNote {
  id: string;
  name: string;
  meaning: string;
  message: string;
  accentColor: string;
}

export const FLOWER_NOTES: FlowerNote[] = [
  {
    id: 'crimson-rose',
    name: 'Velvet Heart Rose',
    meaning: 'My Forever Love',
    message:
      'Every morning I wake up grateful that I get to love you and call you my husband, Sowami. You are my favourite part of every single day.',
    accentColor: '#C84B66',
  },
  {
    id: 'pink-rose',
    name: 'Blush Garden Rose',
    meaning: 'My Best Friend',
    message:
      'Thank you for every inside joke, every late-night laugh, and for being the one person I can tell absolutely everything to.',
    accentColor: '#DF7A92',
  },
  {
    id: 'sunflower',
    name: 'Golden Sunflower',
    meaning: 'My Sunshine & Joy',
    message:
      'Your smile lights up my whole world. Even on the hardest days, just being near you brings warmth and peace back into my heart.',
    accentColor: '#D99326',
  },
  {
    id: 'lavender-tulip',
    name: 'Lavender Tulip',
    meaning: 'My Safe Place',
    message:
      'With you, I never have to pretend. Your arms are my calmest shelter, my comfort, and the home I always want to come back to.',
    accentColor: '#8E74B8',
  },
  {
    id: 'peach-lily',
    name: 'Peach Blossom Lily',
    meaning: 'My Favourite Adventure',
    message:
      'Whether we are exploring somewhere new or simply grabbing coffee on a quiet Sunday, every moment feels like an adventure with you.',
    accentColor: '#D9826C',
  },
  {
    id: 'babys-breath',
    name: "Baby's Breath & Greenery",
    meaning: 'Our Little Moments',
    message:
      'Here is to all the small, quiet, everyday miracles we share—gentle hugs in the kitchen, held hands, and growing older side by side.',
    accentColor: '#5B7F5E',
  },
];

export const BIRTHDAY_MESSAGE_PARAGRAPHS: string[] = [
  'Happy Birthday to the most special person in my life, Sowami!',
  'You are more than my husband. You are my best friend, my biggest supporter, my favourite adventure partner, and the person who makes even ordinary days feel magical.',
  'Thank you for being my safe place, my happiness, and my forever person.',
  'I wish you endless happiness, success, good health, and beautiful moments.',
  'No matter where life takes us, I will always choose you.',
  'I love you, Sowami — my best friend, my husband, my forever love. ❤️',
];

export const LOVE_LETTER_CONTENT = {
  greeting: 'Dearest Sowami, My Husband & Best Friend,',
  paragraphs: [
    'On your birthday, I wanted to give you something that captures even a fraction of how much you mean to me—so I gathered your favourite blooms into a bouquet that will never fade.',
    'Thank you for the way you listen, the way you make me laugh until my cheeks hurt, and the quiet strength and kindness you show every single day. Being married to my best friend is the greatest gift life has ever given me.',
    'No matter how many birthdays we celebrate together, Sowami, I promise to always cheer the loudest for your dreams, hold your hand through every season, and love you deeper each year.',
  ],
  closing: 'Yours always and forever,',
  signature: 'Your Wife & Forever Best Friend ❤️',
};
