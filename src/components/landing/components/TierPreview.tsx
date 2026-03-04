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
    color: 'bg-brand-yellow' // Premium highlighted
  }
];

const TierPreview = () => {
  const [view, setView] = useState<'creator' | 'subscriber'>('subscriber');
  const [selectedTier, setSelectedTier] = useState(TIER_DATA[1]);

  return (
    <section className="bg-brand-white py-24">
      <div className={styles.container}>
        
        {/* Toggle Switch */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black uppercase mb-6">Experience the Flow</h2>
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
                className={`${styles.tierCard} ${selectedTier.id === tier.id ? styles.activeCard : ''} ${tier.id === 'biryani' ? 'border-brand-yellow' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black uppercase">{tier.name}</h3>
                    <p className="text-gray-600 font-bold">{tier.price} / month</p>
                  </div>
                  {selectedTier.id === tier.id && (
                    <span className="bg-brand-success p-1 rounded-full border-2 border-brand-charcoal">
                      <Check size={16} className="text-white" />
                    </span>
                  )}
                </div>
                <p className="mt-4 text-gray-700">{tier.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile Mockup */}
          <div className="flex flex-col items-center">
            <p className="mb-4 font-black uppercase text-sm flex items-center gap-2">
              <Smartphone size={18} /> Interactive Checkout Preview
            </p>
            <div className={styles.phoneMockup}>
              <div className={styles.phoneScreen}>
                {/* Status Bar */}
                <div className="flex justify-between text-[10px] font-bold mb-6">
                    <span>9:41</span>
                    <div className="flex gap-1">
                    <span>LTE</span>
                    <span>100%</span>
                    </div>
                </div>

                <div className="flex-grow">
                    {view === 'subscriber' ? (
                    /* SUBSCRIBER VIEW: The Checkout Flow */
                    <div className="animate-in fade-in duration-300">
                        <p className="text-[10px] font-black text-brand-success uppercase mb-1">Secure Checkout</p>
                        <h4 className="text-xl font-black leading-tight">Join the Club</h4>
                        
                        <div className="mt-4 p-4 border-2 border-brand-charcoal rounded-xl bg-white shadow-neubrutal-sm">
                        <p className="text-xs font-bold text-gray-400">Selected Tier</p>
                        <p className="text-sm font-black">{selectedTier.name}</p>
                        <p className="text-lg font-black text-brand-charcoal">{selectedTier.price}</p>
                        </div>

                        <div className="mt-6 space-y-2">
                        <p className="text-[10px] font-bold uppercase text-gray-500">Pay via Local Wallet</p>
                        {['JazzCash', 'bKash', 'EasyPaisa'].map((pay) => (
                            <div key={pay} className="flex items-center justify-between p-2 border-2 border-brand-charcoal rounded-lg bg-white">
                            <span className="text-xs font-bold">{pay}</span>
                            <div className={`w-3 h-3 border-2 border-brand-charcoal rounded-full ${pay === 'JazzCash' ? 'bg-brand-yellow' : ''}`} />
                            </div>
                        ))}
                        </div>
                    </div>
                    ) : (
                    /* CREATOR VIEW: The Stats Dashboard */
                    /* CREATOR VIEW: The Stats Dashboard */
                    <div className="animate-in slide-in-from-bottom-2 duration-300">
                        <p className="text-[10px] font-black text-brand-yellow uppercase mb-1">Creator Studio</p>
                        <h4 className="text-xl font-black leading-tight">Your {selectedTier.name} Stats</h4>
                        
                        <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="p-3 border-2 border-brand-charcoal rounded-xl bg-white">
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Subscribers</p>
                            {/* Dynamic subscriber count based on tier index */}
                            <p className="text-lg font-black">
                                {selectedTier.id === 'chai' ? '840' : selectedTier.id === 'lassi' ? '310' : '92'}
                            </p>
                        </div>
                        <div className="p-3 border-2 border-brand-charcoal rounded-xl bg-brand-yellow">
                            <p className="text-[10px] font-bold text-brand-charcoal uppercase">Monthly</p>
                            {/* Shows the tier price as the "earnings" for that specific tier */}
                            <p className="text-lg font-black">{selectedTier.price.replace('PKR ', 'Rs ')}</p>
                        </div>
                        </div>

                        <div className="mt-6">
                        <p className="text-[10px] font-bold uppercase text-gray-500 mb-2">Recent {selectedTier.name} Payouts</p>
                        <div className="space-y-2">
                            {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-2 border-b-2 border-brand-charcoal/10">
                                <span className="text-xs font-bold text-brand-success">+ {selectedTier.price}</span>
                                <span className="text-[10px] font-medium text-gray-400">{i}h ago</span>
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    )}
                </div>

                {/* Dynamic Button Text */}
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