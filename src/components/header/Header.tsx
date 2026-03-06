"use client";

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, Menu, X, Settings, LogOut, ShieldCheck, Home, CreditCard, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Header.module.css';

export const Header = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/home" className={styles.logo}>
          CreatorHub <span className={styles.logoBadge}>SA</span>
        </Link>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navActive : ''}`}>
          <Link to="/explore" className={`${styles.navLink} ${styles.desktopOnly}`} onClick={() => setIsMenuOpen(false)}>Explore</Link>
          <Link to="/dashboard" className={`${styles.navLink} ${styles.desktopOnly}`} onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
          <Link to="/analytics" className={`${styles.navLink} ${styles.desktopOnly}`} onClick={() => setIsMenuOpen(false)}>Analytics</Link>
          <Link to="/billing" className={`${styles.navLink} ${styles.desktopOnly}`} onClick={() => setIsMenuOpen(false)}>Billing</Link>

          {/* Mobile-only navigation items */}
          <Link to="/dashboard/settings" className={`${styles.navLink} ${styles.mobileOnly}`} onClick={() => setIsMenuOpen(false)}>
            <Settings size={24} /> Settings
          </Link>
          <Link to="/dashboard/checkout" className={`${styles.navLink} ${styles.mobileOnly}`} onClick={() => setIsMenuOpen(false)}>
            <CreditCard size={24} /> Checkout
          </Link>
          <Link to="/home" className={`${styles.navLink} ${styles.mobileOnly}`} onClick={() => setIsMenuOpen(false)}>
            <Home size={24} /> Go to Home
          </Link>
        </nav>

        {/* Right Actions */}
        <div className={styles.actions}>
          <div className={styles.iconGroup}>
            <Search size={22} strokeWidth={3} className="cursor-pointer hover:text-[#FFDD00]" />
            <Bell size={22} strokeWidth={3} className="cursor-pointer hover:text-[#FFDD00]" />
            <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle dark mode">
              {isDark ? <Sun size={22} strokeWidth={3} /> : <Moon size={22} strokeWidth={3} />}
            </button>
          </div>

          <button
            onClick={() => navigate('/feed')}
            className={styles.dashboardBtn}
          >
            My Feed
          </button>

          {/* Profile Section */}
          <div className="relative">
            <div
              onClick={toggleProfile}
              className="w-11 h-11 border-[3px] border-[#1A1A1A] dark:border-[#333] rounded-full overflow-hidden bg-[#FFDD00] flex items-center justify-center cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform shadow-[3px_3px_0px_#1A1A1A] dark:shadow-[3px_3px_0px_#000]"
            >
              <User size={26} strokeWidth={3} />
            </div>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className={styles.dropdown}>
                <button className={styles.dropdownItem} onClick={() => {navigate('/profile'); setIsProfileOpen(false);}}>
                  <User size={18} /> View Profile
                </button>
                <button className={styles.dropdownItem} onClick={() => {navigate('/settings'); setIsProfileOpen(false);}}>
                  <Settings size={18} /> Settings
                </button>
                <button className={`${styles.dropdownItem} text-blue-600 dark:text-blue-400`} onClick={() => setIsProfileOpen(false)}>
                  <ShieldCheck size={18} /> Switch to Creator
                </button>
                <hr className="border-t-2 border-black dark:border-gray-700 my-1" />
                <button className={`${styles.dropdownItem} text-red-500 dark:text-red-400`} onClick={() => setIsProfileOpen(false)}>
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className={styles.menuToggle} onClick={toggleMenu}>
            {isMenuOpen ? <X size={30} strokeWidth={3} /> : <Menu size={30} strokeWidth={3} />}
          </button>
        </div>
      </div>
    </header>
  );
};
