"use client";

import React from 'react';
import { Zap, Heart, Coffee } from 'lucide-react';
import styles from './TrendingCreators.module.css';

const RECENT_ACTIVITY = [
  { id: 1, user: "Sami", creator: "Ali Solangi", action: "bought 5 coffees", time: "2m ago" },
  { id: 2, user: "Fatima", creator: "Chef Rahat", action: "joined Biryani Tier", time: "12m ago" },
  { id: 3, user: "Zayan", creator: "TechWithK", action: "supported", time: "25m ago" },
  { id: 4, user: "Sara", creator: "VlogLife", action: "bought 3 coffees", time: "1h ago" },
];

const TrendingCreators = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <Zap size={20} className={styles.pulseIcon} fill="currentColor" />
        <h2 className="font-semibold font-serif">Live Activity</h2>
      </div>

      <div className={styles.feedList}>
        {RECENT_ACTIVITY.map((item) => (
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

      <button className={styles.footerBtn}>
        View Leaderboard
      </button>
    </aside>
  );
};

export default TrendingCreators;
