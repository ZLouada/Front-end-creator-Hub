"use client";

import React, { useState } from 'react';
import { Search, Zap, X } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { Header} from '../header/Header';
import SearchHero from './components/SearchHero';
import CategoryPills from './components/CategoryPills';
import ExploreCard from './components/ExploreCard';
import TrendingCreators from './components/TrendingCreators';
import Button from '../ui/Button';

// Mock data for the grid
const CREATORS = [
  {
    name: "Ali Solangi",
    category: "Tech",
    supporters: "1.2k",
    rating: "4.9",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    startingPrice: "PKR 500"
  },
  {
    name: "Priya Sharma",
    category: "Vlogger",
    supporters: "850",
    rating: "4.8",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    startingPrice: "INR 250"
  },
  {
    name: "Nabil Ahmed",
    category: "Podcast",
    supporters: "2.4k",
    rating: "5.0",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    startingPrice: "BDT 300"
  },
  {
    name: "Zoya Khan",
    category: "Art",
    supporters: "600",
    rating: "4.7",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    startingPrice: "PKR 1,000"
  }
];


export default function ExplorePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [debouncedSearch] = useDebounce(searchQuery, 300);

    // 1. Logic to filter creators based on name or category using Debouncer
    const filteredCreators = CREATORS.filter((creator) => {
        const searchLower = debouncedSearch.toLowerCase();
        return (
        creator.name.toLowerCase().includes(searchLower) ||
        creator.category.toLowerCase().includes(searchLower)
        );
    });

  return (
    <main className="min-h-screen bg-surface dark:bg-[#0A0A0A] pb-20">
      <Header />
      {/* 1. Full-Width Search Header */}
      <SearchHero onSearchChange={setSearchQuery} />

      {/* 2. Main Content Container */}
      <div className="container mx-auto px-4 md:px-6 mt-12">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12">

          {/* LEFT SIDE: Feed & Filters (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-brand-900 dark:text-gray-100">
                {searchQuery ? `Results for "${searchQuery}"` : "Browse Categories"}
              </h2>
              <CategoryPills />
            </div>

            {/* Responsive Creator Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8">
              {filteredCreators.length > 0 ? (
                filteredCreators.map((creator, index) => (
                  <ExploreCard key={index} {...creator} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center border border-dashed border-brand-200 rounded-3xl bg-brand-50/50">
                  <p className="text-2xl font-bold text-brand-700/40">No creators found!</p>
                </div>
              )}
            </div>

            {/* Load More Button */}
            <div className="pt-10 flex justify-center">
              <Button variant="secondary" size="lg">
                Load More Creators
              </Button>
            </div>
          </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24">
                <TrendingCreators />
            </div>
            </div>

            {/* Mobile FAB */}
            <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 bg-gradient-to-br from-brand-400 to-brand-500 text-brand-900 p-4 rounded-full shadow-soft-md hover:shadow-glow transition-all duration-300 ease-smooth z-50 border border-brand-300"
            >
            <Zap size={24} />
            </button>

            {/* Mobile Drawer Overlay */}
            {isSidebarOpen && (
            <div className="fixed inset-0 z-[60] lg:hidden">
                {/* Background Blur/Dim */}
                <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setIsSidebarOpen(false)}
                />

                {/* The Drawer Content */}
                <div className="absolute right-0 top-0 h-full w-full sm:w-80 bg-surface border-l border-brand-200 p-6 shadow-soft-xl overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-xl text-brand-900 dark:text-gray-100">Live Activity</h2>
                    <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 border border-brand-200 rounded-xl hover:bg-brand-50 transition-colors duration-300"
                    >
                    <X size={20} />
                    </button>
                </div>

                {/* Reusing your existing component inside the drawer */}
                <TrendingCreators />
                </div>
            </div>
            )}

        </div>
      </div>
    </main>
  );
}
