'use client';

import { X, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import {
  validateStopName,
  validateStopCode,
  validateCoordinate,
} from '@/lib/validation';

interface Stop {
  id: string;
  name: string;
  code: string;
  address: string;
  latitude: number;
  longitude: number;
  accessible: boolean;
  active: boolean;
  city: string;
  associatedLines: string[];
}

interface CreateStopFormProps {
  stop?: Stop;
  onSave: (stop: Omit<Stop, 'id'>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function CreateStopForm({
  stop,
  onSave,
  onCancel,
  loading = false,
}: CreateStopFormProps) {
  const [formData, setFormData] = useState({
    name: stop?.name || '',
    code: stop?.code || '',
    address: stop?.address || '',
    latitude: stop?.latitude || 0,
    longitude: stop?.longitude || 0,
    accessible: stop?.accessible ?? false,
    active: stop?.active ?? true,
    city: stop?.city || 'Agadir',
    associatedLines: stop?.associatedLines || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameError = validateStopName(formData.name);
    if (nameError) newErrors.name = nameError;

    const codeError = validateStopCode(formData.code);
    if (codeError) newErrors.code = codeError;

    const latError = validateCoordinate(formData.latitude, 'latitude');
    if (latError) newErrors.latitude = latError;

    const lngError = validateCoordinate(formData.longitude, 'longitude');
    if (lngError) newErrors.longitude = lngError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="p-6 bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {stop ? 'Modifier l\'Arrêt' : 'Créer un Nouvel Arrêt'}
        </h3>
        <button
          onClick={onCancel}
          disabled={loading}
          className="text-muted-foreground hover:text-foreground disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nom *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              disabled={loading}
              className={`w-full px-4 py-2 bg-input border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${
                errors.name ? 'border-destructive' : 'border-border'
              }`}
              placeholder="Ex: Gare Routière"
            />
            {errors.name && (
              <p className="flex items-center gap-1 text-xs text-destructive mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Code *
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => {
                setFormData({ ...formData, code: e.target.value.toUpperCase() });
                if (errors.code) setErrors({ ...errors, code: '' });
              }}
              disabled={loading}
              className={`w-full px-4 py-2 bg-input border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${
                errors.code ? 'border-destructive' : 'border-border'
              }`}
              placeholder="Ex: GR001"
            />
            {errors.code && (
              <p className="flex items-center gap-1 text-xs text-destructive mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.code}
              </p>
            )}
          </div>
        </div>

        {/* Address and City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-foreground mb-2">
              Ville *
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              disabled={loading}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="Agadir">Agadir</option>
              <option value="Marrakech">Marrakech</option>
              <option value="Fes">Fes</option>
              <option value="Tangier">Tangier</option>
              <option value="Casablanca">Casablanca</option>
              <option value="Rabat">Rabat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Accessibilité PMR
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.accessible}
                onChange={(e) =>
                  setFormData({ ...formData, accessible: e.target.checked })
                }
                disabled={loading}
                className="w-4 h-4 rounded border-border disabled:opacity-50"
              />
              <span className="text-foreground">Accessible</span>
            </label>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Adresse
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            disabled={loading}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            placeholder="Ex: Avenue Mohammed V, Agadir"
            rows={3}
          />
        </div>

        {/* GPS Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Latitude *
            </label>
            <input
              type="number"
              step="0.0001"
              value={formData.latitude}
              onChange={(e) => {
                setFormData({ ...formData, latitude: parseFloat(e.target.value) });
                if (errors.latitude) setErrors({ ...errors, latitude: '' });
              }}
              disabled={loading}
              className={`w-full px-4 py-2 bg-input border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${
                errors.latitude ? 'border-destructive' : 'border-border'
              }`}
              placeholder="Ex: 30.4278"
            />
            {errors.latitude && (
              <p className="flex items-center gap-1 text-xs text-destructive mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.latitude}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Longitude *
            </label>
            <input
              type="number"
              step="0.0001"
              value={formData.longitude}
              onChange={(e) => {
                setFormData({ ...formData, longitude: parseFloat(e.target.value) });
                if (errors.longitude) setErrors({ ...errors, longitude: '' });
              }}
              disabled={loading}
              className={`w-full px-4 py-2 bg-input border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${
                errors.longitude ? 'border-destructive' : 'border-border'
              }`}
              placeholder="Ex: -9.5981"
            />
            {errors.longitude && (
              <p className="flex items-center gap-1 text-xs text-destructive mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.longitude}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors font-medium disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity font-medium flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {stop ? 'Modifier' : 'Créer'} l\'Arrêt
          </button>
        </div>
      </form>
    </div>
  );
}
