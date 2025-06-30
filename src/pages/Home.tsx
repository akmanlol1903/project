import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GameCard } from '@/components/GameCard';
import { Star, TrendingUp, Award, Users } from 'lucide-react';
import { mockGames } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  const featuredGames = mockGames.filter(game => game.featured);
  const topRatedGames = [...mockGames].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white py-20 w-full">
        <div className="absolute inset-0 bg-black/20" />
        <div className="w-full px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-purple-500/20 text-purple-200 border-purple-400">
              <Star className="mr-1 h-3 w-3" />
              Premium Gaming Experience
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Discover Amazing Games
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
              Download the latest and greatest games. Join millions of gamers worldwide in epic adventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6" onClick={() => navigate('/games')}>
                Browse Games
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900 text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50 w-full">
        <div className="w-full px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-purple-600">500+</h3>
              <p className="text-muted-foreground">Premium Games</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-blue-600">2M+</h3>
              <p className="text-muted-foreground">Active Players</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-green-600">10M+</h3>
              <p className="text-muted-foreground">Downloads</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-orange-600">4.8</h3>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-16 w-full">
        <div className="w-full px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Games</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked games that offer exceptional gameplay and stunning visuals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-7xl mx-auto">
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" variant="outline" onClick={() => navigate('/games')}>
              View All Games
            </Button>
          </div>
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="py-16 bg-muted/50 w-full">
        <div className="w-full px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Rated Games</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The highest rated games by our community of players
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {topRatedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}