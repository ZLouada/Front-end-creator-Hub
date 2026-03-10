"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Smartphone, Coins, ArrowUpRight } from 'lucide-react';
import styles from './LocalAdvantage.module.css';

const advantages = [
  {
    title: "Direct Payouts",
    desc: "Withdraw your earnings directly to JazzCash, bKash, or local bank accounts instantly. No middle-man currency delays.",
    icon: <Wallet size={20} strokeWidth={1.5} />,
    tags: ["JazzCash", "bKash", "UPI"]
  },
  {
    title: "Localized Pricing",
    desc: "Set tiers in PKR, INR, or BDT. Your fans pay exactly what they see without hidden bank conversion surcharges.",
    icon: <Coins size={20} strokeWidth={1.5} />,
    tags: ["PKR", "INR", "BDT"]
  },
  {
    title: "Mobile-First Access",
    desc: "Remove barriers by allowing supporters to subscribe via mobile balance or local digital wallets.",
    icon: <Smartphone size={20} strokeWidth={1.5} />,
    tags: ["Mobile Pay", "Wallets"]
  }
];

const LocalAdvantage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Editorial Header */}
        <header className={styles.headerArea}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.label}
          >
            The Infrastructure
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={styles.serifTitle}
          >
            Built for the <br />
            <span className={styles.italicHighlight}>South Asian economy.</span>
          </motion.h2>
        </header>

        {/* Feature List: Vertical Ledger Style */}
        <div className={styles.featureList}>
          {advantages.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={styles.featureItem}
            >
              <div className={styles.indexColumn}>
                <span className={styles.indexNumber}>0{index + 1}</span>
                <div className={styles.verticalHairline} />
              </div>
              
              <div className={styles.contentColumn}>
                <div className={styles.titleRow}>
                  <div className={styles.iconWrapper}>{item.icon}</div>
                  <h3 className={styles.featureTitle}>{item.title}</h3>
                </div>
                
                <p className={styles.featureDesc}>{item.desc}</p>
                
                <div className={styles.tagGroup}>
                  {item.tags.map((tag, tIndex) => (
                    <span key={tIndex} className={styles.tag}>
                      <span className={styles.tagDot} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <motion.div 
                whileHover={{ x: 5, y: -5 }}
                className={styles.actionColumn}
              >
                <div className={styles.arrowCircle}>
                  <ArrowUpRight size={18} />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalAdvantage;