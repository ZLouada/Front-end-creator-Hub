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

const ExploreCard = ({
  name,
  category,
  supporters,
  rating,
  imageUrl,
  startingPrice
}: ExploreCardProps) => {
  return (
    <div className={styles.card}>
      {/* Top Image Section */}
      <div className={styles.imageWrapper}>
        <span className={styles.categoryBadge}>{category}</span>
        <img
          src={imageUrl}
          alt={name}
          className={styles.creatorImage}
        />
      </div>

      {/* Info Section */}
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>

        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <Users size={16} strokeWidth={2.5} />
            {supporters}
          </div>
          <div className={styles.statItem}>
            <Star size={16} fill="#FFDD00" strokeWidth={2.5} className="text-brand-400" />
            {rating}
          </div>
        </div>

        <p className="text-xs font-semibold text-brand-700/60 tracking-wider">
          Support starting at <span className="text-brand-900 font-bold">{startingPrice}</span>
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
