import React from 'react';

const SignalBox = ({ activeSignal = 'top', densities = {} }) => {
  const signals = [
    { id: 'top', pos: 'top-4 left-1/2 -translate-x-1/2', val: densities.top || 0 },
    { id: 'right', pos: 'right-4 top-1/2 -translate-y-1/2', val: densities.right || 0 },
    { id: 'bottom', pos: 'bottom-4 left-1/2 -translate-x-1/2', val: densities.bottom || 0 },
    { id: 'left', pos: 'left-4 top-1/2 -translate-y-1/2', val: densities.left || 0 },
  ];

  const getColor = (val) => {
    if (val < 40) return 'bg-green-500 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]';
    if (val < 70) return 'bg-yellow-500 border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.4)]';
    return 'bg-red-500 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]';
  };

  return (
    <div className="relative w-48 h-48 bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden transition-colors">
      {/* Intersection Lines (Visual decoration) */}
      <div className="absolute inset-x-8 h-px bg-slate-100 dark:bg-slate-800 top-1/2 -translate-y-1/2" />
      <div className="absolute inset-y-8 w-px bg-slate-100 dark:bg-slate-800 left-1/2 -translate-x-1/2" />
      
      {/* Circle center */}
      <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 z-0 flex items-center justify-center transition-colors">
        <div className={`w-8 h-8 rounded-full transition-all duration-300 ${activeSignal ? getColor(densities[activeSignal]) : 'bg-slate-100 dark:bg-slate-800'}`} />
      </div>

      {/* Signal Indicators */}
      {signals.map((signal) => (
        <div
          key={signal.id}
          className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 z-10 ${signal.pos}`}
        >
          <div
            className={`w-6 h-6 rounded-full transition-all duration-500 border-2 ${
              activeSignal === signal.id
                ? getColor(signal.val)
                : 'bg-slate-200/50 border-slate-300'
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default SignalBox;
