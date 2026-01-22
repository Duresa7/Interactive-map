import { Info, X } from 'lucide-react';
import { useState } from 'react';

export function TerritoryLegend() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="absolute bottom-4 left-4 z-20">
      {isExpanded ? (
        <div className="cut-corner bg-[#0a1628]/90 border border-cyan-500/40 backdrop-blur-md p-4 glow-cyan">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-cyan-500/30">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <h3 className="text-cyan-400 text-xs font-mono uppercase tracking-wider font-bold">
                TACTICAL LEGEND
              </h3>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="cut-corner-sm bg-cyan-500/20 border border-cyan-500/40 p-1 hover:bg-cyan-500/30 transition-colors"
            >
              <X className="w-3 h-3 text-cyan-400" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Territories Section */}
            <div>
              <div className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-2 opacity-70">
                Territories
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="cut-corner-sm w-8 h-6 border-2 border-amber-500 bg-amber-500/30" style={{ boxShadow: '0 0 8px rgba(251, 191, 36, 0.4)' }} />
                  <div>
                    <div className="text-amber-400 text-xs font-mono font-bold">CORE WORLDS</div>
                    <div className="text-amber-600 text-xs font-mono opacity-70">Galactic Center</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="cut-corner-sm w-8 h-6 border-2 border-red-600 bg-red-600/30 glow-red" />
                  <div>
                    <div className="text-red-400 text-xs font-mono font-bold">EMPIRE</div>
                    <div className="text-red-600 text-xs font-mono opacity-70">Imperial Control</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="cut-corner-sm w-8 h-6 border-2 border-blue-500 bg-blue-500/30 glow-blue" />
                  <div>
                    <div className="text-blue-400 text-xs font-mono font-bold">REPUBLIC</div>
                    <div className="text-blue-600 text-xs font-mono opacity-70">Rebel Alliance</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="cut-corner-sm w-8 h-6 border-2 border-fuchsia-500 bg-fuchsia-500/20" style={{ boxShadow: '0 0 8px rgba(232, 121, 249, 0.3)' }} />
                  <div>
                    <div className="text-fuchsia-400 text-xs font-mono font-bold">NEUTRAL</div>
                    <div className="text-fuchsia-600 text-xs font-mono opacity-70">Independent Space</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fleet Units Section */}
            <div className="pt-2 border-t border-cyan-500/20">
              <div className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-2 opacity-70">
                Fleet Units
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <svg width="32" height="24" viewBox="0 0 32 24">
                    <polygon points="16,4 8,20 24,20" fill="#6b7280" stroke="#dc2626" strokeWidth="2" />
                    <rect x="13" y="8" width="6" height="8" fill="#dc2626" />
                  </svg>
                  <div>
                    <div className="text-red-400 text-xs font-mono font-bold">IMPERIAL FLEET</div>
                    <div className="text-red-600 text-xs font-mono opacity-70">Star Destroyers</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <svg width="32" height="24" viewBox="0 0 32 24">
                    <polygon points="16,4 10,18 22,18" fill="#d4a574" stroke="#f97316" strokeWidth="2" />
                    <circle cx="16" cy="10" r="2.5" fill="#f97316" />
                  </svg>
                  <div>
                    <div className="text-orange-400 text-xs font-mono font-bold">REBEL FLEET</div>
                    <div className="text-orange-600 text-xs font-mono opacity-70">Alliance Fighters</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Systems Section */}
            <div className="pt-2 border-t border-cyan-500/20">
              <div className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-2 opacity-70">
                Systems
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" fill="#00ffff" fillOpacity="0.4" stroke="#00ffff" strokeWidth="2" />
                    <circle cx="12" cy="12" r="8" fill="none" stroke="#00ffff" strokeWidth="1" />
                  </svg>
                  <div>
                    <div className="text-cyan-400 text-xs font-mono font-bold">ACTIVE SYSTEM</div>
                    <div className="text-cyan-600 text-xs font-mono opacity-70">Populated Planet</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" fill="#450a0a" stroke="#dc2626" strokeWidth="1.5" />
                    <line x1="8" y1="8" x2="16" y2="16" stroke="#dc2626" strokeWidth="2" />
                    <line x1="8" y1="16" x2="16" y2="8" stroke="#dc2626" strokeWidth="2" />
                  </svg>
                  <div>
                    <div className="text-red-400 text-xs font-mono font-bold">DESTROYED</div>
                    <div className="text-red-600 text-xs font-mono opacity-70">Debris Field</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="pt-2 border-t border-cyan-500/20 flex items-center justify-between">
              <div className="text-cyan-600 text-xs font-mono opacity-70">
                LAST UPDATED: 2.3s ago
              </div>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="cut-corner bg-[#0a1628]/90 border border-cyan-500/40 backdrop-blur-md p-3 hover:bg-[#0a1628] transition-colors glow-cyan"
        >
          <Info className="w-5 h-5 text-cyan-400" />
        </button>
      )}
    </div>
  );
}