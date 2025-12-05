import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {Link, useSearchParams} from 'react-router-dom';
import { fetchCategories} from '../services/api';
import CourseList from '../components/CourseList';
import Pagination from '../components/Pagination';

const CoursesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data: courseData, isLoading } = useQuery(
      ['course'],
      () => fetchCategories.getCategories().then(res => res.data),
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

      <div className="grid  md:grid-cols- lg:grid-cols-4 gap-4">
          {courseData ? (
              courseData?.map((item) => (
                  <Link
                      key={item?.id}
                      to={`/category/${item?.id}`}
                      className="bg-white rounded-lg flex justify-center flex-col items-center shadow-sm p-6 text-center hover:shadow-md transition-shadow"
                  >
                      <img src={item?.icon} className="size-10 mb-2"/>
                      <h3 className="font-medium text-gray-900 mb-1">{item?.name}</h3>
                  </Link>
              ))
          ) : (
              <CourseList
                  courses={courseData?.courses || []}
                  isLoading={isLoading}
              />
          )}
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

export default CoursesPage;