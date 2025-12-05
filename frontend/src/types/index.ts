// Course types
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  language: string;
  level: string;
  duration: string;
  created_at: string;
  updated_at: string;
  author: string;
  rating: number;
  lessons_count: number;
  tags: string[];
}

export interface CourseDetail extends Course {
  lessons: Lesson[];
  files: File[];
  has_certificate: boolean;
}

// Lesson types
export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string;
  video_url: string;
  duration: string;
  order: number;
  created_at: string;
  files: File[];
}

export interface LessonDetail extends Lesson {
  content: string;
}

// File types
export interface File {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  created_at: string;
}

// Comment types
export interface Comment {
  id: string;
  content: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  created_at: string;
  updated_at: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

// Search types
export interface SearchResult {
  courses: Course[];
  total: number;
}

// Filter types
export interface CourseFilters {
  category?: string;
  language?: string;
  level?: string;
  search?: string;
  sort?: 'newest' | 'oldest' | 'popular' | 'rating';
}