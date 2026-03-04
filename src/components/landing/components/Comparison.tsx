import React from 'react';
import { CheckCircle2, XCircle, MessageSquare, CreditCard, Percent } from 'lucide-react';
import styles from './Comparison.module.css';

const Comparison = () => {
  const comparisonData = [
    {
      feature: "Platform Fees",
      local: "8% Total",
      global: "12% + FX Fees",
      icon: <Percent size={20} />
    },
    {
      feature: "Payment Methods",
      local: "5+ Local (JazzCash, bKash, UPI)",
      global: "0 Local (Cards Only)",
      icon: <CreditCard size={20} />
    },
    {
      feature: "Creator Support",
      local: "WhatsApp & Local Phone",
      global: "Email Tickets Only",
      icon: <MessageSquare size={20} />
    },
    {
      feature: "Payout Speed",
      local: "Instant / 24 Hours",
      global: "7-14 Business Days",
      icon: <CheckCircle2 size={20} />
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">
            Stop losing money to <span className="text-red-500 line-through">Global</span> fees.
          </h2>
          <p className="text-lg font-bold text-gray-500">
            We built this because South Asian creators shouldn't have to settle for 
            Western tools that don't support our banks.
          </p>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Feature</th>
                <th className={`${styles.th} ${styles.brandCol}`}>CreatorHub.SA</th>
                <th className={styles.th}>Global Platforms</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index}>
                  <td className={styles.td}>
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-gray-100 rounded-lg border-2 border-brand-charcoal">
                        {row.icon}
                      </span>
                      {row.feature}
                    </div>
                  </td>
                  <td className={`${styles.td} ${styles.brandCol}`}>
                    <div className="flex flex-col items-center gap-1">
                      <CheckCircle2 className={styles.checkIcon} size={24} />
                      <span className="font-black">{row.local}</span>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <div className="flex flex-col items-center gap-1 opacity-50">
                      <XCircle className={styles.xIcon} size={24} />
                      <span className="font-bold">{row.global}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Call to Action under table */}
        <div className="mt-12 text-center">
          <button className="bg-brand-yellow text-brand-charcoal border-4 border-brand-charcoal px-10 py-5 rounded-2xl font-black text-xl uppercase shadow-neubrutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            Switch to CreatorHub now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Comparison;