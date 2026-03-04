"use client";

import React, { useState } from 'react';
import { Check, Smartphone, User, Eye, ArrowRight } from 'lucide-react';
import styles from './TierPreview.module.css';

const TIER_DATA = [
  {
    id: 'chai',
    name: 'Chai Tier',
    price: 'PKR 500',
    desc: 'Basic support to keep the content flowing.',
    features: ['Early access to videos', 'Subscriber badge', 'Exclusive polls'],
    color: 'bg-white'
  },
  {
    id: 'lassi',
    name: 'Lassi Tier',
    price: 'PKR 1,500',
    desc: 'Deep dive into the creative process.',
    features: ['Discord Access', 'Behind the scenes', 'Monthly Q&A'],
    color: 'bg-white'
  },
  {
    id: 'biryani',
    name: 'Biryani Tier',
    price: 'PKR 5,000',
    desc: 'The ultimate VIP experience.',
    features: ['Personal Shoutouts', '1-on-1 monthly call', 'Physical merch (SA only)'],
    color: 'bg-brand-400'
  }
];

const TierPreview = () => {
  const [view, setView] = useState<'creator' | 'subscriber'>('subscriber');
  const [selectedTier, setSelectedTier] = useState(TIER_DATA[1]);

  return (
    <section className="bg-surface py-24">
      <div className={styles.container}>
        
        {/* Toggle Switch */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-brand-900 mb-6">Experience the Flow</h2>
          <div className={styles.toggleContainer}>
            <button 
              className={`${styles.toggleBtn} ${view === 'subscriber' ? styles.activeToggle : ''}`}
              onClick={() => setView('subscriber')}
            >
              <Eye size={16} className="inline mr-2" /> Subscriber View
            </button>
            <button 
              className={`${styles.toggleBtn} ${view === 'creator' ? styles.activeToggle : ''}`}
              onClick={() => setView('creator')}
            >
              <User size={16} className="inline mr-2" /> Creator View
            </button>
          </div>
        </div>

        <div className={styles.mainGrid}>
          {/* Tiers List */}
          <div className="space-y-6">
            {TIER_DATA.map((tier) => (
              <div 
                key={tier.id}
                onClick={() => setSelectedTier(tier)}
                className={`${styles.tierCard} ${selectedTier.id === tier.id ? styles.activeCard : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-brand-900">{tier.name}</h3>
                    <p className="text-gray-500 font-semibold">{tier.price} / month</p>
                  </div>
                  {selectedTier.id === tier.id && (
                    <span className="bg-success p-1 rounded-full">
                      <Check size={16} className="text-white" />
                    </span>
                  )}
                </div>
                <p className="mt-4 text-gray-600">{tier.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile Mockup */}
          <div className="flex flex-col items-center">
            <p className="mb-4 font-bold text-sm text-brand-700 flex items-center gap-2">
              <Smartphone size={18} /> Interactive Checkout Preview
            </p>
            <div className={styles.phoneMockup}>
              <div className={styles.phoneScreen}>
                {/* Status Bar */}
                <div className="flex justify-between text-[10px] font-bold mb-6 text-gray-400">
                    <span>9:41</span>
                    <div className="flex gap-1">
                    <span>LTE</span>
                    <span>100%</span>
                    </div>
                </div>

                <div className="flex-grow">
                    {view === 'subscriber' ? (
                    <div className="animate-in fade-in duration-300">
                        <p className="text-[10px] font-bold text-success uppercase mb-1">Secure Checkout</p>
                        <h4 className="text-xl font-bold leading-tight">Join the Club</h4>
                        
                        <div className="mt-4 p-4 border border-brand-300/20 rounded-xl bg-white shadow-soft-sm">
                        <p className="text-xs font-semibold text-gray-400">Selected Tier</p>
                        <p className="text-sm font-bold">{selectedTier.name}</p>
                        <p className="text-lg font-bold text-brand-900">{selectedTier.price}</p>
                        </div>

                        <div className="mt-6 space-y-2">
                        <p className="text-[10px] font-semibold uppercase text-gray-500">Pay via Local Wallet</p>
                        {['JazzCash', 'bKash', 'EasyPaisa'].map((pay) => (
                            <div key={pay} className="flex items-center justify-between p-2 border border-brand-300/20 rounded-lg bg-white">
                            <span className="text-xs font-bold">{pay}</span>
                            <div className={`w-3 h-3 border-2 border-brand-300 rounded-full ${pay === 'JazzCash' ? 'bg-brand-400' : ''}`} />
                            </div>
                        ))}
                        </div>
                    </div>
                    ) : (
                    <div className="animate-in slide-in-from-bottom-2 duration-300">
                        <p className="text-[10px] font-bold text-brand-400 uppercase mb-1">Creator Studio</p>
                        <h4 className="text-xl font-bold leading-tight">Your {selectedTier.name} Stats</h4>
                        
                        <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="p-3 border border-brand-300/20 rounded-xl bg-white">
                            <p className="text-[10px] font-semibold text-gray-400 uppercase">Subscribers</p>
                            <p className="text-lg font-bold">
                                {selectedTier.id === 'chai' ? '840' : selectedTier.id === 'lassi' ? '310' : '92'}
                            </p>
                        </div>
                        <div className="p-3 border border-brand-300/20 rounded-xl bg-gradient-to-br from-brand-400 to-brand-500">
                            <p className="text-[10px] font-semibold text-brand-900 uppercase">Monthly</p>
                            <p className="text-lg font-bold">{selectedTier.price.replace('PKR ', 'Rs ')}</p>
                        </div>
                        </div>

                        <div className="mt-6">
                        <p className="text-[10px] font-semibold uppercase text-gray-500 mb-2">Recent {selectedTier.name} Payouts</p>
                        <div className="space-y-2">
                            {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-2 border-b border-brand-300/10">
                                <span className="text-xs font-bold text-success">+ {selectedTier.price}</span>
                                <span className="text-[10px] font-medium text-gray-400">{i}h ago</span>
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    )}
                </div>

                <button className={styles.checkoutBtn}>
                    {view === 'subscriber' ? `Pay ${selectedTier.price}` : 'Withdraw Funds'}
                    <ArrowRight size={18} className="inline ml-1" />
                </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TierPreview;
