import React, { useState, useRef, useEffect } from 'react';
import {
  Gift,
  Ticket,
  Plus,
  Tag,
  Search,
  ArrowUpDown,
  Truck,
  User,
  Award,
  ChevronDown,
  X
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const QuickActionToolbar: React.FC = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    setIsNewProductModalOpen,
    setActiveDrawerModal
  } = useShop();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white px-3 py-2.5 shadow-xs border-b border-slate-100 flex flex-col gap-2.5">
      {/* Row 1: Giveaway, Coupon, + New Product */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setActiveDrawerModal('giveaways')}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border border-pink-200 bg-pink-50/70 text-pink-700 hover:bg-pink-100 transition-colors text-xs font-semibold active:scale-[0.98]"
        >
          <Gift className="w-4 h-4 text-pink-600 shrink-0" />
          <span className="truncate">Giveaway</span>
        </button>

        <button
          onClick={() => setActiveDrawerModal('coupons')}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border border-teal-200 bg-teal-50/70 text-teal-700 hover:bg-teal-100 transition-colors text-xs font-semibold active:scale-[0.98]"
        >
          <Ticket className="w-4 h-4 text-teal-600 shrink-0" />
          <span className="truncate">Coupon</span>
        </button>

        <button
          onClick={() => setIsNewProductModalOpen(true)}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#5f2eea] text-white hover:bg-[#5024cf] shadow-sm transition-colors text-xs font-bold active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 stroke-[3] shrink-0" />
          <span className="truncate">New Product</span>
        </button>
      </div>

      {/* Row 2: Category Filter, Search Bar, Sort */}
      <div className="flex items-center gap-1.5">
        {/* Category Button & Dropdown */}
        <div className="relative shrink-0" ref={categoryRef}>
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
          >
            <Tag className="w-3.5 h-3.5 text-slate-500" />
            <span className="max-w-[70px] truncate">{selectedCategory}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isCategoryOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Filter Category
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsCategoryOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                    selectedCategory === cat
                      ? 'bg-purple-50 text-[#5f2eea] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{cat}</span>
                  {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-[#5f2eea]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-8 pr-7 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5f2eea]/30 focus:border-[#5f2eea] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Sort Button & Dropdown */}
        <div className="relative shrink-0" ref={sortRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span>Sort</span>
          </button>

          {isSortOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Sort By
              </div>
              {[
                { id: 'default', label: 'Recommended' },
                { id: 'price-asc', label: 'Price: Low to High' },
                { id: 'price-desc', label: 'Price: High to Low' },
                { id: 'name', label: 'Product Name' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSortBy(item.id as any);
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                    sortBy === item.id
                      ? 'bg-purple-50 text-[#5f2eea] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {sortBy === item.id && <span className="w-1.5 h-1.5 rounded-full bg-[#5f2eea]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Row 3: Delivery, Profile, Points */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setActiveDrawerModal('delivery')}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition-colors text-xs font-semibold active:scale-[0.98]"
        >
          <Truck className="w-4 h-4 shrink-0" />
          <span className="truncate">Delivery</span>
        </button>

        <button
          onClick={() => setActiveDrawerModal('profile')}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#5f2eea] text-white hover:bg-[#5024cf] shadow-xs transition-colors text-xs font-semibold active:scale-[0.98]"
        >
          <User className="w-4 h-4 shrink-0" />
          <span className="truncate">Profile</span>
        </button>

        <button
          onClick={() => setActiveDrawerModal('points')}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 shadow-xs transition-colors text-xs font-semibold active:scale-[0.98]"
        >
          <Award className="w-4 h-4 shrink-0" />
          <span className="truncate">Points</span>
        </button>
      </div>
    </div>
  );
};
