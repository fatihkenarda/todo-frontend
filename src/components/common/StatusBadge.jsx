import React from 'react';

const STATUS_COLORS = {
  pending: 'bg-yellow-200 text-yellow-800',
  completed: 'bg-green-200 text-green-800',
  in_progress: 'bg-blue-200 text-blue-800',
  cancelled: 'bg-red-200 text-red-800',
};

export default function StatusBadge({ status }) {
  const colorClass = STATUS_COLORS[status] || 'bg-gray-200 text-gray-800';

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded ${colorClass}`}
      style={{ minWidth: 70, textAlign: 'center' }}
    >
      {status.replace('_', ' ').toUpperCase()}
    </span>
  );
}