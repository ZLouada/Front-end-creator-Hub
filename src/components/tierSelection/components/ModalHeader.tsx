"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import styles from './ModalHeader.module.css';

interface ModalHeaderProps {
  creatorName: string;
  tagline: string;
  avatarUrl?: string;
}

export const ModalHeader = ({ creatorName, tagline, avatarUrl }: ModalHeaderProps) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={styles.heroContainer}
    >
      {/* Avatar Section */}
      <div className={styles.avatarWrapper}>
        <img 
          src={avatarUrl || "/api/placeholder/80/80"} 
          alt={creatorName} 
          className={styles.avatar} 
        />
        <div className={styles.statusDot} />
      </div>

      {/* Text Content */}
      <h1 className={styles.title}>
        Support {creatorName}
      </h1>
      
      <p className={styles.subtitle}>
        {tagline}
      </p>

      {/* Decorative Editorial Element */}
      <div className={styles.divider} />
      
      <div className="flex items-center gap-2 mt-4 text-[#9CA3AF]">
        <Sparkles size={14} strokeWidth={1.5} />
        <span className="text-[10px] font-bold uppercase tracking-widest font-sans">
          Member Exclusive
        </span>
      </div>
    </motion.header>
  );
};