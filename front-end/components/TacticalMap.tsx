import { useState, useRef, useEffect } from 'react';
import { FleetMarker } from './FleetMarker';
import { DestroyedPlanetIcon } from './DestroyedPlanetIcon';
import { TerritoryLegend } from './TerritoryLegend';

interface TacticalMapProps {
  selectedTool: string;
  onPlanetSelect: (planet: any) => void;
  selectedPlanet: any;
}

// Mock data for territories and fleets
const territories = [
  {
    id: 'core-worlds',
    points: '450,350 520,320 580,350 600,420 580,490 520,520 450,490 430,420',
    faction: 'CORE',
    color: '#fbbf24',
    label: 'CORE WORLDS',
  },
  {
    id: 'empire-1',
    points: '300,200 450,180 500,250 450,350 380,320 320,280',
    faction: 'EMPIRE',
    color: '#dc2626',
    label: 'IMPERIAL TERRITORY',
  },
  {
    id: 'republic-1',
    points: '600,200 750,220 780,300 750,380 650,400 600,350 620,280',
    faction: 'REPUBLIC',
    color: '#0ea5e9',
    label: 'REBEL ALLIANCE',
  },
  {
    id: 'empire-2',
    points: '250,450 380,420 430,490 400,600 320,620 280,550',
    faction: 'EMPIRE',
    color: '#dc2626',
    label: 'EMPIRE SECTOR',
  },
  {
    id: 'republic-2',
    points: '600,490 680,480 750,550 720,650 650,680 580,620',
    faction: 'REPUBLIC',
    color: '#0ea5e9',
    label: 'OUTER RIM',
  },
  {
    id: 'inner-rim',
    points: '380,320 430,280 520,320 520,380 450,420 400,380',
    faction: 'NEUTRAL',
    color: '#e879f9',
    label: 'INNER RIM',
  },
];

const fleets = [
  {
    id: 'fleet-1',
    x: 300,
    y: 200,
    rotation: 45,
    faction: 'EMPIRE' as const,
    size: 12,
  },
  {
    id: 'fleet-2',
    x: 600,
    y: 250,
    rotation: -120,
    faction: 'REPUBLIC' as const,
    size: 8,
  },
  {
    id: 'fleet-3',
    x: 350,
    y: 500,
    rotation: 90,
    faction: 'EMPIRE' as const,
    size: 15,
  },
  {
    id: 'fleet-4',
    x: 680,
    y: 550,
    rotation: 180,
    faction: 'REPUBLIC' as const,
    size: 6,
  },
];

