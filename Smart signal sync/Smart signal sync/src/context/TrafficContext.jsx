import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const TrafficContext = createContext();

export const TrafficProvider = ({ children }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [densities, setDensities] = useState({
    top: 45,
    bottom: 30,
    left: 20,
    right: 55,
    overall: 37
  });
  const [history, setHistory] = useState([]);
  
  const timerRef = useRef(null);
  const peakFactorRef = useRef(1); // To simulate peak hours factor
  const timeCounterRef = useRef(0);

  const generateNewData = () => {
    // Gradually change peak factor to simulate peak/off-peak (sin wave)
    timeCounterRef.current += 0.1;
    peakFactorRef.current = 1 + (Math.sin(timeCounterRef.current) * 0.5); // fluctuates between 0.5 and 1.5

    setDensities(prev => {
      const getNewVal = (old, laneBias = 1) => {
        // Smooth variation: random walk within 0-100, biased by peak factor
        const change = (Math.random() - 0.5) * 15;
        const baseVal = old + change;
        const biasedVal = baseVal * (peakFactorRef.current * laneBias);
        return Math.min(100, Math.max(0, Math.round(biasedVal)));
      };

      // Each lane has a slightly different bias to keep it interesting
      const newLanes = {
        top: getNewVal(prev.top, 0.95),
        bottom: getNewVal(prev.bottom, 1.05),
        left: getNewVal(prev.left, 0.9),
        right: getNewVal(prev.right, 1.1),
      };

      const overall = Math.round((newLanes.top + newLanes.bottom + newLanes.left + newLanes.right) / 4);
      
      const newPoint = {
        name: new Date().toLocaleTimeString([], { second: '2-digit' }),
        fullTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        ...newLanes,
        overall
      };

      setHistory(prevHist => {
        const updated = [...prevHist, newPoint];
        return updated.slice(-30); // Maintain last 30 points
      });

      return { ...newLanes, overall };
    });
  };

  useEffect(() => {
    if (isSimulating) {
      // Initialize some history if empty
      if (history.length === 0) {
        setHistory([{
          name: new Date().toLocaleTimeString([], { second: '2-digit' }),
          fullTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          ...densities
        }]);
      }
      timerRef.current = setInterval(generateNewData, 1500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSimulating]);

  return (
    <TrafficContext.Provider value={{ isSimulating, setIsSimulating, densities, history }}>
      {children}
    </TrafficContext.Provider>
  );
};

export const useTraffic = () => {
  const context = useContext(TrafficContext);
  if (!context) {
    throw new Error('useTraffic must be used within a TrafficProvider');
  }
  return context;
};
