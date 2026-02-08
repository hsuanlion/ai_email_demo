
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'red' | 'green' | 'yellow' | 'slate' | 'purple';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'slate' }) => {
  const variants = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    red: 'bg-red-50 text-red-700 border-red-100',
    green: 'bg-green-50 text-green-700 border-green-100',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    slate: 'bg-slate-50 text-slate-700 border-slate-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${variants[variant]}`}>
      {children}
    </span>
  );
};
