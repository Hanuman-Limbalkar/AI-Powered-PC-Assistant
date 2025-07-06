import React, { useEffect, useState } from 'react';

const CircularDisplay: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="relative w-[500px] h-[500px] transform-3d rotate-x-45">
      {/* Background Circle */}
      <div className={`absolute inset-0 rounded-full bg-gradient-radial from-cyan-900/20 via-blue-900/10 to-transparent transform-3d -translate-z-8 ${
        isFullscreen ? 'animate-spin-very-slow' : ''
      }`} />
      
      {/* Outer Ring with Segments */}
      <div className={`absolute inset-0 rounded-full ${
        isFullscreen ? 'animate-spin-slower' : 'animate-spin-slow'
      }`}>
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-full"
            style={{
              transform: `rotate(${i * 6}deg)`,
            }}
          >
            <div className="absolute top-0 left-1/2 h-4 w-[2px] bg-cyan-400/30 shadow-neon transform -translate-x-1/2" 
                 style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
          </div>
        ))}
        <div className="absolute inset-0 border-4 border-cyan-400/30 rounded-full shadow-neon" />
      </div>

      {/* Center Core with Enlarged Image */}
      <div className="absolute inset-[10%] rounded-full bg-gradient-radial from-cyan-500/20 via-cyan-400/10 to-transparent border-2 border-cyan-400/50 flex items-center justify-center shadow-neon transform-3d translate-z-8">
        <img src="../back.gif" alt="Center" className="w-80 h-80 rounded-full object-cover shadow-lg" />
      </div>
    </div>
  );
};

export default CircularDisplay;
