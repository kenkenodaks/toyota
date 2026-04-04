'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Award, Users, Car, Star, Instagram, Facebook, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import FeaturedCars from '@/components/FeaturedCars';
import WhyChooseUs from '@/components/WhyChooseUs';
import { useEffect, useState } from 'react';

const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '300+', label: 'Cars Sold' },
  { value: '250+', label: 'Happy Clients' },
  { value: '5★', label: 'Average Rating' },
];

const achievements = [
  { year: '2024', title: 'Top Sales Agent of the Year', org: 'Toyota Motors Dealership' },
  { year: '2023', title: 'Diamond Sales Performer', org: 'Toyota Motors Dealership' },
  { year: '2022', title: 'Customer Satisfaction Award', org: 'Toyota Philippines' },
  { year: '2021', title: 'Gold Sales Achiever', org: 'Toyota Motors Dealership' },
];

const testimonials = [
  {
    name: 'Marco Reyes',
    car: 'Toyota Land Cruiser 300',
    text: 'Professional, knowledgeable, and never pushy. Made buying my Land Cruiser the best experience.',
  },
  {
    name: 'Angela Santos',
    car: 'Toyota RAV4 2024',
    text: 'Found exactly what I needed within my budget. Highly recommend to anyone looking for a Toyota.',
  },
  {
    name: 'James Villanueva',
    car: 'Toyota Camry 2024',
    text: 'Honest, fast, and delivered everything he promised. Will definitely come back for my next car.',
  },
];

