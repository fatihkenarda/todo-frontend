import React from 'react';

export default function ConfirmationModal({
  isOpen,
  title = 'Onay',
  message = 'Bu işlemi gerçekleştirmek istediğinizden emin misiniz?',
  confirmText = 'Evet',
  cancelText = 'İptal',
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-2 text-black">{title}</h3>
        <p className="mb-4 text-sm text-gray-700">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}