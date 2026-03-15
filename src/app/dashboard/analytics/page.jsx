import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts';
import Skeleton from '../../../components/ui/Skeleton';
import { useAnalytics } from '../../../hooks/useAnalytics';
import { useTheme } from '../../../context/ThemeContext';

const revenueData = [
  { name: 'Jan', revenue: 400,  prev: 290 },
  { name: 'Feb', revenue: 620,  prev: 400 },
  { name: 'Mar', revenue: 1200, prev: 700 },
  { name: 'Apr', revenue: 1800, prev: 1100 },
  { name: 'May', revenue: 2400, prev: 1600 },
  { name: 'Jun', revenue: 3200, prev: 2000 },
];

const subscriberData = [
  { name: 'Jan', subs: 40 },
  { name: 'Feb', subs: 65 },
  { name: 'Mar', subs: 110 },
  { name: 'Apr', subs: 150 },
  { name: 'May', subs: 210 },
  { name: 'Jun', subs: 300 },
];

const recentActivity = [
  { id: 1, name: 'Sarah K.',   type: 'New supporter',  amount: '+$5',   time: '2m ago',  avatar: '🧡' },
  { id: 2, name: 'Mark D.',   type: 'Monthly sub',    amount: '+$10',  time: '18m ago', avatar: '💛' },
  { id: 3, name: 'Amira L.',  type: 'One-time tip',   amount: '+$3',   time: '1h ago',  avatar: '💚' },
  { id: 4, name: 'James R.',  type: 'Monthly sub',    amount: '+$10',  time: '3h ago',  avatar: '💙' },
  { id: 5, name: 'Priya M.',  type: 'New supporter',  amount: '+$5',   time: '5h ago',  avatar: '💜' },
];

function CustomTooltip({ active, payload, label, prefix = '' }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 text-white rounded-xl px-4 py-3 shadow-soft-xl border border-white/10 text-sm">
      <p className="font-bold text-gray-300 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-bold" style={{ color: p.color }}>
          {prefix}{typeof p.value === 'number' && prefix === '$' ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  );
}

function useCounter(target, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return val;
}

