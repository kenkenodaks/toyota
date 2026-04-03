import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-8xl font-black text-gray-100 select-none">404</div>
        <h1 className="text-2xl font-bold text-gray-900 -mt-4 mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-8">The vehicle or page you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-red text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-red-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
