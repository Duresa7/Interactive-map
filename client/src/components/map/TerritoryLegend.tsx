import { Info, X, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export function TerritoryLegend() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-6 right-6 z-20">
      {isExpanded ? (
        <div className="cut-corner bg-[#0a1628]/90 border border-cyan-500/40 backdrop-blur-md p-6 glow-cyan" style={{ maxHeight: '80vh', overflowY: 'auto', minWidth: '320px' }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-cyan-500/30">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-cyan-400" />
              <h3 className="text-cyan-400 text-sm font-mono uppercase tracking-wider font-bold" style={{ fontFamily: "'Orbitron', monospace" }}>
                OLD REPUBLIC ERA
              </h3>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="cut-corner-sm bg-cyan-500/20 border border-cyan-500/40 p-1.5 hover:bg-cyan-500/30 transition-colors"
            >
              <X className="w-4 h-4 text-cyan-400" />
            </button>
          </div>

          <div className="space-y-5">
            {/* Era Info */}
            <div className="text-cyan-600 text-sm font-mono mb-3">
              <span className="text-cyan-400">CIRCA:</span> 4000 BBY
            </div>

            {/* Territories Section */}
            <div>
              <div className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-3 opacity-70">
                Faction Territories
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="cut-corner-sm w-10 h-7 border-2 border-red-600 bg-red-600/30 glow-red" />
                  <div>
                    <div className="text-red-400 text-sm font-mono font-bold">SITH EMPIRE</div>
                    <div className="text-red-600 text-xs font-mono opacity-70">Korriban Dynasty</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="cut-corner-sm w-10 h-7 border-2 border-blue-500 bg-blue-500/30 glow-blue" />
                  <div>
                    <div className="text-blue-400 text-sm font-mono font-bold">GALACTIC REPUBLIC</div>
                    <div className="text-blue-600 text-xs font-mono opacity-70">Jedi Protected</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="cut-corner-sm w-10 h-7 border-2 border-orange-500 bg-orange-500/30" style={{ boxShadow: '0 0 8px rgba(249, 115, 22, 0.4)' }} />
                  <div>
                    <div className="text-orange-400 text-sm font-mono font-bold">MANDALORE</div>
                    <div className="text-orange-600 text-xs font-mono opacity-70">Mandalorian Clans</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="cut-corner-sm w-10 h-7 border-2 border-green-500 bg-green-500/20" style={{ boxShadow: '0 0 8px rgba(132, 204, 22, 0.3)' }} />
                  <div>
                    <div className="text-green-400 text-sm font-mono font-bold">HUTT SPACE</div>
                    <div className="text-green-600 text-xs font-mono opacity-70">Hutt Cartel</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="cut-corner-sm w-10 h-7 border-2 border-cyan-500 bg-cyan-500/20" style={{ boxShadow: '0 0 8px rgba(0, 255, 255, 0.3)' }} />
                  <div>
                    <div className="text-cyan-400 text-sm font-mono font-bold">NEUTRAL</div>
                    <div className="text-cyan-600 text-xs font-mono opacity-70">Independent Systems</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fleet Units Section */}
            <div className="pt-3 border-t border-cyan-500/20">
              <div className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-3 opacity-70">
                Fleet Units
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <svg width="40" height="30" viewBox="0 0 32 24">
                    <polygon points="16,2 4,14 6,22 16,18 26,22 28,14" fill="#4a0000" stroke="#dc2626" strokeWidth="2" />
                  </svg>
                  <div>
                    <div className="text-red-400 text-sm font-mono font-bold">SITH FLEET</div>
                    <div className="text-red-600 text-xs font-mono opacity-70">Harrower Dreadnoughts</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <svg width="40" height="30" viewBox="0 0 32 24">
                    <polygon points="16,4 10,16 12,22 20,22 22,16" fill="#0c4a6e" stroke="#0ea5e9" strokeWidth="2" />
                    <rect x="8" y="2" width="16" height="5" rx="1" fill="#0ea5e9" fillOpacity="0.7" />
                  </svg>
                  <div>
                    <div className="text-blue-400 text-sm font-mono font-bold">REPUBLIC FLEET</div>
                    <div className="text-blue-600 text-xs font-mono opacity-70">Hammerhead Cruisers</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <svg width="40" height="30" viewBox="0 0 32 24">
                    <polygon points="16,4 6,12 8,20 16,16 24,20 26,12" fill="#7c2d12" stroke="#f97316" strokeWidth="2" />
                  </svg>
                  <div>
                    <div className="text-orange-400 text-sm font-mono font-bold">MANDALORIAN FLEET</div>
                    <div className="text-orange-600 text-xs font-mono opacity-70">Kandosii Battleships</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Systems Section */}
            <div className="pt-3 border-t border-cyan-500/20">
              <div className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-3 opacity-70">
                Systems
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <svg width="30" height="30" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" fill="#00ffff" fillOpacity="0.4" stroke="#00ffff" strokeWidth="2" />
                    <circle cx="12" cy="12" r="8" fill="none" stroke="#00ffff" strokeWidth="1" />
                  </svg>
                  <div>
                    <div className="text-cyan-400 text-sm font-mono font-bold">ACTIVE SYSTEM</div>
                    <div className="text-cyan-600 text-xs font-mono opacity-70">Drag to reposition</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <svg width="30" height="30" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" fill="#450a0a" stroke="#dc2626" strokeWidth="1.5" />
                    <line x1="8" y1="8" x2="16" y2="16" stroke="#dc2626" strokeWidth="2" />
                    <line x1="8" y1="16" x2="16" y2="8" stroke="#dc2626" strokeWidth="2" />
                  </svg>
                  <div>
                    <div className="text-red-400 text-sm font-mono font-bold">DESTROYED</div>
                    <div className="text-red-600 text-xs font-mono opacity-70">Debris Field</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls Section */}
            <div className="pt-3 border-t border-cyan-500/20">
              <div className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-3 opacity-70">
                Controls
              </div>
              <div className="space-y-2 text-cyan-600 text-xs font-mono leading-relaxed">
                <div><span className="text-cyan-400 font-bold">SCROLL</span> - Zoom in/out</div>
                <div><span className="text-cyan-400 font-bold">DRAG</span> - Pan map</div>
                <div><span className="text-cyan-400 font-bold">CLICK PLANET</span> - View info</div>
                <div><span className="text-cyan-400 font-bold">DRAG PLANET</span> - Reposition</div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="pt-3 border-t border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-600 text-xs font-mono opacity-70">
                <Clock className="w-4 h-4" />
                {currentTime}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-600 text-xs font-mono opacity-70">LIVE</span>
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="cut-corner bg-[#0a1628]/90 border border-cyan-500/40 backdrop-blur-md p-4 hover:bg-[#0a1628] transition-colors glow-cyan"
        >
          <Info className="w-6 h-6 text-cyan-400" />
        </button>
      )}
    </div>
  );
}