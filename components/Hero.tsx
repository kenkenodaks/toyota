'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[680px] flex flex-col justify-end overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.02]"
        style={{ backgroundImage: 'url(/cars/home.jpg)' }}
      />

      {/* Layered gradient — dark at bottom, subtle at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      {/* Left-side vignette for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-10 pb-16 lg:pb-24">

        {/* Label */}
        <motion.span
          className="section-label !text-white/50 !mb-4 !tracking-[0.25em]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Premium Collection 2024
        </motion.span>

        {/* Headline */}
        <motion.h1
          className="text-[clamp(2.8rem,7vw,6rem)] font-black text-white leading-[0.95] tracking-[-0.03em] max-w-3xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Find Your
          <br />
          <span className="text-brand-red">Perfect Drive.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-[15px] text-white/60 max-w-md leading-relaxed mb-10 font-light"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          Curated Toyota vehicles — engineered for performance,
          built for the road ahead.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Link href="/cars" className="btn-primary group">
            View Inventory
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a href="#contact" className="btn-ghost">
            Contact Us
          </a>
        </motion.div>
      </div>

      {/* ── Stats strip ── */}
      <motion.div
        className="relative z-10 bg-black/50 backdrop-blur-md border-t border-white/8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 grid grid-cols-3 divide-x divide-white/10">
          {[
            { value: '500+', label: 'Vehicles Available' },
            { value: '12 Yrs', label: 'In Business' },
            { value: '5,000+', label: 'Happy Customers' },
          ].map((s) => (
            <div key={s.label} className="text-center px-4">
              <div className="text-[22px] font-black text-white tracking-tight">{s.value}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-[0.18em] mt-0.5 font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
