import React from 'react';

const SystemStats: React.FC = () => {
  return (
    <div className="bg-gray-800/30 rounded-lg p-6 shadow-neon backdrop-blur-sm transform-3d hover:translate-z-2 transition-transform duration-300">
      <h3 className="text-lg mb-4 border-b border-cyan-400/30 pb-2 text-glow">System Statistics</h3>
      <div className="space-y-4">
        {[
          { label: 'Processes', value: '124' },
          { label: 'Thread Count', value: '1,532' },
          { label: 'Network Connections', value: '45' },
        ].map((stat, index) => (
          <div key={index} className="flex justify-between items-center hover:translate-z-2 transition-transform duration-300">
            <span>{stat.label}</span>
            <span className="text-cyan-300 text-glow">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemStats;