interface FleetMarkerProps {
  x: number;
  y: number;
  rotation: number;
  faction: string;
  size: number;
  id: string;
}

export function FleetMarker({ x, y, rotation, faction, size }: FleetMarkerProps) {
  // Faction color schemes for Old Republic Era
  const getFactionColors = () => {
    switch (faction) {
      case 'SITH':
        return { primary: '#4a0000', accent: '#dc2626', glow: 'url(#glow-red)' };
      case 'REPUBLIC':
        return { primary: '#0c4a6e', accent: '#0ea5e9', glow: 'url(#glow-blue)' };
      case 'MANDALORE':
        return { primary: '#7c2d12', accent: '#f97316', glow: 'url(#glow-orange)' };
      case 'HUTT':
        return { primary: '#365314', accent: '#84cc16', glow: 'url(#glow-cyan)' };
      default:
        return { primary: '#6b7280', accent: '#9ca3af', glow: 'url(#glow-cyan)' };
    }
  };

  const { primary, accent, glow } = getFactionColors();
  const isSith = faction === 'SITH';
  const isMandalore = faction === 'MANDALORE';

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Ship body - different shapes for factions */}
      <g transform={`rotate(${rotation})`}>
        {isSith ? (
          // Sith Empire ships - dark, aggressive
          <>
            {/* Main hull - Harrower-class dreadnought silhouette */}
            <polygon
              points="0,-20 -18,12 -10,18 0,14 10,18 18,12"
              fill={primary}
              fillOpacity="0.9"
              stroke={accent}
              strokeWidth="2.5"
              filter={glow}
              className="holographic"
            />
            {/* Bridge tower */}
            <polygon
              points="-4,-10 4,-10 3,2 -3,2"
              fill={accent}
              fillOpacity="0.8"
              stroke={accent}
              strokeWidth="1"
            />
            {/* Red engine glow */}
            <circle cx="-8" cy="16" r="2.5" fill={accent} fillOpacity="0.7" className="animate-pulse" />
            <circle cx="8" cy="16" r="2.5" fill={accent} fillOpacity="0.7" className="animate-pulse" />
          </>
        ) : isMandalore ? (
          // Mandalorian ships - angular, functional
          <>
            {/* Main hull - Kandosii-type dreadnought */}
            <polygon
              points="0,-18 -14,0 -12,15 0,10 12,15 14,0"
              fill={primary}
              fillOpacity="0.9"
              stroke={accent}
              strokeWidth="2.5"
              filter={glow}
              className="holographic"
            />
            {/* Wing extensions */}
            <line x1="-14" y1="0" x2="-22" y2="-5" stroke={accent} strokeWidth="2" strokeOpacity="0.8" />
            <line x1="14" y1="0" x2="22" y2="-5" stroke={accent} strokeWidth="2" strokeOpacity="0.8" />
            {/* Engine glow */}
            <circle cx="-6" cy="13" r="2" fill={accent} fillOpacity="0.6" />
            <circle cx="6" cy="13" r="2" fill={accent} fillOpacity="0.6" />
          </>
        ) : (
          // Republic ships - elegant, powerful (Hammerhead-class cruiser)
          <>
            {/* Main hull */}
            <polygon
              points="0,-16 -10,8 -8,14 8,14 10,8"
              fill={primary}
              fillOpacity="0.9"
              stroke={accent}
              strokeWidth="2.5"
              filter={glow}
              className="holographic"
            />
            {/* Hammerhead prow */}
            <rect
              x="-12"
              y="-18"
              width="24"
              height="6"
              rx="1"
              fill={accent}
              fillOpacity="0.7"
              stroke={accent}
              strokeWidth="1"
            />
            {/* Engine glow */}
            <circle cx="-5" cy="14" r="2" fill={accent} fillOpacity="0.6" className="animate-pulse" />
            <circle cx="5" cy="14" r="2" fill={accent} fillOpacity="0.6" className="animate-pulse" />
          </>
        )}

        {/* Direction arrow */}
        <line
          x1="0"
          y1="20"
          x2="0"
          y2="45"
          stroke={accent}
          strokeWidth="2"
          strokeOpacity="0.6"
          markerEnd={isSith ? 'url(#arrow-red)' : 'url(#arrow-orange)'}
          strokeDasharray="4,4"
          className="animate-pulse"
        />
      </g>

      {/* Fleet size badge */}
      <g transform="translate(18, -18)">
        {/* Badge background - cut corner style */}
        <polygon
          points="0,0 20,0 22,2 22,14 20,16 0,16 0,0"
          fill={primary}
          fillOpacity="0.95"
          stroke={accent}
          strokeWidth="1.5"
          filter={glow}
        />
        {/* Fleet size number */}
        <text
          x="11"
          y="11"
          textAnchor="middle"
          fill={accent}
          fontSize="10"
          fontFamily="'Orbitron', monospace"
          fontWeight="bold"
        >
          {size}
        </text>
      </g>

      {/* Faction emblem indicator */}
      <g transform="translate(0, 28)">
        {isSith ? (
          // Sith Empire symbol hint
          <>
            <circle cx="0" cy="0" r="8" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
            <line x1="-5" y1="-5" x2="5" y2="5" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
            <line x1="5" y1="-5" x2="-5" y2="5" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          </>
        ) : isMandalore ? (
          // Mandalorian skull hint
          <path
            d="M -5,-3 Q 0,-8 5,-3 L 3,3 Q 0,5 -3,3 Z"
            fill="none"
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        ) : (
          // Republic symbol
          <circle
            cx="0"
            cy="0"
            r="6"
            fill="none"
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.4"
            strokeDasharray="3,2"
          />
        )}
      </g>
    </g>
  );
}
