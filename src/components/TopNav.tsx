import { Search, Crosshair } from 'lucide-react';

export function TopNav() {
  return (
    <div className="absolute top-4 left-4 right-4 z-40 flex items-center gap-4">
      {/* Title */}
      <div className="cut-corner bg-[#0a1628]/80 border border-cyan-500/30 backdrop-blur-sm px-6 py-3 glow-cyan">
        <h1 className="text-cyan-400 text-lg font-bold uppercase tracking-widest font-mono">
          TACTICAL COMMAND
        </h1>
      </div>

      {/* Search */}
      <div className="cut-corner bg-[#0a1628]/80 border border-cyan-500/30 backdrop-blur-sm flex items-center px-4 py-3 flex-1 max-w-md">
        <Search className="w-5 h-5 text-cyan-500 mr-3" />
        <input
          type="text"
          placeholder="SEARCH SYSTEMS..."
          className="bg-transparent text-cyan-300 placeholder:text-cyan-700 font-mono text-sm uppercase tracking-wide outline-none flex-1"
        />
      </div>

      {/* Coordinates Display */}
      <div className="cut-corner bg-[#0a1628]/80 border border-blue-500/30 backdrop-blur-sm px-6 py-3 flex items-center gap-3 glow-blue">
        <Crosshair className="w-5 h-5 text-blue-400" />
        <div className="font-mono text-sm">
          <span className="text-blue-500 mr-2">X:</span>
          <span className="text-blue-300">-42.8736</span>
          <span className="text-blue-500 ml-4 mr-2">Y:</span>
          <span className="text-blue-300">18.5621</span>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="cut-corner bg-[#0a1628]/80 border border-cyan-500/30 backdrop-blur-sm px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 text-xs font-mono uppercase tracking-wider">
            ONLINE
          </span>
        </div>
      </div>
    </div>
  );
}
