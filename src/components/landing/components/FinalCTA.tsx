import React from 'react';
import { Rocket, CheckCircle2 } from 'lucide-react';
import styles from './FinalCTA.module.css';

const FinalCTA = () => {
  return (
    <section className={styles.section}>
      <div className="container mx-auto px-6 relative z-10">
        
        <h2 className={styles.heading}>
          Stop Waiting.<br />
          Start Earning.
        </h2>
        
        <button className={styles.button}>
          Launch Your Hub Today
          <Rocket size={24} />
        </button>

        <div className={styles.subtextContainer}>
          <CheckCircle2 size={24} className={styles.checkIcon} />
          <span>No credit card required to start.</span>
        </div>

      </div>

      {/* Optional: Abstract background shapes to add texture to the massive yellow block */}
      <div className="absolute top-10 left-10 w-32 h-32 border-8 border-brand-charcoal rounded-full opacity-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border-8 border-brand-charcoal rotate-45 opacity-10 pointer-events-none" />
    </section>
  );
};

export default FinalCTA;