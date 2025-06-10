import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CategorySelector from '../category/CategorySelector';
import Button from '../common/Button'; // 🔹 Ortak buton bileşeni eklendi

const schema = Yup.object().shape({
  title: Yup.string().required('Başlık zorunlu'),
  description: Yup.string(),
  due_date: Yup.date()
    .required('Bitiş tarihi zorunlu')
    .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Bitiş tarihi bugünden sonra olmalıdır.'),
  priority: Yup.string().required('Öncelik seçiniz'),
  status: Yup.string().required('Durum seçiniz'),
  categories: Yup.array().of(Yup.number()).min(1, 'En az bir kategori seçiniz'),
});

const priorities = [
  { label: 'Düşük', value: 'low' },
  { label: 'Orta', value: 'medium' },
  { label: 'Yüksek', value: 'high' },
];

const statuses = [
  { label: 'Beklemede', value: 'pending' },
  { label: 'Devam Ediyor', value: 'in_progress' },
  { label: 'Tamamlandı', value: 'completed' },
  { label: 'İptal Edildi', value: 'cancelled' },
];

export default function TodoForm({ onSubmit, defaultValues, categoriesOptions }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Başlık */}
      <div className="mb-4">
        <label className="block mb-1">Başlık *</label>
        <input
          type="text"
          {...register('title')}
          className={`w-full border p-2 rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      {/* Açıklama */}
      <div className="mb-4">
        <label className="block mb-1">Açıklama</label>
        <textarea
          {...register('description')}
          className={`w-full border p-2 rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          rows={4}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      {/* Bitiş Tarihi */}
      <div className="mb-4">
        <label className="block mb-1">Bitiş Tarihi *</label>
        <Controller
          control={control}
          name="due_date"
          render={({ field }) => (
            <DatePicker
              placeholderText="Bitiş tarihi seçin"
              selected={field.value}
              onChange={field.onChange}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              className={`w-full border p-2 rounded ${errors.due_date ? 'border-red-500' : 'border-gray-300'}`}
            />
          )}
        />
        {errors.due_date && <p className="text-red-500 text-sm">{errors.due_date.message}</p>}
      </div>

      {/* Öncelik */}
      <div className="mb-4">
        <label className="block mb-1">Öncelik *</label>
        <select
          {...register('priority')}
          className={`w-full border p-2 rounded ${errors.priority ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">Seçiniz</option>
          {priorities.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
      </div>

      {/* Durum */}
      <div className="mb-4">
        <label className="block mb-1">Durum *</label>
        <select
          {...register('status')}
          className={`w-full border p-2 rounded ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">Seçiniz</option>
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
      </div>

      {/* Kategoriler */}
      <div className="mb-4">
        <Controller
          control={control}
          name="categories"
          render={({ field }) => (
            <CategorySelector
              categories={categoriesOptions}
              value={field.value || []}
              onChange={field.onChange}
            />
          )}
        />
        {errors.categories && <p className="text-red-500 text-sm">{errors.categories.message}</p>}
      </div>

      {/* Butonlar */}
      <div className="flex gap-4 mt-6">
        <Button type="submit" variant="primary">
          Kaydet
        </Button>
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          İptal
        </Button>
      </div>
    </form>
  );
}