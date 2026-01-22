import { X, Users, Shield, Zap, Factory } from 'lucide-react';

interface DataIntelPanelProps {
  planet: any;
  onClose: () => void;
}

export function DataIntelPanel({ planet, onClose }: DataIntelPanelProps) {
  return (
    <div className="absolute top-24 right-4 z-30 w-80 scanline">
      <div className="cut-corner bg-[#0a1628]/90 border border-blue-500/40 backdrop-blur-md glow-blue">
        {/* Header */}
        <div className="border-b border-blue-500/30 px-4 py-3 flex items-center justify-between">
          <h2 className="text-blue-300 font-mono text-sm uppercase tracking-widest font-bold">
            DATA INTEL
          </h2>
          <button
            onClick={onClose}
            className="cut-corner-sm bg-red-500/20 border border-red-500/40 p-1 hover:bg-red-500/30 transition-colors"
          >
            <X className="w-4 h-4 text-red-400" />
          </button>
        </div>

        {/* Planet Info */}
        <div className="p-4 space-y-4">
          {/* Planet Name */}
          <div>
            <div className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-1">
              SYSTEM NAME
            </div>
            <div className="text-cyan-300 text-lg font-bold font-mono">
              {planet.name}
            </div>
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-1">
                SECTOR
              </div>
              <div className="text-cyan-300 font-mono text-sm">
                {planet.sector}
              </div>
            </div>
            <div>
              <div className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-1">
                GRID
              </div>
              <div className="text-cyan-300 font-mono text-sm">
                {planet.grid}
              </div>
            </div>
          </div>

          {/* Faction */}
          <div>
            <div className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-1">
              FACTION CONTROL
            </div>
            <div className={`cut-corner-sm px-3 py-2 border ${
              planet.faction === 'EMPIRE' 
                ? 'bg-red-500/20 border-red-500/40 text-red-300' 
                : 'bg-blue-500/20 border-blue-500/40 text-blue-300'
            }`}>
              <span className="font-mono text-sm font-bold">{planet.faction}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-2">
            <div className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-2">
              STATISTICS
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300 text-xs font-mono">POPULATION</span>
              </div>
              <span className="text-cyan-300 font-mono text-sm font-bold">
                {planet.population}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300 text-xs font-mono">DEFENSE</span>
              </div>
              <span className="text-cyan-300 font-mono text-sm font-bold">
                {planet.defense}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300 text-xs font-mono">POWER OUTPUT</span>
              </div>
              <span className="text-cyan-300 font-mono text-sm font-bold">
                {planet.power} MW
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Factory className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300 text-xs font-mono">PRODUCTION</span>
              </div>
              <span className="text-cyan-300 font-mono text-sm font-bold">
                {planet.production}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button className="cut-corner w-full bg-cyan-500/20 border border-cyan-500/40 px-4 py-3 hover:bg-cyan-500/30 transition-colors glow-cyan">
            <span className="text-cyan-300 font-mono text-sm uppercase tracking-wider font-bold">
              DEPLOY FORCES
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
