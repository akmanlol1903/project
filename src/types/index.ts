export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  downloadUrl: string;
  genre: string;
  rating: number;
  reviewCount: number;
  size: string;
  version: string;
  releaseDate: string;
  developer: string;
  tags: string[];
  featured: boolean;
}

export interface Review {
  id: string;
  gameId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  joinDate: string;
  downloadedGames: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}