"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Smartphone, User, Eye, ArrowRight, ShieldCheck } from 'lucide-react';
import styles from './TierPreview.module.css';

const TIER_DATA = [
  { id: 'chai', name: 'Chai Tier', price: 'PKR 500', desc: 'Basic support to keep the content flowing.' },
  { id: 'lassi', name: 'Lassi Tier', price: 'PKR 1,500', desc: 'Deep dive into the creative process.' },
  { id: 'biryani', name: 'Biryani Tier', price: 'PKR 5,000', desc: 'The ultimate VIP experience.' }
];

const TierPreview = () => {
  const [view, setView] = useState<'creator' | 'subscriber'>('subscriber');
  const [selectedTier, setSelectedTier] = useState(TIER_DATA[1]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <header className={styles.header}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={styles.label}>
            Live Demo
          </motion.div>
          <h2 className={styles.serifTitle}>
            Experience the <span className={styles.italicHighlight}>Flow.</span>
          </h2>
          
          <div className={styles.toggleContainer}>
            <div className={`${styles.toggleSlider} ${view === 'creator' ? styles.slideRight : ''}`} />
            <button 
              className={`${styles.toggleBtn} ${view === 'subscriber' ? styles.activeText : ''}`}
              onClick={() => setView('subscriber')}
            >
              <User size={14} /> Subscriber
            </button>
            <button 
              className={`${styles.toggleBtn} ${view === 'creator' ? styles.activeText : ''}`}
              onClick={() => setView('creator')}
            >
              <Eye size={14} /> Creator
            </button>
          </div>
        </header>

        <div className={styles.mainGrid}>
          {/* Tiers List */}
          <div className={styles.tierList}>
            {TIER_DATA.map((tier) => (
              <motion.div 
                key={tier.id}
                onClick={() => setSelectedTier(tier)}
                className={`${styles.tierCard} ${selectedTier.id === tier.id ? styles.selectedCard : ''}`}
                whileHover={{ x: 10 }}
              >
                <div className={styles.tierHeader}>
                  <h3 className={styles.tierTitle}>{tier.name}</h3>
                  <span className={styles.tierPrice}>{tier.price}</span>
                </div>
                <p className={styles.tierDesc}>{tier.desc}</p>
                {selectedTier.id === tier.id && (
                  <motion.div layoutId="indicator" className={styles.activeIndicator} />
                )}
              </motion.div>
            ))}
          </div>

          {/* Interactive Phone Mockup */}
          <div className={styles.showcaseArea}>
            <div className={styles.phoneMockup}>
              <div className={styles.phoneNotch} />
              <div className={styles.screenContent}>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={view + selectedTier.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    className={styles.previewContent}
                  >
                    <span className={styles.screenLabel}>
                      {view === 'subscriber' ? 'Secure Checkout' : 'Earnings Dashboard'}
                    </span>
                    <h4 className={styles.screenTitle}>
                      {view === 'subscriber' ? 'Join ' + selectedTier.name : selectedTier.name + ' Revenue'}
                    </h4>
                    
                    {view === 'subscriber' ? (
                      <div className={styles.subscriberUI}>
                        <div className={styles.paymentMethod}>
                          <p className={styles.uiLabel}>Pay with Local Wallet</p>
                          {['JazzCash', 'bKash', 'UPI'].map((p, i) => (
                            <div key={p} className={styles.paymentRow}>
                              <span>{p}</span>
                              <div className={i === 0 ? styles.dotActive : styles.dot} />
                            </div>
                          ))}
                        </div>
                        <div className={styles.summaryBox}>
                          <span>Total to Pay:</span>
                          <strong>{selectedTier.price}</strong>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.creatorUI}>
                        <div className={styles.statsMiniGrid}>
                          <div className={styles.statMiniCard}>
                            <span>Total Subs</span>
                            <p>{selectedTier.id === 'chai' ? '840' : '124'}</p>
                          </div>
                          <div className={styles.statMiniCardYellow}>
                            <span>Balance</span>
                            <p>75.2k</p>
                          </div>
                        </div>
                        <div className={styles.historyList}>
                          <p className={styles.uiLabel}>Recent Payouts</p>
                          <div className={styles.historyItem}><span>Bank Transfer</span> <span>Success</span></div>
                          <div className={styles.historyItem}><span>JazzCash</span> <span>Success</span></div>
                        </div>
                      </div>
                    )}
                    
                    <button className={styles.phoneAction}>
                      {view === 'subscriber' ? 'Confirm Payment' : 'Withdraw Funds'}
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TierPreview;