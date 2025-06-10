import React from 'react';

export default function CategorySelector({ categories, value, onChange }) {
  const selectedValues = Array.isArray(value) ? value : [];

  const handleToggle = (categoryId) => {
    if (selectedValues.includes(categoryId)) {
      onChange(selectedValues.filter(id => id !== categoryId));
    } else {
      onChange([...selectedValues, categoryId]);
    }
  };

  return (
    <div>
      <label className="block mb-1">Kategoriler *</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
        {categories.map(cat => (
          <label key={cat.id} style={{ cursor: 'pointer', userSelect: 'none' }} className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              value={cat.id}
              checked={selectedValues.includes(cat.id)}
              onChange={() => handleToggle(cat.id)}
              className="form-checkbox"
            />
            <span>{cat.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}