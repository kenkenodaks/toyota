'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Eye, EyeOff, ShieldAlert, X } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Auto-dismiss error after 4s
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(''), 4000);
    return () => clearTimeout(t);
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) throw new Error('Invalid password. Please try again.');

      const { token } = await res.json();
      localStorage.setItem('admin_token', token);
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background texture — subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Red accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-red/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Toast error notification */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#1a0a0a] border border-brand-red/40 text-white px-5 py-3.5 shadow-2xl shadow-black/50 min-w-[300px] max-w-sm"
          >
            {/* Red left accent */}
            <div className="w-[3px] h-8 bg-brand-red shrink-0 rounded-full" />

            <ShieldAlert size={16} className="text-brand-red shrink-0" />

            <div className="flex-1">
              <p className="text-[12px] font-bold text-brand-red uppercase tracking-widest">
                Access Denied
              </p>
              <p className="text-[13px] text-neutral-300 mt-0.5">{error}</p>
            </div>

            {/* Progress bar */}
            <button
              onClick={() => setError('')}
              className="text-neutral-600 hover:text-white transition-colors shrink-0"
            >
              <X size={15} />
            </button>

            {/* Auto-dismiss progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-brand-red"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 4, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative w-full max-w-[400px]"
      >
        {/* Top red accent line */}
        <div className="h-[3px] bg-brand-red w-full" />

        <div className="bg-[#111111] border border-neutral-800 border-t-0 p-10">

          {/* Header */}
          <div className="mb-10">
            <span className="block text-[11px] font-semibold text-brand-red uppercase tracking-[0.25em] mb-3">
              Richele Dulig
            </span>
            <h1 className="text-[28px] font-black text-white tracking-tight leading-tight">
              Admin Portal
            </h1>
            <p className="text-neutral-500 text-[13px] mt-1.5 font-light">
              Toyota Sales Agent Dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.15em] mb-2.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full bg-[#0A0A0A] border border-neutral-700 text-white text-[14px] px-4 py-3.5 pr-11 focus:outline-none focus:border-brand-red transition-colors duration-200 placeholder:text-neutral-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-400 transition-colors"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-red text-white py-3.5 text-[13px] font-bold tracking-[0.15em] uppercase hover:bg-[#C8001A] transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2.5"
            >
              {loading
                ? <><Loader2 size={14} className="animate-spin" /> Verifying...</>
                : 'Sign In'
              }
            </button>
          </form>

          {/* Footer note */}
          <p className="text-[11px] text-neutral-700 mt-8 text-center">
            Protected admin area · Authorized access only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