const planets = [
  {
    id: 'planet-1',
    name: 'CORUSCANT',
    x: 500,
    y: 400,
    faction: 'EMPIRE',
    sector: 'CORE WORLDS',
    grid: 'L-9',
    population: '1.2 TRILLION',
    defense: 98,
    power: 15400,
    production: 'MAX',
    image: 'https://images.unsplash.com/photo-1697723779446-0feb51d762d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBwbGFuZXQlMjB0YXRvb2luZXxlbnwxfHx8fDE3NjkwMzgwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'planet-2',
    name: 'YAVIN IV',
    x: 680,
    y: 350,
    faction: 'REPUBLIC',
    sector: 'OUTER RIM',
    grid: 'P-6',
    population: '1.2 MILLION',
    defense: 45,
    power: 320,
    production: 'LOW',
    image: 'https://images.unsplash.com/photo-1555374813-80866416f2f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBtb29uJTIwanVuZ2xlJTIwcGxhbmV0fGVufDF8fHx8MTc2OTAzODAxNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'planet-3',
    name: 'MUSTAFAR',
    x: 350,
    y: 520,
    faction: 'EMPIRE',
    sector: 'OUTER RIM',
    grid: 'L-19',
    population: '10,000',
    defense: 72,
    power: 8900,
    production: 'HIGH',
    image: 'https://images.unsplash.com/photo-1759252477206-0ff5c26a7a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xjYW5pYyUyMGxhdmElMjBwbGFuZXR8ZW58MXx8fHwxNzY5MDM4MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'planet-4',
    name: 'HOTH',
    x: 650,
    y: 580,
    faction: 'REPUBLIC',
    sector: 'OUTER RIM',
    grid: 'K-18',
    population: '2,500',
    defense: 65,
    power: 180,
    production: 'MEDIUM',
    image: 'https://images.unsplash.com/photo-1766699624032-636b6ee15a35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBwbGFuZXQlMjBmcm96ZW4lMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY5MDM4MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'planet-5',
    name: 'TATOOINE',
    x: 420,
    y: 450,
    faction: 'NEUTRAL',
    sector: 'OUTER RIM',
    grid: 'R-16',
    population: '200,000',
    defense: 15,
    power: 45,
    production: 'LOW',
    image: 'https://images.unsplash.com/photo-1697723779446-0feb51d762d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBwbGFuZXQlMjB0YXRvb2luZXxlbnwxfHx8fDE3NjkwMzgwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'planet-6',
    name: 'NABOO',
    x: 380,
    y: 350,
    faction: 'REPUBLIC',
    sector: 'MID RIM',
    grid: 'O-17',
    population: '4.5 BILLION',
    defense: 82,
    power: 3200,
    production: 'MEDIUM',
    image: 'https://images.unsplash.com/photo-1555374813-80866416f2f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBtb29uJTIwanVuZ2xlJTIwcGxhbmV0fGVufDF8fHx8MTc2OTAzODAxNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'planet-7',
    name: 'ENDOR',
    x: 750,
    y: 480,
    faction: 'REPUBLIC',
    sector: 'OUTER RIM',
    grid: 'H-16',
    population: '30 MILLION',
    defense: 38,
    power: 120,
    production: 'LOW',
    image: 'https://images.unsplash.com/photo-1555374813-80866416f2f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBtb29uJTIwanVuZ2xlJTIwcGxhbmV0fGVufDF8fHx8MTc2OTAzODAxNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'planet-8',
    name: 'GEONOSIS',
    x: 320,
    y: 280,
    faction: 'EMPIRE',
    sector: 'OUTER RIM',
    grid: 'R-16',
    population: '100 BILLION',
    defense: 55,
    power: 2800,
    production: 'HIGH',
    image: 'https://images.unsplash.com/photo-1697723779446-0feb51d762d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBwbGFuZXQlMjB0YXRvb2luZXxlbnwxfHx8fDE3NjkwMzgwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

// Hyperspace routes - connections between systems
const hyperspaceRoutes = [
  { from: 'planet-1', to: 'planet-2' },
  { from: 'planet-1', to: 'planet-5' },
  { from: 'planet-1', to: 'planet-6' },
  { from: 'planet-2', to: 'planet-4' },
  { from: 'planet-2', to: 'planet-7' },
  { from: 'planet-3', to: 'planet-5' },
  { from: 'planet-4', to: 'planet-7' },
  { from: 'planet-5', to: 'planet-6' },
  { from: 'planet-6', to: 'planet-8' },
];

const destroyedPlanets = [
  {
    id: 'destroyed-1',
    name: 'ALDERAAN',
    x: 480,
    y: 380,
  },
];

export function TacticalMap({ selectedTool, onPlanetSelect, selectedPlanet }: TacticalMapProps) {
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedTool === 'select') {
      setIsPanning(true);
      setPanStart({ x: e.clientX - viewBox.x, y: e.clientY - viewBox.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setViewBox({
        ...viewBox,
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handlePlanetClick = (planet: any) => {
    onPlanetSelect(planet);
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Galaxy background image */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, rgba(100, 50, 200, 0.3) 0%, rgba(10, 14, 26, 0.8) 50%, rgba(10, 14, 26, 1) 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <svg
        ref={svgRef}
        className="w-full h-full cursor-crosshair relative z-10"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        viewBox="0 0 1000 800"
      >
        <defs>
          {/* Glow filters */}
          <filter id="glow-red">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-blue">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-orange">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-cyan">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Arrow markers for fleet direction */}
          <marker
            id="arrow-red"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
          </marker>
          <marker
            id="arrow-orange"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f97316" />
          </marker>
        </defs>

        {/* Grid coordinates - Letters across top and bottom */}
        <g opacity="0.6">
          {['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'].map((letter, i) => (
            <g key={`letter-${letter}`}>
              <text
                x={100 + i * 45}
                y={25}
                textAnchor="middle"
                fill="#00ffff"
                fontSize="16"
                fontFamily="monospace"
                fontWeight="bold"
                opacity="0.7"
              >
                {letter}
              </text>
              <text
                x={100 + i * 45}
                y={780}
                textAnchor="middle"
                fill="#00ffff"
                fontSize="16"
                fontFamily="monospace"
                fontWeight="bold"
                opacity="0.7"
              >
                {letter}
              </text>
            </g>
          ))}
        </g>

        {/* Grid coordinates - Numbers on sides */}
        <g opacity="0.6">
          {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((num, i) => (
            <g key={`num-${num}`}>
              <text
                x={30}
                y={65 + i * 40}
                textAnchor="middle"
                fill="#00ffff"
                fontSize="16"
                fontFamily="monospace"
                fontWeight="bold"
                opacity="0.7"
              >
                {num}
              </text>
              <text
                x={970}
                y={65 + i * 40}
                textAnchor="middle"
                fill="#00ffff"
                fontSize="16"
                fontFamily="monospace"
                fontWeight="bold"
                opacity="0.7"
              >
                {num}
              </text>
            </g>
          ))}
        </g>

        {/* Territories */}
        {territories.map((territory) => (
          <g key={territory.id}>
            <polygon
              points={territory.points}
              fill={territory.color}
              fillOpacity="0.2"
              stroke={territory.color}
              strokeWidth="2"
              strokeOpacity="0.7"
              filter={
                territory.faction === 'EMPIRE' ? 'url(#glow-red)' : 
                territory.faction === 'REPUBLIC' ? 'url(#glow-blue)' : 
                'url(#glow-cyan)'
              }
              className="holographic"
            />
            <polygon
              points={territory.points}
              fill="none"
              stroke={territory.color}
              strokeWidth="1"
              strokeDasharray="8,4"
              strokeOpacity="0.5"
            />
            {/* Territory label */}
            {territory.label && (
              <text
                x={territory.points.split(' ').map(p => parseInt(p.split(',')[0])).reduce((a, b) => a + b) / territory.points.split(' ').length}
                y={territory.points.split(' ').map(p => parseInt(p.split(',')[1])).reduce((a, b) => a + b) / territory.points.split(' ').length}
                textAnchor="middle"
                fill={territory.color}
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
                opacity="0.7"
                style={{ textTransform: 'uppercase' }}
              >
                {territory.label}
              </text>
            )}
          </g>
        ))}

        {/* Hyperspace routes - white lines connecting systems */}
        {hyperspaceRoutes.map((route, i) => {
          const fromPlanet = planets.find(p => p.id === route.from);
          const toPlanet = planets.find(p => p.id === route.to);
          if (!fromPlanet || !toPlanet) return null;
          
          return (
            <line
              key={`route-${i}`}
              x1={fromPlanet.x}
              y1={fromPlanet.y}
              x2={toPlanet.x}
              y2={toPlanet.y}
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              strokeDasharray="5,5"
            />
          );
        })}

        {/* Fleet markers - using new component */}
        {fleets.map((fleet) => (
          <FleetMarker
            key={fleet.id}
            x={fleet.x}
            y={fleet.y}
            rotation={fleet.rotation}
            faction={fleet.faction}
            size={fleet.size}
            id={fleet.id}
          />
        ))}

        {/* Planets/Systems */}
        {planets.map((planet) => (
          <g
            key={planet.id}
            onClick={() => handlePlanetClick(planet)}
            className="cursor-pointer"
          >
            {/* Outer ring */}
            <circle
              cx={planet.x}
              cy={planet.y}
              r="12"
              fill="none"
              stroke="#00ffff"
              strokeWidth="1.5"
              strokeOpacity="0.6"
              filter="url(#glow-cyan)"
              className={selectedPlanet?.id === planet.id ? 'animate-pulse' : ''}
            />
            {/* Inner planet */}
            <circle
              cx={planet.x}
              cy={planet.y}
              r="6"
              fill="#00ffff"
              fillOpacity="0.4"
              stroke="#00ffff"
              strokeWidth="2"
              filter="url(#glow-cyan)"
            />
            {/* Selection ring */}
            {selectedPlanet?.id === planet.id && (
              <circle
                cx={planet.x}
                cy={planet.y}
                r="18"
                fill="none"
                stroke="#00ffff"
                strokeWidth="2"
                strokeOpacity="0.8"
                strokeDasharray="3,3"
                className="animate-pulse"
              />
            )}
            {/* Planet label */}
            <text
              x={planet.x}
              y={planet.y - 20}
              textAnchor="middle"
              fill="#00ffff"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
              filter="url(#glow-cyan)"
            >
              {planet.name}
            </text>
          </g>
        ))}

        {/* Destroyed planets */}
        {destroyedPlanets.map((planet) => (
          <DestroyedPlanetIcon
            key={planet.id}
            x={planet.x}
            y={planet.y}
            name={planet.name}
          />
        ))}
      </svg>

      {/* Legend - using new component */}
      <TerritoryLegend />
    </div>
  );
}