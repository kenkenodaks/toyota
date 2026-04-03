'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Car,
  MessageSquare,
  RefreshCw,
  Star,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import AdminCarForm, { CarFormData } from '@/components/AdminCarForm';

interface CarRecord extends CarFormData {
  _id: string;
  price: number;
  createdAt: string;
}

interface InquiryRecord {
  _id: string;
  name: string;
  email: string;
  message: string;
  carId: string;
  createdAt: string;
}

type Tab = 'cars' | 'inquiries';

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('cars');
  const [cars, setCars] = useState<CarRecord[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCar, setEditCar] = useState<CarRecord | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState('');

  // Auth check
  useEffect(() => {
    const t = localStorage.getItem('admin_token');
    if (!t) {
      router.push('/admin/login');
    } else {
      setToken(t);
    }
  }, [router]);

  const fetchCars = useCallback(async (t: string) => {
    const res = await fetch('/api/cars', {
      headers: { Authorization: `Bearer ${t}` },
    });
    const data = await res.json();
    setCars(Array.isArray(data) ? data : []);
  }, []);

  const fetchInquiries = useCallback(async (t: string) => {
    const res = await fetch('/api/inquiries', {
      headers: { Authorization: `Bearer ${t}` },
    });
    const data = await res.json();
    setInquiries(Array.isArray(data) ? data : []);
  }, []);

  const loadData = useCallback(async (t: string) => {
    setLoading(true);
    try {
      await Promise.all([fetchCars(t), fetchInquiries(t)]);
    } finally {
      setLoading(false);
    }
  }, [fetchCars, fetchInquiries]);

  useEffect(() => {
    if (token) loadData(token);
  }, [token, loadData]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    setDeleting(true);
    try {
      await fetch(`/api/cars/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars((prev) => prev.filter((c) => c._id !== id));
      setDeleteId(null);
    } finally {
      setDeleting(false);
    }
  };

  const handleSeed = async () => {
    if (!token) return;
    setSeeding(true);
    setSeedMsg('');
    try {
      const res = await fetch('/api/seed', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSeedMsg(`Seeded ${data.count} vehicles successfully.`);
      await fetchCars(token);
    } catch {
      setSeedMsg('Seeding failed.');
    } finally {
      setSeeding(false);
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">Manage your dealership inventory</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => token && loadData(token)}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Vehicles', value: cars.length, icon: Car, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Featured', value: cars.filter((c) => c.featured).length, icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
            { label: 'Inquiries', value: inquiries.length, icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-50' },
            { label: 'Avg. Price', value: cars.length ? `$${Math.round(cars.reduce((a, c) => a + (c.price as number), 0) / cars.length).toLocaleString()}` : '—', icon: Car, color: 'text-purple-500', bg: 'bg-purple-50' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.bg} ${stat.color} mb-3`}>
                <stat.icon size={18} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
          {(['cars', 'inquiries'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Cars Tab */}
        {tab === 'cars' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900">
                Vehicles ({cars.length})
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleSeed}
                  disabled={seeding}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-60"
                >
                  {seeding ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                  Seed Demo Data
                </button>
                <button
                  onClick={() => { setEditCar(null); setModalOpen(true); }}
                  className="flex items-center gap-2 bg-brand-red text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  <Plus size={15} />
                  Add Vehicle
                </button>
              </div>
            </div>

            {seedMsg && (
              <div className="mb-4 flex items-center gap-2 bg-green-50 text-green-700 text-sm px-4 py-2.5 rounded-xl border border-green-200">
                <AlertCircle size={14} />
                {seedMsg}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 size={28} className="animate-spin text-gray-300" />
              </div>
            ) : cars.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <Car size={36} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400">No vehicles yet.</p>
                <p className="text-gray-300 text-sm mt-1">Add a vehicle or seed demo data to get started.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-left">
                        <th className="py-3.5 px-5 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          Vehicle
                        </th>
                        <th className="py-3.5 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          Price
                        </th>
                        <th className="py-3.5 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden md:table-cell">
                          Fuel
                        </th>
                        <th className="py-3.5 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden lg:table-cell">
                          Featured
                        </th>
                        <th className="py-3.5 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {cars.map((car) => (
                          <motion.tr
                            key={car._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                          >
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-9 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                  <img
                                    src={car.images?.[0] ?? 'https://picsum.photos/seed/car/200/150'}
                                    alt={car.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900 leading-tight">{car.name}</div>
                                  {car.badge && (
                                    <span className="text-xs text-brand-red font-medium">{car.badge}</span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 font-semibold text-gray-800">
                              ${(car.price as number).toLocaleString()}
                            </td>
                            <td className="py-4 px-4 text-gray-500 hidden md:table-cell">
                              {car.specs?.fuel ?? '—'}
                            </td>
                            <td className="py-4 px-4 hidden lg:table-cell">
                              {car.featured ? (
                                <span className="inline-flex items-center gap-1 text-xs text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full font-medium">
                                  <Star size={10} className="fill-current" /> Featured
                                </span>
                              ) : (
                                <span className="text-xs text-gray-400">—</span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => { setEditCar(car); setModalOpen(true); }}
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  title="Edit"
                                >
                                  <Pencil size={14} />
                                </button>
                                <button
                                  onClick={() => setDeleteId(car._id)}
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Inquiries Tab */}
        {tab === 'inquiries' && (
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-5">
              Customer Inquiries ({inquiries.length})
            </h2>
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 size={28} className="animate-spin text-gray-300" />
              </div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <MessageSquare size={36} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400">No inquiries yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {inquiries.map((inq) => (
                  <div key={inq._id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold text-gray-900">{inq.name}</div>
                        <div className="text-sm text-gray-400">{inq.email}</div>
                      </div>
                      <div className="text-xs text-gray-300 whitespace-nowrap">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{inq.message}</p>
                    <div className="mt-3 text-xs text-gray-300">Car ID: {inq.carId}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <AdminCarForm
          car={editCar}
          token={token}
          onSuccess={() => token && fetchCars(token)}
          onClose={() => { setModalOpen(false); setEditCar(null); }}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
          >
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-brand-red" />
            </div>
            <h3 className="text-center font-bold text-gray-900 mb-2">Delete Vehicle?</h3>
            <p className="text-center text-sm text-gray-500 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-brand-red text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deleting && <Loader2 size={14} className="animate-spin" />}
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
