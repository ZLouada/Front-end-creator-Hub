import React, { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import SubscriptionManager from '../../../components/billing/SubscriptionManager';

const paymentHistory = [
  { date: 'Feb 1, 2026', desc: 'Creative Studio — Pro', amount: '$10.00', status: 'Paid' },
  { date: 'Jan 1, 2026', desc: 'Creative Studio — Pro', amount: '$10.00', status: 'Paid' },
  { date: 'Dec 1, 2025', desc: 'Creative Studio — Pro', amount: '$10.00', status: 'Paid' },
  { date: 'Nov 1, 2025', desc: 'Creative Studio — Pro', amount: '$10.00', status: 'Paid' },
];

function Section({ title, subtitle, children }) {
  return (
    <div className="bg-surface-card rounded-2xl shadow-soft border border-editorial-border overflow-hidden">
      <div className="px-6 py-5 border-b border-editorial-border">
        <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-0.5">{subtitle}</p>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">{hint}</p>}
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useAuthContext();
  const [displayName, setDisplayName] = useState(user?.name ?? 'Creator');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-full bg-surface p-5 sm:p-8">
      <div className="max-w-3xl mx-auto space-y-6">

        <div className="animate-fade-up">
          <h1 className="text-2xl sm:text-3xl font-semibold font-serif text-gray-900 dark:text-gray-100 tracking-tight">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 text-sm">Manage your account and billing preferences</p>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '0.06s' }}>
          <Section title="Account Details" subtitle="Update your personal information">
            <form onSubmit={handleSave} className="space-y-4 max-w-md">
              <Field label="Display Name">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="input-modern w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1A1A] border border-editorial-border dark:border-[#2D2D2D] rounded-xl text-gray-800 dark:text-gray-100 font-semibold text-sm placeholder-gray-400 outline-none focus:border-gray-900 dark:focus:border-gray-400 transition-colors"
                />
              </Field>
              <Field label="Email Address" hint="Contact support to change your email.">
                <input
                  type="email"
                  disabled
                  defaultValue={user?.email ?? 'user@example.com'}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-[#1A1A1A] border border-transparent rounded-xl text-gray-400 font-semibold text-sm cursor-not-allowed"
                />
              </Field>
              <button
                type="submit"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-soft-md active:scale-95 ${
                  saved
                    ? 'bg-success text-white'
                    : 'bg-brand-900 text-white shadow-soft-sm'
                }`}
              >
                {saved ? (
                  <>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    Saved!
                  </>
                ) : 'Save Changes'}
              </button>
            </form>
          </Section>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <Section title="Notifications" subtitle="Choose what you want to be notified about">
            <div className="space-y-4">
              {[
                { label: 'New supporters', desc: 'Get notified when someone supports you', defaultOn: true },
                { label: 'Monthly summary', desc: 'A monthly email with your earnings recap', defaultOn: true },
                { label: 'Product updates', desc: "What's new in CreatorHub", defaultOn: false },
              ].map(({ label, desc, defaultOn }) => (
                <ToggleRow key={label} label={label} desc={desc} defaultOn={defaultOn} />
              ))}
            </div>
          </Section>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '0.14s' }}>
          <div className="mb-3">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">Active Subscription</h3>
          </div>
          <SubscriptionManager />
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '0.18s' }}>
          <Section title="Payment History" subtitle="All your past transactions">
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-left min-w-[480px]">
                <thead>
                    <tr className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-editorial-border dark:border-[#2D2D2D]">
                    <th className="pb-3 pl-2">Date</th>
                    <th className="pb-3">Description</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right pr-2">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paymentHistory.map((row) => (
                    <tr key={row.date} className="hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors">
                      <td className="py-3.5 pl-2 text-sm text-gray-500 dark:text-gray-400 font-medium">{row.date}</td>
                      <td className="py-3.5 text-sm text-gray-700 dark:text-gray-300 font-semibold">{row.desc}</td>
                      <td className="py-3.5 text-sm text-gray-900 dark:text-gray-100 font-bold">{row.amount}</td>
                      <td className="py-3.5">
                        <span className="px-2.5 py-1 bg-green-50 text-success rounded-lg text-xs font-bold border border-green-100">
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right pr-2">
                        <button className="text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors">↓ PDF</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '0.22s' }}>
          <Section title="Danger Zone" subtitle="Irreversible actions — proceed with caution">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-200">Delete Account</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-0.5">Permanently remove your account and all data</p>
              </div>
              <button className="px-4 py-2.5 rounded-lg text-sm font-bold text-danger border border-danger-200 hover:bg-danger-50 transition-all active:scale-95">
                Delete Account
              </button>
            </div>
          </Section>
        </div>

      </div>
    </div>
  );
}

function ToggleRow({ label, desc, defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{label}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        className={`relative shrink-0 w-11 h-6 rounded-full transition-all duration-300 ${
          on ? 'bg-brand-900 shadow-soft-sm' : 'bg-gray-300'
        }`}
      >
        <span
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-soft-sm transition-all duration-300"
          style={{ left: on ? '24px' : '4px' }}
        />
      </button>
    </div>
  );
}
