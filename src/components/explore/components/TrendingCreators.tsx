"use client";

import React, { useState, useEffect } from 'react';
import { Zap, Heart } from 'lucide-react';
import styles from './TrendingCreators.module.css';

// 1. Define the shape of a "Live Event"
interface ActivityEvent {
  id: string;
  user: string;
  creator: string;
  action: string;
  time: string;
}

const TrendingCreators = () => {
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveActivity() {
      try {
        // We fetch subscriptions to see who joined what recently
        const response = await fetch('https://api-creators-hub.vercel.app/api/v1/subscriptions');
        const data = await response.json();

        // 2. Map the "Subscription" data into "Activity" format
        // In a real app, your backend should join these tables so you get names, not just IDs
        const formattedActivities = data.slice(0, 5).map((sub: any, index: number) => ({
          id: sub.id || index.toString(),
          user: `User_${sub.userId.slice(0, 4)}`, // Fallback since names aren't in this API yet
          creator: `Creator_${sub.creatorId.slice(0, 4)}`,
          action: "joined the inner circle",
          time: "Just now"
        }));

        setActivities(formattedActivities);
      } catch (error) {
        console.error("Failed to fetch activity:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveActivity();
    
    // Optional: Poll every 30 seconds to keep it "Live"
    const interval = setInterval(fetchLiveActivity, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <Zap size={20} className={styles.pulseIcon} fill="currentColor" />
        <h2 className="font-semibold font-serif">Live Activity</h2>
      </div>

      <div className={styles.feedList}>
        {loading ? (
          <div className="p-4 text-xs text-gray-400 animate-pulse">Syncing live events...</div>
        ) : activities.map((item) => (
          <div key={item.id} className={styles.feedItem}>
            <div className={styles.avatarWrapper}>
               <Heart size={16} fill="#1A1A1A" />
            </div>

            <div className={styles.info}>
              <p className={styles.activityText}>
                <span className="font-bold">{item.user}</span> {item.action} for <span className={styles.highlight}>{item.creator}</span>
              </p>
              <span className={styles.timeTag}>{item.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* <button className={styles.footerBtn}>
        View Leaderboard
      </button> */}
    </aside>
  );
};

export default TrendingCreators;