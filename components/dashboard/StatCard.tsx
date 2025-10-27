import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: 'green' | 'blue' | 'indigo' | 'purple';
}

const colorClasses = {
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
  },
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
  },
  indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-600',
  },
  purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
  }
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color = 'blue' }) => {
  const { bg, text } = colorClasses[color];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className={`p-3 rounded-full ${bg} ${text}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;