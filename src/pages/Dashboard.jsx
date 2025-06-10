import React, { useEffect, useState } from 'react';
import { updateTodoStatus } from '../api/todos';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button'; 

const API_BASE_URL = 'http://localhost:8000/api';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/todos/all`)
      .then((res) => {
        setTodos(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (id, newStatus) => {
    updateTodoStatus(id, newStatus)
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, status: newStatus } : todo
          )
        );
      })
      .catch((err) => {
        console.error('Status update error:', err);
        alert('Durum güncellenirken hata oluştu!');
      });
  };

  const statusCounts = todos.reduce((acc, todo) => {
    acc[todo.status] = (acc[todo.status] || 0) + 1;
    return acc;
  }, {});

  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);

  const upcomingTodos = todos.filter((todo) => {
    if (!todo.due_date) return false;
    const dueDate = new Date(todo.due_date);
    return dueDate >= today && dueDate <= threeDaysLater;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-gray-500 text-lg">
        Yükleniyor...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Dashboard</h2>

      {/* Butonlar */}
          <div className="flex justify-center gap-4 mb-8">
      <Button
        onClick={() => navigate('/todos')}
        variant="primary"
        aria-label="Todo Listesine Git"
      >
        Todo Listesi
      </Button>
      <Button
        onClick={() => navigate('/categories')}
        variant="success"
        aria-label="Kategori Yönetimine Git"
      >
        Kategori Yönetimi
      </Button>
    </div>

      {/* Özet İstatistikler */}
      <section className="mb-10 p-6 bg-white rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">Özet İstatistikler</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <li className="bg-yellow-100 text-yellow-800 rounded p-4 shadow">
            <p className="text-2xl font-bold">{statusCounts.pending || 0}</p>
            <p>Beklemede</p>
          </li>
          <li className="bg-blue-100 text-blue-800 rounded p-4 shadow">
            <p className="text-2xl font-bold">{statusCounts.in_progress || 0}</p>
            <p>Devam Ediyor</p>
          </li>
          <li className="bg-green-100 text-green-800 rounded p-4 shadow">
            <p className="text-2xl font-bold">{statusCounts.completed || 0}</p>
            <p>Tamamlandı</p>
          </li>
          <li className="bg-red-100 text-red-800 rounded p-4 shadow">
            <p className="text-2xl font-bold">{statusCounts.cancelled || 0}</p>
            <p>İptal Edildi</p>
          </li>
        </ul>
      </section>

      {/* Yaklaşan Bitiş Tarihleri */}
      <section className="p-6 bg-yellow-50 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">⏳ Yaklaşan Bitiş Tarihleri (3 gün içinde)</h3>
        {upcomingTodos.length === 0 ? (
          <p className="text-gray-600">Yaklaşan bitiş tarihi olan todo yok.</p>
        ) : (
          <ul className="space-y-4">
            {upcomingTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-yellow-300 p-4 rounded shadow-sm"
              >
                <div>
                  <p className="font-semibold text-lg">{todo.title}</p>
                  <p className="text-sm text-gray-600">
                    Bitiş: {new Date(todo.due_date).toLocaleDateString('tr-TR')}
                  </p>
                </div>

                <select
                  value={todo.status}
                  onChange={(e) => handleStatusChange(todo.id, e.target.value)}
                  className="border rounded px-3 py-1 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  aria-label={`Durum değiştir: ${todo.title}`}
                >
                  <option value="pending">Beklemede</option>
                  <option value="in_progress">Devam Ediyor</option>
                  <option value="completed">Tamamlandı</option>
                  <option value="cancelled">İptal Edildi</option>
                </select>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Dashboard;