'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Car } from 'lucide-react';

export interface CarCardProps {
  _id: string;
  name: string;
  price: number;
  images: string[];
  specs: {
    engine: string;
    transmission: string;
    fuel: string;
    seats: number;
    year?: number;
  };
  badge?: string;
}

export default function CarCard({ _id, name, price, images, specs, badge }: CarCardProps) {
  const raw = images?.[0];
  const thumbnail = raw && raw.trim() !== '' ? raw : null;
  const [imgError, setImgError] = useState(false);
  const showPlaceholder = !thumbnail || imgError;

  return (
    <Link
      href={`/cars/${_id}`}
      className="group block bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-neutral-100">
        {showPlaceholder ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-neutral-50">
            <Car size={32} className="text-neutral-300" strokeWidth={1.5} />
            <span className="text-[11px] text-neutral-300 font-medium uppercase tracking-widest">
              No Image
            </span>
          </div>
        ) : (
          <img
            src={thumbnail}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-in-out"
          />
        )}

        {/* Badge */}
        {badge && (
          <span className="absolute top-3 left-3 bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
            {badge}
          </span>
        )}

        {/* Hover arrow */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
          <ArrowUpRight size={15} className="text-[#0A0A0A]" />
        </div>
      </div>

      {/* Info */}
      <div className="px-5 py-4">
        {specs.year && (
          <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-widest">
            {specs.year}
          </span>
        )}
        <h3 className="text-[15px] font-bold text-[#0A0A0A] leading-snug mt-0.5 mb-3 group-hover:text-brand-red transition-colors duration-200">
          {name}
        </h3>

        <div className="h-px bg-neutral-100 mb-3" />

        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-[11px] text-neutral-400 font-medium">
            <span>{specs.fuel || '—'}</span>
            <span className="text-neutral-200">·</span>
            <span>{specs.transmission ? specs.transmission.split(' ')[0] : '—'}</span>
            <span className="text-neutral-200">·</span>
            <span>{specs.seats}S</span>
          </div>
          <span className="text-[15px] font-black text-[#0A0A0A] tracking-tight">
            ₱{price.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
