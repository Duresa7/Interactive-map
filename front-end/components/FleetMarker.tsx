interface FleetMarkerProps {
  x: number;
  y: number;
  rotation: number;
  faction: 'EMPIRE' | 'REPUBLIC';
  size: number;
  id: string;
}

export function FleetMarker({ x, y, rotation, faction, size, id }: FleetMarkerProps) {
  const isEmpire = faction === 'EMPIRE';
  
  // Imperial: grey/red scheme, Rebel: tan/orange scheme
  const primaryColor = isEmpire ? '#6b7280' : '#d4a574';
  const accentColor = isEmpire ? '#dc2626' : '#f97316';
  const glowFilter = isEmpire ? 'url(#glow-red)' : 'url(#glow-orange)';

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Ship body - different shapes for factions */}
      <g transform={`rotate(${rotation})`}>
        {isEmpire ? (
          // Imperial Star Destroyer shape - angular, intimidating
          <>
            {/* Main hull */}
            <polygon
              points="0,-18 -15,15 15,15"
              fill={primaryColor}
              fillOpacity="0.8"
              stroke={accentColor}
              strokeWidth="2.5"
              filter={glowFilter}
              className="holographic"
            />
            {/* Bridge tower */}
            <rect
              x="-3"
              y="-8"
              width="6"
              height="10"
              fill={accentColor}
              fillOpacity="0.9"
              stroke={accentColor}
              strokeWidth="1"
            />
            {/* Wing details */}
            <line x1="-15" y1="15" x2="-20" y2="18" stroke={accentColor} strokeWidth="2" strokeOpacity="0.7" />
            <line x1="15" y1="15" x2="20" y2="18" stroke={accentColor} strokeWidth="2" strokeOpacity="0.7" />
          </>
        ) : (
          // Rebel Alliance ships - more organic, hopeful
          <>
            {/* Main hull - sleeker design */}
            <polygon
              points="0,-16 -10,12 10,12"
              fill={primaryColor}
              fillOpacity="0.8"
              stroke={accentColor}
              strokeWidth="2.5"
              filter={glowFilter}
              className="holographic"
            />
            {/* Cockpit */}
            <circle
              cx="0"
              cy="-6"
              r="3"
              fill={accentColor}
              fillOpacity="0.9"
              stroke={accentColor}
              strokeWidth="1"
            />
            {/* Engine glow */}
            <circle cx="-7" cy="12" r="2" fill={accentColor} fillOpacity="0.6" />
            <circle cx="7" cy="12" r="2" fill={accentColor} fillOpacity="0.6" />
          </>
        )}

        {/* Direction arrow */}
        <line
          x1="0"
          y1="18"
          x2="0"
          y2="45"
          stroke={accentColor}
          strokeWidth="2"
          strokeOpacity="0.7"
          markerEnd={isEmpire ? 'url(#arrow-red)' : 'url(#arrow-orange)'}
          strokeDasharray="4,4"
          className="animate-pulse"
        />
      </g>

      {/* Fleet size badge */}
      <g transform="translate(18, -18)">
        {/* Badge background - cut corner style */}
        <polygon
          points="0,0 20,0 22,2 22,14 20,16 0,16 0,0"
          fill={isEmpire ? '#450a0a' : '#7c2d12'}
          fillOpacity="0.95"
          stroke={accentColor}
          strokeWidth="1.5"
          filter={glowFilter}
        />
        {/* Fleet size number */}
        <text
          x="11"
          y="11"
          textAnchor="middle"
          fill={accentColor}
          fontSize="10"
          fontFamily="monospace"
          fontWeight="bold"
        >
          {size}
        </text>
      </g>

      {/* Faction emblem indicator */}
      <g transform="translate(0, 25)">
        {isEmpire ? (
          // Imperial cog symbol
          <circle
            cx="0"
            cy="0"
            r="8"
            fill="none"
            stroke={accentColor}
            strokeWidth="1"
            strokeOpacity="0.5"
            strokeDasharray="2,2"
          />
        ) : (
          // Rebel starbird hint
          <path
            d="M -6,0 Q 0,-6 6,0 Q 0,6 -6,0"
            fill="none"
            stroke={accentColor}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        )}
      </g>
    </g>
  );
}
