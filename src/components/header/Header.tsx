// import Link from 'next/link';
import { Search, Bell, User } from 'lucide-react';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          CreatorHub <span className={styles.logoBadge}>SA</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/explore" className={styles.navLink}>Explore</Link>
          <Link href="/analytics" className={styles.navLink}>Analytics</Link>
          <Link href="/billing" className={styles.navLink}>Billing</Link>
        </nav>

        <div className={styles.actions}>
          <Search size={20} strokeWidth={3} className="cursor-pointer" />
          <Link href="/subscriberDashboard">
             <button className={styles.dashboardBtn}>My Feed</button>
          </Link>
          <div className="w-10 h-10 border-3 border-black rounded-full overflow-hidden bg-brand-yellow">
            <User className="m-auto mt-1" size={24} />
          </div>
        </div>
      </div>
    </header>
  );
};