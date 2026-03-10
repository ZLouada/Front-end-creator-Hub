"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Settings, 
  Bell, 
  ArrowUpRight,
  Zap
} from 'lucide-react';
import styles from './StudioPreview.module.css';

const StudioPreview = () => {
  const chartData = [40, 65, 50, 85, 70, 90, 100];

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <header className={styles.headerArea}>
          <div className={styles.liveBadge}>
            <span className={styles.pulseDot} />
            LIVE ECOSYSTEM
          </div>
          <h2 className={styles.serifTitle}>
            The Creator <span className={styles.italicHighlight}>Studio.</span>
          </h2>
          <p className={styles.subtitle}>
            Advanced analytics, distilled into a singular editorial interface. 
            Track your legacy in real-time.
          </p>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={styles.dashboardCanvas}
        >
          {/* Minimalist Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.brandMark}><Zap size={20} fill="#FFDD00" stroke="#FFDD00" /></div>
            <div className={styles.sidebarNav}>
              <div className={styles.activeIconWrapper}><LayoutDashboard size={18} /></div>
              <div className={styles.sidebarIcon}><Users size={18} /></div>
              <div className={styles.sidebarIcon}><TrendingUp size={18} /></div>
              <div className={styles.sidebarIcon}><Settings size={18} /></div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className={styles.mainContent}>
            <div className={styles.topBar}>
              <span className={styles.breadcrumb}>STUDIO / <span className={styles.boldLabel}>ANALYTICS</span></span>
              <div className={styles.topActions}>
                <Bell size={16} className={styles.mutedIcon} />
                <div className={styles.avatarPlaceholder} />
              </div>
            </div>

            <div className={styles.contentBody}>
              {/* Stats Grid */}
              <div className={styles.statsGrid}>
                {[
                  { label: "MRR", value: "PKR 142k", trend: "+12%" },
                  { label: "Subscribers", value: "2,840", trend: "Growth" },
                  { label: "Churn", value: "1.2%", trend: "Stable" }
                ].map((stat, i) => (
                  <motion.div key={i} variants={itemVariants} className={styles.statCard}>
                    <p className={styles.statLabel}>{stat.label}</p>
                    <div className={styles.statValueRow}>
                      <h3 className={styles.statValue}>{stat.value}</h3>
                      {i === 1 ? <ArrowUpRight className={styles.yellowIcon} size={16} /> : <span className={styles.growthBadge}>{stat.trend}</span>}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Animated Chart Card */}
              <motion.div variants={itemVariants} className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <h4 className={styles.chartTitle}>Revenue Velocity</h4>
                  <div className={styles.chartLegend}>
                    <div className={styles.legendDot} />
                    <span>7-Day Window</span>
                  </div>
                </div>
                
                <div className={styles.chartArea}>
                  {chartData.map((height, i) => (
                    <div key={i} className={styles.chartBarWrapper}>
                      <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        transition={{ delay: 0.5 + (i * 0.1), duration: 1, ease: "circOut" }}
                        className={styles.chartBar} 
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.chartLabels}>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <span key={i}>{day}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudioPreview;