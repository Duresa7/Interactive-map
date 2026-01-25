import { Search, Crosshair } from 'lucide-react';

export function TopNav() {
  return (
    <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between gap-4 pointer-events-none">
      {/* Title */}
      <div className="cut-corner bg-[#0a1628]/80 border border-cyan-500/30 backdrop-blur-sm px-6 py-3 glow-cyan pointer-events-auto shrink-0">
        <h1 className="text-cyan-400 text-lg font-bold uppercase tracking-widest font-mono hidden md:block">
          TACTICAL COMMAND
        </h1>
        <h1 className="text-cyan-400 text-lg font-bold uppercase tracking-widest font-mono md:hidden">
          CMD
        </h1>
      </div>

      {/* Search - Flexible but constrained */}
      <div className="cut-corner bg-[#0a1628]/80 border border-cyan-500/30 backdrop-blur-sm flex items-center px-4 py-3 flex-1 max-w-md pointer-events-auto min-w-0 mx-4">
        <Search className="w-5 h-5 text-cyan-500 mr-3 shrink-0" />
        <input
          type="text"
          placeholder="SEARCH SYSTEMS..."
          className="bg-transparent text-cyan-300 placeholder:text-cyan-700 font-mono text-sm uppercase tracking-wide outline-none flex-1 min-w-0"
        />
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-4 shrink-0 pointer-events-auto">
        {/* Coordinates Display */}
        <div className="cut-corner bg-[#0a1628]/80 border border-blue-500/30 backdrop-blur-sm px-6 py-3 flex items-center gap-3 glow-blue">
          <Crosshair className="w-5 h-5 text-blue-400 shrink-0" />
          <div className="font-mono text-sm hidden lg:block">
            <span className="text-blue-500 mr-2">X:</span>
            <span className="text-blue-300">-42.8736</span>
            <span className="text-blue-500 ml-4 mr-2">Y:</span>
            <span className="text-blue-300">18.5621</span>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="cut-corner bg-[#0a1628]/80 border border-cyan-500/30 backdrop-blur-sm px-4 py-3 hidden sm:block">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-xs font-mono uppercase tracking-wider">
              ONLINE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
