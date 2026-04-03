import Link from 'next/link';

function ToyotaEmblemWhite() {
  return (
    <svg width="32" height="21" viewBox="0 0 200 132" fill="none" aria-hidden="true">
      <ellipse cx="100" cy="66" rx="100" ry="66" fill="white" />
      <ellipse cx="100" cy="66" rx="87" ry="53" fill="#0A0A0A" />
      <ellipse cx="67" cy="66" rx="47" ry="34" fill="white" />
      <ellipse cx="67" cy="66" rx="35" ry="24" fill="#0A0A0A" />
      <ellipse cx="133" cy="66" rx="47" ry="34" fill="white" />
      <ellipse cx="133" cy="66" rx="35" ry="24" fill="#0A0A0A" />
      <ellipse cx="100" cy="66" rx="18" ry="63" fill="white" />
      <ellipse cx="100" cy="40" rx="87" ry="28" fill="white" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A]" id="contact">

      {/* Top bar — brand red accent line */}
      <div className="h-[3px] bg-brand-red" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <ToyotaEmblemWhite />
              <div className="leading-none">
                <span className="block text-[13px] font-black tracking-[0.2em] text-white uppercase">
                  TOYOTA
                </span>
                <span className="block text-[7px] font-medium tracking-[0.35em] text-white/30 uppercase mt-0.5">
                  MOTORS
                </span>
              </div>
            </div>

            <p className="text-[13px] text-neutral-500 leading-relaxed max-w-[280px] font-light mb-8">
              Your trusted Toyota dealership. Premium vehicles, exceptional service, transparent pricing.
            </p>

            <div className="space-y-2.5 text-[13px]">
              <p className="text-neutral-500">123 Dealership Boulevard, Makati City</p>
              <p className="text-neutral-500">Mon – Sat &nbsp;·&nbsp; 8:00 AM – 6:00 PM</p>
              <p className="text-white font-medium">+63 2 8888 0000</p>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] text-neutral-600 font-bold uppercase tracking-[0.2em] mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/cars', label: 'Inventory' },
                { href: '/about', label: 'About Agent' },
                { href: '/admin', label: 'Admin Panel' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] text-neutral-500 hover:text-white transition-colors duration-200 font-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Models */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] text-neutral-600 font-bold uppercase tracking-[0.2em] mb-5">
              Our Models
            </h4>
            <ul className="space-y-3">
              {['Camry', 'Corolla Cross', 'RAV4', 'Land Cruiser', 'GR86', 'Hilux'].map((m) => (
                <li key={m}>
                  <Link
                    href="/cars"
                    className="text-[13px] text-neutral-500 hover:text-white transition-colors duration-200 font-light"
                  >
                    {m}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-neutral-700">
            &copy; {year} Toyota Motors Dealership. All rights reserved.
          </p>
          <p className="text-[11px] text-neutral-700">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
