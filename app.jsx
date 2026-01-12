import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Search, LogOut, ArrowLeft, Send, Phone, Video, Image, Paperclip, Smile, Edit2, Save, Plus, Home, Mail, Users, Menu, X, Settings, Calendar, MessageSquare, Zap, Target, Gift, TrendingUp } from 'lucide-react';

export default function VaBrand() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [formData, setFormData] = useState({ email: '', phone: '', password: '', name: '' });
  const [viewingProfile, setViewingProfile] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editData, setEditData] = useState({});
  const [chatUser, setChatUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [newPost, setNewPost] = useState('');
  const [showCallModal, setShowCallModal] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showPostModal, setShowPostModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState('');
  const [postPrivacy, setPostPrivacy] = useState('public');
  const [showMenu, setShowMenu] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBottomNav, setShowBottomNav] = useState(true);
  const [dailyQuestion, setDailyQuestion] = useState({ question: 'React ke liye best state management kya hai?', options: ['Redux', 'Context API', 'Zustand'], answered: false });
  const [dailyStreak, setDailyStreak] = useState(7);
  const [rewards, setRewards] = useState(150);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [reminderTime, setReminderTime] = useState('09:00');

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollDirection('down');
        setShowBottomNav(false);
      } else {
        setScrollDirection('up');
        setShowBottomNav(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const [users, setUsers] = useState({
    'rahul@email.com': {
      id: 'VA_001',
      name: 'Rahul Singh',
      email: 'rahul@email.com',
      phone: '9876543210',
      role: 'Product Manager',
      bio: 'Passionate about building great products.',
      profilePhoto: '🎯',
      location: 'Delhi, India',
      company: 'Tech Co',
      followers: 2450,
      connections: 580,
      headline: 'Product Manager | Tech Innovator',
      about: 'I help teams build products that matter.',
      skills: ['Product Strategy', 'User Research', 'Analytics']
    },
    'priya@email.com': {
      id: 'VA_002',
      name: 'Priya Sharma',
      email: 'priya@email.com',
      phone: '9876543211',
      role: 'UI/UX Designer',
      bio: 'Design thinking enthusiast.',
      profilePhoto: '🎨',
      location: 'Bangalore, India',
      company: 'Design Studio',
      followers: 1890,
      connections: 420,
      headline: 'UI/UX Designer | Design Thinker',
      about: 'Creating beautiful digital experiences.',
      skills: ['UI Design', 'UX Research', 'Figma']
    }
  });

  const [posts, setPosts] = useState([
    {
      id: 1,
      authorEmail: 'rahul@email.com',
      content: 'Just launched our new product feature! Excited to see how users will love it. 🚀',
      likes: 342,
      comments: 28,
      liked: false,
      timestamp: 'Just now'
    },
    {
      id: 2,
      authorEmail: 'priya@email.com',
      content: 'Design sprint week was amazing! Collaborated with the best team. 🎨',
      likes: 215,
      comments: 19,
      liked: false,
      timestamp: '2h ago'
    }
  ]);

  // Auth Functions
  const handleSignup = () => {
    if (formData.email && formData.phone && formData.password && formData.name) {
      if (users[formData.email]) {
        alert('Account already exists!');
        return;
      }
      const newUser = {
        id: 'VA_' + String(Object.keys(users).length + 1).padStart(3, '0'),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: 'Professional',
        bio: 'Welcome to VaBrand!',
        profilePhoto: '✨',
        location: 'India',
        company: 'Independent',
        followers: 0,
        connections: 0,
        headline: 'Professional at VaBrand',
        about: 'Passionate professional on VaBrand',
        skills: []
      };
      setUsers({ ...users, [formData.email]: newUser });
      setCurrentUser(newUser);
      setFormData({ email: '', phone: '', password: '', name: '' });
      setShowAuth(false);
      setActiveTab('home');
    } else {
      alert('Please fill all fields!');
    }
  };

  const handleLogin = () => {
    if (formData.email && formData.password) {
      if (users[formData.email]) {
        setCurrentUser(users[formData.email]);
        setFormData({ email: '', phone: '', password: '', name: '' });
        setShowAuth(false);
        setActiveTab('home');
      } else {
        alert('Account not found!');
      }
    } else {
      alert('Please fill all fields!');
    }
  };

  const handleEditProfile = () => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...editData };
      setUsers({ ...users, [currentUser.email]: updatedUser });
      setCurrentUser(updatedUser);
      setShowEditProfile(false);
      setEditData({});
    }
  };

  const handleCreatePost = () => {
    if (postContent.trim() && currentUser) {
      setPosts([{
        id: posts.length + 1,
        authorEmail: currentUser.email,
        content: postContent,
        image: postImage,
        likes: 0,
        comments: 0,
        liked: false,
        timestamp: 'Just now',
        privacy: postPrivacy
      }, ...posts]);
      setPostContent('');
      setPostImage('');
      setPostPrivacy('public');
      setShowPostModal(false);
    }
  };

  const toggleLike = (id) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
    ));
  };

  const sendMessage = () => {
    if (newMessage.trim() && chatUser && currentUser) {
      const chatKey = [currentUser.email, chatUser.email].sort().join('_');
      setMessages({
        ...messages,
        [chatKey]: [
          ...(messages[chatKey] || []),
          {
            id: Math.random(),
            sender: currentUser.email,
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      });
      setNewMessage('');
    }
  };

  const sendFile = (fileType) => {
    if (chatUser && currentUser) {
      const chatKey = [currentUser.email, chatUser.email].sort().join('_');
      const fileNames = {
        photo: '📸 photo_' + Date.now() + '.jpg',
        file: '📄 document_' + Date.now() + '.pdf',
        emoji: '🎉 Celebration!'
      };
      setMessages({
        ...messages,
        [chatKey]: [
          ...(messages[chatKey] || []),
          {
            id: Math.random(),
            sender: currentUser.email,
            text: fileNames[fileType],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      });
    }
  };

  const getChatMessages = () => {
    if (!chatUser || !currentUser) return [];
    const chatKey = [currentUser.email, chatUser.email].sort().join('_');
    return messages[chatKey] || [];
  };

  const initiateCall = (type) => {
    setIncomingCall({ from: chatUser.name, type });
    setShowCallModal(false);
    setTimeout(() => setIncomingCall(null), 3000);
  };

  // Messaging Screen
  if (chatUser && currentUser) {
    const chatMessages = getChatMessages();
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#D5D4D9' }}>
        <header className="border-b-4 shadow-lg" style={{ backgroundColor: '#FFFFFF', borderColor: '#362246' }}>
          <div className="max-w-full mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => { setChatUser(null); setActiveTab('home'); }} className="p-2 rounded-lg hover:bg-gray-200">
                <ArrowLeft style={{ color: '#362246' }} size={24} />
              </button>
              <div>
                <h3 className="font-bold text-lg" style={{ color: '#362246' }}>{chatUser.name}</h3>
                <p style={{ color: '#666666' }} className="text-xs">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowCallModal(true)} className="p-2 rounded-lg" style={{ backgroundColor: '#362246', color: '#FFFFFF' }}>
                <Phone size={20} />
              </button>
              <button className="p-2 rounded-lg" style={{ backgroundColor: '#362246', color: '#FFFFFF' }}>
                <Video size={20} />
              </button>
            </div>
          </div>

          {showCallModal && (
            <div className="absolute top-16 right-4 rounded-lg shadow-xl p-4 z-50" style={{ backgroundColor: '#FFFFFF', border: '2px solid #362246' }}>
              <p className="font-semibold mb-3" style={{ color: '#362246' }}>Start call?</p>
              <button onClick={() => initiateCall('audio')} className="w-full flex items-center gap-2 px-4 py-2 mb-2 rounded-lg" style={{ backgroundColor: '#362246', color: '#FFFFFF' }}>
                <Phone size={18} /> Audio Call
              </button>
              <button onClick={() => initiateCall('video')} className="w-full flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#362246', color: '#FFFFFF' }}>
                <Video size={18} /> Video Call
              </button>
            </div>
          )}
        </header>

        {incomingCall && (
          <div className="fixed top-4 right-4 rounded-lg shadow-2xl p-4 z-50" style={{ backgroundColor: '#362246', color: '#FFFFFF' }}>
            <p className="font-semibold">{incomingCall.from} is calling...</p>
            <p className="text-sm mb-3">{incomingCall.type === 'audio' ? '📞 Audio Call' : '📹 Video Call'}</p>
            <div className="flex gap-2">
              <button className="px-4 py-1 rounded text-white font-semibold bg-green-500">Accept</button>
              <button className="px-4 py-1 rounded text-white font-semibold bg-red-500">Decline</button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p style={{ color: '#666666' }}>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            chatMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === currentUser.email ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-xs px-4 py-2 rounded-lg" style={{ backgroundColor: msg.sender === currentUser.email ? '#362246' : '#FFFFFF', color: msg.sender === currentUser.email ? '#FFFFFF' : '#333', border: msg.sender !== currentUser.email ? '2px solid #D5D4D9' : 'none' }}>
                  <p className="break-words text-sm">{msg.text}</p>
                  <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t-4 p-4" style={{ borderColor: '#362246', backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center gap-2">
            <button onClick={() => sendFile('emoji')} className="p-2 rounded-lg" style={{ backgroundColor: '#362246', color: '#FFFFFF' }}>
              <Smile size={20} />
            </button>
            <button onClick={() => sendFile('photo')} className="p-2 rounded-lg" style={{ backgroundColor: '#362246', color: '#FFFFFF' }}>
              <Image size={20} />
            </button>
            <button onClick={() => sendFile('file')} className="p-2 rounded-lg" style={{ backgroundColor: '#362246', color: '#FFFFFF' }}>
              <Paperclip size={20} />
            </button>
            <input type="text" placeholder="Type message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} style={{ backgroundColor: '#D5D4D9', border: '2px solid #D5D4D9', color: '#333' }} className="flex-1 px-4 py-2 rounded-full outline-none text-sm" />
            <button onClick={sendMessage} className="p-2 rounded-lg" style={{ backgroundColor: '#362246', color: '#FFFFFF' }}>
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Profile View/Edit
  if (viewingProfile) {
    const profile = users[viewingProfile];
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#D5D4D9' }}>
        <header className="border-b-4 shadow-lg" style={{ backgroundColor: '#FFFFFF', borderColor: '#362246' }}>
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <button onClick={() => setViewingProfile(null)} className="flex items-center gap-2" style={{ color: '#362246' }}>
              <ArrowLeft size={24} /> Back
            </button>
            <div className="flex gap-2">
              {profile.email === currentUser?.email && (
                <button onClick={() => { setShowEditProfile(true); setEditData(profile); }} className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold" style={{ backgroundColor: '#362246', color: '#FFFFFF' }}>
                  <Edit2 size={18} /> Edit
                </button>
              )}
              {profile.email !== currentUser?.email && (
                <button onClick={() => { setChatUser(profile); setActiveTab('messages'); }} className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold" style={{ backgroundColor: '#362246', color: '#FFFFFF' }}>
                  <MessageCircle size={18} /> Message
                </button>
              )}
            </div>
          </div>
        </header>

        {showEditProfile ? (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#FFFFFF', border: '3px solid #362246' }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#362246' }}>Edit Profile</h2>
              
              <div className="space-y-4">
                <input type="text" placeholder="Full Name" value={editData.name || ''} onChange={(e) => setEditData({ ...editData, name: e.target.value })} style={{ backgroundColor: '#D5D4D9', border: '2px solid #D5D4D9', color: '#333' }} className="w-full px-4 py-2 rounded-lg outline-none text-sm" />
                <input type="text" placeholder="Headline" value={editData.headline || ''} onChange={(e) => setEditData({ ...editData, headline: e.target.value })} style={{ backgroundColor: '#D5D4D9', border: '2px solid #D5D4D9', color: '#333' }} className="w-full px-4 py-2 rounded-lg outline-none text-sm" />
                <input type="text" placeholder="Location" value={editData.location || ''} onChange={(e) => setEditData({ ...editData, location: e.target.value })} style={{ backgroundColor: '#D5D4D9', border: '2px solid #D5D4D9', color: '#333' }} className="w-full px-4 py-2 rounded-lg outline-none text-sm" />
                <textarea placeholder="Bio" value={editData.bio || ''} onChange={(e) => setEditData({ ...editData, bio: e.target.value })} style={{ backgroundColor: '#D5D4D9', border: '2px solid #D5D4D9', color: '#333' }} className="w-full px-4 py-2 rounded-lg outline-none text-sm" rows="4" />
                <input type="text" placeholder="Profile Photo Emoji" value={editData.profilePhoto || ''} onChange={(e) => setEditData({ ...editData, profilePhoto: e.target.value })} style={{ backgroundColor: '#D5D4D9', border: '2px solid #D5D4D9', color: '#333' }} className="w-full px-4 py-2 rounded-lg outline-none text-sm" />
                
                <div className="flex gap-4 pt-4">
                  <button onClick={handleEditProfile} style={{ backgroundColor: '#362246' }} className="flex-1 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2">
                    <Save size={18} /> Save
                  </button>
                  <button onClick={() => setShowEditProfile(false)} style={{ backgroundColor: '#D5D4D9', color: '#333', border: '2px solid #D5D4D9' }} className="flex-1 font-semibold py-2 rounded-lg">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="rounded-2xl shadow-lg overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '3px solid #362246' }}>
              <div className="h-40" style={{ backgroundColor: '#362246', backgroundImage: 'linear-gradient(135deg, #362246 0%, #5a4a6b 100%)' }}></div>

              <div className="px-8 pb-8">
                <div className="flex items-end gap-6 -mt-16 mb-6">
                  <div className="text-8xl bg-white rounded-full p-4" style={{ border: '4px solid #362246' }}>
                    {profile.profilePhoto}
                  </div>
                  <div className="flex-1">
                    <div style={{ backgroundColor: '#D5D4D9' }} className="inline-block px-3 py-1 rounded-lg mb-2">
                      <p style={{ color: '#362246' }} className="text-xs font-bold">ID: {profile.id}</p>
                    </div>
                    <h1 className="text-3xl font-bold" style={{ color: '#362246' }}>{profile.name}</h1>
                    <p className="text-lg font-semibold" style={{ color: '#666666' }}>{profile.headline}</p>
                    <p style={{ color: '#362246' }}>{profile.location}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 py-6 border-t-4 border-b-4" style={{ borderColor: '#362246' }}>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: '#362246' }}>{profile.followers}</p>
                    <p style={{ color: '#666666' }} className="text-sm">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: '#362246' }}>{profile.connections}</p>
                    <p style={{ color: '#666666' }} className="text-sm">Connections</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: '#362246' }}>⭐ 4.8</p>
                    <p style={{ color: '#666666' }} className="text-sm">Rating</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#362246' }}>About</h3>
                  <p style={{ color: '#333' }}>{profile.about}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#362246' }}>Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, i) => (
                      <span key={i} style={{ backgroundColor: '#E8E6F0', color: '#362246' }} className="px-3 py-1 rounded-full text-sm font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main Feed
  return (
    <div className="min-h-screen pb-32" style={{ backgroundColor: '#D5D4D9' }}>
      {!currentUser ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#FFFFFF', border: '3px solid #362246' }}>
            <div className="mb-6 text-center">
              <div className="inline-block text-5xl font-bold mb-2 px-6 py-4 rounded-2xl" style={{ backgroundColor: '#362246', color: '#D5D4D9', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>VB</div>
              <p className="text-lg font-bold mt-3" style={{ color: '#362246' }}>VaBrand</p>
            </div>
            
            <div className="flex gap-4 mb-6">
              <button onClick={() => setAuthTab('login')} style={{ backgroundColor: authTab === 'login' ? '#362246' : '#D5D4D9', color: authTab === 'login' ? '#FFFFFF' : '#333' }} className="flex-1 py-2 rounded-lg font-semibold">Sign In</button>
              <button onClick={() => setAuthTab('signup')} style={{ backgroundColor: authTab === 'signup' ? '#362246' : '#D5D4D9', color: authTab === 'signup' ? '#FFFFFF' : '#333' }} className="flex-1 py-2 rounded-lg font-semibold">Sign Up</button>
            </div>

            {authTab === 'login' ? (
              <div className="space-y-4">
                <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ backgroundColor: '#D5D4D9', border: '2px solid #D5D4D9', color: '#333' }} className="w-full px-4 py-2 rounded-lg outline-none text-sm" />
                <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{ backgroundColor: '#D5D4D9', border: '2px solid #D5D4D9', color: '#333' }} className="w-full px-4 py-2 rounded-lg outline-none text-sm" />
                <button onClick={handleLogin} style={{ backgroundColor: '#362246' }} className="w-full text-white font-semibold py-2 rounded-lg">Sign In</button>
              </div>
            ) : (
              <div className="space-y-4">
                <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ backgroundColor: '#D5D4D9', border: '2px solid #D5D4D9', color: '#333' }} className="w-full px-4 py-2 rounded-lg outline-none text-sm" />
                <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ backgroundColor: '#D5D4D9', border: '2px solid #D5D4D9', color: '#333' }} className="w-full px-4 py-2 rounded-lg outline-none text-sm" />
                <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={{ backgroundColor: '#D5D4D9', border: '2px solid #D5D4D9', color: '#333' }} className="w-full px-4 py-2 rounded-lg outline-none text-sm" />
                <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{ backgroundColor: '#D5D4D9', border: '2px solid #D5D4D9', color: '#333' }} className="w-full px-4 py-2 rounded-lg outline-none text-sm" />
                <button onClick={handleSignup} style={{ backgroundColor: '#362246' }} className="w-full text-white font-semibold py-2 rounded-lg">Create Account</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* Top Header - Auto Hide on Scroll */}
          <header className={`border-b-4 shadow-lg sticky top-0 z-40 transition-all duration-300 ${!showBottomNav ? '-translate-y-24' : 'translate-y-0'}`} style={{ backgroundColor: '#FFFFFF', borderColor: '#362246' }}>
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="text-3xl font-bold" style={{ color: '#362246' }}>
                <div className="flex items-center gap-2">
                  <div className="inline-block text-3xl font-bold px-3 py-1 rounded-lg" style={{ backgroundColor: '#362246', color: '#D5D4D9' }}>VB</div>
                  <span>VaBrand</span>
                </div>
              </div>
              
              <div className="hidden md:flex items-center rounded-full px-4 py-2 flex-1 mx-8" style={{ backgroundColor: '#D5D4D9', border: '2px solid #362246' }}>
                <Search size={18} style={{ color: '#362246' }} />
                <input type="text" placeholder="Search..." className="outline-none w-full text-sm ml-2 bg-transparent" style={{ color: '#333' }} />
              </div>

              <div className="flex items-center gap-4">
                <div style={{ backgroundColor: '#D5D4D9' }} className="px-3 py-1 rounded-lg">
                  <p style={{ color: '#362246' }} className="text-xs font-bold">ID: {currentUser.id}</p>
                </div>
                <button onClick={() => setViewingProfile(currentUser.email)} className="text-3xl hover:opacity-80">
                  {currentUser.profilePhoto}
                </button>
                
                {/* Hamburger Menu */}
                <div className="relative">
                  <button onClick={() => setShowMenu(!showMenu)} className="p-2 rounded-lg" style={{ backgroundColor: '#362246', color: '#FFFFFF' }}>
                    {showMenu ? <X size={24} /> : <Menu size={24} />}
                  </button>

                  {/* Menu Dropdown */}
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-72 rounded-2xl shadow-2xl p-4 z-50" style={{ backgroundColor: '#FFFFFF', border: '3px solid #362246' }}>
                      {/* Menu Header */}
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b-2" style={{ borderColor: '#D5D4D9' }}>
                        <div className="text-3xl">{currentUser.profilePhoto}</div>
                        <div>
                          <p className="font-bold" style={{ color: '#362246' }}>{currentUser.name}</p>
                          <p className="text-xs" style={{ color: '#666666' }}>{currentUser.email}</p>
                        </div>
                      </div>

                      {/* Daily Streak */}
                      <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#D5D4D9' }}>
                        <p className="font-bold" style={{ color: '#362246' }}>🔥 Daily Streak: {dailyStreak} days</p>
                        <p className="text-xs" style={{ color: '#666666' }}>Keep it up!</p>
                      </div>

                      {/* Rewards */}
                      <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#D5D4D9' }}>
                        <p className="font-bold" style={{ color: '#362246' }}>🎁 Rewards: {rewards} points</p>
                        <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: (rewards % 100) + '%' }}></div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="space-y-2">
                        <button onClick={() => { setShowAIChat(true); setShowMenu(false); }} className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition" style={{ backgroundColor: '#E8E6F0', color: '#362246' }}>
                          <MessageSquare size={18} /> 🤖 AI ChatBot
                        </button>
                        <button onClick={() => setShowMenu(false)} className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition" style={{ backgroundColor: '#E8E6F0', color: '#362246' }}>
                          <Target size={18} /> 📊 Daily Question
                        </button>
                        <button onClick={() => setShowMenu(false)} className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition" style={{ backgroundColor: '#E8E6F0', color: '#362246' }}>
                          <Calendar size={18} /> 📅 Calendar
                        </button>
                        <button onClick={() => setShowMenu(false)} className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition" style={{ backgroundColor: '#E8E6F0', color: '#362246' }}>
                          <Zap size={18} /> ⏰ Reminders
                        </button>
                        <button onClick={() => setShowMenu(false)} className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition" style={{ backgroundColor: '#E8E6F0', color: '#362246' }}>
                          <TrendingUp size={18} /> 📈 Progress
                        </button>
                        <button onClick={() => setShowMenu(false)} className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition" style={{ backgroundColor: '#E8E6F0', color: '#362246' }}>
                          <Gift size={18} /> 🏆 Achievements
                        </button>
                        <button onClick={() => setShowMenu(false)} className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition" style={{ backgroundColor: '#E8E6F0', color: '#362246' }}>
                          <Settings size={18} /> ⚙️ Settings
                        </button>
                        <button onClick={() => { setCurrentUser(null); setShowMenu(false); }} className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition" style={{ backgroundColor: '#E8E6F0', color: '#FF6B6B' }}>
                          <LogOut size={18} /> 🚪 Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          {activeTab === 'home' && (
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar */}
                <aside className="hidden md:block">
                  <div className="rounded-xl p-6 border-4 shadow-md cursor-pointer" style={{ backgroundColor: '#FFFFFF', borderColor: '#362246' }} onClick={() => setViewingProfile(currentUser.email)}>
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-4">{currentUser.profilePhoto}</div>
                      <h3 className="font-bold text-lg" style={{ color: '#362246' }}>{currentUser.name}</h3>
                      <p style={{ color: '#666666' }} className="text-sm">{currentUser.headline}</p>
                    </div>
                    <div className="border-t-4 pt-4 space-y-2 text-sm" style={{ borderColor: '#362246' }}>
                      <div className="flex justify-between p-2 rounded" style={{ backgroundColor: '#D5D4D9' }}>
                        <span style={{ color: '#333' }}>Connections</span>
                        <span className="font-bold" style={{ color: '#362246' }}>{currentUser.connections}</span>
                      </div>
                    </div>
                  </div>
                </aside>

                {/* Main Feed */}
                <main className="md:col-span-2 space-y-6">
                  {/* Create Post */}
                  <div className="rounded-xl p-6 border-4 shadow-md" style={{ backgroundColor: '#FFFFFF', borderColor: '#362246' }}>
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{currentUser.profilePhoto}</div>
                      <button onClick={() => setShowPostModal(true)} className="flex-1 rounded-full px-4 py-3 text-sm outline-none text-left" style={{ backgroundColor: '#D5D4D9', color: '#666' }}>
                        Share your thoughts...
                      </button>
                      <button onClick={() => setShowPostModal(true)} className="p-2 rounded-full" style={{ backgroundColor: '#362246', color: '#FFFFFF' }}>
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Post Modal */}
                  {showPostModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl" style={{ borderColor: '#362246', border: '3px solid' }}>
                        <h2 className="text-2xl font-bold mb-4" style={{ color: '#362246' }}>Create a Post</h2>
                        
                        {/* User Info */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-3xl">{currentUser.profilePhoto}</div>
                          <div>
                            <p className="font-bold" style={{ color: '#362246' }}>{currentUser.name}</p>
                            <select value={postPrivacy} onChange={(e) => setPostPrivacy(e.target.value)} style={{ backgroundColor: '#D5D4D9', color: '#333', borderRadius: '4px', padding: '4px 8px', border: '1px solid #362246' }} className="text-xs">
                              <option value="public">🌍 Public</option>
                              <option value="friends">👥 Friends Only</option>
                              <option value="private">🔒 Private</option>
                            </select>
                          </div>
                        </div>

                        {/* Post Content */}
                        <textarea 
                          placeholder="What's on your mind?" 
                          value={postContent} 
                          onChange={(e) => setPostContent(e.target.value)}
                          className="w-full p-4 rounded-lg outline-none resize-none mb-4 text-lg"
                          style={{ backgroundColor: '#D5D4D9', color: '#333', minHeight: '150px', border: '2px solid #362246' }}
                        />

                        {/* Image Preview */}
                        {postImage && (
                          <div className="mb-4 relative">
                            <div className="text-6xl text-center p-4 rounded-lg" style={{ backgroundColor: '#D5D4D9' }}>
                              {postImage}
                            </div>
                            <button onClick={() => setPostImage('')} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                              ✕
                            </button>
                          </div>
                        )}

                        {/* Image/Emoji Selector */}
                        <div className="mb-4">
                          <p className="text-sm font-semibold mb-2" style={{ color: '#362246' }}>Add Emoji or Photo:</p>
                          <div className="flex flex-wrap gap-2">
                            {['😀', '🎉', '❤️', '🚀', '💯', '🎨', '📸', '🎯'].map(emoji => (
                              <button 
                                key={emoji} 
                                onClick={() => setPostImage(emoji)}
                                className="text-3xl p-2 rounded-lg hover:bg-opacity-70 transition"
                                style={{ backgroundColor: postImage === emoji ? '#362246' : '#D5D4D9' }}
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Character Count */}
                        <div className="text-xs mb-4" style={{ color: '#666666' }}>
                          {postContent.length} characters
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button 
                            onClick={handleCreatePost}
                            disabled={!postContent.trim()}
                            className="flex-1 py-3 rounded-lg font-semibold text-white transition disabled:opacity-50"
                            style={{ backgroundColor: '#362246' }}
                          >
                            📤 Post
                          </button>
                          <button 
                            onClick={() => {
                              setShowPostModal(false);
                              setPostContent('');
                              setPostImage('');
                              setPostPrivacy('public');
                            }}
                            className="flex-1 py-3 rounded-lg font-semibold transition"
                            style={{ backgroundColor: '#D5D4D9', color: '#333' }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Posts */}
                  {posts.map(post => {
                    const author = users[post.authorEmail];
                    return (
                      <div key={post.id} className="rounded-xl p-6 border-4 shadow-md" style={{ backgroundColor: '#FFFFFF', borderColor: '#362246' }}>
                        <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => setViewingProfile(post.authorEmail)}>
                          <div className="text-3xl">{author.profilePhoto}</div>
                          <div>
                            <h4 className="font-bold" style={{ color: '#362246' }}>{author.name}</h4>
                            <p style={{ color: '#666666' }} className="text-xs">{post.timestamp}</p>
                          </div>
                        </div>
                        <p className="mb-3" style={{ color: '#333' }}>{post.content}</p>
                        {post.image && <div className="text-5xl mb-4">{post.image}</div>}
                        <div className="flex gap-8 pt-4 border-t-4 text-sm" style={{ borderColor: '#362246' }}>
                          <button onClick={() => toggleLike(post.id)} className="flex items-center gap-2 font-medium" style={{ color: post.liked ? '#362246' : '#333' }}>
                            <Heart size={18} fill={post.liked ? 'currentColor' : 'none'} />
                            {post.likes}
                          </button>
                          <button className="flex items-center gap-2 font-medium" style={{ color: '#333' }}>
                            <MessageCircle size={18} />
                            {post.comments}
                          </button>
                          <button className="flex items-center gap-2 font-medium" style={{ color: '#333' }}>
                            <Share2 size={18} />
                            Share
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </main>

                {/* Right Sidebar */}
                <aside className="hidden md:block">
                  <div className="rounded-xl p-6 border-4 shadow-md" style={{ backgroundColor: '#FFFFFF', borderColor: '#362246' }}>
                    <h3 className="font-bold mb-4 text-lg" style={{ color: '#362246' }}>👥 Users</h3>
                    <div className="space-y-3">
                      {Object.values(users).filter(u => u.email !== currentUser.email).map(user => (
                        <div key={user.email} className="p-3 rounded cursor-pointer" style={{ backgroundColor: '#D5D4D9' }}>
                          <div onClick={() => setViewingProfile(user.email)} className="mb-2 hover:opacity-80">
                            <p className="text-lg font-semibold flex items-center gap-2" style={{ color: '#362246' }}>
                              {user.profilePhoto} {user.name}
                            </p>
                            <p className="text-xs" style={{ color: '#666666' }}>{user.headline}</p>
                          </div>
                          <button onClick={() => { setChatUser(user); setActiveTab('messages'); }} className="w-full text-xs font-semibold py-1 rounded" style={{ backgroundColor: '#362246', color: '#FFFFFF' }}>
                            💬 Message
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && !chatUser && (
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="rounded-xl p-6 border-4 shadow-md" style={{ backgroundColor: '#FFFFFF', borderColor: '#362246' }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#362246' }}>Messages</h2>
                <div className="space-y-3">
                  {Object.values(users).filter(u => u.email !== currentUser.email).map(user => (
                    <div key={user.email} className="p-4 rounded-lg cursor-pointer border-2" style={{ backgroundColor: '#D5D4D9', borderColor: '#362246' }} onClick={() => { setChatUser(user); setActiveTab('messages'); }}>
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{user.profilePhoto}</div>
                        <div className="flex-1">
                          <p className="font-semibold" style={{ color: '#362246' }}>{user.name}</p>
                          <p className="text-sm" style={{ color: '#666666' }}>Start a conversation</p>
                        </div>
                        <p style={{ color: '#362246' }} className="font-bold">→</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Teams Tab */}
          {activeTab === 'teams' && (
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="rounded-xl p-6 border-4 shadow-md" style={{ backgroundColor: '#FFFFFF', borderColor: '#362246' }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#362246' }}>Teams & Groups</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Product Team', members: 8, icon: '👥' },
                    { name: 'Design Team', members: 5, icon: '🎨' },
                    { name: 'Tech Community', members: 125, icon: '💻' },
                    { name: 'Startup Network', members: 42, icon: '🚀' }
                  ].map((team, i) => (
                    <div key={i} className="p-4 rounded-lg border-2" style={{ backgroundColor: '#D5D4D9', borderColor: '#362246' }}>
                      <div className="flex items-center gap-3 mb-3">
                        <p className="text-3xl">{team.icon}</p>
                        <div>
                          <p className="font-bold" style={{ color: '#362246' }}>{team.name}</p>
                          <p className="text-sm" style={{ color: '#666666' }}>{team.members} members</p>
                        </div>
                      </div>
                      <button style={{ backgroundColor: '#362246', color: '#FFFFFF' }} className="w-full py-2 rounded-lg font-semibold text-sm">Join Team</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI ChatBot Modal */}
          {showAIChat && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
              <div className="w-full max-w-md rounded-t-2xl shadow-2xl" style={{ backgroundColor: '#FFFFFF', height: '80vh', display: 'flex', flexDirection: 'column', borderTop: '3px solid #362246' }}>
                {/* Chat Header */}
                <div className="p-4 border-b-2" style={{ borderColor: '#D5D4D9', backgroundColor: '#362246', color: '#FFFFFF' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🤖</span>
                      <div>
                        <p className="font-bold">VaBrand AI</p>
                        <p className="text-xs opacity-80">Always here to help</p>
                      </div>
                    </div>
                    <button onClick={() => setShowAIChat(false)} className="text-white">
                      <X size={24} />
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  <div className="flex justify-start">
                    <div className="max-w-xs px-4 py-2 rounded-lg" style={{ backgroundColor: '#D5D4D9', color: '#333' }}>
                      <p className="text-sm">👋 Hi! I'm your VaBrand AI Assistant. How can I help you today?</p>
                    </div>
                  </div>
                  {aiMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className="max-w-xs px-4 py-2 rounded-lg" style={{ backgroundColor: msg.sender === 'user' ? '#362246' : '#D5D4D9', color: msg.sender === 'user' ? '#FFFFFF' : '#333' }}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t-2" style={{ borderColor: '#D5D4D9' }}>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Ask me anything..." 
                      className="flex-1 px-4 py-2 rounded-full outline-none"
                      style={{ backgroundColor: '#D5D4D9', color: '#333', border: '2px solid #362246' }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          setAiMessages([...aiMessages, { sender: 'user', text: e.target.value }, { sender: 'ai', text: '✨ Great question! I\'m processing your query...' }]);
                          e.target.value = '';
                        }
                      }}
                    />
                    <button className="p-2 rounded-full" style={{ backgroundColor: '#362246', color: '#FFFFFF' }}>
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Bottom Navigation - Auto Hide on Scroll */}
      {currentUser && (
        <div className={`fixed bottom-0 left-0 right-0 border-t-4 transition-all duration-300 ${!showBottomNav ? 'translate-y-32' : 'translate-y-0'}`} style={{ backgroundColor: '#FFFFFF', borderColor: '#362246' }}>
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center gap-12">
            <button 
              onClick={() => setActiveTab('home')} 
              className="p-4 rounded-full transition-all transform hover:scale-110"
              style={{ 
                backgroundColor: activeTab === 'home' ? '#362246' : '#D5D4D9', 
                color: activeTab === 'home' ? '#FFFFFF' : '#666',
                boxShadow: activeTab === 'home' ? '0 4px 12px rgba(54,34,70,0.3)' : 'none'
              }}
            >
              <Home size={28} />
            </button>
            <button 
              onClick={() => setActiveTab('messages')} 
              className="p-4 rounded-full transition-all transform hover:scale-110"
              style={{ 
                backgroundColor: activeTab === 'messages' ? '#362246' : '#D5D4D9', 
                color: activeTab === 'messages' ? '#FFFFFF' : '#666',
                boxShadow: activeTab === 'messages' ? '0 4px 12px rgba(54,34,70,0.3)' : 'none'
              }}
            >
              <Mail size={28} />
            </button>
            <button 
              onClick={() => setActiveTab('teams')} 
              className="p-4 rounded-full transition-all transform hover:scale-110"
              style={{ 
                backgroundColor: activeTab === 'teams' ? '#362246' : '#D5D4D9', 
                color: activeTab === 'teams' ? '#FFFFFF' : '#666',
                boxShadow: activeTab === 'teams' ? '0 4px 12px rgba(54,34,70,0.3)' : 'none'
              }}
            >
              <Users size={28} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
