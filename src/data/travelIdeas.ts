export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content: {
    type: 'text' | 'heading' | 'list';
    value: string | string[];
  }[];
}

export const TRAVEL_IDEAS: BlogPost[] = [
  {
    slug: '5-museums-in-london-for-families',
    title: '5 Museums in London for Families with Kids',
    excerpt: 'Interactive and educational spaces in London designed to engage children of all ages.',
    date: 'April 20, 2026',
    category: 'Family Travel',
    content: [
      { type: 'heading', value: 'Engaging the Next Generation of Travelers' },
      { type: 'text', value: 'London is a treasure trove of culture, but for families, the key is finding spaces that allow for tactile exploration and imaginative play.' },
      { type: 'heading', value: '1. Young V&A (Bethnal Green)' },
      { type: 'text', value: 'Formerly the Museum of Childhood, this newly reimagined space focuses on creativity. It features hands-on design exhibits, dress-up areas, and imaginative play spaces that are perfect for toddlers and older children alike.' },
      { type: 'heading', value: '2. Science Museum (South Kensington)' },
      { type: 'text', value: 'The Science Museum features interactive galleries, live science shows, and specialized play zones where kids can experiment and explore. The "Wonderlab" is a must-see for budding scientists.' },
      { type: 'heading', value: '3. Natural History Museum' },
      { type: 'text', value: 'Famous for its dinosaur skeletons, this museum offers immersive galleries and interactive displays focused on fossils and the natural world. Pro tip: Book your timed entry well in advance.' },
      { type: 'heading', value: '4. London Transport Museum' },
      { type: 'text', value: 'A tactile experience where children can climb on real buses and trains, use a Tube simulator, and explore the history of London’s iconic red transit system.' },
      { type: 'heading', value: '5. The British Museum' },
      { type: 'text', value: 'While it might seem daunting, the British Museum offers excellent family trails and "Mummy" exhibits that never fail to fascinate older children.' }
    ]
  }
];
