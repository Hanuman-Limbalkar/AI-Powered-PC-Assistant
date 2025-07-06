import React, { useEffect, useState } from "react";
import { Activity, Cloud, Cpu, Download, Globe, Power, Thermometer, Wifi } from "lucide-react";
import CircularDisplay from "./components/CircularDisplay";
import InfoWidget from "./components/InfoWidget";
import StatusBar from "./components/StatusBar";
import SystemStats from "./components/SystemStats";
import VoiceAssistant from "./components/VoiceAssistant";
import axios from "axios";

function App() {
  const [systemStats, setSystemStats] = useState({
    cpu: "Loading...",
    memory: "Loading...",
    network: "Loading...",
    uptime: "Loading...",
  });

  const [environment, setEnvironment] = useState({
    temperature: "Loading...",
    humidity: "Loading...",
    power_draw: "Loading...",
  });

  // Fetch System Stats (Updates Every 1 Second)
  useEffect(() => {
    const fetchSystemStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/system_status");
        setSystemStats({
          cpu: `${response.data.cpu}%`,
          memory: `${response.data.memory} GB`,
          network: `${response.data.network} MB`,
          uptime: new Date(response.data.uptime * 1000).toLocaleTimeString(),
        });
      } catch (error) {
        console.error("Error fetching system data:", error);
      }
    };

    fetchSystemStats();
    const interval = setInterval(fetchSystemStats, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Environment Stats (Updates Every 5 Seconds)
  useEffect(() => {
    const fetchEnvironment = async () => {
      try {
        const response = await axios.get("http://localhost:5000/environment_status");
        setEnvironment({
          temperature: `${response.data.temperature}°C`,
          humidity: `${response.data.humidity}%`,
          power_draw: `${response.data.power_draw} W`,
        });
      } catch (error) {
        console.error("Error fetching environment data:", error);
      }
    };

    fetchEnvironment();
    const interval = setInterval(fetchEnvironment, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-4 font-mono">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8 bg-gray-800/30 p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-4">
          <Power className="w-6 h-6 animate-pulse" />
          <span className="text-2xl text-glow">4.5 G</span>
        </div>
        <div className="flex items-center gap-4">
          <Clock />
          <SystemStatus />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Sidebar */}
        <div className="col-span-3 space-y-8">
          <InfoWidget
            title="System Resources"
            items={[
              { icon: <Cpu className="animate-spin-slow" />, label: "CPU Usage", value: systemStats.cpu },
              { icon: <Activity className="animate-pulse" />, label: "Memory", value: systemStats.memory },
              { icon: <Download />, label: "Network", value: systemStats.network },
            ]}
          />
          <InfoWidget
            title="Connectivity"
            items={[
              { icon: <Wifi className="animate-pulse" />, label: "Signal", value: "85%" },
              { icon: <Globe className="animate-spin-slow" />, label: "Latency", value: "45ms" },
              { icon: <Cloud className="animate-bounce-slow" />, label: "Cloud Sync", value: "Active" },
            ]}
          />
          <VoiceAssistant />
        </div>

        {/* Center Display */}
        <div className="col-span-6 flex justify-center items-center">
          <CircularDisplay />
        </div>

        {/* Right Sidebar */}
        <div className="col-span-3 space-y-8">
          <InfoWidget
            title="Environment"
            items={[
              { icon: <Thermometer className="animate-pulse" />, label: "Temperature", value: environment.temperature },
              { icon: <Activity />, label: "Humidity", value: environment.humidity },
              { icon: <Power className="animate-pulse" />, label: "Power Draw", value: environment.power_draw },
            ]}
          />
          <SystemStats />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <StatusBar />
    </div>
  );
}

// Clock Component (Real-Time)
function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return <div className="text-xl">{time.toLocaleTimeString()}</div>;
}

// System Status Indicator
function SystemStatus() {
  return (
    <div className="flex items-center gap-2 bg-cyan-900/30 px-3 py-1 rounded-full shadow-lg">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      <span className="text-sm">System Online</span>
    </div>
  );
}

export default App;
