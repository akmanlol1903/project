import { Game, Review } from '@/types';

export const mockGames: Game[] = [
  {
    id: '1',
    title: 'Cyber Quest 2077',
    description: 'An epic cyberpunk adventure set in the year 2077. Navigate through a dystopian world filled with advanced technology and dangerous enemies.',
    imageUrl: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
    downloadUrl: '#',
    genre: 'RPG',
    rating: 4.8,
    reviewCount: 1247,
    size: '45.2 GB',
    version: '1.5.2',
    releaseDate: '2024-01-15',
    developer: 'Future Games Studio',
    tags: ['Cyberpunk', 'Open World', 'Action'],
    featured: true
  },
  {
    id: '2',
    title: 'Space Explorer',
    description: 'Embark on an interstellar journey to discover new planets and civilizations in this space exploration game.',
    imageUrl: 'https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=800',
    downloadUrl: '#',
    genre: 'Adventure',
    rating: 4.6,
    reviewCount: 892,
    size: '32.1 GB',
    version: '2.1.0',
    releaseDate: '2024-02-20',
    developer: 'Cosmic Studios',
    tags: ['Space', 'Exploration', 'Sci-Fi'],
    featured: true
  },
  {
    id: '3',
    title: 'Medieval Legends',
    description: 'Build your kingdom and lead your army to victory in this medieval strategy game.',
    imageUrl: 'https://images.pexels.com/photos/161401/castle-on-the-hill-161401.jpeg?auto=compress&cs=tinysrgb&w=800',
    downloadUrl: '#',
    genre: 'Strategy',
    rating: 4.4,
    reviewCount: 654,
    size: '28.7 GB',
    version: '1.8.3',
    releaseDate: '2024-03-10',
    developer: 'Kingdom Games',
    tags: ['Medieval', 'Strategy', 'Empire'],
    featured: false
  },
  {
    id: '4',
    title: 'Racing Thunder',
    description: 'Experience high-speed racing with stunning graphics and realistic physics.',
    imageUrl: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
    downloadUrl: '#',
    genre: 'Racing',
    rating: 4.7,
    reviewCount: 1103,
    size: '38.9 GB',
    version: '3.2.1',
    releaseDate: '2024-01-25',
    developer: 'Speed Demon Studios',
    tags: ['Racing', 'Sports', 'Simulation'],
    featured: true
  },
  {
    id: '5',
    title: 'Horror Mansion',
    description: 'Survive the night in this terrifying horror game filled with supernatural mysteries.',
    imageUrl: 'https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg?auto=compress&cs=tinysrgb&w=800',
    downloadUrl: '#',
    genre: 'Horror',
    rating: 4.3,
    reviewCount: 567,
    size: '22.4 GB',
    version: '1.3.7',
    releaseDate: '2024-02-14',
    developer: 'Nightmare Studios',
    tags: ['Horror', 'Survival', 'Mystery'],
    featured: false
  },
  {
    id: '6',
    title: 'Fantasy Realm',
    description: 'Explore magical worlds and cast powerful spells in this fantasy adventure.',
    imageUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
    downloadUrl: '#',
    genre: 'Fantasy',
    rating: 4.9,
    reviewCount: 1789,
    size: '51.3 GB',
    version: '2.4.0',
    releaseDate: '2024-03-05',
    developer: 'Mystic Entertainment',
    tags: ['Fantasy', 'Magic', 'Adventure'],
    featured: true
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    gameId: '1',
    userId: '2',
    userName: 'GamePlayer',
    userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 5,
    comment: 'Amazing game! The graphics are stunning and the storyline is captivating.',
    date: '2024-11-01',
    helpful: 12
  },
  {
    id: '2',
    gameId: '1',
    userId: '3',
    userName: 'GamerPro',
    userAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4,
    comment: 'Great game but could use better optimization. Still recommended!',
    date: '2024-10-28',
    helpful: 8
  },
  {
    id: '3',
    gameId: '2',
    userId: '4',
    userName: 'SpaceExplorer',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 5,
    comment: 'Perfect space exploration game. Love the attention to detail!',
    date: '2024-11-02',
    helpful: 15
  }
];