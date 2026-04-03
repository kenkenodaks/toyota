import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Car from '@/models/Car';

const seedCars = [
  {
    name: 'Toyota Camry 2024',
    price: 28990,
    images: [
      'https://images.unsplash.com/photo-1621993202258-b89ebe2c2cdc?w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&q=80',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&q=80',
    ],
    description:
      'The 2024 Toyota Camry blends dynamic styling with refined performance. Featuring a bold exterior design, luxurious interior finishes, and Toyota Safety Sense 3.0, the Camry continues to set the benchmark for midsize sedans. Whether you\'re commuting daily or taking a weekend escape, this is the car that does it all.',
    specs: {
      engine: '2.5L 4-Cylinder',
      transmission: '8-Speed Automatic',
      fuel: 'Petrol',
      mileage: '32 MPG City / 41 MPG Hwy',
      year: 2024,
      seats: 5,
    },
    featured: true,
    badge: 'Best Seller',
  },
  {
    name: 'Toyota Corolla Cross 2024',
    price: 24990,
    images: [
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80',
    ],
    description:
      'The Corolla Cross combines Toyota\'s legendary reliability with the elevated stance and versatility of an SUV. Packed with advanced safety tech, a spacious cabin, and an efficient powertrain, it\'s the perfect all-rounder for modern families.',
    specs: {
      engine: '2.0L Dynamic Force',
      transmission: 'CVT Automatic',
      fuel: 'Hybrid',
      mileage: '42 MPG Combined',
      year: 2024,
      seats: 5,
    },
    featured: true,
    badge: 'New Arrival',
  },
  {
    name: 'Toyota RAV4 2024',
    price: 33990,
    images: [
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1200&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80',
    ],
    description:
      'The RAV4 is the world\'s best-selling SUV for a reason. With available AWD, a rugged yet refined design, and best-in-class cargo space, it handles everything from urban commutes to weekend adventures with total confidence.',
    specs: {
      engine: '2.5L 4-Cylinder',
      transmission: '8-Speed Automatic',
      fuel: 'Petrol / AWD',
      mileage: '27 MPG City / 35 MPG Hwy',
      year: 2024,
      seats: 5,
    },
    featured: true,
    badge: 'Popular',
  },
  {
    name: 'Toyota Land Cruiser 300 2024',
    price: 87990,
    images: [
      'https://images.unsplash.com/photo-1625231338026-5d5fb6be0e48?w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    ],
    description:
      'The legendary Land Cruiser 300 Series. Built for those who demand the very best — a luxury SUV that can traverse the harshest terrain on earth while delivering a first-class cabin experience. Timeless, powerful, unstoppable.',
    specs: {
      engine: '3.5L Twin-Turbo V6',
      transmission: '10-Speed Automatic',
      fuel: 'Petrol',
      mileage: '18 MPG City / 22 MPG Hwy',
      year: 2024,
      seats: 7,
    },
    featured: true,
    badge: 'Premium',
  },
  {
    name: 'Toyota GR86 2024',
    price: 32990,
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80',
    ],
    description:
      'Pure driving exhilaration. The GR86 is Toyota\'s precision sports car — lightweight, rear-wheel drive, and powered by a high-revving naturally aspirated flat-four. For drivers who live for the perfect corner.',
    specs: {
      engine: '2.4L Flat-4 Boxer',
      transmission: '6-Speed Manual',
      fuel: 'Petrol',
      mileage: '21 MPG City / 30 MPG Hwy',
      year: 2024,
      seats: 4,
    },
    featured: false,
    badge: 'Sports',
  },
  {
    name: 'Toyota Hilux 2024',
    price: 42990,
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=80',
      'https://images.unsplash.com/photo-1571127236794-81c2c0f0dc66?w=1200&q=80',
    ],
    description:
      'The Toyota Hilux — the toughest nameplate in the pickup truck world. With a proven diesel engine, robust 4WD system, and a 1-ton payload capacity, the Hilux is ready for whatever the job demands. Built to last a lifetime.',
    specs: {
      engine: '2.8L 4-Cylinder Diesel',
      transmission: '6-Speed Automatic',
      fuel: 'Diesel / 4WD',
      mileage: '24 MPG City / 28 MPG Hwy',
      year: 2024,
      seats: 5,
    },
    featured: false,
    badge: '4x4',
  },
];

export async function POST(req: NextRequest) {
  const auth = req.headers.get('Authorization');
  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    await Car.deleteMany({});
    const cars = await Car.insertMany(seedCars);
    return NextResponse.json({ success: true, count: cars.length, cars });
  } catch (err) {
    return NextResponse.json({ error: 'Seed failed', detail: String(err) }, { status: 500 });
  }
}
