import { useState, useEffect } from 'react';
import todoService from '../services/todoService';

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    sortBy: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, [filters, pagination.page]);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();

      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.sortBy) {
        const [sort, direction] = filters.sortBy.split('_');
        params.append('sort', sort);
        params.append('direction', direction);
      }
      params.append('page', pagination.page);

      const response = await todoService.getAll(params.toString());
      
      setTodos(response.data || []);
      setPagination({
        page: response.meta?.current_page || 1,
        totalPages: response.meta?.last_page || 1,
      });
    } catch (err) {
      setError(err);
      console.error('Todo çekme hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filtre güncellemesi, sayfa 1'e döner
  const onFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onPageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return {
    todos,
    pagination,
    filters,
    loading,
    error,
    onFilterChange,
    onPageChange,
  };
}