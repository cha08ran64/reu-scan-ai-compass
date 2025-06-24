
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, MessageCircle, Heart, Trophy } from 'lucide-react';

export const CommunitySection = () => {
  const communityPosts = [
    {
      user: "EcoWarrior Sarah",
      avatar: "ES",
      points: 1250,
      achievement: "Recycling Champion",
      post: "Just reached 500 items scanned! The AI correctly identified 98% of my waste items. Love seeing my carbon savings grow! 🌱",
      likes: 42,
      comments: 8,
      timeAgo: "2h ago"
    },
    {
      user: "GreenTech Mike",
      avatar: "GM",
      points: 890,
      achievement: "Tech Advocate",
      post: "The new AR feature is incredible! Scanning multiple items at once saves so much time. Great work team! 📱✨",
      likes: 28,
      comments: 12,
      timeAgo: "4h ago"
    },
    {
      user: "Planet Protector Lisa",
      avatar: "PP",
      points: 2100,
      achievement: "Sustainability Leader",
      post: "Organized a community cleanup using ReuScan to educate volunteers about proper waste sorting. Amazing results! 🌍",
      likes: 67,
      comments: 15,
      timeAgo: "6h ago"
    }
  ];

  const leaderboard = [
    { name: "EcoMaster Alex", points: 5420, badge: "🏆" },
    { name: "Green Guru Sam", points: 4850, badge: "🥈" },
    { name: "Sustain Queen Jess", points: 4200, badge: "🥉" },
    { name: "Recycle King Tom", points: 3900, badge: "⭐" },
    { name: "Earth Champion Maya", points: 3650, badge: "⭐" }
  ];

  return (
    <section id="community" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Join Our Global Community
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with like-minded individuals, share your sustainability journey, and make a collective impact
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Community Feed */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Community Feed</h3>
            <div className="space-y-6">
              {communityPosts.map((post, index) => (
                <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold">
                        {post.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-800">{post.user}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {post.points} pts
                        </Badge>
                        <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                          {post.achievement}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">{post.post}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </button>
                        </div>
                        <span>{post.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Leaderboard */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Weekly Leaderboard</h3>
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{user.badge}</span>
                      <div>
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.points} points</p>
                      </div>
                    </div>
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                  View Full Leaderboard
                </Button>
              </div>
            </Card>
            
            {/* Quick Stats */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm mt-6">
              <h4 className="font-bold text-gray-800 mb-4">Your Impact This Week</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items Scanned</span>
                  <span className="font-semibold text-green-600">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CO₂ Saved</span>
                  <span className="font-semibold text-blue-600">12.3 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Eco Points</span>
                  <span className="font-semibold text-purple-600">+340</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
