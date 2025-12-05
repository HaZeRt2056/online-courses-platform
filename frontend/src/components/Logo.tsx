import React from 'react';
import { BookOpen } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-6 w-6' }) => {
  return <BookOpen className={className} />;
};

export default Logo;