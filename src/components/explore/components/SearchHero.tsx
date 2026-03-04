"use client";

import React from 'react';
import { Search } from 'lucide-react';
import styles from './SearchHero.module.css';


interface SearchHeroProps {
  onSearchChange: (value: string) => void;
}


const SearchHero = ({ onSearchChange }: SearchHeroProps) => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>

        <h1 className={styles.heading}>
          Discover Your Next
          <span className={styles.highlightBox}> Obsession</span>
        </h1>

        <div className={styles.searchWrapper}>
            <input
                type="text"
                placeholder="Search by name, niche, or city..."
                className={styles.searchInput}
                onChange={(e) => onSearchChange(e.target.value)}
            />
          <button className={styles.searchButton}>
            <Search size={20} />
            <span className="hidden md:inline">Search</span>
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-4 text-sm font-semibold overflow-x-auto whitespace-nowrap pb-2">
          <span className="text-brand-700/60">Trending:</span>
          <a href="#" className="text-brand-900 underline decoration-2 decoration-brand-400 underline-offset-4 hover:text-brand-600 transition-colors duration-300">#Gaming</a>
          <a href="#" className="text-brand-900 underline decoration-2 decoration-brand-400 underline-offset-4 hover:text-brand-600 transition-colors duration-300">#Podcast</a>
          <a href="#" className="text-brand-900 underline decoration-2 decoration-brand-400 underline-offset-4 hover:text-brand-600 transition-colors duration-300">#Tech</a>
          <a href="#" className="text-brand-900 underline decoration-2 decoration-brand-400 underline-offset-4 hover:text-brand-600 transition-colors duration-300">#Vlog</a>
        </div>

      </div>
    </section>
  );
};

export default SearchHero;
