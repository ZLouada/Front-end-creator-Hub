"use client";

import { useState, useEffect } from 'react';
import CreatorSwitcher from './components/CreatorSwitcher';
import FeedPost from './components/FeedPost';
import SubStatus from './components/SubStatus';
import LocalDiscovery from './components/LocalDiscovery';
import { Header } from '../header/Header';

// 1. Data Interfaces
interface Post {
  id: string;
  creatorId: string;
  tierId: string;
  type: string;
  publishedAt: string;
  text: string;
  mediaURL: string;
  title: string;
}

export default function SubscriberFeed() {
  // 2. State Management
  const [posts, setPosts] = useState<Post[]>([]);
  const [subData, setSubData] = useState<any[]>([]); // To store API subscription array
  const [loading, setLoading] = useState(true);

  // 3. Mock Data (Restored)
  const mockCreators = [
    { id: '1', name: 'Ali Solangi', avatar: 'https://i.pravatar.cc/150?u=1', hasNew: true },
    { id: '2', name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=2', hasNew: false },
    { id: '3', name: 'Nabil Ahmed', avatar: 'https://i.pravatar.cc/150?u=3', hasNew: true },
  ];

  // Mock User ID
  const userID = "67d345f1b2e8c9a012345678";

  const trendingCreators = [
    { 
      id: 'lc1', 
      name: 'Zaid Ali', 
      avatar: 'https://i.pravatar.cc/150?u=9', 
      paymentMethod: 'JazzCash', 
      category: 'Vlogger' 
    },
    { 
      id: 'lc2', 
      name: 'Tech With Amna', 
      avatar: 'https://i.pravatar.cc/150?u=10', 
      paymentMethod: 'Easypaisa', 
      category: 'Education' 
    },
  ];

  // 4. API Fetch Logic
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // 1. Fetch Posts (Your previous API)
        const postsRes = await fetch('https://api-creators-hub.vercel.app/api/v1/content');
        const postsJson = await postsRes.json();
        setPosts(postsJson);

        // 2. Fetch Subscriptions (The new API)
        const subsRes = await fetch(`https://api-creators-hub.vercel.app/api/v1/subscriptions/user/${userID}`);
        const subsJson = await subsRes.json();
        setSubData(subsJson);

      } catch (error) {
        console.error('Data sync failed:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleCreatorSelect = (id: string | null) => {
    console.log("Filtering feed by creator ID:", id);
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] dark:bg-[#0C0C0F]">
      <Header /> 
      
      {/* TOP BAR: Creator Switcher */}
      <div className="sticky top-[72px] z-40 bg-white dark:bg-[#111115] border-b border-gray-100 dark:border-[#27272F]">
        <CreatorSwitcher 
          creators={mockCreators} 
          onSelectCreator={handleCreatorSelect} 
        />
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        
        {/* CENTER: Main Feed Area */}
        <main className="flex-1 py-6 px-4 sm:py-12 sm:px-6">
          <header className="mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-4xl font-serif font-semibold">Your Feed</h1>
            <p className="font-bold text-gray-500 dark:text-gray-400">Updates from the creators you support.</p>
          </header>

          <div className="space-y-12">
            {loading ? (
              <p className="text-center py-20 text-gray-400 font-sans italic">Curating your creative updates...</p>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <FeedPost 
                  key={post.id}
                  type={post.type as "image" | "video" | "text"}
                  creator="Creator Name" // Placeholder until we link User API
                  tier="Exclusive Perk" 
                  timestamp={new Date(post.publishedAt).toLocaleDateString()} 
                  content={post.text}
                  mediaUrl={post.mediaURL}
                  isLocked={false} 
                />
              ))
            ) : (
              <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl">
                <p className="text-gray-400">No new posts found.</p>
              </div>
            )}
          </div>
        </main>

        {/* RIGHT SIDEBAR: Restored Stats & Discovery */}
        <aside className="hidden xl:flex flex-col w-96 p-8 space-y-8">
          <SubStatus 
            creatorsSupported={subData.length} // Dynamic count from API
            savingsAmount="PKR 2,400" // Hardcoded for now
            nextBillingDate="April 12" 
            daysRemaining={28}
            activeTier={subData[0]?.tierName || "Basic"} // Getting tier name from first sub
            perkUsed={3}
            perkTotal={10}
            perkName="Exclusive Discord Access"
          />
          

          <LocalDiscovery // Hard coded
            city="Lahore" 
            creators={trendingCreators} 
          />
        </aside>

      </div>
    </div>
  );
}