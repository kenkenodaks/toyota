import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICarSpecs {
  engine: string;
  transmission: string;
  fuel: string;
  mileage: string;
  year: number;
  seats: number;
}

export interface ICar extends Document {
  _id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  specs: ICarSpecs;
  featured: boolean;
  badge?: string;
  createdAt: Date;
}

const CarSchema = new Schema<ICar>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    description: { type: String, required: true },
    specs: {
      engine: { type: String, default: '' },
      transmission: { type: String, default: '' },
      fuel: { type: String, default: '' },
      mileage: { type: String, default: '' },
      year: { type: Number, default: new Date().getFullYear() },
      seats: { type: Number, default: 5 },
    },
    featured: { type: Boolean, default: false },
    badge: { type: String, default: '' },
  },
  { timestamps: true }
);

const Car: Model<ICar> =
  (mongoose.models.Car as Model<ICar>) || mongoose.model<ICar>('Car', CarSchema);

export default Car;
