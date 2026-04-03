import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import FeaturedCars from '@/components/FeaturedCars';
import WhyChooseUs from '@/components/WhyChooseUs';
import dbConnect from '@/lib/db';
import Car from '@/models/Car';

export const metadata: Metadata = {
  title: 'Toyota Motors | Find Your Perfect Drive',
  description:
    'Browse our curated collection of Toyota vehicles. New arrivals, featured models, and exceptional deals — all in one place.',
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

async function getFeaturedCars() {
  try {
    await dbConnect();
    const cars = await Car.find({ featured: true }).sort({ createdAt: -1 }).limit(8).lean();
    return JSON.parse(JSON.stringify(cars));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredCars = await getFeaturedCars();

  return (
    <>
      <Hero />
      <FeaturedCars cars={featuredCars} />
      <WhyChooseUs />
    </>
  );
}
