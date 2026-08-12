import React from 'react';

const ToggleSwitch = ({ isOn, onToggle, label }) => {
  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</span>}
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
          isOn ? 'bg-green-500' : 'bg-gray-300 dark:bg-slate-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isOn ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
