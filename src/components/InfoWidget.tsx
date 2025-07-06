import React, { useEffect, useState } from "react";

const InfoWidget = ({ title, items }) => {
  const [stats, setStats] = useState(items);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/system-stats"); // Backend API
        const data = await response.json();
        setStats([
          { icon: stats[0].icon, label: "CPU Usage", value: `${data.cpuUsage}%` },
          { icon: stats[1].icon, label: "Memory", value: `${data.memory}GB` },
          { icon: stats[2].icon, label: "Network", value: `${data.network}MB/s` },
        ]);
      } catch (error) {
        console.error("Error fetching system stats:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 3000); // Auto-refresh every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="space-y-2">
        {stats.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.icon}
            <span>{item.label}: {item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoWidget;
