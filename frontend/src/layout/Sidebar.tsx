import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import Logo from '../components/Logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  // Mock categories - this would come from an API in production
  const categories = [
    { id: '1', name: 'Веб-разработка', slug: 'web-development' },
    { id: '2', name: 'Мобильная разработка', slug: 'mobile-development' },
    { id: '3', name: 'Дизайн', slug: 'design' },
    { id: '4', name: 'DevOps', slug: 'devops' },
    { id: '5', name: 'Базы данных', slug: 'databases' },
    { id: '6', name: 'Машинное обучение', slug: 'machine-learning' },
  ];

  // Close sidebar when escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scrolling when sidebar is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-30 overflow-y-auto transition transform">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center" onClick={onClose}>
              <Logo className="h-8 w-auto text-primary-700" />
              <span className="ml-2 text-xl font-bold text-gray-900">КурсХантер</span>
            </Link>
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 p-1 rounded-full"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Навигация
              </h3>
              <div className="mt-4 space-y-4">
                <Link
                  to="/"
                  className="block text-base font-medium text-gray-900 hover:text-primary-700"
                  onClick={onClose}
                >
                  Главная
                </Link>
                <Link
                  to="/courses"
                  className="block text-base font-medium text-gray-900 hover:text-primary-700"
                  onClick={onClose}
                >
                  Все курсы
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Категории
              </h3>
              <div className="mt-4 space-y-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/courses?category=${category.slug}`}
                    className="block text-base font-medium text-gray-900 hover:text-primary-700"
                    onClick={onClose}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Аккаунт
              </h3>
              <div className="mt-4 space-y-4">
                <Link
                  to="/login"
                  className="block text-base font-medium text-gray-900 hover:text-primary-700"
                  onClick={onClose}
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  className="block text-base font-medium text-gray-900 hover:text-primary-700"
                  onClick={onClose}
                >
                  Регистрация
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;