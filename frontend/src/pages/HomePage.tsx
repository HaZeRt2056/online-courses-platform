import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {courseService, fetchCategories} from '../services/api';
import CourseList from '../components/CourseList';
import {truncate} from "../utils/trankad.ts";

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState({});
  
  // Fetch courses
  const { data: coursesData, isLoading } = useQuery(
      ['courses', filters],
      () => courseService.getCourses(filters).then(res => res.data),
      { keepPreviousData: true }
  );
  const courses = coursesData?.courses || [];
  
  // Mock featured course data - would come from API in production
  const featuredCourse = {
    id: 'featured-1',
    title: 'Полный курс по Django: от основ до продвинутых техник',
    description: 'Изучите Django с нуля до профессионального уровня. В этом курсе вы научитесь создавать полноценные веб-приложения, работать с базами данных, использовать Django REST Framework и многое другое.',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  };
  const { data: categoriesData } = useQuery(
      ['categories'],
      () => fetchCategories.getCategories().then(res => res.data)
  );
  // Mock categories data - would come from API in production
  // const categories = [
  //   { id: 'web-development', name: 'Веб-разработка', count: 120, icon: '🌐' },
  //   { id: 'mobile-development', name: 'Мобильная разработка', count: 64, icon: '📱' },
  //   { id: 'design', name: 'Дизайн', count: 87, icon: '🎨' },
  //   { id: 'devops', name: 'DevOps', count: 42, icon: '⚙️' },
  //   { id: 'databases', name: 'Базы данных', count: 35, icon: '💾' },
  //   { id: 'machine-learning', name: 'Машинное обучение', count: 53, icon: '🤖' }
  // ];
console.log(categoriesData)
  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={featuredCourse.image}
            alt="Featured course"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-900/60" />
        </div>
        
        <div className="relative py-16 px-8 sm:py-24 sm:px-12 lg:px-16 flex flex-col items-start">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {featuredCourse.title}
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-xl">
              {featuredCourse.description}
            </p>
            <Link
              to={`/courses`}
              className="btn btn-accent px-6 py-3 text-base"
            >
              Начать обучение
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Категории курсов</h2>
          <Link to="/category" className="text-primary-700 hover:text-primary-800 font-medium flex items-center">
            Все категории
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoriesData?.map((category) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className="bg-white flex justify-center flex-col items-center  rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow"
            >
              <img src={category.icon} className="size-10 mb-2 "/>
              <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
              {/*<p className="text-sm text-gray-500">{category.count} курсов</p>*/}
            </Link>
          ))}
        </div>
      </section>
      
      {/* New Courses */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Новые курсы</h2>
          <Link to="/courses" className="text-primary-700 hover:text-primary-800 font-medium flex items-center">
            Все новые курсы
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {coursesData ?
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                       {coursesData.map((category) => (
                           <Link
                               key={category.id}
                               to={`/courses/${category.id}`}
                               className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow"
                           >
                             <div className="text-3xl mb-2">{category.icon}</div>
                             <h3 className="font-medium text-gray-900 mb-1">{category.title}</h3>
                             <p className="text-sm text-gray-500">{truncate(category.description, 20)}</p>
                           </Link>
                       ))}
                     </div>
        : <CourseList
                courses={courses.slice(0, 6)}
                isLoading={isLoading}
            />

        }


      </section>
      
      {/* Popular Courses */}

      {/* Newsletter Signup */}
      <section className="bg-primary-50 rounded-xl p-8 sm:p-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Подпишитесь на нашу рассылку
          </h2>
          <p className="text-gray-600 mb-6">
            Получайте уведомления о новых курсах, акциях и образовательных материалах.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              required
            />
            <button
              type="submit"
              className="btn btn-primary px-6"
            >
              Подписаться
            </button>
          </form>
          
          <p className="text-xs text-gray-500 mt-3">
            Мы уважаем вашу конфиденциальность. Отписаться можно в любой момент.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;