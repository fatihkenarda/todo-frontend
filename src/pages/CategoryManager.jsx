import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ConfirmationModal from '../components/common/ConfirmationModal';
import Button from '../components/common/Button'; // 🔹 Ortak buton bileşeni

const schema = yup.object().shape({
  name: yup.string().required('Kategori adı gerekli'),
  color: yup.string().nullable(),
});

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchCategories = async () => {
    const res = await axios.get('/api/categories');
    setCategories(res.data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    if (editingCategory) {
      await axios.put(`/api/categories/${editingCategory.id}`, data);
    } else {
      await axios.post('/api/categories', data);
    }

    reset();
    setEditingCategory(null);
    fetchCategories();
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setValue('name', category.name);
    setValue('color', category.color || '');
  };

  const handleDeleteRequest = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (selectedCategory) {
      await axios.delete(`/api/categories/${selectedCategory.id}`);
      fetchCategories();
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Kategori Yönetimi</h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-50 p-4 rounded shadow">
        <div>
          <label className="block font-medium">Kategori Adı</label>
          <input {...register('name')} className="w-full p-2 border rounded" />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block font-medium">Renk (Opsiyonel)</label>
          <input {...register('color')} className="w-full p-2 border rounded" type="color" />
        </div>
        <Button type="submit" variant="primary">
          {editingCategory ? 'Güncelle' : 'Ekle'}
        </Button>
      </form>

      {/* Liste */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Mevcut Kategoriler</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex items-center justify-between p-3 bg-white border rounded shadow-sm"
            >
              <div className="flex items-center gap-2">
                {category.color && (
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></span>
                )}
                <span>{category.name}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(category)}
                  variant="outline"
                  className="text-sm"
                >
                  Düzenle
                </Button>
                <Button
                  onClick={() => handleDeleteRequest(category)}
                  variant="danger"
                  className="text-sm"
                >
                  Sil
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Silme Onay Modali */}
      <ConfirmationModal
        isOpen={showModal}
        title="Kategori Silinsin mi?"
        message={`"${selectedCategory?.name}" adlı kategoriyi silmek istediğinize emin misiniz?`}
        confirmText="Sil"
        cancelText="İptal"
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default CategoryManager;