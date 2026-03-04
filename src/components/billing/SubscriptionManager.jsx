import React, { useState } from 'react';

const SubscriptionManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [status, setStatus] = useState('active');

  const handleUnsubscribe = async () => {
    setIsCancelling(true);
    await new Promise((r) => setTimeout(r, 1400));
    setStatus('cancelled');
    setIsModalOpen(false);
    setIsCancelling(false);
  };

  return (
    <>
      <div className="bg-surface-card rounded-2xl border border-brand-300/20 shadow-soft overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-4 p-6">

          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-brand-900 shrink-0 bg-gradient-to-br from-brand-400 to-brand-500 shadow-glow-sm"
            >
              C
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Creative Studio — Pro</p>
              <p className="text-xs text-gray-400 font-medium">$10.00 / month · renews Feb 28, 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {status === 'active' ? (
              <>
                <span className="px-3 py-1.5 bg-green-50 text-success text-xs font-bold rounded-xl border border-green-100">
                  Active
                </span>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-bold text-danger border-2 border-danger-100 rounded-xl hover:bg-danger-50 transition-all active:scale-95"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-500 text-xs font-bold rounded-xl">
                  Cancelled
                </span>
                <span className="text-xs text-gray-400 font-medium">Access ends at billing cycle</span>
              </>
            )}
          </div>
        </div>

        {status === 'active' && (
          <div className="px-6 pb-5">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 mb-1.5">
              <span>Storage used</span><span>2.4 GB / 10 GB</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-500" style={{ width: '24%' }} />
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !isCancelling && setIsModalOpen(false)}
          />
          <div className="relative z-10 bg-surface-card rounded-2xl shadow-soft-xl w-full max-w-sm p-7 animate-fade-up">
            <div className="w-12 h-12 rounded-full bg-danger-50 flex items-center justify-center mb-4">
              <svg width="22" height="22" fill="none" stroke="#FF5C5C" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Cancel subscription?</h4>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              You'll lose access to <strong className="text-gray-800">Creative Studio Pro</strong> at the end of your current billing period. This action cannot be undone.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isCancelling}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-gray-700 border-2 border-brand-300/20 hover:bg-brand-50 transition-all disabled:opacity-50"
              >
                Keep plan
              </button>
              <button
                onClick={handleUnsubscribe}
                disabled={isCancelling}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-danger hover:bg-danger-600 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isCancelling ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>
                    Cancelling…
                  </>
                ) : 'Yes, cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionManager;
