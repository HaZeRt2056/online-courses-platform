import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout
import Layout from './layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import CategoryPageId from './pages/CategoryPageId.tsx';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Context
import { useTheme } from './contexts/ThemeContext';
import CategoryMainPage from "./pages/CategoryMainPage.tsx";
import CoursesMainPage from "./pages/CoursesMainPage.tsx";

function App() {
  const { theme } = useTheme();
  
  return (
    <div style={{ 
      '--primary-color': theme.primaryColor, 
      '--secondary-color': theme.secondaryColor,
      '--accent-color': theme.accentColor
    } as React.CSSProperties}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/*Главная */}


          {/*Категорий*/}
          <Route path="category" element={<CategoryMainPage />} />{/*Категорий*/}
          <Route path="category/:id" element={<CategoryPageId />} />
          {/*Категорий*/}


          {/*Все курсы*/}
          <Route path="courses/:courseId" element={<CourseDetailPage />} />
          <Route path="courses" element={<CoursesMainPage />} />

          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;