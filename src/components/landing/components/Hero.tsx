"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* LEFT CONTENT: TYPOGRAPHY FOCUS */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.contentLeft}
        >
          <div className={styles.editorialBadge}>
            <Globe size={14} className={styles.yellowIcon} />
            <span>The New Standard for South Asia</span>
          </div>

          <h1 className={styles.serifHeading}>
            Monetize your craft. <br />
            <span className={styles.italicHighlight}>Grow your legacy.</span>
          </h1>

          <p className={styles.description}>
            The premium creator platform built for South Asia. Accept local payments, 
            cultivate your community, and keep <strong>92%</strong> of your revenue.
          </p>

          {/* THE CLAIM BAR: STATIONERY STYLE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={styles.claimContainer}
          >
            <form className={styles.claimBar} onSubmit={(e) => { e.preventDefault(); navigate(`/auth?mode=signup&username=${encodeURIComponent(username)}`); }}>
              <div className={styles.inputWrapper}>
                <span className={styles.urlPrefix}>creatorhub.sa/</span>
                <input
                  type="text"
                  placeholder="yourname"
                  className={styles.usernameInput}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <button className={styles.ctaButton}>
                Claim My Hub <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </form>
            
            <div className={styles.trustStrip}>
              <CheckCircle2 size={14} className={styles.successIcon} />
              <span>Setup in 2 minutes • No credit card required</span>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT CONTENT: THE "GALLERY" LOOK */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className={styles.imageGallery}
        >
          <div className={styles.mainImageFrame}>
            <div className={styles.imageOverlay} />
            <img
              alt="Artistic Portrait"
              src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=800"
              className={styles.heroImage}
            />
            <div className={styles.floatingTag}>
              <span className={styles.tagLabel}>Featured Creator</span>
              <p className={styles.tagName}>Amna R. • Visual Artist</p>
            </div>
            
            {/* The "Surgical" Accent Tape */}
            <div className={styles.yellowTape} />
          </div>
          
          {/* Background Decorative Serif Lettering */}
          <span className={styles.backgroundLetter}>C</span>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;