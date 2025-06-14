import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import PriorityIndicator from '../common/PriorityIndicator';
import Pagination from '../common/Pagination';
import Button from '../common/Button';

import Select from '../common/Select';

const statusLabels = {
  pending: 'Beklemede',
  in_progress: 'Devam Ediyor',
  completed: 'Tamamlandı',
  cancelled: 'İptal Edildi',
};

export default function TodoItem({ todo, onEdit, onDelete, onStatusChange }) {
  return (
    <div className={`bg-white shadow rounded-xl p-4 flex flex-col gap-2 border-l-4 ${
      todo.status === 'completed' ? 'border-green-500' :
      todo.status === 'in_progress' ? 'border-yellow-500' :
      todo.status === 'cancelled' ? 'border-red-500' :
      'border-gray-300'
    }`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          <Link to={`/todos/${todo.id}`} className="text-blue-600 hover:underline">
            {todo.title}
          </Link>
        </h3>
        <StatusBadge status={todo.status} />
      </div>

      <p className="text-sm text-gray-600">
        Son Tarih: {todo.due_date ? new Date(todo.due_date).toLocaleDateString() : '-'}
      </p>
      <p className="text-sm text-gray-700">
        Kategoriler: {todo.categories?.map(c => c.name).join(', ') || '-'}
      </p>
      <div className="flex items-center gap-2 text-sm text-gray-700">
        Öncelik: <PriorityIndicator priority={todo.priority} />
      </div>

      <div className="flex items-center gap-2 mt-2">
        <Select
          value={todo.status}
          onChange={(e) => onStatusChange(todo.id, e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {Object.entries(statusLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </Select>
      </div>

            <div className="flex justify-end gap-2 mt-4">
        <Button
            onClick={() => onEdit(todo)}
            variant="primary"
            className="text-sm"
        >
            Düzenle
        </Button>
        <Button
            onClick={() => onDelete(todo.id)}
            variant="danger"
            className="text-sm"
        >
            Sil
        </Button>
        </div>
    </div>
  );
}