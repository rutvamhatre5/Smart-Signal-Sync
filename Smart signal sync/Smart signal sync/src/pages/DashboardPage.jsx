import React, { useState, useEffect } from 'react';
import { Activity, LogOut, BarChart3, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../components/InputBox';
import SignalBox from '../components/SignalBox';
import { useTheme } from '../context/ThemeContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [activeSignal, setActiveSignal] = useState('top');
  const [redSignal, setRedSignal] = useState('left');

  const [backendData, setBackendData] = useState({
    lane1: 0,
    lane2: 0,
    lane3: 0,
    lane4: 0,
    green_lane: 'Lane1',
    timer: 0
  });

  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/traffic-data');
        const data = await res.json();

        setBackendData(data);

        if (data.green_lane === 'Lane1') {
          setActiveSignal('top');
          setRedSignal('left');
        }

        if (data.green_lane === 'Lane2') {
          setActiveSignal('left');
          setRedSignal('bottom');
        }

        if (data.green_lane === 'Lane3') {
          setActiveSignal('bottom');
          setRedSignal('right');
        }

        if (data.green_lane === 'Lane4') {
          setActiveSignal('right');
          setRedSignal('top');
        }

      } catch (error) {
        console.log('Backend not connected');
      }
    };

    fetchTrafficData();
    const interval = setInterval(fetchTrafficData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-[#f8fafc] dark:bg-[#0f172a] p-3 flex flex-col overflow-hidden transition-colors duration-300">

      {/* Header */}
      <header className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <Activity size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Smart Signal Sync
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live Traffic Monitoring
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">

          <button onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button onClick={() => navigate('/analytics')}>
            <BarChart3 size={20} />
          </button>

          <button onClick={() => navigate('/logout')}>
            <LogOut size={20} />
          </button>

        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 grid-rows-3 gap-6 w-full max-w-7xl">

          {/* Top */}
          <div className="col-start-2 row-start-1">
            <InputBox
              label="Lane 1"
              video="/videos/lane1.mp4"
              timer={backendData.timer}
              redTimer={backendData.timer}
              active={activeSignal === 'top'}
              redActive={redSignal === 'top'}
              
            />
          </div>

          {/* Left */}
          <div className="col-start-1 row-start-2">
            <InputBox
              label="Lane 2"
              video="/videos/lane2.mp4"
              timer={backendData.timer}
              redTimer={backendData.timer}
              active={activeSignal === 'left'}
              redActive={redSignal === 'left'}
              
            />
          </div>

          {/* Center Signal */}
          <div className="col-start-2 row-start-2 flex items-center justify-center">
            <SignalBox activeSignal={activeSignal} />
          </div>

          {/* Right */}
          <div className="col-start-3 row-start-2">
            <InputBox
              label="Lane 4"
              video="/videos/lane4.mp4"
              timer={backendData.timer}
              redTimer={backendData.timer}
              active={activeSignal === 'right'}
              redActive={redSignal === 'right'}
              
            />
          </div>

          {/* Bottom */}
          <div className="col-start-2 row-start-3">
            <InputBox
              label="Lane 3"
              video="/videos/lane3.mp4"
              timer={backendData.timer}
              redTimer={backendData.timer}
              active={activeSignal === 'bottom'}
              redActive={redSignal === 'bottom'}
              
            />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center pt-2">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Current Green Signal: {backendData.green_lane}
        </p>
      </footer>

    </div>
  );
};

export default DashboardPage;