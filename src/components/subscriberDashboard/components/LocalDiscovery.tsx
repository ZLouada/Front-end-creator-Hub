"use client";

import React from 'react';
import { MapPin, CreditCard, ChevronRight, CheckCircle } from 'lucide-react';
import styles from './LocalDiscovery.module.css';

interface LocalCreator {
  id: string;
  name: string;
  avatar: string;
  paymentMethod: string; // e.g., "JazzCash"
  category: string;
}

interface LocalDiscoveryProps {
  city: string;
  creators: LocalCreator[];
}

const LocalDiscovery = ({ city, creators }: LocalDiscoveryProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.cityBadge}>Near You</span>
        <h3 className={`${styles.title} font-serif`}>Trending in {city}</h3>
      </div>

      <div className={styles.creatorList}>
        {creators.map((creator) => (
          <div key={creator.id} className={styles.creatorItem}>
            <img 
              src={creator.avatar} 
              alt={creator.name} 
              className={styles.avatar} 
            />
            <div className={styles.info}>
              <span className={styles.name}>{creator.name}</span>
              <div className={styles.paymentTag}>
                <CheckCircle size={10} />
                Accepts {creator.paymentMethod}
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-400 dark:text-gray-500" />
          </div>
        ))}
      </div>

      <button className={styles.viewAllBtn}>
        Explore {city} Creators
      </button>

      <div className="flex items-center justify-center gap-2 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase">
        <CreditCard size={12} />
        Secure Local Payments
      </div>
    </div>
  );
};

export default LocalDiscovery;