interface DestroyedPlanetIconProps {
  x: number;
  y: number;
  name: string;
  onClick?: () => void;
}

export function DestroyedPlanetIcon({ x, y, name, onClick }: DestroyedPlanetIconProps) {
  return (
    <g onClick={onClick} className="cursor-pointer">
      {/* Debris field - multiple small fragments */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const distance = 8 + Math.random() * 8;
        const fragX = x + Math.cos(angle) * distance;
        const fragY = y + Math.sin(angle) * distance;
        const size = 2 + Math.random() * 3;
        
        return (
          <g key={i}>
            <circle
              cx={fragX}
              cy={fragY}
              r={size}
              fill="#6b7280"
              fillOpacity="0.6"
              stroke="#dc2626"
              strokeWidth="0.5"
              className="holographic"
            />
            {/* Glow effect */}
            <circle
              cx={fragX}
              cy={fragY}
              r={size + 2}
              fill="none"
              stroke="#dc2626"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
          </g>
        );
      })}

      {/* Central destroyed core */}
      <g>
        {/* Inner core fragments */}
        <circle
          cx={x}
          cy={y}
          r="4"
          fill="#450a0a"
          fillOpacity="0.8"
          stroke="#dc2626"
          strokeWidth="1.5"
          filter="url(#glow-red)"
        />
        
        {/* Explosion/debris rings */}
        <circle
          cx={x}
          cy={y}
          r="10"
          fill="none"
          stroke="#dc2626"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeDasharray="3,3"
          className="animate-pulse"
        />
        
        <circle
          cx={x}
          cy={y}
          r="16"
          fill="none"
          stroke="#dc2626"
          strokeWidth="0.5"
          strokeOpacity="0.2"
          strokeDasharray="2,4"
        />

        {/* Warning X symbol */}
        <line
          x1={x - 6}
          y1={y - 6}
          x2={x + 6}
          y2={y + 6}
          stroke="#dc2626"
          strokeWidth="2"
          strokeOpacity="0.7"
        />
        <line
          x1={x - 6}
          y1={y + 6}
          x2={x + 6}
          y2={y - 6}
          stroke="#dc2626"
          strokeWidth="2"
          strokeOpacity="0.7"
        />
      </g>

      {/* Destroyed label */}
      <text
        x={x}
        y={y - 24}
        textAnchor="middle"
        fill="#dc2626"
        fontSize="11"
        fontFamily="monospace"
        fontWeight="bold"
        filter="url(#glow-red)"
      >
        {name}
      </text>
      <text
        x={x}
        y={y - 12}
        textAnchor="middle"
        fill="#dc2626"
        fontSize="8"
        fontFamily="monospace"
        opacity="0.8"
      >
        [DESTROYED]
      </text>

      {/* Hazard warning border */}
      <circle
        cx={x}
        cy={y}
        r="22"
        fill="none"
        stroke="#dc2626"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        strokeDasharray="4,4"
        className="animate-pulse"
      />
    </g>
  );
}
