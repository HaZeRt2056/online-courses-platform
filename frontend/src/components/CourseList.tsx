import React from 'react';
import { Course } from '../types';
import CourseCard from './CourseCard';
import CourseSkeleton from './CourseSkeleton';

interface CourseListProps {
  courses: Course[];
  isLoading: boolean;
}

const CourseList: React.FC<CourseListProps> = ({ courses, isLoading,icon }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <CourseSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Курсы не найдены</h3>
        <p className="mt-2 text-sm text-gray-500">
          Попробуйте изменить параметры поиска или фильтры.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} icon={icon} />
      ))}
    </div>
  );
};

export default CourseList;