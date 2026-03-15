"use client";

import React from 'react';
import { Users, Coffee, Star } from 'lucide-react';
import styles from './ExploreCard.module.css';

interface ExploreCardProps {
  name: string;
  category: string;
  supporters: string;
  rating: string;
  imageUrl: string;
  startingPrice: string;
}

async function fetchUsers() {
  const apiUrl = 'https://api-creators-hub.vercel.app/api/v1/users/all';
  console.log("test");
  const response = await fetch(apiUrl);
  const users = await response.json();

  return users;
}

fetchUsers()
  .then((users) => {
    console.log('List of users:', users);
  })
  .catch((error) => {
    console.error('Failed to retrieve users:', error);
  });


const ExploreCard = (
  data : ExploreCardProps) => {
  return (
    <div className={styles.card}>
      {/* Top Image Section */}
      <div className={styles.imageWrapper}>
        <span className={styles.categoryBadge}>{data.category}</span>
        <img
          src={data.imageUrl}
          alt={data.name}
          className={styles.creatorImage}
        />
      </div>

      {/* Info Section */}
      <div className={styles.content}>
        <h3 className={`${styles.name} font-serif`}>{data.name}</h3>

        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <Users size={16} />
            {data.supporters}
          </div>
          <div className={styles.statItem}>
            <Star size={16} fill="#D1D5DB" className="text-gray-300" />
            {data.rating}
          </div>
        </div>

        <p className="text-xs font-semibold text-muted tracking-wider">
          Support starting at <span className="text-brand-900 font-bold">{data.startingPrice}</span>
        </p>
      </div>

      {/* Action Section */}
      <div className={styles.footer}>
        <button className={styles.ctaButton}>
          <Coffee size={20} />
          Support Creator
        </button>
      </div>
    </div>
  );
};

export default ExploreCard;
