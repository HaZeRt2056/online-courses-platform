import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, BookOpen } from 'lucide-react';
import { Course } from '../types';
import { formatDate } from '../utils/formatters';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course,icon }) => {
  console.log(course)
  return (
    <Link to={`/courses/${course.id}`} className="block">
      <div className="card h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative">
          <img 
            src={icon}
            alt={course.title} 
            className="w-full h-auto flex justify-center"
          />
          <div className="absolute top-2 right-2 bg-accent-500 text-white px-2 py-1 text-xs font-medium rounded">
            {course.language}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {course.description}
          </p>
          
          {/* Meta info */}
          <div className="mt-auto">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{course.lessons_count} уроков</span>
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {formatDate(course.created_at)}
              </div>
              <div className="flex items-center">
                <div className="text-sm font-medium text-primary-700 hover:text-primary-800">
                  Подробнее &rarr;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;