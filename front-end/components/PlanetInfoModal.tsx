import { X, Users, Shield, Zap, Factory, MapPin, Crown } from 'lucide-react';

interface PlanetInfoModalProps {
  planet: any;
  onClose: () => void;
}

export function PlanetInfoModal({ planet, onClose }: PlanetInfoModalProps) {
  const isEmpire = planet.faction === 'EMPIRE';
  const factionColor = isEmpire ? 'red' : 'blue';

  return (
    <div className="absolute top-24 right-4 z-30 w-96 scanline">
      <div className={`cut-corner bg-[#0a1628]/95 border backdrop-blur-md ${
        isEmpire ? 'border-red-500/40 glow-red' : 'border-blue-500/40 glow-blue'
      }`}>
        {/* Header */}
        <div className={`border-b px-4 py-3 flex items-center justify-between ${
          isEmpire ? 'border-red-500/30 bg-red-950/20' : 'border-blue-500/30 bg-blue-950/20'
        }`}>
          <div className="flex items-center gap-2">
            <MapPin className={`w-4 h-4 ${isEmpire ? 'text-red-400' : 'text-blue-400'}`} />
            <h2 className={`font-mono text-sm uppercase tracking-widest font-bold ${
              isEmpire ? 'text-red-300' : 'text-blue-300'
            }`}>
              PLANETARY INTELLIGENCE
            </h2>
          </div>
          <button
            onClick={onClose}
            className="cut-corner-sm bg-red-500/20 border border-red-500/40 p-1 hover:bg-red-500/30 transition-colors"
          >
            <X className="w-4 h-4 text-red-400" />
          </button>
        </div>

        {/* Planet Image */}
        <div className="relative h-48 overflow-hidden border-b border-cyan-500/20">
          <img
            src={planet.image}
            alt={planet.name}
            className="w-full h-full object-cover opacity-70"
          />
          {/* Image overlay gradient */}
          <div className={`absolute inset-0 ${
            isEmpire 
              ? 'bg-gradient-to-t from-red-950/80 to-transparent' 
              : 'bg-gradient-to-t from-blue-950/80 to-transparent'
          }`} />
          
          {/* Planet name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-cyan-300 text-2xl font-bold font-mono tracking-wider drop-shadow-lg">
              {planet.name}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Affiliation Badge */}
          <div>
            <div className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-2 flex items-center gap-2">
              <Crown className="w-3 h-3" />
              FACTION CONTROL
            </div>
            <div className={`cut-corner px-4 py-3 border-2 flex items-center justify-between ${
              isEmpire 
                ? 'bg-red-950/40 border-red-500/50' 
                : 'bg-blue-950/40 border-blue-500/50'
            }`}>
              <div className="flex items-center gap-3">
                {isEmpire ? (
                  <svg width="28" height="28" viewBox="0 0 28 28" className="opacity-80">
                    <circle cx="14" cy="14" r="12" fill="none" stroke="#dc2626" strokeWidth="2" />
                    <circle cx="14" cy="14" r="6" fill="#dc2626" fillOpacity="0.5" />
                    {[...Array(8)].map((_, i) => (
                      <line
                        key={i}
                        x1="14"
                        y1="14"
                        x2={14 + 11 * Math.cos((i * Math.PI) / 4)}
                        y2={14 + 11 * Math.sin((i * Math.PI) / 4)}
                        stroke="#dc2626"
                        strokeWidth="1.5"
                      />
                    ))}
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 28 28" className="opacity-80">
                    <path
                      d="M 14,4 L 10,14 L 2,14 L 14,22 L 26,14 L 18,14 Z"
                      fill="#0096ff"
                      fillOpacity="0.5"
                      stroke="#0096ff"
                      strokeWidth="2"
                    />
                  </svg>
                )}
                <div>
                  <div className={`font-mono text-lg font-bold ${
                    isEmpire ? 'text-red-300' : 'text-blue-300'
                  }`}>
                    {planet.faction}
                  </div>
                  <div className="text-cyan-600 text-xs font-mono">
                    {isEmpire ? 'GALACTIC EMPIRE' : 'REBEL ALLIANCE'}
                  </div>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                isEmpire ? 'bg-red-500' : 'bg-blue-500'
              } animate-pulse`} />
            </div>
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="cut-corner-sm bg-[#0f1b2e]/60 border border-cyan-500/20 px-3 py-2">
              <div className="text-cyan-600 text-xs font-mono uppercase tracking-wider mb-1">
                SECTOR
              </div>
              <div className="text-cyan-300 font-mono text-sm font-bold">
                {planet.sector}
              </div>
            </div>
            <div className="cut-corner-sm bg-[#0f1b2e]/60 border border-cyan-500/20 px-3 py-2">
              <div className="text-cyan-600 text-xs font-mono uppercase tracking-wider mb-1">
                GRID REF
              </div>
              <div className="text-cyan-300 font-mono text-sm font-bold">
                {planet.grid}
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="space-y-2">
            <div className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-2">
              PLANETARY STATISTICS
            </div>
            
            <div className="cut-corner-sm bg-[#0f1b2e]/40 border border-cyan-500/20 px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 text-xs font-mono">POPULATION</span>
              </div>
              <span className="text-cyan-200 font-mono text-sm font-bold">
                {planet.population}
              </span>
            </div>

            <div className="cut-corner-sm bg-[#0f1b2e]/40 border border-cyan-500/20 px-3 py-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 text-xs font-mono">DEFENSE RATING</span>
                </div>
                <span className="text-cyan-200 font-mono text-sm font-bold">
                  {planet.defense}%
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 bg-[#0a1628] border border-cyan-500/20 cut-corner-sm overflow-hidden">
                <div
                  className={`h-full ${
                    isEmpire ? 'bg-red-500' : 'bg-blue-500'
                  } transition-all duration-300`}
                  style={{ width: `${planet.defense}%` }}
                />
              </div>
            </div>

            <div className="cut-corner-sm bg-[#0f1b2e]/40 border border-cyan-500/20 px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 text-xs font-mono">POWER OUTPUT</span>
              </div>
              <span className="text-cyan-200 font-mono text-sm font-bold">
                {planet.power} MW
              </span>
            </div>

            <div className="cut-corner-sm bg-[#0f1b2e]/40 border border-cyan-500/20 px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Factory className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 text-xs font-mono">PRODUCTION</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-200 font-mono text-sm font-bold">
                  {planet.production}
                </span>
                <div className={`w-2 h-2 rounded-full ${
                  planet.production === 'MAX' ? 'bg-green-500' :
                  planet.production === 'HIGH' ? 'bg-yellow-500' :
                  planet.production === 'MEDIUM' ? 'bg-orange-500' :
                  'bg-red-500'
                } animate-pulse`} />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button className={`cut-corner px-4 py-3 border transition-colors ${
              isEmpire
                ? 'bg-red-500/20 border-red-500/40 hover:bg-red-500/30 text-red-300'
                : 'bg-blue-500/20 border-blue-500/40 hover:bg-blue-500/30 text-blue-300'
            }`}>
              <span className="font-mono text-xs uppercase tracking-wider font-bold">
                DEPLOY FLEET
              </span>
            </button>
            <button className="cut-corner bg-cyan-500/20 border border-cyan-500/40 px-4 py-3 hover:bg-cyan-500/30 transition-colors">
              <span className="text-cyan-300 font-mono text-xs uppercase tracking-wider font-bold">
                SCAN SYSTEM
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
