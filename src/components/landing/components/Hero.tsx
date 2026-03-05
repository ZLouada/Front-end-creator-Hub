"use client";
import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import styles from './Hero.module.css';
import useTypewriter from '../../../hooks/useTypewriter';

const TYPEWRITER_PHRASES = [
  "Build your community.",
  "Earn in local currency.",
  "Grow without barriers.",
  "Keep 90% of revenue.",
];

const Hero = () => {
  const [username, setUsername] = useState('');
  const typewriterText = useTypewriter(TYPEWRITER_PHRASES);

  return (
    <section className={`${styles.gridBg} relative w-full min-h-[90vh] bg-surface dark:bg-[#0A0A0A] overflow-hidden flex items-center`}>
      <div className="container mx-auto px-6 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center relative z-10">

        {/* LEFT CONTENT */}
        <div className="flex flex-col space-y-8">
          <div className="inline-flex items-center space-x-2 bg-brand-100 dark:bg-yellow-900/20 text-brand-900 dark:text-yellow-100 px-4 py-2 rounded-full w-fit">
            <Globe size={18} className="text-brand-600" />
            <span className="text-sm font-bold tracking-wider">Built for South Asia</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-brand-900 dark:text-gray-100 leading-tight">
            Monetize Your Craft in <span className="text-gradient-gold">South Asia.</span>
          </h1>

          <p className="text-base lg:text-xl text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed h-[3.5rem]">
            {typewriterText}<span className="typewriter-cursor" />
          </p>

          {/* THE CLAIM BAR */}
          <form className={`${styles.claimBar} flex flex-col sm:flex-row items-center p-2 bg-white dark:bg-[#141414] border border-brand-300/20 dark:border-gray-700 rounded-2xl max-w-xl`}>
            <div className="flex items-center flex-1 px-4 py-3 w-full">
              <span className="text-gray-400 dark:text-gray-500 font-medium mr-1">creatorhub.sa/</span>
              <input
                type="text"
                placeholder="yourname"
                className="w-full bg-transparent outline-none text-brand-900 dark:text-gray-100 font-bold text-lg"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button className={`${styles.btnShine} w-full sm:w-auto bg-gradient-to-br from-brand-400 to-brand-500 text-brand-900 font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-soft hover:shadow-glow transition-all duration-300 ease-smooth`}>
              Start Free <ArrowRight size={20} />
            </button>
          </form>

          <div className="flex flex-wrap gap-6 items-center pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
              <CheckCircle2 size={18} className="text-success" /> No credit card required
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT - Floating Images */}
        <div className="relative h-[350px] sm:h-[500px] lg:h-[650px] w-full flex justify-center items-center">

          {/* Center Main Image */}
          <div className="absolute z-20 w-64 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden shadow-soft-lg border-2 border-white/80 animate-float-slow">
             <img
                alt="Main Creator"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=800"
              />
          </div>

          {/* Top Left Floating Image */}
          <div className="absolute top-4 left-0 z-10 w-28 h-36 sm:w-40 sm:h-48 md:w-48 md:h-56 rounded-3xl overflow-hidden shadow-soft border-2 border-white/80 animate-float-delayed transform -rotate-6">
              <img
                src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400"
                alt="Artist Creator"
                className="w-full h-full object-cover"
              />
          </div>

          {/* Bottom Right Floating Card */}
          <div className="absolute bottom-10 right-0 z-30 w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-gradient-to-br from-brand-400 to-brand-500 rounded-3xl p-4 sm:p-6 flex flex-col justify-between shadow-soft-lg transform rotate-3 animate-float-fast">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-soft-sm">
              <span className="text-xl">✨</span>
            </div>
            <p className="text-brand-900 font-bold text-sm sm:text-xl leading-tight">
              "Finally, a platform that understands my audience."
            </p>
          </div>

          {/* Decorative Yellow Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-400 opacity-15 blur-[80px] rounded-full z-0"></div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
