import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home } from 'lucide-react';

const LogoutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-white dark:border-slate-800 p-10 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400 dark:text-slate-500">
          <LogOut size={40} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sign Out</h1>
          <p className="text-slate-500 dark:text-slate-400">Are you sure you want to end your current session?</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/login')}
            className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-lg shadow-red-500/10 transition-all"
          >
            Logout Now
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Back to Dashboard
          </button>
        </div>

        <p className="text-xs text-slate-300 dark:text-slate-600 pt-4 cursor-default">
          You have been logged out (Optional message)
        </p>
      </div>
    </div>
  );
};

export default LogoutPage;
