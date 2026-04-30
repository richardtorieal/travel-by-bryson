export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  content: {
    type: 'text' | 'heading' | 'list' | 'image';
    value: string | string[];
    alt?: string;
  }[];
}

export const TRAVEL_IDEAS: BlogPost[] = [
  {
    slug: '5-museums-in-london-for-families',
    title: '5 Museums in London for Families with Kids',
    excerpt: 'Interactive and educational spaces in London designed to engage children of all ages.',
    date: 'April 20, 2026',
    category: 'Family Travel',
    image: '/assets/london-museums-hero.webp',
    content: [
      { type: 'heading', value: 'Engaging the Next Generation of Travelers' },
      { type: 'text', value: 'London is such a fun city to visit with kids because it mixes big-time history with hands-on experiences that actually keep them engaged. With more than 200 museums across the city—many packed with interactive exhibits, play zones, and cool things to touch and try—there’s no shortage of ways to keep kids entertained.' },
      { type: 'image', value: '/assets/london-museums-interactive.jpg', alt: 'Children interacting with exhibits in a London museum' },
      { type: 'heading', value: '1. Tower of London' },
      { type: 'text', value: 'Step into a real castle and let your kids’ imaginations run wild as Beefeaters share dramatic tales of kings, queens, and daring escapes—and don’t miss the dazzling Crown Jewels.' },
      { type: 'heading', value: '2. Science Museum' },
      { type: 'text', value: 'This is hands-on fun at its best—from play zones and live science shows to interactive galleries where kids can experiment, explore, and discover, making science feel like play.' },
      { type: 'heading', value: '3. Natural History Museum' },
      { type: 'text', value: 'Roaring dinosaurs, immersive galleries, and interactive displays make this a favorite for families—perfect for curious kids who love fossils, creatures, and surprises around every corner.' },
      { type: 'heading', value: '4. London Transport Museum' },
      { type: 'text', value: 'Little explorers get to climb aboard real buses and trains, try out a Tube simulator, and uncover the story of London’s transport—a playful and tactile experience that feels more like a playground than a museum.' },
      { type: 'heading', value: '5. Young V&A' },
      { type: 'text', value: 'Designed especially with children in mind, this museum sparks creativity with hands-on design exhibits, dress-up fun, and imaginative play spaces that grow with your kids’ interests.' },
      { type: 'heading', value: 'Refueling Between Museums' },
      { type: 'text', value: 'Exploring museums can work up quite an appetite. For a quintessentially London experience, head to Borough Market. It’s a buzzing, can’t-miss food market where you can snack your way through everything from fresh pastries and cheese to incredible street food from around the world—perfect for a casual family lunch.' },
      { type: 'image', value: '/assets/london-borough-market.jpg', alt: 'The vibrant atmosphere of Borough Market in London' }
    ]
  }
];
