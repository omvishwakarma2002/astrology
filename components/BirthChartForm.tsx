'use client';

import { useState } from 'react';
import { Lang } from '@/lib/translations';
import { t } from '@/lib/translations';

export interface BirthChartFormData {
  name: string;
  date: string;
  time: string;
  city: string;
}

interface Props {
  onSubmit: (data: BirthChartFormData) => void;
  loading?: boolean;
  lang?: Lang;
}

export default function BirthChartForm({ onSubmit, loading = false, lang = 'en' }: Props) {
  const [form, setForm] = useState<BirthChartFormData>({
    name: '',
    date: '',
    time: '12:00',
    city: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.date) {
      onSubmit(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chart-form">
      <div className="form-grid">
        <div className="field-group">
          <label className="field-label">{t('birthChart.form.name', lang)}</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t('birthChart.form.namePlaceholder', lang)}
            required
            className="field-input"
          />
        </div>

        <div className="field-group">
          <label className="field-label">{t('birthChart.form.city', lang)}</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder={t('birthChart.form.cityPlaceholder', lang)}
            className="field-input"
          />
        </div>

        <div className="field-group">
          <label className="field-label">{t('birthChart.form.date', lang)}</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="field-input"
          />
        </div>

        <div className="field-group">
          <label className="field-label">{t('birthChart.form.time', lang)}</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="field-input"
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? (
          <span className="loading-text">
            <span className="spinner" />
            {t('birthChart.form.loading', lang)}
          </span>
        ) : (
          t('birthChart.form.submit', lang)
        )}
      </button>

      <style jsx>{`
        .chart-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 640px) {
          .form-grid { grid-template-columns: 1fr 1fr; }
        }
        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .field-label {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #d4af37;
        }
        .field-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(212,175,55,0.25);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          color: #fff;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.3); }
        .field-input:focus {
          border-color: rgba(212,175,55,0.6);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.1);
        }
        .field-input::-webkit-calendar-picker-indicator {
          filter: invert(1) sepia(1) saturate(2) hue-rotate(5deg);
          opacity: 0.7;
          cursor: pointer;
        }
        .submit-btn {
          background: linear-gradient(135deg, #d4af37, #b8960c);
          color: #0f0c29;
          border: none;
          border-radius: 8px;
          padding: 0.9rem 2rem;
          font-size: 1rem;
          font-weight: 700;
          font-family: 'Cinzel', serif;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(212,175,55,0.3);
          width: 100%;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(212,175,55,0.45);
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .loading-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(15,12,41,0.3);
          border-top-color: #0f0c29;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}
