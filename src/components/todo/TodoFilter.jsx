import React, { useState, useEffect } from 'react';

const STATUS_OPTIONS = [
  { value: '', label: 'Tüm Durumlar' },
  { value: 'pending', label: 'Beklemede' },
  { value: 'completed', label: 'Tamamlandı' },
  { value: 'canceled', label: 'İptal Edildi' },
];

const SORT_OPTIONS = [
  { value: 'created_at_desc', label: 'Oluşturma (Yeni → Eski)' },
  { value: 'created_at_asc', label: 'Oluşturma (Eski → Yeni)' },
  { value: 'due_date_asc', label: 'Bitiş Tarihi (Yaklaşan → Uzak)' },
  { value: 'due_date_desc', label: 'Bitiş Tarihi (Uzak → Yaklaşan)' },
];

export default function TodoFilter({ onChange }) {
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('created_at_desc');

  // Her filtre değişiminde üst bileşene bildir
  useEffect(() => {
    const [sortBy, sortOrder] = sort.split('_').length === 3
      ? [sort.split('_')[0] + '_' + sort.split('_')[1], sort.split('_')[2]]
      : [sort.split('_')[0], sort.split('_')[1]];

    onChange({
      search: searchText,
      status: status,
      sort_by: sortBy,
      sort_order: sortOrder,
    });
  }, [searchText, status, sort, onChange]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Arama */}
      <input
        type="text"
        placeholder="Ara..."
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        className="border rounded px-3 py-2 flex-grow"
      />

      {/* Durum seçimi */}
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="border rounded px-3 py-2"
      >
        {STATUS_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Sıralama */}
      <select
        value={sort}
        onChange={e => setSort(e.target.value)}
        className="border rounded px-3 py-2"
      >
        {SORT_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}