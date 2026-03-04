import React from 'react';
import Button from '../ui/Button';

const OAuthRecommendation = ({ onSkip }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface font-sans p-4">
      <div
        className="bg-surface-card p-10 rounded-[2.5rem] shadow-soft-lg max-w-lg w-full relative overflow-hidden"
        style={{ boxShadow: '0 16px 48px rgba(255,221,0,0.12), 0 8px 24px rgba(0,0,0,0.06)' }}
      >
        {/* Decorative background blob */}
        <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-brand-400 opacity-15 rounded-full blur-3xl pointer-events-none"></div>

        <h2 className="text-3xl font-bold text-brand-900 mb-3 relative z-10">One last thing...</h2>
        <p className="text-gray-600 mb-8 relative z-10">
          Creators who link a social account get set up 3x faster and enjoy enhanced security.
        </p>

        <div className="space-y-4 relative z-10">
          <button className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl border border-brand-200/50 bg-brand-50/30 hover:bg-white hover:border-brand-400 hover:shadow-soft transition-all duration-300 ease-smooth font-bold text-brand-900 hover:-translate-y-0.5 active:translate-y-0">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
              <path d="M44.5 20H24v8.5h11.8C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.4-.2-2.7-.5-4z" fill="#FFC107"/>
              <path d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.6 5.1 29.6 3 24 3 16.3 3 9.7 7.9 6.3 14.7z" fill="#FF3D00"/>
              <path d="M24 45c5.5 0 10.5-2 14.2-5.2l-6.6-5.4C29.5 36.1 26.9 37 24 37c-5.8 0-10.7-3.9-12.3-9.3l-6.9 5.3C8.2 40.8 15.5 45 24 45z" fill="#4CAF50"/>
              <path d="M44.5 20H24v8.5h11.8c-.7 2.2-2.1 4.1-4 5.4l6.6 5.4C42 35.8 45 30.3 45 24c0-1.4-.2-2.7-.5-4z" fill="#1976D2"/>
            </svg>
            Link Google Account
          </button>
        </div>

        <Button
          variant="ghost"
          size="md"
          onClick={onSkip}
          className="w-full mt-6"
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
};

export default OAuthRecommendation;
