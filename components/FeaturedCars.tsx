'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CarCard, { CarCardProps } from './CarCard';
import { ArrowRight } from 'lucide-react';

interface Props {
  cars: CarCardProps[];
}

export default function FeaturedCars({ cars }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-white" id="featured">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label">Featured Collection</span>
            <h2 className="section-title">Handpicked for You</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              href="/cars"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold text-neutral-500 hover:text-brand-red transition-colors uppercase tracking-widest"
            >
              View all
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        {cars.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-neutral-200">
            <p className="text-neutral-400 text-sm">No featured vehicles yet.</p>
            <Link href="/admin" className="mt-3 inline-block text-brand-red text-sm font-semibold hover:underline">
              Add from Admin →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-neutral-100 border border-neutral-100">
            {cars.map((car, i) => (
              <motion.div
                key={car._id}
                className="bg-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <CarCard {...car} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
