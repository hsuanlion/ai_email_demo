
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  colorClass: string;
  onClick?: () => void;
  isActive?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, colorClass, onClick, isActive }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white p-6 rounded-2xl shadow-sm border transition-all cursor-pointer hover:shadow-md active:scale-95 ${
        isActive 
          ? 'border-indigo-500 ring-2 ring-indigo-50 shadow-md translate-y-[-2px]' 
          : 'border-slate-100 hover:border-indigo-200'
      } flex items-center space-x-4`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
        <i className={`fas ${icon} text-lg`}></i>
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
      {isActive && (
        <div className="text-indigo-500">
          <i className="fas fa-filter text-xs"></i>
        </div>
      )}
    </div>
  );
};
