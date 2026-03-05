import React from 'react';
import { Quote, Star, CheckCircle } from 'lucide-react';
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
    quote: "Direct bKash integration is the game changer. My Bangladeshi community can finally support my work without a credit card.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"
  }
];

const SocialProof = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Join <span className={styles.highlight}>500+ creators</span> <br />
          from Lahore, Mumbai, and Dhaka.
        </h2>
      </div>

      <div className={styles.grid}>
        {CREATORS.map((creator, index) => (
            <div key={index} className={styles.card}>
              <Quote size={40} className={styles.quoteIcon} fill="currentColor" />

              <p className={styles.quoteText}>
                "{creator.quote}"
              </p>

              <div className={styles.creatorInfo}>
                <img
                  src={creator.image}
                  alt={creator.name}
                  className={styles.avatar}
                />
                <div>
                  <h4 className={styles.name}>{creator.name}</h4>
                  <p className={styles.location}>{creator.location} • {creator.handle}</p>
                </div>
              </div>
            </div>
        ))}
      </div>

      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <CheckCircle className="text-success" size={20} />
          <span>Verified Local Payouts</span>
        </div>
        <div className={styles.statItem}>
          <Star className="text-brand-400" size={20} fill="currentColor" />
          <span>4.9/5 Creator Rating</span>
        </div>
        <div className={styles.statItem}>
          <CheckCircle className="text-success" size={20} />
          <span>No Border Fees</span>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
