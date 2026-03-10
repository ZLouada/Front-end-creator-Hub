"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import styles from './SocialProof.module.css';

const CREATORS = [
  {
    name: "Zoya Ahmed",
    location: "Lahore, PK",
    handle: "@zoyacreates",
    quote: "Finally, I don't have to explain to my fans why international cards are getting declined. JazzCash payouts are a lifesaver.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Rohan Das",
    location: "Mumbai, IN",
    handle: "@rohan_vlogs",
    quote: "Switching from Patreon saved me 15% in conversion fees alone. The UPI integration makes subscribing instant for my audience.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Tanvir Hossain",
    location: "Dhaka, BD",
    handle: "@tanvir_tech",
    quote: "Direct bKash integration is the game changer. My community can finally support my work without a credit card.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"
  }
];

const SocialProof = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <header className={styles.header}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.serifTitle}
          >
            Join <span className={styles.italicHighlight}>500+ creators</span> <br />
            from Lahore, Mumbai, and Dhaka.
          </motion.h2>
          <div className={styles.surgicalUnderline} />
        </header>

        <div className={styles.testimonialGrid}>
          {CREATORS.map((creator, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className={styles.testimonialCard}
            >
              <div className={styles.quoteWrapper}>
                <Quote size={28} className={styles.minimalQuote} strokeWidth={1} />
                <p className={styles.serifQuote}>{creator.quote}</p>
              </div>
              
              <div className={styles.creatorMeta}>
                <div className={styles.avatarContainer}>
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className={styles.editorialAvatar}
                  />
                  <div className={styles.verifiedDot} />
                </div>
                <div className={styles.metaText}>
                  <h4 className={styles.creatorName}>{creator.name}</h4>
                  <p className={styles.creatorSub}>
                    {creator.location} <span className={styles.dotSeparator}>•</span> {creator.handle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Grounding Stats Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={styles.editorialStats}
        >
          <div className={styles.statItem}>
            <CheckCircle2 size={14} className={styles.yellowIcon} />
            <span>Verified Local Payouts</span>
          </div>
          <div className={styles.statItem}>
            <Star size={14} fill="#FFDD00" stroke="#FFDD00" />
            <span>4.9/5 Average Rating</span>
          </div>
          <div className={styles.statItem}>
            <CheckCircle2 size={14} className={styles.yellowIcon} />
            <span>Zero Border Fees</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;