function StatCard({ icon, label, value, suffix = '', badge, badgeColor, gradientFrom, gradientTo, delay = 0 }) {
  return (
    <div
      className="relative rounded-2xl p-8 overflow-hidden animate-fade-up"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        animationDelay: `${delay}s`,
        boxShadow: `0 8px 32px ${gradientFrom}44`,
      }}
    >
      <div
        className="absolute -right-6 -top-6 w-28 h-28 rounded-full opacity-20"
        style={{ background: gradientTo }}
      />
      <div className="relative z-10">
        <div className="text-3xl mb-4">{icon}</div>
        <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1.5">{label}</p>
        <p className="text-white text-3xl font-bold tracking-tight">{suffix === '$' ? `$${value.toLocaleString()}` : `${value}${suffix}`}</p>
        {badge && (
          <span className={`inline-block mt-3 px-2.5 py-1 rounded-full text-xs font-bold ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="min-h-full bg-surface p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-40 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="hidden sm:block h-12 w-36 rounded-2xl" />
        </div>

        {/* 3 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>

        {/* 2 Chart Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[0, 1].map((i) => (
            <div key={i} className="bg-surface-card rounded-2xl p-8 border border-editorial-border">
              <div className="flex items-center justify-between mb-7">
                <div>
                  <Skeleton className="h-5 w-36 mb-2" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-8 w-20 rounded-xl" />
              </div>
              <Skeleton className="h-48 sm:h-64 w-full rounded-xl" />
            </div>
          ))}
        </div>

        {/* Activity Table */}
        <div className="bg-surface-card rounded-2xl border border-editorial-border overflow-hidden">
          <div className="flex items-center justify-between px-8 py-6 border-b border-editorial-border">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="divide-y divide-gray-50">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between px-8 py-5">
                <div className="flex items-center gap-5">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-12 mb-2 ml-auto" />
                  <Skeleton className="h-3 w-14 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const { isLoading } = useAnalytics();
  const { isDark } = useTheme();
  const revenue    = useCounter(3200);
  const supporters = useCounter(300);
  const success    = useCounter(985);

  if (isLoading) return <AnalyticsSkeleton />;

  return (
    <div className="min-h-full bg-surface p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-10">

        <div className="flex items-center justify-between animate-fade-up">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold font-serif text-primary tracking-tight">Analytics</h1>
            <p className="text-muted font-medium mt-1 text-sm">Your creator dashboard — last 6 months</p>
          </div>
          <button
            className="hidden sm:flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-brand-900 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg active:scale-95"
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export CSV
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            icon="💰" label="Monthly Revenue" value={revenue} suffix="$"
            badge="↑ 33% this month" badgeColor="bg-white/20 text-white"
            gradientFrom="#1a1a2e" gradientTo="#16213e" delay={0}
          />
          <StatCard
            icon="💛" label="Active Supporters" value={supporters}
            badge="+ 90 new fans" badgeColor="bg-white/20 text-white"
            gradientFrom="#6B7280" gradientTo="#4B5563" delay={0.08}
          />
          <StatCard
            icon="✅" label="Payment Success" value={`${(success / 10).toFixed(1)}`} suffix="%"
            badge="Smooth sailing ⛵" badgeColor="bg-white/20 text-white"
            gradientFrom="#10b981" gradientTo="#059669" delay={0.16}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="bg-surface-card rounded-2xl p-8 shadow-soft border border-editorial-border animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-7">
              <div>
                <h3 className="text-base font-bold text-primary">Revenue Growth</h3>
                <p className="text-xs text-muted font-medium mt-0.5">vs previous period</p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-surface-elevated text-secondary border border-editorial-border">
                6 months
              </span>
            </div>
            <div className="h-48 sm:h-64 w-full min-w-0 overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={isDark ? '#FFDD00' : '#1A1A1A'} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={isDark ? '#FFDD00' : '#1A1A1A'} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="prev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={isDark ? '#3A3A46' : '#d1d5db'} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={isDark ? '#3A3A46' : '#d1d5db'} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#27272F' : '#f3f4f6'} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }} tickFormatter={(v) => `$${v}`} />
                  <Tooltip content={<CustomTooltip prefix="$" />} />
                  <Area type="monotone" dataKey="prev" stroke={isDark ? '#3A3A46' : '#d1d5db'} strokeWidth={2} fill="url(#prev)" strokeDasharray="4 4" />
                  <Area type="monotone" dataKey="revenue" stroke={isDark ? '#FFDD00' : '#1A1A1A'} strokeWidth={3} fill="url(#rev)" dot={{ r: 4, fill: isDark ? '#FFDD00' : '#1A1A1A', strokeWidth: 2, stroke: isDark ? '#111115' : '#fff' }} activeDot={{ r: 6, strokeWidth: 3, stroke: isDark ? '#111115' : '#fff' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-surface-card rounded-2xl p-8 shadow-soft border border-editorial-border animate-fade-up" style={{ animationDelay: '0.26s' }}>
            <div className="flex items-center justify-between mb-7">
              <div>
                <h3 className="text-base font-bold text-primary">New Supporters</h3>
                <p className="text-xs text-muted font-medium mt-0.5">Monthly signups</p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-brand-900 text-white">
                +42% avg
              </span>
            </div>
            <div className="h-48 sm:h-64 w-full min-w-0 overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subscriberData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#27272F' : '#f3f4f6'} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="subs" fill={isDark ? '#FFDD00' : '#1A1A1A'} radius={[8, 8, 2, 2]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-surface-card rounded-2xl shadow-soft border border-editorial-border overflow-hidden animate-fade-up" style={{ animationDelay: '0.32s' }}>
          <div className="flex items-center justify-between px-8 py-6 border-b border-editorial-border">
            <h3 className="text-base font-bold text-primary">Recent Activity</h3>
            <button className="text-xs font-bold text-muted hover:text-primary transition-colors">View all →</button>
          </div>
          <div className="divide-y divide-editorial-divider">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-8 py-5 hover:bg-editorial-hover transition-colors">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center text-lg shrink-0">
                    {item.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">{item.name}</p>
                    <p className="text-xs text-muted font-medium">{item.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-success">{item.amount}</p>
                  <p className="text-xs text-muted font-medium">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
