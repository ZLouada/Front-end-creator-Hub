"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Settings, 
  Bell, 
  ArrowUpRight 
} from 'lucide-react';
import styles from './StudioPreview.module.css';

const StudioPreview = () => {
  const chartData = [40, 65, 50, 85, 70, 90, 100];

  return (
    <section className="py-12 md:py-24 bg-brand-50 dark:bg-[#0A0A0A]">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Area */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-6xl font-extrabold text-brand-900 dark:text-gray-100 leading-tight">
            The Creator <span className="text-gradient-gold">Studio</span>
          </h2>
          <p className="mt-2 md:mt-4 text-base md:text-xl font-semibold text-gray-500 dark:text-gray-400">
            Advanced analytics, simplified for your growth.
          </p>
        </div>

        {/* Dashboard Wrapper */}
        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto border border-brand-300/20 rounded-3xl overflow-hidden shadow-soft-lg bg-white dark:bg-[#141414] dark:border-gray-700">
          
          {/* Sidebar Navigation */}
          <div className={styles.sidebar}>
            <div className="p-2 md:p-3 bg-gradient-to-br from-brand-400 to-brand-500 rounded-xl lg:mb-8 shadow-glow-sm">
              <LayoutDashboard size={20} className="text-brand-900" />
            </div>
            <Users size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-300" />
            <TrendingUp size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-300" />
            <Settings size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-300" />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            
            {/* Top Bar */}
            <div className="border-t lg:border-t-0 lg:border-l border-brand-300/15 p-4 md:p-6 flex justify-between items-center bg-white dark:bg-[#141414] dark:border-gray-700">
              <span className="font-bold tracking-tight text-sm md:text-base text-brand-900 dark:text-gray-100">Studio / Analytics</span>
              <div className="flex gap-2 md:gap-4">
                <div className="p-2 border border-brand-300/20 rounded-lg hover:bg-brand-50 dark:border-gray-700 dark:hover:bg-[#1A1A1A] transition-colors duration-300">
                  <Bell size={18} />
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-brand-400 to-brand-500 rounded-full shadow-glow-sm" />
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 md:p-8 space-y-6 md:space-y-8 border-t lg:border-l border-brand-300/15 dark:border-gray-700 flex-1">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div className={styles.statCard}>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1">MRR (Revenue)</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-xl md:text-2xl font-bold text-brand-900 dark:text-gray-100">PKR 142k</h3>
                    <span className={styles.successBadge}>+12%</span>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1">Subscribers</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-xl md:text-2xl font-bold text-brand-900 dark:text-gray-100">2,840</h3>
                    <ArrowUpRight className="text-success" size={20} />
                  </div>
                </div>

                <div className={styles.statCard}>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1">Churn Rate</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-xl md:text-2xl font-bold text-brand-900 dark:text-gray-100">1.2%</h3>
                    <span className="text-[10px] font-bold text-success uppercase">Ultra Low</span>
                  </div>
                </div>
              </div>

              {/* Main Growth Chart */}
              <div className="border border-brand-300/15 rounded-2xl p-4 md:p-6 bg-white dark:bg-[#1A1A1A] dark:border-gray-700 shadow-soft-sm">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-sm md:text-lg tracking-tight text-brand-900 dark:text-gray-100">Subscriber Growth</h4>
                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="w-2 h-2 md:w-3 md:h-3 bg-brand-400 rounded-sm" />
                    <span className="text-[8px] md:text-[10px] font-semibold uppercase text-gray-400">Last 7 Days</span>
                  </div>
                </div>
                
                <div className="h-40 md:h-64 flex items-end justify-between gap-1 md:gap-4 border-b border-brand-300/15 dark:border-gray-700 pb-1">
                  {chartData.map((height, i) => (
                    <div 
                      key={i} 
                      className={styles.chartBar} 
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                
                <div className="flex justify-between mt-3 md:mt-4">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <span key={i} className="text-[10px] font-semibold text-gray-400">{day}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioPreview;
