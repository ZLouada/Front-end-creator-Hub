"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageSquare, CreditCard, Percent, ArrowRight } from 'lucide-react';
import styles from './Comparison.module.css';

const comparisonData = [
  {
    feature: "Platform Fees",
    local: "8% Total",
    global: "12% + FX Fees",
    icon: <Percent size={18} />
  },
  {
    feature: "Payment Methods",
    local: "5+ Local Wallets",
    global: "Cards Only",
    icon: <CreditCard size={18} />
  },
  {
    feature: "Creator Support",
    local: "WhatsApp & Phone",
    global: "Email Tickets",
    icon: <MessageSquare size={18} />
  },
  {
    feature: "Payout Speed",
    local: "Instant / 24h",
    global: "Up to 14 Days",
    icon: <CheckCircle2 size={18} />
  }
];

const Comparison = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <header className={styles.headerArea}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.serifTitle}
          >
            Stop losing money to <br />
            <span className={styles.strikeWrapper}>
               Global fees
               <motion.span 
                 initial={{ width: 0 }}
                 whileInView={{ width: '100%' }}
                 transition={{ delay: 0.5, duration: 0.8 }}
                 className={styles.strikeLine} 
               />
            </span>.
          </motion.h2>
          <p className={styles.subtitle}>
            We built this because South Asian creators shouldn’t settle for 
            Western tools that ignore our banking infrastructure.
          </p>
        </header>

        <div className={styles.tableWrapper}>
          {/* Table Labels */}
          <div className={styles.gridHead}>
            <div className={styles.featureLabel}>Service</div>
            <div className={styles.brandLabel}>CreatorHub.SA</div>
            <div className={styles.globalLabel}>Others</div>
          </div>

          {/* Animated Rows */}
          <div className={styles.rowsContainer}>
            {comparisonData.map((row, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={styles.row}
              >
                {/* Feature Column */}
                <div className={styles.featureCell}>
                  <div className={styles.iconCircle}>{row.icon}</div>
                  <span className={styles.featureName}>{row.feature}</span>
                </div>

                {/* Local Column (The "Winner") */}
                <div className={styles.localCell}>
                  <div className={styles.localHighlight}>
                    <span className={styles.boldValue}>{row.local}</span>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={styles.successDot} 
                    />
                  </div>
                </div>

                {/* Global Column (The "Standard") */}
                <div className={styles.globalCell}>
                  <span className={styles.mutedValue}>{row.global}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className={styles.ctaArea}
        >
          <button className={styles.editorialButton}>
            Switch to CreatorHub <ArrowRight size={18} />
          </button>
          <p className={styles.trustText}>Transfer your subscribers in one click.</p>
        </motion.div>

      </div>
    </section>
  );
};

export default Comparison;