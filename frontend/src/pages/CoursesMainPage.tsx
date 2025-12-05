import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {Link, useSearchParams} from 'react-router-dom';
import {courseService, fetchCategories} from '../services/api';
import CourseList from '../components/CourseList';
import Pagination from '../components/Pagination';

const CoursesMainPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
    const { data: coursesData, isLoading } = useQuery(
        ['courses'],
        () => courseService.getCourses().then(res => res.data),
        { keepPreviousData: true }
    );
    console.log(coursesData)

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
          {coursesData ? (
              coursesData?.map((item) => (
                  <Link
                      key={item?.id}
                      to={`/courses/${item?.id}`}
                      className="bg-white rounded-lg flex justify-center flex-col items-center shadow-sm p-6 text-center hover:shadow-md transition-shadow"
                  >
                      <h3 className="font-medium text-gray-900 mb-1">{item?.title}</h3>
                  </Link>
              ))
          ) : (
              <CourseList
                  courses={coursesData?.courses || []}
                  isLoading={isLoading}
              />
          )}
      </div>
      {/* Course list */}


      {/* Pagination */}
    </div>
  );
};

export default CoursesMainPage;