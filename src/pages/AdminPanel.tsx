import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Upload, Edit, Trash2, Users, GamepadIcon, Star, Download } from 'lucide-react';
import { mockGames, mockReviews } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newGame, setNewGame] = useState({
    title: '',
    description: '',
    imageUrl: '',
    genre: '',
    size: '',
    developer: '',
    tags: ''
  });

  // Redirect if not admin
  React.useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Game Added",
      description: `${newGame.title} has been added to the catalog.`
    });
    setNewGame({
      title: '',
      description: '',
      imageUrl: '',
      genre: '',
      size: '',
      developer: '',
      tags: ''
    });
  };

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen w-full">
      <div className="w-full px-4 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage games, users, and reviews</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Games</CardTitle>
              <GamepadIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockGames.length}</div>
              <p className="text-xs text-muted-foreground">Active games in catalog</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockReviews.length}</div>
              <p className="text-xs text-muted-foreground">User reviews submitted</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,543</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15,678</div>
              <p className="text-xs text-muted-foreground">Total downloads</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="games" className="space-y-6">
          <TabsList>
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="space-y-6">
            {/* Add New Game */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Game
                </CardTitle>
                <CardDescription>Upload a new game to the catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGameSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Game Title</Label>
                      <Input
                        id="title"
                        value={newGame.title}
                        onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
                        placeholder="Enter game title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="genre">Genre</Label>
                      <Select value={newGame.genre} onValueChange={(value) => setNewGame({ ...newGame, genre: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="action">Action</SelectItem>
                          <SelectItem value="adventure">Adventure</SelectItem>
                          <SelectItem value="rpg">RPG</SelectItem>
                          <SelectItem value="strategy">Strategy</SelectItem>
                          <SelectItem value="racing">Racing</SelectItem>
                          <SelectItem value="horror">Horror</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newGame.description}
                      onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
                      placeholder="Enter game description"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input
                        id="imageUrl"
                        value={newGame.imageUrl}
                        onChange={(e) => setNewGame({ ...newGame, imageUrl: e.target.value })}
                        placeholder="https://..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="size">File Size</Label>
                      <Input
                        id="size"
                        value={newGame.size}
                        onChange={(e) => setNewGame({ ...newGame, size: e.target.value })}
                        placeholder="e.g., 25.4 GB"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="developer">Developer</Label>
                      <Input
                        id="developer"
                        value={newGame.developer}
                        onChange={(e) => setNewGame({ ...newGame, developer: e.target.value })}
                        placeholder="Developer name"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={newGame.tags}
                      onChange={(e) => setNewGame({ ...newGame, tags: e.target.value })}
                      placeholder="Action, Multiplayer, Shooter"
                    />
                  </div>
                  <Button type="submit" className="w-full md:w-auto">
                    <Upload className="mr-2 h-4 w-4" />
                    Add Game
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Games List */}
            <Card>
              <CardHeader>
                <CardTitle>Game Library</CardTitle>
                <CardDescription>Manage existing games in the catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Game</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Downloads</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockGames.map((game) => (
                        <TableRow key={game.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <img src={game.imageUrl} alt={game.title} className="w-12 h-12 rounded object-cover" />
                              <div>
                                <div className="font-medium">{game.title}</div>
                                <div className="text-sm text-muted-foreground">{game.developer}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{game.genre}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{game.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell>{game.reviewCount * 12}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Review Management</CardTitle>
                <CardDescription>Moderate user reviews and ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Game</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Review</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockReviews.map((review) => (
                        <TableRow key={review.id}>
                          <TableCell>{review.userName}</TableCell>
                          <TableCell>{mockGames.find(g => g.id === review.gameId)?.title}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{review.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                          <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  User management features would be implemented here.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}