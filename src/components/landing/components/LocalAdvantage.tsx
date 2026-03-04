import React from 'react';
import { Wallet, Smartphone, Coins } from 'lucide-react';
import styles from './LocalAdvantage.module.css';

const LocalAdvantage = () => {
  const advantages = [
    {
      title: "Direct Payouts",
      desc: "No more waiting for PayPal. Withdraw your earnings directly to JazzCash, bKash, or local bank accounts instantly.",
      icon: <Wallet size={32} />,
      accent: "bg-brand-success",
      labels: ["JazzCash", "bKash", "UPI"]
    },
    {
      title: "Local Pricing",
      desc: "Set tiers in PKR, INR, or BDT. Your fans pay exactly what they see without hidden bank conversion charges.",
      icon: <Coins size={32} />,
      accent: "bg-brand-yellow",
      labels: ["PKR", "INR", "BDT"]
    },
    {
      title: "No Credit Card Needed",
      desc: "Supporters can subscribe via mobile balance or local wallets, removing the barrier for the South Asian market.",
      icon: <Smartphone size={32} />,
      accent: "bg-white",
      labels: ["Mobile Pay", "Wallets"]
    }
  ];

  return (
    <section className="py-24 border-t-4 border-brand-charcoal bg-[#FFDD00]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-brand-charcoal uppercase leading-tight">
            Built for the <span className="bg-brand-yellow px-2">South Asian</span> economy.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((item, index) => (
            <div key={index} className={styles.card + " p-8 flex flex-col h-full"}>
              <div className={`${styles.iconBox} ${item.accent} mb-8 rotate-3`}>
                {item.icon}
              </div>

              <h3 className="text-2xl font-black text-brand-charcoal mb-4 uppercase">
                {item.title}
              </h3>

              <p className="text-lg text-gray-700 font-medium leading-relaxed mb-8 grow">
                {item.desc}
              </p>

              <div className="flex flex-wrap gap-2 pt-6 border-t-2 border-brand-charcoal/10">
                {item.labels.map((label, lIndex) => (
                  <span key={lIndex} className={styles.tag}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalAdvantage;