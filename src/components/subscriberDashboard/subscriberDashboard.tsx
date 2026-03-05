import CreatorSwitcher from './components/CreatorSwitcher';
import FeedPost from './components/FeedPost';
import SubStatus from './components/SubStatus';
import LocalDiscovery from './components/LocalDiscovery';
import { Header} from '../header/Header';


export default function SubscriberFeed() {
  // mock data
  const mockCreators = [
    { id: '1', name: 'Ali Solangi', avatar: 'https://i.pravatar.cc/150?u=1', hasNew: true },
    { id: '2', name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=2', hasNew: false },
    { id: '3', name: 'Nabil Ahmed', avatar: 'https://i.pravatar.cc/150?u=3', hasNew: true },
  ];

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

  // selection handler
  const handleCreatorSelect = (id: string | null) => {
    console.log("Filtering feed by creator ID:", id);
    // use ID to filter FeedPost data
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] dark:bg-[#0A0A0A]">
      <Header /> 
      
      {/* 1. TOP BAR: Sticky Header Switcher */}
      {/* Pulling this out of the 'flex-row' fixes the layout squishing */}
      <div className="sticky top-0 z-50 bg-white dark:bg-[#141414]">
        <CreatorSwitcher 
          creators={mockCreators} 
          onSelectCreator={handleCreatorSelect} 
        />
      </div>

      {/* 2. Main Content Wrapper */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        
        {/* CENTER: Main Feed Area */}
        <main className="flex-1 py-6 px-4 sm:py-12 sm:px-6">
          <header className="mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-4xl font-black uppercase italic">Your Feed</h1>
            <p className="font-bold text-gray-500 dark:text-gray-400">Updates from the creators you support.</p>
          </header>

          <div className="space-y-12">
            <FeedPost 
              type="image"
              creator="Ali Solangi"
              tier="Chai Tier"
              timestamp="Yesterday" 
              content="New behind the scenes from the Karachi shoot!"
              mediaUrl="/api/placeholder/800/500"
              isLocked={false}
            />

            <FeedPost 
              type="video"
              creator="Priya Sharma"
              tier="Biryani Tier"
              timestamp="2 hours ago"
              content="Exclusive: How I monetize my 100k audience."
              isLocked={true} 
            />
          </div>
        </main>

        {/* 3. RIGHT SIDEBAR: Stats & Discovery */}
        {/* We cleaned up the redundant 'aside' tags here */}
        <aside className="hidden xl:flex flex-col w-96 p-8 space-y-8">
          <SubStatus 
            creatorsSupported={5}
            savingsAmount="PKR 2,500"
            nextBillingDate="March 28"
            daysRemaining={12}
            activeTier="Biryani"
            perkUsed={2}
            perkTotal={5}
            perkName="Monthly 1-on-1 Calls"
          />
          
          <LocalDiscovery 
            city="Lahore" 
            creators={trendingCreators} 
          />
        </aside>
      </div>
    </div>
  );
}
