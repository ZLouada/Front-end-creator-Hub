"use client";

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, Bell, User, Menu, X, Settings, LogOut, ShieldCheck,
  Home, CreditCard, Sun, Moon, Compass, BarChart2, Rss, UserCircle2
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuthContext } from '../../context/AuthContext';
import styles from './Header.module.css';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuthContext();
  
  // State for visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close everything on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsProfileOpen(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const mobileNavLinks = [
    { to: '/home',               icon: <Home size={22} />,       label: 'Home' },
    { to: '/explore',            icon: <Compass size={22} />,    label: 'Explore' },
    { to: '/feed',               icon: <Rss size={22} />,        label: 'My Feed' },
    { to: '/profile',            icon: <UserCircle2 size={22} />,label: 'Profile' },
    { to: '/dashboard/analytics',icon: <BarChart2 size={22} />,  label: 'Dashboard' },
    { to: '/dashboard/settings', icon: <Settings size={22} />,   label: 'Settings' },
    { to: '/dashboard/checkout', icon: <CreditCard size={22} />, label: 'Checkout' },
  ];

  const ICON_STROKE = 1.5;
  const ICON_SIZE = 20;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Logo */}
          <Link to="/home" className={styles.logo}>
            CreatorHub <span className={styles.logoBadge}>SA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {[
              { to: '/explore',  label: 'Explore' },
              { to: '/dashboard',label: 'Dashboard' },
              { to: '/feed',     label: 'My Feed' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`${styles.navLink} ${isActive(to) ? styles.navLinkActive : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className={styles.actions}>
            <div className={styles.iconGroup}>
              <button
                className={styles.themeToggle}
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className={styles.themeToggle} aria-label="Notifications">
                <Bell size={20} />
              </button>
            </div>

            <button
              onClick={() => navigate('/feed')}
              className={styles.dashboardBtn}
            >
              My Feed
            </button>

            {/* Profile Section */}
            <div className={styles.profileWrap} ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(v => !v)}
                aria-label="Profile menu"
                aria-expanded={isProfileOpen}
                className={styles.avatarBtn}
              >
                <User size={22} />
              </button>

              {isProfileOpen && (
                <div className={styles.dropdown} role="menu">
                  <div className={styles.dropdownHeader}>
                    <span className={styles.dropdownName}>Ahmed Al-Rashid</span>
                    <span className={styles.dropdownEmail}>ahmed@creatorhub.sa</span>
                  </div>
                  <hr className={styles.dropdownDivider} />
                  <button className={styles.dropdownItem} role="menuitem" onClick={() => { navigate('/profile'); setIsProfileOpen(false); }}>
                    <User size={16} /> View Profile
                  </button>
                  <button className={styles.dropdownItem} role="menuitem" onClick={() => { navigate('/dashboard/settings'); setIsProfileOpen(false); }}>
                    <Settings size={16} /> Settings
                  </button>
                  <button className={`${styles.dropdownItem} ${styles.dropdownItemCreator}`} role="menuitem" onClick={() => { navigate('/dashboard'); setIsProfileOpen(false); }}>
                    <ShieldCheck size={16} /> Switch to Creator
                  </button>
                  <hr className={styles.dropdownDivider} />
                  <button className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`} role="menuitem" onClick={() => { logout(); setIsProfileOpen(false); navigate('/'); }}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={styles.menuToggle}
              onClick={() => setIsMenuOpen(v => !v)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className={styles.mobileOverlay} onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
      )}
      <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`} aria-label="Mobile navigation">
        <div className={styles.mobileNavHeader}>
          <Link to="/home" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
            CreatorHub <span className={styles.logoBadge}>SA</span>
          </Link>
          <button className={styles.menuToggle} onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <X size={26} />
          </button>
        </div>
        <div className={styles.mobileNavLinks}>
          {mobileNavLinks.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`${styles.mobileNavLink} ${isActive(to) ? styles.mobileNavLinkActive : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </div>
        <div className={styles.mobileNavFooter}>
          <button className={styles.mobileNavTheme} onClick={toggleTheme}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            {isDark ? 'Switch to Light' : 'Switch to Dark'}
          </button>
          <button className={`${styles.mobileNavLink} ${styles.mobileNavLogout}`} onClick={() => { logout(); navigate('/'); setIsMenuOpen(false); }}>
            <LogOut size={22} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;