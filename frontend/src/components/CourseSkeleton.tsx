import React from 'react';

const CourseSkeleton: React.FC = () => {
  return (
    <div className="card h-full flex flex-col animate-pulse">
      {/* Thumbnail */}
      <div className="w-full h-48 bg-gray-300"></div>
      
      {/* Content */}
      <div className="flex-1 p-4">
        <div className="h-3 bg-gray-300 rounded w-1/3 mb-3"></div>
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-5 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
        
        {/* Meta info */}
        <div className="mt-auto">
          <div className="flex justify-between">
            <div className="h-3 bg-gray-300 rounded w-1/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/4"></div>
          </div>
          
          <div className="mt-3 flex justify-between">
            <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            <div className="h-3 bg-gray-300 rounded w-1/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSkeleton;