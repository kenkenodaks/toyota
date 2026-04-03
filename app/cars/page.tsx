import type { Metadata } from 'next';
import dbConnect from '@/lib/db';
import Car from '@/models/Car';
import CarListingsClient from './CarsClient';

export const metadata: Metadata = {
  title: 'Inventory',
  description: 'Browse our full inventory of Toyota vehicles. Filter by model, price, and specs.',
};

export const revalidate = 30;

async function getAllCars() {
  try {
    await dbConnect();
    const cars = await Car.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(cars));
  } catch {
    return [];
  }
}

export default async function CarsPage() {
  const cars = await getAllCars();
  return <CarListingsClient initialCars={cars} />;
}
