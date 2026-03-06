import React from 'react';
import { Wallet, Smartphone, Coins } from 'lucide-react';
import styles from './LocalAdvantage.module.css';

const LocalAdvantage = () => {
  const advantages = [
    {
      title: "Direct Payouts",
      desc: "No more waiting for PayPal. Withdraw your earnings directly to JazzCash, bKash, or local bank accounts instantly.",
      icon: <Wallet size={32} />,
      accent: "bg-success",
      labels: ["JazzCash", "bKash", "UPI"]
    },
    {
      title: "Local Pricing",
      desc: "Set tiers in PKR, INR, or BDT. Your fans pay exactly what they see without hidden bank conversion charges.",
      icon: <Coins size={32} />,
      accent: "bg-brand-400",
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
    <section className="py-12 md:py-24 bg-surface dark:bg-[#0A0A0A] border-t border-brand-300/20 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-brand-900 dark:text-gray-100 leading-tight">
            Built for the <span className="bg-brand-100 px-2 rounded-md">South Asian</span> economy.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((item, index) => (
            <div key={index} className={styles.card + " p-5 sm:p-8 flex flex-col h-full"}>
                <div className={`${styles.iconBox} ${item.accent} mb-8`}>
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold text-brand-900 dark:text-gray-100 mb-4">
                  {item.title}
                </h3>

                <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-8 grow">
                  {item.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-brand-300/15 dark:border-gray-700">
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
