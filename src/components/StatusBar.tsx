import React, { useState, useEffect } from 'react';

const StatusBar: React.FC = () => {
  const [stats, setStats] = useState({
    cpu: 0,
    memory: 0,
    network: 0,
    uptime: 0,
  });

  // Function to fetch system stats from backend
  const fetchSystemStats = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/system_status');
      const data = await response.json();
      setStats({
        cpu: data.cpu,
        memory: data.memory,
        network: data.network,
        uptime: data.uptime,
      });
    } catch (error) {
      console.error('Error fetching system stats:', error);
    }
  };

  // Fetch data every 5 seconds
  useEffect(() => {
    fetchSystemStats();
    const interval = setInterval(fetchSystemStats, 5000);
    return () => clearInterval(interval);
  }, []);

  // Convert uptime from seconds to HH:MM:SS
  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800/30 backdrop-blur-sm p-2 shadow-neon">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>System Status: Operational</span>
        </div>
        <div className="flex gap-6">
          <span className="text-glow">CPU: {stats.cpu}%</span>
          <span className="text-glow">Memory: {stats.memory} GB</span>
          <span className="text-glow">Network: {stats.network} MB</span>
          <span className="text-glow">Uptime: {formatUptime(stats.uptime)}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
