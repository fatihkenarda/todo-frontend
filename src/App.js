import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './pages/Dashboard';
import TodoList from './pages/TodoListPage';
import TodoDetail from './pages/TodoDetailPage';
import CategoryManager from './pages/CategoryManager';

function App() {
  // Tema durumu localStorage'dan okunur, default false (açık tema)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">

        {/* Tema toggle butonu sayfanın sağ üst köşesine konabilir */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? 'Açık Tema' : 'Koyu Tema'}
          </button>
        </div>

        {/* ToastContainer tüm sayfalarda çalışması için */}
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/todos/new" element={<TodoDetail />} /> {/* Yeni todo */}
          <Route path="/todos/:id" element={<TodoDetail />} /> {/* Düzenleme */}
          <Route path="/categories" element={<CategoryManager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;