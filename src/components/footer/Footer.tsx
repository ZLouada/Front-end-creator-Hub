import styles from './Footer.module.css';
import { Globe, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <h2 className="text-2xl font-black uppercase">CreatorHub</h2>
          <p className={styles.brandDesc}>
            The first subscription-first creator economy platform optimized for South Asian pricing psychology.
          </p>
        </div>
        
        <div>
          <h4 className={styles.columnTitle}>Platform</h4>
          <ul className={styles.linkList}>
            <li><a href="#" className={styles.link}>How it Works</a></li>
            <li><a href="#" className={styles.link}>Pricing</a></li>
            <li><a href="#" className={styles.link}>Creator Login</a></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.columnTitle}>Regions</h4>
          <ul className={styles.linkList}>
            <li><a href="#" className={styles.link}>Pakistan</a></li>
            <li><a href="#" className={styles.link}>India</a></li>
            <li><a href="#" className={styles.link}>Bangladesh</a></li>
            <li><a href="#" className={styles.link}>Sri Lanka</a></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.columnTitle}>Support</h4>
          <ul className={styles.linkList}>
            <li><a href="#" className={styles.link}>Help Center</a></li>
            <li><a href="#" className={styles.link}>Terms of Service</a></li>
            <li><a href="#" className={styles.link}>Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.regionalBadge}>
          <Globe size={16} />
          Built for South Asia
        </div>
        
        <div className="font-black text-sm uppercase flex items-center gap-2">
          Made with <Heart size={16} fill="#FFDD00" /> by CreatorHub Team
        </div>

        <p className="font-bold text-xs">© 2026 CreatorHub SA</p>
      </div>
    </footer>
  );
};