"use client";

import React from 'react';
import { Zap, Users, Calendar, CreditCard } from 'lucide-react';
import styles from './SubStatus.module.css';

interface SubStatusProps {
  creatorsSupported: number;
  savingsAmount: string; // e.g., "PKR 1,200"
  nextBillingDate: string; // e.g., "March 15"
  daysRemaining: number;
  activeTier: string;
  perkUsed: number;
  perkTotal: number;
  perkName: string;
}

const SubStatus = ({
  creatorsSupported,
  savingsAmount,
  nextBillingDate,
  daysRemaining,
  activeTier,
  perkUsed,
  perkTotal,
  perkName
}: SubStatusProps) => {
  const progressPercentage = (perkUsed / perkTotal) * 100;

  return (
    <div className={styles.card}>
      <h3 className={`${styles.title} font-serif`}>
        <Zap size={20} fill="#1A1A1A" className="dark:fill-white" />
        My Membership
      </h3>

      <div className={styles.statsGrid}>
        <div className={styles.statBox}>
          <p className={styles.statLabel}>Following</p>
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span className={styles.statValue}>{creatorsSupported}</span>
          </div>
        </div>
        <div className={styles.statBox}>
          <p className={styles.statLabel}>Total Savings</p>
          <div className="flex items-center gap-2">
            <CreditCard size={16} />
            <span className={styles.statValue}>{savingsAmount}</span>
          </div>
        </div>
      </div>

      <div className={styles.billingSection}>
        <div className="flex items-start gap-3">
          <Calendar size={18} className="mt-1" />
          <p className={styles.billingText}>
            {daysRemaining} days until 
            <span className={styles.billingDate}>{activeTier} Tier</span>
            renews on {nextBillingDate}.
          </p>
        </div>
        <div className={styles.savingsBadge}>Annual Plan Active</div>
      </div>

      <div className={styles.perksSection}>
        <div className={styles.perksHeader}>
          <span className={styles.perksLabel}>{perkName}</span>
          <span className={styles.perksLabel}>
            {perkUsed}/{perkTotal}
          </span>
        </div>
        <div className={styles.progressBarContainer}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase">
          Resets in {daysRemaining} days
        </p>
      </div>
    </div>
  );
};

export default SubStatus;