import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface dark:bg-[#0A0A0A] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Floating decorative shapes */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-brand-400 rounded-full opacity-20 animate-float-slow" />
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-brand-400 rounded-2xl opacity-15 animate-float-delayed rotate-12" />
      <div className="absolute top-1/3 right-1/4 w-10 h-10 bg-brand-400 rounded-lg opacity-10 animate-float-fast -rotate-6" />

      {/* Glitch 404 */}
      <h1
        className="text-[10rem] sm:text-[14rem] font-black leading-none text-brand-900 dark:text-gray-100 select-none relative"
        style={{ textShadow: '4px 4px 0px #FFDD00' }}
      >
        404
      </h1>

      <p className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-400 mt-4 mb-8 text-center max-w-md">
        This page wandered off the hub.
      </p>

      <Link
        to="/home"
        className="inline-flex items-center gap-3 bg-gradient-to-br from-brand-400 to-brand-500 text-brand-900 font-bold px-8 py-4 rounded-xl shadow-soft hover:shadow-glow transition-all duration-300 text-lg"
      >
        <ArrowLeft size={22} />
        Return to Hub
      </Link>
    </div>
  );
}
