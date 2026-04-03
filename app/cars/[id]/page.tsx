import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Car from '@/models/Car';
import ImageGallery from '@/components/ImageGallery';
import InquiryForm from '@/components/InquiryForm';
import Link from 'next/link';
import { ChevronLeft, Fuel, Cog, Calendar, Users, Zap } from 'lucide-react';

interface Props {
  params: { id: string };
}

async function getCar(id: string) {
  try {
    await dbConnect();
    const car = await Car.findById(id).lean();
    if (!car) return null;
    return JSON.parse(JSON.stringify(car));
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = await getCar(params.id);
  if (!car) return { title: 'Vehicle Not Found' };
  return {
    title: car.name,
    description: car.description.slice(0, 160),
    openGraph: {
      images: car.images[0] ? [{ url: car.images[0] }] : [],
    },
  };
}

const specItems = (specs: {
  engine: string;
  transmission: string;
  fuel: string;
  mileage: string;
  year: number;
  seats: number;
}) => [
  { icon: Calendar, label: 'Year', value: specs.year },
  { icon: Zap, label: 'Engine', value: specs.engine },
  { icon: Cog, label: 'Transmission', value: specs.transmission },
  { icon: Fuel, label: 'Fuel', value: specs.fuel },
  { icon: Users, label: 'Seats', value: `${specs.seats} Seats` },
  { icon: Fuel, label: 'Mileage', value: specs.mileage },
];

export default async function CarDetailPage({ params }: Props) {
  const car = await getCar(params.id);
  if (!car) notFound();

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <Link
          href="/cars"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-red transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Inventory
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">
          {/* Left — Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ImageGallery images={car.images} name={car.name} />
          </div>

          {/* Right — Details */}
          <div className="space-y-8">
            {/* Title + Price */}
            <div>
              {car.badge && (
                <span className="inline-block mb-3 bg-brand-red text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {car.badge}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {car.name}
              </h1>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-brand-red">
                  ${car.price.toLocaleString()}
                </span>
                <span className="text-gray-400 text-sm">Starting price</span>
              </div>
            </div>

            {/* Specs grid */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {specItems(car.specs).map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                  >
                    <Icon size={16} className="text-brand-red mb-2" />
                    <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                    <div className="text-sm font-semibold text-gray-900 truncate">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                About This Vehicle
              </h2>
              <p className="text-gray-600 leading-relaxed text-[15px]">{car.description}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Inquiry form */}
            <InquiryForm carId={car._id} carName={car.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
