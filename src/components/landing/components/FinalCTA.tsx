"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import styles from './FinalCTA.module.css';

const FinalCTA = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.section}>
      {/* Background Decorative Element */}
      <div className={styles.ambientOrb} />

      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.contentBox}
        >
          {/* Minimalist Badge */}
          <div className={styles.statusBadge}>
            <Sparkles size={14} className={styles.yellowIcon} />
            <span>500+ creators joined this week</span>
          </div>

          <h2 className={styles.serifHeading}>
            Stop Waiting.<br />
            <span className={styles.italicHighlight}>Start Earning.</span>
          </h2>
          
          <p className={styles.description}>
            The only platform designed specifically for the South Asian creator economy. 
            Get paid directly into your JazzCash, bKash, or local bank account—no delays, no hidden fees.
          </p>
          
          <div className={styles.actionWrapper}>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={styles.mainPill}
              onClick={() => navigate('/')}
            >
              Launch Your Studio
              <ArrowRight size={20} strokeWidth={2.5} />
            </motion.button>
            
            <div className={styles.trustRow}>
              <ShieldCheck size={16} strokeWidth={2} className={styles.shieldIcon} />
              <span>No credit card required. Setup takes 2 minutes.</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer-like Hairline Divider */}
      <div className={styles.footerDivider} />
    </section>
  );
};

export default FinalCTA;