export default function AboutPage() {
  const [featuredCars, setFeaturedCars] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/cars')
      .then((r) => r.json())
      .then((data) => setFeaturedCars(Array.isArray(data) ? data.filter((c: any) => c.featured) : []));
  }, []);

  return (
    <div className="min-h-screen bg-white pt-[84px] lg:pt-[96px]">

      {/* ── INTRO — text only ── */}
      <section className="bg-[#0A0A0A] py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-2xl"
          >
            <span className="section-label !text-brand-red">Sales Agent</span>
            <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-black text-white leading-[1.0] tracking-tight mt-2 mb-6">
              RICHELE DULIG
            </h1>
            <p className="text-neutral-400 text-[15px] leading-relaxed max-w-md font-light mb-8">
              Dedicated Toyota sales professional with over 8 years of experience helping
              customers find their perfect vehicle. Known for honest advice, deep product
              knowledge, and building lifelong relationships — not just one-time sales.
            </p>
            <div className="flex gap-3">
              <a href="#" className="flex items-center gap-2 px-4 py-2.5 border border-neutral-700 text-[12px] font-semibold text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors uppercase tracking-widest">
                <Facebook size={13} /> Facebook
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2.5 border border-neutral-700 text-[12px] font-semibold text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors uppercase tracking-widest">
                <Instagram size={13} /> Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-neutral-100">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }} className="py-10 px-8 text-center">
                <div className="text-[36px] font-black text-[#0A0A0A] tracking-tight leading-none">{s.value}</div>
                <div className="text-[11px] text-neutral-400 font-medium uppercase tracking-widest mt-2">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT + ACHIEVEMENTS ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="section-label">About</span>
              <h2 className="section-title mb-6">My Story</h2>
              <div className="space-y-4 text-[15px] text-neutral-500 leading-relaxed font-light">
                <p>I started my career at Toyota Motors in 2016 with one goal — to make buying a car a genuinely enjoyable experience. Too often, customers feel overwhelmed or pressured. I do the opposite.</p>
                <p>I take time to understand each client's lifestyle, budget, and driving needs before recommending a single model. My job isn't to sell you a car — it's to help you find the right one.</p>
                <p>Whether you're a first-time buyer or upgrading your fleet, I'm here to guide you through every step — from test drive to after-sales support.</p>
              </div>
              <Link href="/cars" className="inline-flex items-center gap-2 mt-8 text-[13px] font-semibold text-brand-red uppercase tracking-widest hover:gap-3 transition-all group">
                Browse Inventory <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
              <span className="section-label">Track Record</span>
              <h2 className="section-title mb-6">Achievements</h2>
              <div className="border border-neutral-100">
                {achievements.map((a, i) => (
                  <div key={i} className="flex gap-6 px-6 py-5 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors group">
                    <span className="text-[12px] font-bold text-brand-red shrink-0 pt-0.5 w-10">{a.year}</span>
                    <div>
                      <p className="text-[14px] font-semibold text-[#0A0A0A] group-hover:text-brand-red transition-colors">{a.title}</p>
                      <p className="text-[12px] text-neutral-400 mt-0.5">{a.org}</p>
                    </div>
                    <Award size={16} className="text-neutral-200 shrink-0 ml-auto mt-0.5 group-hover:text-brand-red transition-colors" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#0A0A0A] py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
            <span className="section-label !text-brand-red">Client Reviews</span>
            <h2 className="section-title !text-white">What They Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-800">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }} className="bg-[#0A0A0A] p-8 hover:bg-[#111] transition-colors">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={12} className="text-brand-red fill-brand-red" />)}
                </div>
                <p className="text-neutral-400 text-[14px] leading-relaxed font-light mb-6">"{t.text}"</p>
                <div>
                  <p className="text-white font-bold text-[13px]">{t.name}</p>
                  <p className="text-neutral-600 text-[11px] mt-0.5 flex items-center gap-1.5"><Car size={10} /> {t.car}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAR SHOWCASE ── */}
      <Hero />
      <FeaturedCars cars={featuredCars} />
      <WhyChooseUs />

      {/* ── CONTACT — photo + info (last section) ── */}
      <section className="bg-[#0A0A0A] py-24 lg:py-28" id="contact">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Section label */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
            <span className="section-label !text-brand-red">Contact</span>
            <h2 className="section-title !text-white">Get In Touch</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full border-2 border-brand-red" />
                <div className="relative w-[300px] h-[380px] lg:w-[400px] lg:h-[500px] bg-neutral-800 overflow-hidden">
                  <img
                    src="/about/agent.jpg"
                    alt="Richele Dulig"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  {/* Placeholder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-24 h-24 rounded-full bg-neutral-700 flex items-center justify-center">
                      <Users size={36} className="text-neutral-500" strokeWidth={1} />
                    </div>
                    <code className="text-[11px] text-neutral-600 bg-neutral-900 px-3 py-1">public/about/agent.jpg</code>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                    <p className="text-white font-bold text-[15px]">Richele Dulig</p>
                    <p className="text-brand-red text-[11px] font-semibold uppercase tracking-widest mt-0.5">Senior Sales Consultant</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <p className="text-neutral-400 text-[15px] leading-relaxed font-light mb-10">
                Ready to drive your dream Toyota? I'm here to help you every step of the way — from choosing the right model to closing the deal.
              </p>
              <div className="space-y-5 mb-10">
                {[
                  { icon: Phone, label: 'Phone', text: '+63 917 123 4567' },
                  { icon: Mail, label: 'Email', text: 'richele@toyotamotors.ph' },
                  { icon: MapPin, label: 'Location', text: '123 Dealership Blvd, Makati City' },
                ].map(({ icon: Icon, label, text }) => (
                  <div key={label} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 border border-neutral-700 flex items-center justify-center group-hover:border-brand-red group-hover:bg-brand-red/10 transition-all">
                      <Icon size={15} className="text-brand-red" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-semibold">{label}</p>
                      <p className="text-[14px] text-white mt-0.5">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <a href="#" className="flex items-center gap-2 px-5 py-3 bg-brand-red text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#C8001A] transition-colors">
                  <Facebook size={13} /> Facebook
                </a>
                <a href="#" className="flex items-center gap-2 px-5 py-3 border border-neutral-700 text-[12px] font-semibold text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors uppercase tracking-widest">
                  <Instagram size={13} /> Instagram
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
