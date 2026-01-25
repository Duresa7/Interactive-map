import { X, Users, Shield, Zap, Factory, MapPin, Crown } from 'lucide-react';

interface PlanetInfoModalProps {
  planet: any;
  onClose: () => void;
}

export function PlanetInfoModal({ planet, onClose }: PlanetInfoModalProps) {
  const getFactionInfo = () => {
    switch (planet.faction) {
      case 'SITH':
        return { color: 'red', name: 'SITH EMPIRE', subtitle: 'Dark Side Dominion' };
      case 'REPUBLIC':
        return { color: 'blue', name: 'GALACTIC REPUBLIC', subtitle: 'Jedi Protected' };
      case 'MANDALORE':
        return { color: 'orange', name: 'MANDALORE', subtitle: 'Warrior Clans' };
      case 'HUTT':
        return { color: 'green', name: 'HUTT CARTEL', subtitle: 'Criminal Empire' };
      default:
        return { color: 'cyan', name: 'NEUTRAL', subtitle: 'Independent System' };
    }
  };

  const faction = getFactionInfo();
  const isSith = planet.faction === 'SITH';
  const isRepublic = planet.faction === 'REPUBLIC';

  const getFactionBorderClass = () => {
    switch (faction.color) {
      case 'red': return 'border-red-500/40 glow-red';
      case 'blue': return 'border-blue-500/40 glow-blue';
      case 'orange': return 'border-orange-500/40';
      case 'green': return 'border-green-500/40';
      default: return 'border-cyan-500/40 glow-cyan';
    }
  };

  return (
    <div className="absolute top-24 right-4 z-30 w-96 scanline">
      <div className={`cut-corner bg-[#0a1628]/95 border backdrop-blur-md ${getFactionBorderClass()}`}>
        {/* Header */}
        <div className={`border-b px-4 py-3 flex items-center justify-between ${
          isSith ? 'border-red-500/30 bg-red-950/20' : 
          isRepublic ? 'border-blue-500/30 bg-blue-950/20' :
          'border-cyan-500/30 bg-cyan-950/20'
        }`}>
          <div className="flex items-center gap-2">
            <MapPin className={`w-4 h-4 ${
              isSith ? 'text-red-400' : isRepublic ? 'text-blue-400' : 'text-cyan-400'
            }`} />
            <h2 className={`font-mono text-sm uppercase tracking-widest font-bold ${
              isSith ? 'text-red-300' : isRepublic ? 'text-blue-300' : 'text-cyan-300'
            }`} style={{ fontFamily: "'Orbitron', monospace" }}>
              PLANETARY INTEL
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
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400';
            }}
          />
          {/* Image overlay gradient */}
          <div className={`absolute inset-0 ${
            isSith ? 'bg-gradient-to-t from-red-950/80 to-transparent' : 
            isRepublic ? 'bg-gradient-to-t from-blue-950/80 to-transparent' :
            'bg-gradient-to-t from-[#0a1628]/80 to-transparent'
          }`} />
          
          {/* Planet name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-cyan-300 text-2xl font-bold tracking-wider drop-shadow-lg" style={{ fontFamily: "'Orbitron', monospace" }}>
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
              isSith ? 'bg-red-950/40 border-red-500/50' : 
              isRepublic ? 'bg-blue-950/40 border-blue-500/50' :
              planet.faction === 'MANDALORE' ? 'bg-orange-950/40 border-orange-500/50' :
              planet.faction === 'HUTT' ? 'bg-green-950/40 border-green-500/50' :
              'bg-cyan-950/40 border-cyan-500/50'
            }`}>
              <div className="flex items-center gap-3">
                {isSith ? (
                  <svg width="28" height="28" viewBox="0 0 28 28" className="opacity-80">
                    <circle cx="14" cy="14" r="10" fill="none" stroke="#dc2626" strokeWidth="2" />
                    <line x1="7" y1="7" x2="21" y2="21" stroke="#dc2626" strokeWidth="2" />
                    <line x1="21" y1="7" x2="7" y2="21" stroke="#dc2626" strokeWidth="2" />
                  </svg>
                ) : isRepublic ? (
                  <svg width="28" height="28" viewBox="0 0 28 28" className="opacity-80">
                    <circle cx="14" cy="14" r="10" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                    <circle cx="14" cy="14" r="4" fill="#0ea5e9" fillOpacity="0.5" />
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 28 28" className="opacity-80">
                    <circle cx="14" cy="14" r="10" fill="none" stroke="#00ffff" strokeWidth="2" strokeDasharray="4,2" />
                  </svg>
                )}
                <div>
                  <div className={`font-mono text-lg font-bold ${
                    isSith ? 'text-red-300' : 
                    isRepublic ? 'text-blue-300' :
                    planet.faction === 'MANDALORE' ? 'text-orange-300' :
                    planet.faction === 'HUTT' ? 'text-green-300' :
                    'text-cyan-300'
                  }`} style={{ fontFamily: "'Orbitron', monospace" }}>
                    {planet.faction}
                  </div>
                  <div className="text-cyan-600 text-xs font-mono">
                    {faction.subtitle}
                  </div>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                isSith ? 'bg-red-500' : 
                isRepublic ? 'bg-blue-500' :
                planet.faction === 'MANDALORE' ? 'bg-orange-500' :
                planet.faction === 'HUTT' ? 'bg-green-500' :
                'bg-cyan-500'
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
                    isSith ? 'bg-red-500' : 
                    isRepublic ? 'bg-blue-500' :
                    'bg-cyan-500'
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
                  planet.production === 'NONE' ? 'bg-gray-500' :
                  'bg-red-500'
                } animate-pulse`} />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button className={`cut-corner px-4 py-3 border transition-colors ${
              isSith
                ? 'bg-red-500/20 border-red-500/40 hover:bg-red-500/30 text-red-300'
                : isRepublic
                ? 'bg-blue-500/20 border-blue-500/40 hover:bg-blue-500/30 text-blue-300'
                : 'bg-cyan-500/20 border-cyan-500/40 hover:bg-cyan-500/30 text-cyan-300'
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
