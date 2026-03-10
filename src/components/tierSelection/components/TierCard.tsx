"use client";

import React from 'react';
import { Check } from 'lucide-react';
import styles from './TierCard.module.css';

interface TierCardProps {
  name: string;
  price: number;
  currency?: string;
  billingCycle: 'monthly' | 'yearly';
  perks: string[];
  isRecommended?: boolean;
  isSelected?: boolean;
  onSelect: () => void;
}

export const TierCard = ({
  name,
  price,
  currency = "$",
  billingCycle,
  perks,
  isRecommended = false,
  isSelected = false,
  onSelect
}: TierCardProps) => {
  return (
    <div 
      onClick={onSelect}
      className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
    >
      {/* 1. Surgical Yellow Accent for Recommended Tiers */}
      {isRecommended && <div className={styles.recommendedBadge} />}

      {/* 2. Header Section */}
      <h3 className={styles.tierName}>{name}</h3>
      
      <div className={styles.priceContainer}>
        <span className={styles.currency}>{currency}</span>
        <span className={styles.amount}>{price}</span>
        <span className={styles.cycle}>/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
      </div>

      {/* 3. Perks Section (The "Content") */}
      <ul className={styles.perksList}>
        {perks.map((perk, index) => (
          <li key={index} className={styles.perkItem}>
            <Check size={16} strokeWidth={2} className={styles.perkIcon} />
            <span>{perk}</span>
          </li>
        ))}
      </ul>

      {/* 4. CTA: Professional Pill Button */}
      <button 
        className={`${styles.joinButton} ${isSelected ? styles.buttonPrimary : styles.buttonSecondary}`}
      >
        {isSelected ? 'Selected' : 'Select Tier'}
      </button>
    </div>
  );
};