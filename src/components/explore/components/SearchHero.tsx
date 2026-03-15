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

        <h1 className={`${styles.heading} font-serif`}>
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
<<<<<<< HEAD
          <span className="text-muted">Trending:</span>
          <a href="#" className="text-brand-900 underline decoration-2 decoration-gray-300 dark:decoration-gray-600 underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">#Gaming</a>
          <a href="#" className="text-brand-900 underline decoration-2 decoration-gray-300 dark:decoration-gray-600 underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">#Podcast</a>
          <a href="#" className="text-brand-900 underline decoration-2 decoration-gray-300 dark:decoration-gray-600 underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">#Tech</a>
          <a href="#" className="text-brand-900 underline decoration-2 decoration-gray-300 dark:decoration-gray-600 underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">#Vlog</a>
=======
          <span className="text-gray-500 dark:text-gray-400">Trending:</span>
          
          {/* Added dark:text-gray-50 and dark:decoration-gray-700 */}
          <a href="#" className="text-brand-900 dark:text-gray-50 underline decoration-2 decoration-gray-300 dark:decoration-gray-700 underline-offset-4 hover:text-gray-600 dark:hover:text-gray-600 transition-colors duration-300">
            #Gaming
          </a>
          
          <a href="#" className="text-brand-900 dark:text-gray-50 underline decoration-2 decoration-gray-300 dark:decoration-gray-700 underline-offset-4 hover:text-gray-600 dark:hover:text-gray-600 transition-colors duration-300">
            #Podcast
          </a>
          
          <a href="#" className="text-brand-900 dark:text-gray-50 underline decoration-2 decoration-gray-300 dark:decoration-gray-700 underline-offset-4 hover:text-gray-600 dark:hover:text-gray-600 transition-colors duration-300">
            #Tech
          </a>
          
          <a href="#" className="text-brand-900 dark:text-gray-50 underline decoration-2 decoration-gray-300 dark:decoration-gray-700 underline-offset-4 hover:text-gray-600 dark:hover:text-gray-600 transition-colors duration-300">
            #Vlog
          </a>
>>>>>>> 8bf48b7c6ec669e75042b67aa2da3c87d47f98b0
        </div>

      </div>
    </section>
  );
};

export default SearchHero;
