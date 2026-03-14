"use client";

import React, { useState, useEffect } from 'react';
import { Search, Zap, X } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { Header} from '../header/Header';
import SearchHero from './components/SearchHero';
import CategoryPills from './components/CategoryPills';
import ExploreCard from './components/ExploreCard';
import TrendingCreators from './components/TrendingCreators';
import Button from '../ui/Button';
import Skeleton from '../ui/Skeleton';

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

async function fetchUsers() {
  const apiUrl = 'https://api-creators-hub.vercel.app/api/v1/users/all';
  console.log("test");
  const response = await fetch(apiUrl);
  const users = await response.json();

  return users;
}




export default function ExplorePage() {
  fetchUsers()
  .then((users) => {
    console.log('List of users:', users);
  })
  .catch((error) => {
    console.error('Failed to retrieve users:', error);
  });
    const [searchQuery, setSearchQuery] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [debouncedSearch] = useDebounce(searchQuery, 300);

    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 1200);
      return () => clearTimeout(timer);
    }, []);

    // 1. Logic to filter creators based on name or category using Debouncer
    const filteredCreators = CREATORS.filter((creator) => {
        const searchLower = debouncedSearch.toLowerCase();
        return (
        creator.name.toLowerCase().includes(searchLower) ||
        creator.category.toLowerCase().includes(searchLower)
        );
    });

  return (
    <main className="min-h-screen bg-surface dark:bg-[#0C0C0F] pb-20">
      <Header />
      {/* 1. Full-Width Search Header */}
      <SearchHero onSearchChange={setSearchQuery} />

      {/* 2. Main Content Container */}
      <div className="container mx-auto px-4 md:px-6 mt-12">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12">

          {/* LEFT SIDE: Feed & Filters (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold font-serif text-brand-900 dark:text-gray-100">
                {searchQuery ? `Results for "${searchQuery}"` : "Browse Categories"}
              </h2>
              <CategoryPills />
            </div>

            {/* Responsive Creator Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8">
              {isLoading ? (
                [0, 1, 2, 3].map((i) => (
                  <div key={i} className="rounded-2xl border border-editorial-border bg-surface-card overflow-hidden">
                    <Skeleton className="w-full rounded-none" style={{ aspectRatio: '4/3' }} />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-5 w-32" />
                      <div className="flex gap-3">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full rounded-full" />
                    </div>
                  </div>
                ))
              ) : filteredCreators.length > 0 ? (
                filteredCreators.map((creator, index) => (
                  <ExploreCard key={index} {...creator} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center border border-dashed border-gray-200 dark:border-[#27272F] rounded-3xl bg-gray-50 dark:bg-[#111115]">
                  <p className="text-2xl font-bold text-gray-400 dark:text-gray-600">No creators found!</p>
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
            aria-label="View trending"
            className="lg:hidden fixed bottom-6 right-6 bg-brand-900 text-white p-4 rounded-full shadow-soft-lg hover:shadow-soft-xl transition-all duration-300 ease-smooth z-50 border border-gray-700"
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
                <div className="absolute right-0 top-0 h-full w-full sm:w-80 bg-surface border-l border-editorial-border p-6 shadow-soft-xl overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-xl text-brand-900 dark:text-gray-100">Live Activity</h2>
                    <button
                    onClick={() => setIsSidebarOpen(false)}
                    aria-label="Close sidebar"
                    className="p-2 border border-editorial-border rounded-xl hover:bg-gray-50 dark:hover:bg-[#2D2D2D] transition-colors duration-300"
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
