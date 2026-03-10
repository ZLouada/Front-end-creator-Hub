import React from 'react';
import { useCheckout } from '../../hooks/useCheckout';

const tierPrice = 10.00;

const gateways = [
  { id: 'stripe',    icon: '💳', name: 'Card',       sub: 'Visa / Mastercard' },
  { id: 'razorpay',  icon: '₹',  name: 'Razorpay',  sub: 'India' },
  { id: 'jazzcash',  icon: '🇵🇰', name: 'JazzCash', sub: 'Pakistan' },
  { id: 'easypaisa', icon: '🇵🇰', name: 'Easypaisa', sub: 'Pakistan' },
  { id: 'bkash',     icon: '🇧🇩', name: 'bKash',    sub: 'Bangladesh' },
];

const perks = [
  'Access to all exclusive content',
  'Direct messaging with the creator',
  'Early access to new releases',
  'Member-only community',
];

export default function CheckoutPage() {
  const { selectedGateway, setSelectedGateway, isProcessing, error, handlePaymentSubmit } = useCheckout(tierPrice);

  return (
    <div className="min-h-full bg-surface p-5 sm:p-8 flex items-start justify-center">
      <div className="w-full max-w-4xl">

        <div className="mb-6 animate-fade-up">
          <h1 className="text-2xl sm:text-3xl font-semibold font-serif text-gray-900 dark:text-gray-100 tracking-tight">Checkout</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 text-sm">Complete your subscription</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          <div className="lg:col-span-3 space-y-5">

            <div className="bg-surface-card rounded-2xl p-6 border border-editorial-border shadow-soft animate-fade-up" style={{ animationDelay: '0.06s' }}>
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 bg-brand-900 shadow-soft-sm"
                >

                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Creative Studio</h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Pro Tier — ${tierPrice.toFixed(2)}/month</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-card rounded-2xl p-6 border border-editorial-border shadow-soft animate-fade-up" style={{ animationDelay: '0.10s' }}>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest mb-4">Payment Method</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {gateways.map((gw) => (
                  <button
                    key={gw.id}
                    type="button"
                    onClick={() => setSelectedGateway(gw.id)}
                    className={`relative flex flex-col items-center gap-1.5 p-4 rounded-lg border text-sm font-bold transition-all duration-200 hover:-translate-y-0.5
                      ${selectedGateway === gw.id
                        ? 'border-brand-900 bg-gray-50 dark:bg-[#1A1A1F] text-gray-900 dark:text-gray-100 shadow-soft'
                        : 'border-editorial-border bg-surface text-gray-500 dark:text-gray-400 hover:border-editorial-border'
                      }`}
                  >
                    {selectedGateway === gw.id && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-brand-900 flex items-center justify-center">
                        <svg width="9" height="9" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 12 12"><polyline points="2 6 5 9 10 3"/></svg>
                      </span>
                    )}
                    <span className="text-2xl">{gw.icon}</span>
                    <span>{gw.name}</span>
                    <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">{gw.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-danger-50 border border-danger-100 rounded-lg p-5 animate-fade-up">
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">😥</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-danger-700 text-sm">Payment Failed</h4>
                    <p className="text-danger-600 text-xs font-medium mt-0.5">
                      {error.message || "We couldn't process your payment."}
                    </p>
                    <div className="flex gap-2 mt-3">
                      {selectedGateway !== 'stripe' && (
                        <button
                          type="button"
                          onClick={() => setSelectedGateway('stripe')}
                          className="px-3 py-1.5 bg-white dark:bg-[#1A1A1F] text-gray-700 dark:text-gray-300 text-xs font-bold rounded-lg border border-editorial-border hover:bg-gray-50 dark:hover:bg-[#22222A] transition-colors"
                        >
                          Try Card instead
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handlePaymentSubmit}
                        className="px-3 py-1.5 bg-danger text-white text-xs font-bold rounded-lg hover:bg-danger-600 transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handlePaymentSubmit}>
              <button
                type="submit"
                disabled={isProcessing}
                className="shimmer-btn w-full py-4 rounded-full font-extrabold text-base text-brand-900 bg-gradient-to-br from-brand-400 to-brand-500 shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin" width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    Processing…
                  </>
                ) : (
                  <> Subscribe for ${tierPrice.toFixed(2)}/mo</>
                )}
              </button>
              <p className="text-center text-xs font-bold text-gray-400 dark:text-gray-500 mt-3 flex items-center justify-center gap-1.5">
                <span>🔒</span> Secure payment · Cancel anytime
              </p>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <div className="bg-surface-card rounded-2xl p-6 border border-editorial-border shadow-soft animate-fade-up" style={{ animationDelay: '0.14s' }}>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest mb-4">Order Summary</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Plan</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">Pro Tier</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Billing</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">Monthly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Trial</span>
                  <span className="font-bold text-success">7 days free</span>
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900 dark:text-gray-100">Total today</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100 text-base">${tierPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-6 animate-fade-up"
              style={{ background: 'linear-gradient(135deg,#111827,#1f2937)', animationDelay: '0.18s' }}
            >
              <p className="text-xs font-bold text-gray-400 tracking-widest mb-4">What you get</p>
              <ul className="space-y-3">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-gray-300 font-medium">
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="10" height="10" fill="none" stroke="#111" strokeWidth="2" viewBox="0 0 12 12"><polyline points="2 6 5 9 10 3"/></svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
