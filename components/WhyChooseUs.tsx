'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Wrench, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Certified Quality',
    desc: 'Every vehicle passes a rigorous 150-point inspection before reaching our showroom.',
  },
  {
    icon: Wrench,
    title: 'Expert Service',
    desc: 'Toyota-certified technicians keep your vehicle performing at its absolute best.',
  },
  {
    icon: Clock,
    title: 'Transparent Pricing',
    desc: 'No hidden costs. Straightforward deals and a seamless buying experience.',
  },
  {
    icon: Award,
    title: 'Award-Winning',
    desc: 'Recognized as the region\'s top Toyota dealer for 5 consecutive years.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#0A0A0A] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label !text-brand-red">Why Choose Us</span>
            <h2 className="section-title !text-white">
              The Toyota
              <br />
              Difference
            </h2>
          </motion.div>
          <motion.p
            className="text-neutral-500 text-[15px] max-w-xs leading-relaxed font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We don't just sell cars — we build lasting relationships with every driver we serve.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-[#0A0A0A] px-8 py-10 hover:bg-[#111111] transition-colors duration-300"
            >
              {/* Icon */}
              <div className="mb-6">
                <f.icon
                  size={22}
                  className="text-brand-red group-hover:scale-110 transition-transform duration-300"
                  strokeWidth={1.5}
                />
              </div>
              {/* Number */}
              <div className="text-[11px] text-neutral-700 font-bold tracking-[0.2em] mb-3 uppercase">
                0{i + 1}
              </div>
              <h3 className="text-[15px] font-bold text-white mb-3 leading-tight">{f.title}</h3>
              <p className="text-[13px] text-neutral-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
