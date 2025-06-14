import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TodoList from '../components/todo/TodoList';
import TodoFilter from '../components/todo/TodoFilter';
import Button from '../components/common/Button';

export default function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  const [editingTodo, setEditingTodo] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDueDate, setEditDueDate] = useState('');

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        per_page: perPage,
        sort_by: sortBy,
        sort_order: sortOrder,
        ...filters,
      };
      Object.keys(params).forEach(key => {
        if (params[key] === '') delete params[key];
      });

      const response = await axios.get('http://localhost:8000/api/todos', { params });
      setTodos(response.data.data);
      setTotalPages(response.data.meta.total_pages);
    } catch (error) {
      console.error('Todo listesi alınırken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [page, filters, sortBy, sortOrder]);

  const onFilterChange = useCallback((newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters,
    }));
    setPage(1);
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:8000/api/todos/${id}/status`, { status: newStatus });
      fetchTodos();
    } catch (error) {
      console.error('Durum güncellenirken hata:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu görevi silmek istediğinize emin misiniz?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Görev silinirken hata:', error);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setEditTitle(todo.title);
    setEditDueDate(todo.due_date || '');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/todos/${editingTodo.id}`, {
        title: editTitle,
        due_date: editDueDate,
      });
      setEditingTodo(null);
      fetchTodos();
    } catch (error) {
      console.error('Görev düzenlenirken hata:', error);
    }
  };

  const handleEditCancel = () => {
    setEditingTodo(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo Listesi</h1>

      <TodoFilter onChange={onFilterChange} filters={filters} />

      <TodoList
        todos={todos}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {editingTodo && (
        <div className="border border-gray-300 rounded p-4 mt-6 bg-gray-50 dark:bg-gray-900">
          <h3 className="text-lg font-semibold mb-3 ">Görev Düzenle</h3>
          <form onSubmit={handleEditSubmit} className="space-y-3">
            <div>
              <label className="block mb-1 font-medium">Başlık:</label>
              <input
                type="text"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Bitiş Tarihi:</label>
              <input
                type="date"
                value={editDueDate}
                onChange={e => setEditDueDate(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" variant="primary">Kaydet</Button>
              <Button type="button" onClick={handleEditCancel} variant="outline">İptal</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}