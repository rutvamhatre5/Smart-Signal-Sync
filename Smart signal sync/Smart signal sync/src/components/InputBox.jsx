import React from 'react';

const InputBox = ({
  label,
  video,
  timer,
  active,
  redTimer,
  redActive
}) => {
  return (
    <div className="relative">

      {/* Lane Title */}
      <h2 className="text-lg font-semibold mb-2 text-center text-slate-800 dark:text-white">
        {label}
      </h2>

      {/* Video */}
      <video
        src={video}
        autoPlay
        loop
        muted
        className="w-full h-44 object-cover rounded-xl"
      />

      {/* Green Timer */}
      {active && (
        <div className="absolute top-10 right-3 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg font-bold">
          🟢 {timer}s
        </div>
      )}

      {/* Red Timer */}
      {redActive && (
        <div className="absolute bottom-3 right-3 bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg font-bold">
          🔴 {redTimer}s
        </div>
      )}

    </div>
  );
};

export default InputBox;