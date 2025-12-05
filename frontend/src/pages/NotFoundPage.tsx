import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-700 mb-6">Страница не найдена</p>
      <p className="text-gray-600 max-w-md mb-8">
        Извините, страница, которую вы ищете, не существует или была перемещена.
      </p>
      <div className="space-y-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-700 hover:bg-primary-800"
        >
          На главную
        </Link>
        <div>
          <Link
            to="/courses"
            className="inline-flex items-center text-primary-700 hover:underline mt-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            К списку курсов
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;