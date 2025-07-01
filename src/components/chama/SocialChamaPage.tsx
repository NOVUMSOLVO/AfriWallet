import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share, 
  Trophy,
  Calendar,
  TrendingUp,
  Bell,
  UserPlus,
  Camera,
  Send
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { formatCurrency } from '../../utils/currency';
import { useNotificationHelpers } from '../../contexts/NotificationContext';

interface ChamaMember {
  id: string;
  name: string;
  avatar?: string;
  contribution: number;
  joinDate: Date;
  status: 'active' | 'inactive';
  badges: string[];
}

interface ChamaPost {
  id: string;
  author: ChamaMember;
  content: string;
  timestamp: Date;
  likes: number;
  comments: ChamaComment[];
  image?: string;
  type: 'announcement' | 'milestone' | 'discussion' | 'celebration';
}

interface ChamaComment {
  id: string;
  author: ChamaMember;
  content: string;
  timestamp: Date;
}

interface SocialChamaProps {
  chamaId: string;
  chamaName: string;
  selectedCurrency: string;
}

export const SocialChamaPage: React.FC<SocialChamaProps> = ({
  chamaId,
  chamaName,
  selectedCurrency
}) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'members' | 'achievements'>('feed');
  const [posts, setPosts] = useState<ChamaPost[]>(mockPosts);
  const [newPost, setNewPost] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ChamaPost | null>(null);
  
  const { notifySuccess } = useNotificationHelpers();

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: ChamaPost = {
      id: Date.now().toString(),
      author: {
        id: 'current-user',
        name: 'John Mukamuri',
        contribution: 450,
        joinDate: new Date(),
        status: 'active',
        badges: ['Early Bird', 'Consistent Saver']
      },
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: [],
      type: 'discussion'
    };

    setPosts([post, ...posts]);
    setNewPost('');
    notifySuccess('Post Created', 'Your post has been shared with the chama');
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleAddComment = (postId: string, comment: string) => {
    if (!comment.trim()) return;

    const newComment: ChamaComment = {
      id: Date.now().toString(),
      author: {
        id: 'current-user',
        name: 'John Mukamuri',
        contribution: 450,
        joinDate: new Date(),
        status: 'active',
        badges: ['Early Bird']
      },
      content: comment,
      timestamp: new Date()
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
  };

  const getPostTypeIcon = (type: ChamaPost['type']) => {
    switch (type) {
      case 'announcement':
        return <Bell className="h-4 w-4 text-blue-600" />;
      case 'milestone':
        return <Trophy className="h-4 w-4 text-yellow-600" />;
      case 'celebration':
        return <Heart className="h-4 w-4 text-red-600" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPostTypeColor = (type: ChamaPost['type']) => {
    switch (type) {
      case 'announcement':
        return 'bg-blue-50 border-blue-200';
      case 'milestone':
        return 'bg-yellow-50 border-yellow-200';
      case 'celebration':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">{chamaName}</h1>
        <p className="text-gray-600">Social Hub</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-600">Active Members</p>
        </Card>
        <Card className="p-4 text-center">
          <MessageSquare className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
          <p className="text-sm text-gray-600">Posts</p>
        </Card>
        <Card className="p-4 text-center">
          <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">85%</p>
          <p className="text-sm text-gray-600">Goal Progress</p>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        {[
          { id: 'feed', label: 'Feed', icon: MessageSquare },
          { id: 'members', label: 'Members', icon: Users },
          { id: 'achievements', label: 'Achievements', icon: Trophy }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Feed Tab */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {/* Create Post */}
          <Card className="p-4">
            <div className="space-y-3">
              <Input
                placeholder="Share an update with your chama..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-1" />
                    Photo
                  </Button>
                </div>
                <Button 
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  size="sm"
                >
                  <Send className="h-4 w-4 mr-1" />
                  Post
                </Button>
              </div>
            </div>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className={`p-6 border-l-4 ${getPostTypeColor(post.type)}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {post.author.name.charAt(0)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">{post.author.name}</span>
                        {getPostTypeIcon(post.type)}
                        <span className="text-xs text-gray-500">
                          {post.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLikePost(post.id)}
                          className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-sm">{post.comments.length}</span>
                        </button>
                        
                        <button className="flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors">
                          <Share className="h-4 w-4" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Chama Members</h2>
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-1" />
              Invite
            </Button>
          </div>
          
          <div className="grid gap-4">
            {mockMembers.map((member) => (
              <Card key={member.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">
                        Contributed: {formatCurrency(member.contribution, selectedCurrency)}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {member.badges.map((badge, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {member.status}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Chama Achievements</h2>
          
          <div className="grid gap-4">
            {mockAchievements.map((achievement, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Trophy className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {selectedPost && (
        <Modal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          title="Comments"
          size="md"
        >
          <div className="space-y-4">
            {selectedPost.comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {comment.author.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {comment.author.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {comment.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex gap-2 pt-4 border-t">
              <Input
                placeholder="Add a comment..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddComment(selectedPost.id, e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// Mock data
const mockPosts: ChamaPost[] = [
  {
    id: '1',
    author: {
      id: '2',
      name: 'Sarah Chikwanha',
      contribution: 450,
      joinDate: new Date(),
      status: 'active',
      badges: ['Top Contributor']
    },
    content: '🎉 Great news everyone! We\'ve reached 75% of our quarterly goal. Keep up the excellent work!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 8,
    comments: [],
    type: 'milestone'
  },
  {
    id: '2',
    author: {
      id: '3',
      name: 'Mike Tendai',
      contribution: 450,
      joinDate: new Date(),
      status: 'active',
      badges: ['Consistent Saver']
    },
    content: 'Just made my weekly contribution. Thanks for keeping me motivated everyone! 💪',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    likes: 5,
    comments: [],
    type: 'discussion'
  }
];

const mockMembers: ChamaMember[] = [
  {
    id: '1',
    name: 'John Mukamuri',
    contribution: 450,
    joinDate: new Date(),
    status: 'active',
    badges: ['Early Bird', 'Consistent Saver']
  },
  {
    id: '2',
    name: 'Sarah Chikwanha',
    contribution: 450,
    joinDate: new Date(),
    status: 'active',
    badges: ['Top Contributor', 'Goal Crusher']
  },
  {
    id: '3',
    name: 'Mike Tendai',
    contribution: 450,
    joinDate: new Date(),
    status: 'active',
    badges: ['Consistent Saver']
  }
];

const mockAchievements = [
  {
    title: 'First Milestone',
    description: 'Reached 25% of quarterly goal',
    date: '2 weeks ago'
  },
  {
    title: 'Full Participation',
    description: 'All members contributed this week',
    date: '1 week ago'
  },
  {
    title: 'Halfway There',
    description: 'Reached 50% of quarterly goal',
    date: '3 days ago'
  }
];
