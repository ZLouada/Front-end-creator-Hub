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
          <span className={styles.highlightBox}>Obsession</span>
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

        <div className="mt-8 flex justify-center gap-4 text-sm font-black uppercase overflow-x-auto whitespace-nowrap pb-2">
          <span className="text-gray-500">Trending:</span>
          <a href="#" className="underline decoration-4 decoration-brand-charcoal hover:text-white">#Gaming</a>
          <a href="#" className="underline decoration-4 decoration-brand-charcoal hover:text-white">#Podcast</a>
          <a href="#" className="underline decoration-4 decoration-brand-charcoal hover:text-white">#Tech</a>
          <a href="#" className="underline decoration-4 decoration-brand-charcoal hover:text-white">#Vlog</a>
        </div>

      </div>
    </section>
  );
};

export default SearchHero;