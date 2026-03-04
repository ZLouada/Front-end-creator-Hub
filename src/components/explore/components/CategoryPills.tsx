"use client";
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './CategoryPills.module.css';

const NICHES = ["All", "Gaming", "Education", "Vlogs", "Tech", "Music", "Art", "Fitness", "Cooking"];

const CategoryPills = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={() => scroll('left')} className={styles.arrowBtn}><ChevronLeft size={18} /></button>

      <div className={styles.scrollContainer} ref={scrollRef}>
        {NICHES.map((niche) => (
          <button key={niche} className={styles.pill}>{niche}</button>
        ))}
      </div>

      <button onClick={() => scroll('right')} className={styles.arrowBtn}><ChevronRight size={18} /></button>
    </div>
  );
};

export default CategoryPills;
