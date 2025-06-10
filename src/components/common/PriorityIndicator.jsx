import React from 'react';

const priorityConfig = {
  high: { label: 'Yüksek', color: 'bg-red-500' },
  medium: { label: 'Orta', color: 'bg-yellow-500' },
  low: { label: 'Düşük', color: 'bg-green-500' },
};

export default function PriorityIndicator({ priority }) {
  const config = priorityConfig[priority] || {
    label: priority,
    color: 'bg-gray-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-2 py-1 text-white text-xs rounded-full ${config.color}`}
    >
      <span className="w-2 h-2 rounded-full bg-white"></span>
      {config.label}
    </span>
  );
}