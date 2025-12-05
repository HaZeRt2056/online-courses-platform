import React from 'react';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import { Play, Lock } from 'lucide-react';
import { Lesson } from '../types';
import ReactPlayer from "react-player";

interface LessonListProps {
  lessons: Lesson[];
  courseId: string;
}

const LessonList: React.FC<LessonListProps> = ({ lessons }) => {
  // const { courseId } = useParams<{ lessonId: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeLessonId = searchParams.get('lesson');
    const activeLesson = lessons?.find(lesson => String(lesson.id) === activeLessonId);
    console.log(activeLesson)
    const handleClick = (lessonId: string) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('lesson', lessonId);
        setSearchParams(newParams);
    };
    function formatDuration(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    function normalizeYouTubeUrl(url: string): string {
        if (url.includes('youtu.be')) {
            const videoId = url.split('/').pop()?.split('?')[0];
            return `https://www.youtube.com/watch?v=${videoId}`;
        }
        return url;
    }

    return (

      <div className='flex gap-1'>

          <div className="w-full">
              {!activeLesson ? (
                  <div className="min-h-[500px] flex items-center justify-center bg-gray-100 text-gray-500">
                      Выберите урок
                  </div>
              ) : activeLesson.file ? (
                  <video
                      src={activeLesson.file}
                      controls
                      className="w-full min-h-[500px] h-full object-contain bg-black"
                  />
              ) : activeLesson.video ? (
                  // <ReactPlayer
                  //     url={activeLesson.video}
                  //     controls
                  //     width="100%"
                  //     height="500px"
                  // />
                  <ReactPlayer
                      key={activeLesson.id}
                      url={normalizeYouTubeUrl(activeLesson.video)}
                      controls
                      width="100%"
                      height="500px"
                  />

              ) : (
                  <div className="min-h-[500px] flex items-center justify-center bg-gray-100 text-gray-500">
                      Видео отсутствует
                  </div>
              )}
          </div>

          <div className="bg-white w-[500px] rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Уроки курса ({lessons?.length})</h3>
              </div>

              <div className="divide-y divide-gray-200 max-h-[70vh] overflow-y-auto">
                  {lessons?.map((lesson) => {
                      const isActive = String(lesson.id) === activeLessonId;

                      return (
                          <div
                              key={lesson.id}
                              onClick={() => handleClick(String(lesson.id))}
                              className={`block p-4 hover:bg-gray-50 transition-colors cursor-pointer ${isActive ? 'lesson-active' : ''}`}
                          >
                              <div className="flex items-center">
                                  <div className={`rounded-full flex items-center justify-center h-8 w-8 flex-shrink-0 ${isActive ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-500'}`}>
                                      <Play className="h-4 w-4" />
                                  </div>

                                  <div className="ml-3 flex-1">
                                      <div className="flex items-center justify-between">
                                          <p className={`text-sm font-medium ${isActive ? 'text-primary-700' : 'text-gray-900'}`}>
                                              {lesson.title}
                                          </p>
                                          <span className="text-xs text-gray-500">
                                              {formatDuration(lesson.duration)}
                                              </span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      );
                  })}
              </div>
          </div>
      </div>
  );
};

export default LessonList;