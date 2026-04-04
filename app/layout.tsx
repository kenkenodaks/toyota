import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: {
    default: 'Toyota Motors | Premium Car Dealership',
    template: '%s | Toyota Motors',
  },
  description:
    'Discover our premium selection of Toyota vehicles. Browse new and used cars, view detailed specifications, and inquire directly from our dealership.',
  keywords: ['Toyota', 'car dealership', 'new cars', 'used cars', 'SUV', 'sedan', 'truck'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Toyota Motors Dealership',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
