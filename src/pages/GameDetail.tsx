import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ReviewCard } from '@/components/ReviewCard';
import { Star, Download, Calendar, HardDrive, User, ArrowLeft } from 'lucide-react';
import { mockGames, mockReviews } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const game = mockGames.find(g => g.id === id);
  const gameReviews = mockReviews.filter(r => r.gameId === id);

  if (!game) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to download games.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    toast({
      title: "Download Started",
      description: `${game.title} is being downloaded.`
    });
  };

  const handleReviewSubmit = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to submit a review.",
        variant: "destructive"
      });
      return;
    }

    if (rating === 0 || !reviewText.trim()) {
      toast({
        title: "Incomplete Review",
        description: "Please provide both a rating and review text.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Review Submitted",
      description: "Thank you for your review!"
    });
    setRating(0);
    setReviewText('');
  };

  const renderStars = (currentRating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 cursor-pointer transition-colors ${
          i < currentRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
        }`}
        onClick={interactive ? () => setRating(i + 1) : undefined}
      />
    ));
  };

  return (
    <div className="min-h-screen w-full">
      <div className="w-full px-4 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Games
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-lg mb-6">
              <img
                src={game.imageUrl}
                alt={game.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{game.title}</h1>
                <div className="flex items-center space-x-4 text-white/90">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{game.rating}</span>
                    <span>({game.reviewCount} reviews)</span>
                  </div>
                  <Badge variant="secondary">{game.genre}</Badge>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">About this game</h2>
              <p className="text-muted-foreground leading-relaxed">{game.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {game.tags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Game Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Developer</span>
                  <span className="font-medium">{game.developer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Release Date</span>
                  <span className="font-medium">{new Date(game.releaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size</span>
                  <span className="font-medium">{game.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version</span>
                  <span className="font-medium">{game.version}</span>
                </div>
                <Separator />
                <Button className="w-full" size="lg" onClick={handleDownload}>
                  <Download className="mr-2 h-5 w-5" />
                  Download Game
                </Button>
              </CardContent>
            </Card>

            {/* Write Review */}
            {isAuthenticated && (
              <Card>
                <CardHeader>
                  <CardTitle>Write a Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rating</label>
                    <div className="flex space-x-1">
                      {renderStars(rating, true)}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Review</label>
                    <Textarea
                      placeholder="Share your thoughts about this game..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleReviewSubmit} className="w-full">
                    Submit Review
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">User Reviews</h2>
          <div className="space-y-4">
            {gameReviews.length > 0 ? (
              gameReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No reviews yet. Be the first to review this game!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}