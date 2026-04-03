'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/cars', label: 'Inventory' },
    { href: '/', label: 'Home' },
    { href: '/#contact', label: 'Contact' },
  ];

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      transparent ? 'bg-transparent' : 'bg-white shadow-[0_1px_0_0_#f0f0f0]'
    }`}>

      {/* Red accent line at top */}
      <div className="h-[3px] bg-brand-red w-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-[76px] lg:h-[82px]">

          {/* ── Brand ── */}
          <Link href="/" className="shrink-0 group">
            <div className="flex items-baseline gap-3">
              <span className={`text-[28px] lg:text-[32px] font-black tracking-[-0.01em] transition-colors duration-300 ${
                transparent ? 'text-white' : 'text-brand-red'
              }`}>
                Richele Dulig
              </span>
              {/* Thin vertical divider */}
              <span className={`w-px h-5 self-center transition-colors duration-300 ${
                transparent ? 'bg-white/30' : 'bg-neutral-200'
              }`} />
              <span className={`text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 ${
                transparent ? 'text-white/60' : 'text-neutral-400'
              }`}>
                Toyota Sales Agent
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center">

            {/* Nav links */}
            <div className="flex items-center">
              {navLinks.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative px-5 h-[82px] flex items-center text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors duration-200 ${
                      transparent
                        ? active ? 'text-white' : 'text-white/60 hover:text-white'
                        : active ? 'text-brand-red' : 'text-neutral-500 hover:text-[#0A0A0A]'
                    }`}
                  >
                    {label}
                    {/* Active indicator — bottom border */}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-red" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Vertical separator */}
            <span className={`w-px h-6 mx-4 transition-colors duration-300 ${
              transparent ? 'bg-white/20' : 'bg-neutral-200'
            }`} />

            {/* Admin — solid red pill */}
            <Link
              href="/admin"
              className="bg-brand-red text-white text-[12px] font-bold tracking-[0.18em] uppercase px-5 py-2.5 hover:bg-[#C8001A] transition-colors duration-200"
            >
              Admin
            </Link>
          </nav>

          {/* ── Mobile hamburger ── */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className={`md:hidden p-2 transition-colors ${
              transparent ? 'text-white' : 'text-neutral-700'
            }`}
          >
            {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-6 py-3">
          {[...navLinks, { href: '/admin', label: 'Admin' }].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center px-2 py-3 text-[14px] font-semibold border-b border-neutral-50 last:border-0 transition-colors ${
                pathname === href ? 'text-brand-red' : 'text-neutral-600 hover:text-brand-red'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
