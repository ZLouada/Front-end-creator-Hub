"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';
import styles from './BillingSwitch.module.css';

interface BillingSwitchProps {
  isYearly: boolean;
  onChange: (value: boolean) => void;
}

export const BillingSwitch = ({ isYearly, onChange }: BillingSwitchProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.switchContainer}>
        {/* Sliding Background */}
        <motion.div
          className={styles.slider}
          animate={{ x: isYearly ? '100%' : '0%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        <button
          onClick={() => onChange(false)}
          className={`${styles.optionBtn} ${!isYearly ? styles.optionBtnActive : ''}`}
        >
          Monthly
        </button>

        <button
          onClick={() => onChange(true)}
          className={`${styles.optionBtn} ${isYearly ? styles.optionBtnActive : ''}`}
        >
          Yearly
        </button>
      </div>

      {/* Conversion Point: Discount Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.discountBadge}
      >
        <Tag size={12} strokeWidth={2.5} className={styles.badgeIcon} />
        Save 20% with Annual
      </motion.div>
    </div>
  );
};