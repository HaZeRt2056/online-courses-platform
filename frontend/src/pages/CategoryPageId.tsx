import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import {courseService, fetchCategories} from '../services/api';
import CourseList from '../components/CourseList';
import Pagination from '../components/Pagination';

const CategoryPageId: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
    const { id } = useParams<{ id: string; }>();

  const { data: courseData, isLoading } = useQuery(
      ['categories', id],
      () => fetchCategories.getCategories(id as string).then(res => res.data),
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  console.log(courseData)
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Все курсы</h1>
        <p className="mt-2 text-lg text-gray-600">
          Найдите курс, который поможет вам достичь ваших целей
        </p>
      </header>

      {/* Filters */}
      {/*<CourseFilters onFilterChange={handleFilterChange} />*/}

      <div className="gap-4">
        {courseData?.course ?
            <Link
                key={courseData?.id}
                to={`/courses/${courseData?.id}`}
                className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">{courseData?.icon}</div>
              <h3 className="font-medium text-gray-900 mb-1">{courseData?.title}</h3>
              <p className="text-sm text-gray-500">{courseData?.description} курсов</p>
            </Link> : <CourseList icon={courseData?.icon}
                courses={courseData?.courses || []}
                isLoading={isLoading}
            />
        }
      </div>
      {/* Course list */}


      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CategoryPageId;