'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import CarCard, { CarCardProps } from '@/components/CarCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface Props {
  initialCars: CarCardProps[];
}

const FUEL_TYPES = ['All', 'Petrol', 'Hybrid', 'Diesel', 'Electric'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
];

export default function CarListingsClient({ initialCars }: Props) {
  const [search, setSearch] = useState('');
  const [fuelFilter, setFuelFilter] = useState('All');
  const [sort, setSort] = useState('newest');

  const filtered = useMemo(() => {
    let cars = [...initialCars];

    if (search.trim()) {
      const q = search.toLowerCase();
      cars = cars.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.specs?.fuel?.toLowerCase().includes(q) ||
          c.specs?.transmission?.toLowerCase().includes(q)
      );
    }

    if (fuelFilter !== 'All') {
      cars = cars.filter((c) =>
        c.specs?.fuel?.toLowerCase().includes(fuelFilter.toLowerCase())
      );
    }

    if (sort === 'price-asc') cars.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') cars.sort((a, b) => b.price - a.price);

    return cars;
  }, [initialCars, search, fuelFilter, sort]);

  const hasFilter = search || fuelFilter !== 'All';

  return (
    <div className="min-h-screen bg-white pt-[68px] lg:pt-[74px]">

      {/* ── Page header ── */}
      <div className="border-b border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="section-label">Our Fleet</span>
            <h1 className="section-title">Browse Inventory</h1>
            <p className="text-neutral-400 text-[13px] mt-2 font-light">
              {initialCars.length} vehicles available
            </p>
          </motion.div>

          {/* ── Filters ── */}
          <div className="mt-8 flex flex-col lg:flex-row gap-4 lg:items-center">

            {/* Search */}
            <div className="relative w-full max-w-xs">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vehicles..."
                className="w-full pl-9 pr-9 py-2.5 border border-neutral-200 text-[13px] bg-white focus:outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-400"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Fuel pills */}
            <div className="flex gap-2 flex-wrap">
              {FUEL_TYPES.map((f) => (
                <button
                  key={f}
                  onClick={() => setFuelFilter(f)}
                  className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-widest border transition-all duration-150 ${
                    fuelFilter === f
                      ? 'bg-brand-red text-white border-brand-red'
                      : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400 hover:text-[#0A0A0A]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 lg:ml-auto">
              <SlidersHorizontal size={13} className="text-neutral-400 shrink-0" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-[13px] border border-neutral-200 px-3 py-2.5 bg-white focus:outline-none focus:border-neutral-400 text-neutral-600"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-28">
            <p className="text-neutral-400 text-[15px]">No vehicles match your search.</p>
            {hasFilter && (
              <button
                onClick={() => { setSearch(''); setFuelFilter('All'); }}
                className="mt-4 text-[13px] text-brand-red font-semibold hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="text-[12px] text-neutral-400 font-medium uppercase tracking-widest mb-6">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-neutral-100 border border-neutral-100">
              {filtered.map((car, i) => (
                <motion.div
                  key={car._id}
                  className="bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  <CarCard {...car} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
