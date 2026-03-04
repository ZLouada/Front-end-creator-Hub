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
    <section className="py-12 md:py-24 bg-[#FFDD00]">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Area */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-6xl font-black uppercase text-brand-charcoal leading-tight">
            The Creator <span className="text-brand-yellow">Studio</span>
          </h2>
          <p className="mt-2 md:mt-4 text-base md:text-xl font-bold text-gray-500">
            Advanced analytics, simplified for your growth.
          </p>
        </div>

        {/* Dashboard Wrapper */}
        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto border-4 border-brand-charcoal rounded-3xl overflow-hidden shadow-neubrutal bg-white">
          
          {/* Sidebar Navigation - Switches from Horizontal (Mobile) to Vertical (Desktop) */}
          <div className={styles.sidebar}>
            <div className="p-2 md:p-3 bg-brand-yellow rounded-xl border-2 border-white lg:mb-8">
              <LayoutDashboard size={20} className="text-brand-charcoal" />
            </div>
            <Users size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <TrendingUp size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Settings size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            
            {/* Top Bar */}
            <div className="border-t-4 lg:border-t-0 lg:border-l-4 border-brand-charcoal p-4 md:p-6 flex justify-between items-center bg-white">
              <span className="font-black uppercase tracking-tighter text-sm md:text-base">Studio / Analytics</span>
              <div className="flex gap-2 md:gap-4">
                <div className="p-2 border-2 border-brand-charcoal rounded-lg">
                  <Bell size={18} />
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-yellow border-2 border-brand-charcoal rounded-full" />
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-4 md:p-8 space-y-6 md:space-y-8 border-t-4 lg:border-l-4 border-brand-charcoal flex-1">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div className={styles.statCard}>
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">MRR (Revenue)</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-xl md:text-2xl font-black text-brand-charcoal">PKR 142k</h3>
                    <span className={styles.successBadge}>+12%</span>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Subscribers</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-xl md:text-2xl font-black text-brand-charcoal">2,840</h3>
                    <ArrowUpRight className="text-brand-success" size={20} />
                  </div>
                </div>

                <div className={`${styles.statCard} sm:col-span-2 md:col-span-1`}>
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Churn Rate</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-xl md:text-2xl font-black text-brand-charcoal">1.2%</h3>
                    <span className="text-[10px] font-bold text-brand-success uppercase">Ultra Low</span>
                  </div>
                </div>
              </div>

              {/* Main Growth Chart */}
              <div className="border-4 border-brand-charcoal rounded-2xl p-4 md:p-6 bg-white shadow-neubrutal-sm">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-black uppercase text-sm md:text-lg tracking-tight">Subscriber Growth</h4>
                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="w-2 h-2 md:w-3 md:h-3 bg-brand-yellow border-2 border-brand-charcoal" />
                    <span className="text-[8px] md:text-[10px] font-bold uppercase">Last 7 Days</span>
                  </div>
                </div>
                
                <div className="h-40 md:h-64 flex items-end justify-between gap-1 md:gap-4 border-b-4 border-brand-charcoal pb-1">
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
                    <span key={i} className="text-[10px] font-bold text-gray-400 uppercase">{day}</span>
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