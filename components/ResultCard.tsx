
import React from 'react';

interface ResultCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ResultCard: React.FC<ResultCardProps> = ({ icon, value, label, className, style }) => {
  return (
    <div className={`bg-gradient-to-br ${className} p-4 rounded-2xl shadow-lg text-white`} style={style}>
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-full">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm opacity-90">{label}</p>
        </div>
      </div>
    </div>
  );
};
