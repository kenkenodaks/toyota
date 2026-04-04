'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Loader2 } from 'lucide-react';

export interface CarFormData {
  name: string;
  price: number | string;
  images: string[];
  description: string;
  specs: {
    engine: string;
    transmission: string;
    fuel: string;
    mileage: string;
    year: number | string;
    seats: number | string;
  };
  featured: boolean;
  badge: string;
}

const EMPTY_FORM: CarFormData = {
  name: '',
  price: '',
  images: [''],
  description: '',
  specs: {
    engine: '',
    transmission: '',
    fuel: '',
    mileage: '',
    year: new Date().getFullYear(),
    seats: 5,
  },
  featured: false,
  badge: '',
};

interface Props {
  car?: (CarFormData & { _id: string }) | null;
  token: string;
  onSuccess: () => void;
  onClose: () => void;
}

export default function AdminCarForm({ car, token, onSuccess, onClose }: Props) {
  const [form, setForm] = useState<CarFormData>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isEdit = !!car;

  useEffect(() => {
    if (car) {
      setForm({
        name: car.name,
        price: car.price,
        images: car.images.length ? car.images : [''],
        description: car.description,
        specs: { ...car.specs },
        featured: car.featured,
        badge: car.badge ?? '',
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [car]);

  const set = (field: keyof CarFormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const setSpec = (field: keyof CarFormData['specs'], value: unknown) => {
    setForm((prev) => ({ ...prev, specs: { ...prev.specs, [field]: value } }));
  };

  const setImage = (index: number, value: string) => {
    const imgs = [...form.images];
    imgs[index] = value;
    set('images', imgs);
  };

  const addImage = () => set('images', [...form.images, '']);
  const removeImage = (i: number) => {
    if (form.images.length <= 1) return;
    set('images', form.images.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      ...form,
      price: Number(form.price),
      images: form.images.filter(Boolean),
      specs: {
        ...form.specs,
        year: Number(form.specs.year),
        seats: Number(form.specs.seats),
      },
    };

    const url = isEdit ? `/api/cars/${car!._id}` : '/api/cars';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Operation failed');
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-lg font-bold text-gray-900">
            {isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="form-label">Vehicle Name *</label>
              <input
                className="form-input"
                placeholder="e.g. Toyota Camry 2024"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="form-label">Price (PHP) *</label>
              <input
                className="form-input"
                type="number"
                placeholder="28990"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Badge Label</label>
              <input
                className="form-input"
                placeholder="e.g. New Arrival"
                value={form.badge}
                onChange={(e) => set('badge', e.target.value)}
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => set('featured', e.target.checked)}
                  className="w-4 h-4 accent-brand-red"
                />
                <span className="text-sm text-gray-700 font-medium">Featured on homepage</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="form-label">Description *</label>
            <textarea
              className="form-input resize-none"
              rows={3}
              placeholder="Vehicle description..."
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              required
            />
          </div>

          {/* Specs */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Specifications</h3>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  ['engine', 'Engine', '2.5L 4-Cylinder'],
                  ['transmission', 'Transmission', '8-Speed Automatic'],
                  ['fuel', 'Fuel Type', 'Petrol'],
                  ['mileage', 'Mileage', '32 MPG City'],
                  ['year', 'Year', '2024'],
                  ['seats', 'Seats', '5'],
                ] as [keyof CarFormData['specs'], string, string][]
              ).map(([key, label, placeholder]) => (
                <div key={key}>
                  <label className="form-label">{label}</label>
                  <input
                    className="form-input"
                    type={key === 'year' || key === 'seats' ? 'number' : 'text'}
                    placeholder={placeholder}
                    value={form.specs[key]}
                    onChange={(e) => setSpec(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Image URLs</h3>
            <div className="space-y-2">
              {form.images.map((url, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className="form-input flex-1"
                    placeholder={`https://example.com/car-image-${i + 1}.jpg`}
                    value={url}
                    onChange={(e) => setImage(i, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    disabled={form.images.length === 1}
                    className="p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors disabled:opacity-30"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImage}
                className="flex items-center gap-2 text-sm text-brand-red hover:text-red-700 font-medium mt-1"
              >
                <Plus size={15} /> Add Image URL
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-brand-red text-white text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : null}
              {isEdit ? 'Save Changes' : 'Add Vehicle'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .form-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.4rem;
        }
        .form-input {
          width: 100%;
          padding: 0.65rem 0.9rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.15s;
        }
        .form-input:focus {
          border-color: #CC0000;
          box-shadow: 0 0 0 3px rgba(204, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
