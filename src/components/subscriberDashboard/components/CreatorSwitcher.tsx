"use client";

import React, { useState } from 'react';
import styles from './CreatorSwitcher.module.css';

interface Creator {
  id: string;
  name: string;
  avatar: string;
  hasNew: boolean;
}

interface CreatorSwitcherProps {
  creators: Creator[];
  onSelectCreator: (id: string | null) => void;
}

const CreatorSwitcher = ({ creators, onSelectCreator }: CreatorSwitcherProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string | null) => {
    setSelectedId(id);
    onSelectCreator(id);
  };

  return (
    <div className={styles.wrapper}>
      {/* "All Feed" Option */}
      <div 
        className={styles.creatorItem} 
        onClick={() => handleSelect(null)}
      >
        <div className={`${styles.avatarContainer} ${!selectedId ? styles.activeAvatar : ''}`}>
          <div className="font-black text-xl">ALL</div>
        </div>
        <span className={styles.creatorName}>My Feed</span>
      </div>

      {/* Creator List */}
      {creators.map((creator) => (
        <div 
          key={creator.id} 
          className={styles.creatorItem} 
          onClick={() => handleSelect(creator.id)}
        >
          {creator.hasNew && <span className={styles.newBadge}>New</span>}
          
          <div className={`
            ${styles.avatarContainer} 
            ${selectedId === creator.id ? styles.activeAvatar : ''}
            ${creator.hasNew && selectedId !== creator.id ? styles.hasNewContent : ''}
          `}>
            <img 
              src={creator.avatar} 
              alt={creator.name} 
              className={styles.avatarImage} 
            />
          </div>
          <span className={styles.creatorName}>{creator.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CreatorSwitcher;