import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const IconAnalytics = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const IconSettings = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);
const IconCheckout = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="5" width="20" height="14" rx="3" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);
const IconLogout = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const IconMenu = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const IconClose = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const navItems = [
  { to: '/dashboard/analytics', label: 'Analytics',  Icon: IconAnalytics },
  { to: '/dashboard/settings',  label: 'Settings',   Icon: IconSettings  },
  { to: '/dashboard/checkout',  label: 'Checkout',   Icon: IconCheckout  },
];

function SidebarContent({ user, logout, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 pt-7 pb-8">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shadow-lg"
            style={{ background: 'linear-gradient(135deg,#FFDD00,#FFB300)', boxShadow: '0 4px 14px rgba(255,179,0,0.45)' }}
          >
            ☕
          </div>
          <span className="text-white font-black text-lg tracking-tight">CreatorHub</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors lg:hidden">
            <IconClose />
          </button>
        )}
      </div>

      <p className="px-6 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500 mb-2">Menu</p>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group
              ${isActive
                ? 'bg-[#FFDD00] text-gray-900 shadow-lg shadow-yellow-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/8'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`}>
                  <Icon />
                </span>
                {label}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gray-900" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mx-6 my-4 h-px bg-white/8" />

      <div className="px-4 pb-6 space-y-2">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-gray-900 font-black text-sm shrink-0">
            {(user?.name?.[0] ?? 'U').toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">{user?.name ?? 'Creator'}</p>
            <p className="text-gray-500 text-xs truncate">{user?.email ?? ''}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <IconLogout /> Sign out
        </button>
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  const { user, logout } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0D0D0D] font-sans overflow-hidden">

      <aside
        className="hidden lg:flex flex-col w-[250px] shrink-0"
        style={{ background: '#111111', borderRight: '1px solid rgba(255,255,255,0.05)' }}
      >
        <SidebarContent user={user} logout={logout} />
      </aside>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className="relative z-10 w-[250px] flex flex-col animate-slide-left"
            style={{ background: '#111111', borderRight: '1px solid rgba(255,255,255,0.05)' }}
          >
            <SidebarContent user={user} logout={logout} onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        <header
          className="lg:hidden flex items-center justify-between px-5 py-4 shrink-0"
          style={{ background: '#111111', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <IconMenu />
          </button>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-base"
              style={{ background: 'linear-gradient(135deg,#FFDD00,#FFB300)' }}
            >
              ☕
            </div>
            <span className="text-white font-black text-base">CreatorHub</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-gray-900 font-black text-xs">
            {(user?.name?.[0] ?? 'U').toUpperCase()}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#F8F8F8]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
