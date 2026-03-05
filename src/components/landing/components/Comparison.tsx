import React from 'react';
import { CheckCircle2, XCircle, MessageSquare, CreditCard, Percent } from 'lucide-react';
import styles from './Comparison.module.css';
import Button from '../../ui/Button';
import ScrollReveal from '../../ui/ScrollReveal';

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
    <section className="py-24 bg-surface dark:bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-900 dark:text-gray-100 mb-4">
            Stop losing money to <span className="text-danger line-through">Global</span> fees.
          </h2>
          <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
            We built this because South Asian creators shouldn't have to settle for 
            Western tools that don't support our banks.
          </p>
        </div>

        <ScrollReveal animation="fade-up">
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
                        <span className="p-2 bg-brand-50 dark:bg-gray-800 rounded-lg border border-brand-300/20 dark:border-gray-700">
                          {row.icon}
                        </span>
                        {row.feature}
                      </div>
                    </td>
                    <td className={`${styles.td} ${styles.brandCol}`}>
                      <div className="flex flex-col items-center gap-1">
                        <CheckCircle2 className={styles.checkIcon} size={24} />
                        <span className="font-bold">{row.local}</span>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <div className="flex flex-col items-center gap-1 opacity-50">
                        <XCircle className={styles.xIcon} size={24} />
                        <span className="font-semibold">{row.global}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        <div className="mt-12 text-center">
          <Button variant="primary" size="xl" shimmer>
            Switch to CreatorHub now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
