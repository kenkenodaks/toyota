import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  message: string;
  carId: string;
  createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true },
    carId: { type: String, required: true },
  },
  { timestamps: true }
);

const Inquiry: Model<IInquiry> =
  (mongoose.models.Inquiry as Model<IInquiry>) ||
  mongoose.model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;
