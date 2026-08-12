import React from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ value = "00:30" }) => {
  return (
    <div className="flex flex-col items-center mb-2">
      <div className="px-4 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-colors">
        <Clock size={16} className="text-blue-500" />
        <span>Timer: {value}</span>
      </div>
    </div>
  );
};

export default Timer;
