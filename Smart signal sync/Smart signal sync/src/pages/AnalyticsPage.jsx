import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowLeft, Activity, BarChart3 } from 'lucide-react';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/analytics-data");
      const data = await res.json();
      setChartData(data);
    } catch (err) {
      console.log("API Error");
    }
  };

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 3000);
    return () => clearInterval(interval);
  }, []);

  const peak =
    chartData.length > 0
      ? Math.max(...chartData.map((d) => d.overall))
      : 0;

  const current =
    chartData.length > 0
      ? chartData[chartData.length - 1].overall
      : 0;

  return (
    <div className="h-screen bg-[#07122c] text-white p-6 flex flex-col overflow-hidden">

      {/* HEADER */}
      <header className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
          >
            Back
          </button>

          <div>
            <h1 className="text-4xl font-bold">Traffic Analytics</h1>
            <p className="text-gray-400 text-sm">
              Predictive Insights & Data Visualization
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="bg-[#12214d] px-5 py-3 rounded-xl">
            <p className="text-sm text-gray-400">Peak Density</p>
            <p className="text-3xl text-cyan-400 font-bold">{peak}%</p>
          </div>

          <div className="bg-[#12214d] px-5 py-3 rounded-xl">
            <p className="text-sm text-gray-400">Current Avg</p>
            <p className="text-3xl text-green-400 font-bold">{current}%</p>
          </div>
        </div>

      </header>

      {/* CHARTS */}
      <main className="grid grid-cols-2 gap-6 flex-1">

        {/* GRAPH 1 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#101f4c] rounded-3xl p-6"
        >
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
            <Activity className="text-cyan-400" size={22} />
            Density Forecast
          </h2>

          <p className="text-gray-400 mb-5 text-sm">
            Real-time traffic utilization
          </p>

          <ResponsiveContainer width="100%" height="82%">
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 20, bottom: 55 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#24335d" />

              <XAxis
                dataKey="time"
                stroke="#cbd5e1"
                tick={{ fontSize: 13 }}
                interval="preserveStartEnd"
                minTickGap={30}
                height={60}
                label={{
                  value: "Time",
                  position: "insideBottom",
                  offset: -18,
                  fill: "#ffffff",
                  fontSize: 16
                }}
              />

              <YAxis
                stroke="#cbd5e1"
                tick={{ fontSize: 13 }}
                width={60}
                label={{
                  value: "Traffic Density",
                  angle: -90,
                  position: "insideLeft",
                  offset: -5,
                  fill: "#ffffff",
                  fontSize: 16
                }}
              />

              <Tooltip />

              <Legend
                verticalAlign="bottom"
                height={35}
                wrapperStyle={{ paddingTop: "20px" }}
              />

              <Area
                type="monotone"
                dataKey="overall"
                stroke="#6d6bff"
                fill="#6d6bff"
                fillOpacity={0.45}
                strokeWidth={3}
                name="Overall Density"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* GRAPH 2 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#101f4c] rounded-3xl p-6"
        >
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
            <BarChart3 className="text-indigo-400" size={22} />
            Lane-wise Density
          </h2>

          <p className="text-gray-400 mb-5 text-sm">
            Independent lane traffic analysis
          </p>

          <ResponsiveContainer width="100%" height="82%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 20, bottom: 55 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#24335d" />

              <XAxis
                dataKey="time"
                stroke="#cbd5e1"
                tick={{ fontSize: 13 }}
                interval="preserveStartEnd"
                minTickGap={30}
                height={60}
                label={{
                  value: "Time",
                  position: "insideBottom",
                  offset: -18,
                  fill: "#ffffff",
                  fontSize: 16
                }}
              />

              <YAxis
                stroke="#cbd5e1"
                tick={{ fontSize: 13 }}
                width={60}
                label={{
                  value: "Traffic Density",
                  angle: -90,
                  position: "insideLeft",
                  offset: -5,
                  fill: "#ffffff",
                  fontSize: 16
                }}
              />

              <Tooltip />

              <Legend
                verticalAlign="bottom"
                height={35}
                wrapperStyle={{ paddingTop: "20px" }}
              />

              <Line type="monotone" dataKey="lane1" stroke="#3b82f6" strokeWidth={3} name="Lane 1" />
              <Line type="monotone" dataKey="lane2" stroke="#22c55e" strokeWidth={3} name="Lane 2" />
              <Line type="monotone" dataKey="lane3" stroke="#facc15" strokeWidth={3} name="Lane 3" />
              <Line type="monotone" dataKey="lane4" stroke="#ef4444" strokeWidth={3} name="Lane 4" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

      </main>

      {/* FOOTER */}
      <footer className="mt-4 flex justify-between text-xs text-gray-400">
        <span>© 2026 SMART SIGNAL SYNC PRO</span>

        <div className="flex gap-4">
          <span>● Live Sync</span>
          <span>● AI Predictive</span>
        </div>
      </footer>

    </div>
  );
};

export default AnalyticsPage;