import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import todoService from '../services/todoService';
import categoryService from '../services/categoryService';
import TodoForm from '../components/todo/TodoForm';

export default function TodoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [defaultValues, setDefaultValues] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);  // Yeni state eklendi

  useEffect(() => {
    categoryService.getAll()
      .then(res => {
        setCategoriesOptions(res.data);
      })
      .catch(err => console.error('Kategori yüklenirken hata:', err));
  }, []);

  useEffect(() => {
    if (id) {
      todoService.getById(id)
        .then(res => {
          const todo = res.data;
          const dueDateObj = todo.due_date ? new Date(todo.due_date.replace(' ', 'T')) : null;

          setDefaultValues({
            title: todo.title || '',
            description: todo.description || '',
            due_date: dueDateObj,
            priority: todo.priority || '',
            status: todo.status || '',
            categories: todo.categories?.map(cat => cat.id) || [],
          });
          setLoading(false);
        })
        .catch(err => {
          console.error('Todo yüklenirken hata:', err);
          setLoading(false);
        });
    } else {
      setDefaultValues({
        title: '',
        description: '',
        due_date: null,
        priority: '',
        status: '',
        categories: [],
      });
      setLoading(false);
    }
  }, [id]);

  const onSubmit = async (data) => {
    try {
      setErrorMessage(null); // Önceki hatayı temizle
      const payload = {
        ...data,
        due_date: data.due_date ? data.due_date.toISOString().split('T')[0] : null,
      };

      if (id) {
        await todoService.update(id, payload);
      } else {
        await todoService.create(payload);
      }
      navigate('/todos');
    } catch (error) {
      console.error('Kayıt hatası:', error.response?.data || error.message);

      // Backend'den validation mesajı varsa göster
      if (error.response?.status === 422 && error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Kaydetme işlemi sırasında beklenmeyen bir hata oluştu.');
      }
    }
  };

  if (loading || !defaultValues) return <div>Yükleniyor...</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl mb-4">{id ? 'Todo Düzenle' : 'Yeni Todo'}</h2>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <strong>Hata:</strong> {errorMessage}
        </div>
      )}

      <TodoForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        categoriesOptions={categoriesOptions}
      />
    </div>
  );
}