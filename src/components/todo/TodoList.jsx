import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoItem from './TodoItem';
import Pagination from '../common/Pagination';
import ConfirmationModal from '../common/ConfirmationModal';
import Button from '../common/Button';

export default function TodoList({
  todos,
  onEdit,
  onDelete,
  onStatusChange,
  currentPage,
  totalPages,
  onPageChange,
}) {
  const navigate = useNavigate();
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteRequest = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedTodo) {
      onDelete(selectedTodo);
    }
    setShowModal(false);
  };

  return (
    <div>
        <div className="flex justify-end mb-4">
    <Button
        onClick={() => navigate('/todos/new')}
        variant="primary"
    >
        Yeni Todo Ekle
    </Button>
    </div>

      {todos.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Henüz todo bulunmuyor.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onEdit={onEdit}
                onDelete={() => handleDeleteRequest(todo)}
                onStatusChange={onStatusChange}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}

      <ConfirmationModal
        isOpen={showModal}
        title="Todo Silinsin mi?"
        message={`"${selectedTodo?.title}" adlı todo'yu silmek istediğinize emin misiniz?`}
        confirmText="Sil"
        cancelText="Vazgeç"
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}