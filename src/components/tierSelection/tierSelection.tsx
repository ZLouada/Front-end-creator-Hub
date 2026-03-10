"use client";

import React, { useState } from 'react';
import { EditorialModal } from './components/EditorialModal';
import { ModalHeader } from './components/ModalHeader';
import { BillingSwitch } from './components/BillingSwitch';
import { TierCard } from './components/TierCard';
import { ModalFooter } from './components/ModalFooter';
import styles from './TierSelection.module.css';

// 1. Data Structure: Defining your editorial tiers
const TIERS = [
  {
    id: 'base',
    name: 'Supporter',
    monthlyPrice: 5,
    yearlyPrice: 48,
    perks: ['Early access to sketches', 'Supporter-only badge', 'Monthly newsletter'],
    recommended: false,
  },
  {
    id: 'pro',
    name: 'Art Patron',
    monthlyPrice: 15,
    yearlyPrice: 144,
    perks: ['Everything in Supporter', 'High-res wallpapers', 'Behind-the-scenes video', 'Discord access'],
    recommended: true, // This triggers the Surgical Yellow top border
  },
  {
    id: 'elite',
    name: 'Collector',
    monthlyPrice: 50,
    yearlyPrice: 480,
    perks: ['Everything in Patron', 'Physical signed print', 'Quarterly 1-on-1 call', 'Credit in videos'],
    recommended: false,
  }
];

export const TierSelection = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  // 2. State Management
  const [isYearly, setIsYearly] = useState(false);
  const [selectedId, setSelectedId] = useState('pro'); // Default to recommended

  const currentTier = TIERS.find(t => t.id === selectedId) || TIERS[1];
  const currentPrice = isYearly ? currentTier.yearlyPrice : currentTier.monthlyPrice;

  const handleConfirm = () => {
    console.log(`Proceeding with ${currentTier.name} on ${isYearly ? 'yearly' : 'monthly'} billing.`);
    // Trigger your payment logic here
  };

  return (
    <EditorialModal 
      isOpen={isOpen} 
      onClose={onClose} 
      maxWidth="1100px" // Wider for the 3-card layout
    >
      <div className={styles.container}>
        
        {/* Header Section */}
        <ModalHeader 
          creatorName="Walid" 
          tagline="Choose a membership tier to unlock exclusive content and support the future of this hub."
          avatarUrl="/path-to-your-avatar.jpg"
        />

        {/* Billing Selection */}
        <BillingSwitch 
          isYearly={isYearly} 
          onChange={setIsYearly} 
        />

        {/* Tier Cards Grid */}
        <div className={styles.tierGrid}>
          {TIERS.map((tier) => (
            <TierCard
              key={tier.id}
              name={tier.name}
              price={isYearly ? tier.yearlyPrice : tier.monthlyPrice}
              billingCycle={isYearly ? 'yearly' : 'monthly'}
              perks={tier.perks}
              isRecommended={tier.recommended}
              isSelected={selectedId === tier.id}
              onSelect={() => setSelectedId(tier.id)}
            />
          ))}
        </div>

        {/* Action Summary Footer */}
        <ModalFooter 
          selectedTierName={currentTier.name}
          price={`$${currentPrice}`}
          billingCycle={isYearly ? 'yearly' : 'monthly'}
          onConfirm={handleConfirm}
        />

      </div>
    </EditorialModal>
  );
};