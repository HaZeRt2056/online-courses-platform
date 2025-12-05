import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, ChevronDown, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';
import {useQuery} from "react-query";
import {fetchCategories} from "../services/api.ts";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
const emailH = localStorage.getItem('email');
  const userNameH = localStorage.getItem('username');

  // Mock categories - this would come from an API in production
  const categories = [
    { id: '1', name: 'Веб-разработка', slug: 'web-development' },
    { id: '2', name: 'Мобильная разработка', slug: 'mobile-development' },
    { id: '3', name: 'Дизайн', slug: 'design' },
    { id: '4', name: 'DevOps', slug: 'devops' },
    { id: '5', name: 'Базы данных', slug: 'databases' },
    { id: '6', name: 'Машинное обучение', slug: 'machine-learning' },
  ];

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleLogout = () => {
    localStorage.removeItem("email")
    localStorage.removeItem("username")
    navigate('/login')
  }
  const { data: categoriesData } = useQuery(
      ['categories'],
      () => fetchCategories.getCategories().then(res => res.data)
  );
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button 
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Logo className="h-8 w-auto text-primary-700" />
              <span className="ml-2 text-xl font-bold text-gray-900">КурсХантер</span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:ml-6 md:flex md:space-x-8">
            {/* Categories Dropdown */}
            <div className="relative" ref={categoriesRef}>
              <button
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary-700 border-b-2 border-transparent hover:border-primary-300"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
              >
                Категории
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Categories Dropdown Menu */}
              {categoriesOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dropdown">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {categoriesData?.map((category) => (

                        <Link
                            key={category.id}
                            to={`/category/${category.id}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setCategoriesOpen(false)}
                        >
                          {category.name}
                        </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>

            <Link
              to="/courses"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary-700 border-b-2 border-transparent hover:border-primary-300"
            >
              Все курсы
            </Link>
          </nav>

          {/* Right side - Search and Auth */}
          <div className="flex items-center">
            {/* Search */}

            {/* Auth Links or User Menu */}
            {isAuthenticated ? (
              <div className="ml-4 relative" ref={userMenuRef}>
                <button
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-700 focus:outline-none"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <span className="sr-only">Открыть меню пользователя</span>
                  <div className="h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center text-white">
                    <User className="h-5 w-5" />
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dropdown">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        {user?.username}
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Профиль
                      </Link>
                      <Link
                        to="/my-courses"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Мои курсы
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                      >
                        Выйти
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {emailH || userNameH ? <div onClick={handleLogout} className='flex gap-4'>
                  {emailH || userNameH} <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="#374151" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg></div>  :
                  <div className="ml-6 flex items-center">

                    <Link
                        to="/login"
                        className="text-sm font-medium text-gray-700 hover:text-primary-700"
                    >
                      Войти
                    </Link>
                    <span className="mx-2 text-gray-500">/</span>
                    <Link
                        to="/register"
                        className="text-sm font-medium text-primary-700 hover:text-primary-800"
                    >
                      Регистрация
                    </Link>
                  </div>
                }
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;