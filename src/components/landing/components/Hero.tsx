"use client";
import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import styles from './Hero.module.css'; // Import the new styles

const Hero = () => {
  const [username, setUsername] = useState('');

  return (
    <section className="relative w-full min-h-[90vh] bg-white overflow-hidden flex items-center">
      <div className="container mx-auto px-6 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col space-y-8">
          <div className="inline-flex items-center space-x-2 bg-[#FFDD00]/20 text-[#1A1A1A] px-4 py-2 rounded-full w-fit">
            <Globe size={18} />
            <span className="text-sm font-bold uppercase tracking-wider">Built for South Asia</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold text-[#1A1A1A] leading-tight">
            Monetize Your Craft in <span className="text-[#FFDD00]">South Asia.</span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-600 max-w-lg leading-relaxed">
            The only subscription platform built for <span className="font-bold text-[#1A1A1A]">JazzCash, bKash, and Razorpay.</span> Keep 90% of what you earn.
          </p>

          {/* THE CLAIM BAR - Styled via Module */}
          <form className={`${styles.claimBar} flex flex-col sm:flex-row items-center p-2 bg-white border-2 border-[#1A1A1A] rounded-2xl max-w-xl`}>
            <div className="flex items-center flex-1 px-4 py-3 w-full">
              <span className="text-gray-400 font-medium mr-1">creatorhub.sa/</span>
              <input 
                type="text" 
                placeholder="yourname" 
                className="w-full bg-transparent outline-none text-[#1A1A1A] font-bold text-lg"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button className={`${styles.btnShine} w-full sm:w-auto bg-[#FFDD00] text-[#1A1A1A] font-black px-8 py-4 rounded-xl flex items-center justify-center gap-2 uppercase`}>
              Start Free <ArrowRight size={20} />
            </button>
          </form>

          <div className="flex flex-wrap gap-6 items-center pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <CheckCircle2 size={18} className="text-[#00C853]" /> No credit card required
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT - Animated via Module */}
        <div className="relative grid grid-cols-2 gap-4 h-[500px] lg:h-[600px]">
          <div className={`${styles.floating} relative h-full w-full bg-gray-200 rounded-3xl overflow-hidden shadow-xl`}>
             <img 
                alt="Creator filming content with a professional camera" 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=800"
              />
          </div>

          <div className="flex flex-col gap-4 h-full">
            <div className={`${styles.floatingDelayed} h-1/2 w-full bg-gray-200 rounded-3xl overflow-hidden shadow-lg`}>
              <img 
                src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400" 
                alt="Artist" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-1/2 w-full bg-[#1A1A1A] rounded-3xl p-6 flex flex-col justify-end shadow-lg">
              <p className="text-white font-bold text-xl leading-tight">"Finally, a platform that understands bKash."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;