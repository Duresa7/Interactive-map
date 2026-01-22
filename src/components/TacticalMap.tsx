import { useState, useRef, useCallback } from 'react';
import { FleetMarker } from './FleetMarker';
import { DestroyedPlanetIcon } from './DestroyedPlanetIcon';
import { TerritoryLegend } from './TerritoryLegend';
import { X, Check } from 'lucide-react';

interface TacticalMapProps {
  selectedTool: string;
  onPlanetSelect: (planet: any) => void;
  selectedPlanet: any;
}

interface Planet {
  id: string;
  name: string;
  x: number;
  y: number;
  faction: string;
  sector: string;
  grid: string;
  population: string;
  defense: number;
  power: number;
  production: string;
  image: string;
}

interface Territory {
  id: string;
  points: string;
  faction: string;
  color: string;
  label: string;
}

interface DrawingPoint {
  x: number;
  y: number;
}

// Galaxy Rings configuration - Old Republic Era
const galaxyRings = [
  { id: 'deep-core', radius: 60, color: '#fbbf24', label: 'DEEP CORE', labelOffset: 35 },
  { id: 'core-worlds', radius: 120, color: '#f59e0b', label: 'CORE WORLDS', labelOffset: 95 },
  { id: 'colonies', radius: 180, color: '#84cc16', label: 'COLONIES', labelOffset: 155 },
  { id: 'inner-rim', radius: 250, color: '#22d3ee', label: 'INNER RIM', labelOffset: 220 },
  { id: 'expansion', radius: 320, color: '#a78bfa', label: 'EXPANSION REGION', labelOffset: 290 },
  { id: 'mid-rim', radius: 400, color: '#f472b6', label: 'MID RIM', labelOffset: 370 },
  { id: 'outer-rim', radius: 500, color: '#fb923c', label: 'OUTER RIM', labelOffset: 470 },
  { id: 'unknown', radius: 600, color: '#64748b', label: 'UNKNOWN REGIONS', labelOffset: 570 },
];

// Initial territories
const initialTerritories: Territory[] = [
  { id: 'sith-empire', points: '300,200 450,180 500,250 450,350 380,320 320,280', faction: 'SITH', color: '#dc2626', label: 'SITH EMPIRE' },
  { id: 'republic-1', points: '600,200 750,220 780,300 750,380 650,400 600,350 620,280', faction: 'REPUBLIC', color: '#0ea5e9', label: 'GALACTIC REPUBLIC' },
  { id: 'mandalore', points: '250,450 380,420 430,490 400,600 320,620 280,550', faction: 'MANDALORE', color: '#f97316', label: 'MANDALORIAN SPACE' },
  { id: 'hutt-space', points: '600,490 680,480 750,550 720,650 650,680 580,620', faction: 'HUTT', color: '#84cc16', label: 'HUTT SPACE' },
];

const initialFleets = [
  { id: 'fleet-1', x: 300, y: 200, rotation: 45, faction: 'SITH' as const, size: 12 },
  { id: 'fleet-2', x: 600, y: 250, rotation: -120, faction: 'REPUBLIC' as const, size: 8 },
  { id: 'fleet-3', x: 350, y: 500, rotation: 90, faction: 'MANDALORE' as const, size: 15 },
  { id: 'fleet-4', x: 680, y: 550, rotation: 180, faction: 'REPUBLIC' as const, size: 6 },
];

// Old Republic Era planets (circa 4000 BBY)
const initialPlanets: Planet[] = [
  { id: 'planet-1', name: 'CORUSCANT', x: 500, y: 400, faction: 'REPUBLIC', sector: 'CORE WORLDS', grid: 'L-9', population: '1.2 TRILLION', defense: 98, power: 15400, production: 'MAX', image: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=400' },
  { id: 'planet-2', name: 'KORRIBAN', x: 280, y: 280, faction: 'SITH', sector: 'OUTER RIM', grid: 'R-5', population: '25,000', defense: 95, power: 12000, production: 'HIGH', image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400' },
  { id: 'planet-3', name: 'DROMUND KAAS', x: 350, y: 350, faction: 'SITH', sector: 'OUTER RIM', grid: 'R-5', population: '8 BILLION', defense: 92, power: 14000, production: 'HIGH', image: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=400' },
  { id: 'planet-4', name: 'TYTHON', x: 480, y: 320, faction: 'REPUBLIC', sector: 'DEEP CORE', grid: 'L-10', population: '50,000', defense: 75, power: 800, production: 'LOW', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400' },
  { id: 'planet-5', name: 'MANAAN', x: 620, y: 380, faction: 'NEUTRAL', sector: 'INNER RIM', grid: 'O-11', population: '500 MILLION', defense: 45, power: 2000, production: 'MEDIUM', image: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=400' },
  { id: 'planet-6', name: 'DANTOOINE', x: 700, y: 300, faction: 'REPUBLIC', sector: 'OUTER RIM', grid: 'L-4', population: '1 MILLION', defense: 35, power: 400, production: 'LOW', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400' },
  { id: 'planet-7', name: 'ONDERON', x: 580, y: 520, faction: 'REPUBLIC', sector: 'INNER RIM', grid: 'O-12', population: '4 BILLION', defense: 68, power: 3500, production: 'MEDIUM', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400' },
  { id: 'planet-8', name: 'MANDALORE', x: 340, y: 520, faction: 'MANDALORE', sector: 'OUTER RIM', grid: 'O-7', population: '2 BILLION', defense: 88, power: 9800, production: 'HIGH', image: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400' },
  { id: 'planet-9', name: 'NAR SHADDAA', x: 650, y: 580, faction: 'HUTT', sector: 'OUTER RIM', grid: 'S-12', population: '85 BILLION', defense: 42, power: 5600, production: 'HIGH', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400' },
  { id: 'planet-10', name: 'MALACHOR V', x: 220, y: 380, faction: 'SITH', sector: 'OUTER RIM', grid: 'S-5', population: '0', defense: 0, power: 0, production: 'NONE', image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=400' },
];

const hyperspaceRoutes = [
  { from: 'planet-1', to: 'planet-4' }, { from: 'planet-1', to: 'planet-5' }, { from: 'planet-1', to: 'planet-7' },
  { from: 'planet-4', to: 'planet-6' }, { from: 'planet-5', to: 'planet-6' }, { from: 'planet-5', to: 'planet-7' },
  { from: 'planet-7', to: 'planet-9' }, { from: 'planet-2', to: 'planet-3' }, { from: 'planet-3', to: 'planet-10' },
  { from: 'planet-8', to: 'planet-10' },
];

const destroyedPlanets = [{ id: 'destroyed-1', name: 'TARIS (RUINS)', x: 420, y: 280 }];

const GALAXY_CENTER = { x: 500, y: 400 };

const FACTION_OPTIONS = [
  { id: 'SITH', label: 'Sith Empire', color: '#dc2626' },
  { id: 'REPUBLIC', label: 'Galactic Republic', color: '#0ea5e9' },
  { id: 'MANDALORE', label: 'Mandalorian Space', color: '#f97316' },
  { id: 'HUTT', label: 'Hutt Cartel', color: '#84cc16' },
  { id: 'NEUTRAL', label: 'Neutral Zone', color: '#00ffff' },
  { id: 'CUSTOM', label: 'Custom', color: '#a855f7' },
];

export function TacticalMap({ selectedTool, onPlanetSelect, selectedPlanet }: TacticalMapProps) {
  const [planets, setPlanets] = useState<Planet[]>(initialPlanets);
  const [territories, setTerritories] = useState<Territory[]>(initialTerritories);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 1000, height: 800 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [draggingPlanet, setDraggingPlanet] = useState<string | null>(null);
  const [showRings, setShowRings] = useState(true);
  
  // Territory drawing state
  const [drawingPoints, setDrawingPoints] = useState<DrawingPoint[]>([]);
  const [mousePosition, setMousePosition] = useState<DrawingPoint | null>(null);
  const [showTerritoryModal, setShowTerritoryModal] = useState(false);
  const [newTerritoryName, setNewTerritoryName] = useState('');
  const [newTerritoryFaction, setNewTerritoryFaction] = useState('NEUTRAL');
  
  const svgRef = useRef<SVGSVGElement>(null);

  const screenToSVG = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * viewBox.width + viewBox.x;
    const y = ((clientY - rect.top) / rect.height) * viewBox.height + viewBox.y;
    return { x, y };
  }, [viewBox]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedTool === 'select' && !draggingPlanet) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Update mouse position for territory drawing preview
    if (selectedTool === 'territory' && drawingPoints.length > 0) {
      const coords = screenToSVG(e.clientX, e.clientY);
      setMousePosition(coords);
    }
    
    if (isPanning && !draggingPlanet) {
      const dx = (e.clientX - panStart.x) * (viewBox.width / (svgRef.current?.clientWidth || 1));
      const dy = (e.clientY - panStart.y) * (viewBox.height / (svgRef.current?.clientHeight || 1));
      setViewBox(prev => ({ ...prev, x: prev.x - dx, y: prev.y - dy }));
      setPanStart({ x: e.clientX, y: e.clientY });
    }
    
    if (draggingPlanet && selectedTool === 'select') {
      const coords = screenToSVG(e.clientX, e.clientY);
      setPlanets(prev => prev.map(p => p.id === draggingPlanet ? { ...p, x: coords.x, y: coords.y } : p));
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingPlanet(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9;
    const coords = screenToSVG(e.clientX, e.clientY);
    setViewBox(prev => {
      const newWidth = Math.min(Math.max(prev.width * zoomFactor, 400), 2000);
      const newHeight = Math.min(Math.max(prev.height * zoomFactor, 320), 1600);
      const widthRatio = newWidth / prev.width;
      const heightRatio = newHeight / prev.height;
      return {
        x: coords.x - (coords.x - prev.x) * widthRatio,
        y: coords.y - (coords.y - prev.y) * heightRatio,
        width: newWidth,
        height: newHeight,
      };
    });
  };

  const handlePlanetMouseDown = (e: React.MouseEvent, planet: Planet) => {
    e.stopPropagation();
    if (selectedTool === 'select') {
      setDraggingPlanet(planet.id);
    }
  };

  const handlePlanetClick = (e: React.MouseEvent, planet: Planet) => {
    e.stopPropagation();
    if (!draggingPlanet) {
      onPlanetSelect(planet);
    }
  };

  const handleMapClick = (e: React.MouseEvent) => {
    const coords = screenToSVG(e.clientX, e.clientY);
    
    if (selectedTool === 'system') {
      const newPlanet: Planet = {
        id: `planet-${Date.now()}`,
        name: `NEW SYSTEM`,
        x: coords.x,
        y: coords.y,
        faction: 'NEUTRAL',
        sector: 'UNKNOWN',
        grid: `X-${Math.floor(Math.random() * 20)}`,
        population: 'UNKNOWN',
        defense: 0,
        power: 0,
        production: 'NONE',
        image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400',
      };
      setPlanets(prev => [...prev, newPlanet]);
      onPlanetSelect(newPlanet);
    }
    
    if (selectedTool === 'territory') {
      setDrawingPoints(prev => [...prev, coords]);
    }
  };

  const handleFinishTerritory = () => {
    if (drawingPoints.length >= 3) {
      setShowTerritoryModal(true);
    }
  };

  const handleCancelDrawing = () => {
    setDrawingPoints([]);
    setMousePosition(null);
  };

  const handleUndoPoint = () => {
    setDrawingPoints(prev => prev.slice(0, -1));
  };

  const handleSaveTerritory = () => {
    if (drawingPoints.length >= 3 && newTerritoryName.trim()) {
      const faction = FACTION_OPTIONS.find(f => f.id === newTerritoryFaction);
      const newTerritory: Territory = {
        id: `territory-${Date.now()}`,
        points: drawingPoints.map(p => `${Math.round(p.x)},${Math.round(p.y)}`).join(' '),
        faction: newTerritoryFaction,
        color: faction?.color || '#00ffff',
        label: newTerritoryName.toUpperCase(),
      };
      setTerritories(prev => [...prev, newTerritory]);
      setDrawingPoints([]);
      setMousePosition(null);
      setShowTerritoryModal(false);
      setNewTerritoryName('');
      setNewTerritoryFaction('NEUTRAL');
    }
  };

  const getFactionColor = (faction: string) => {
    switch (faction) {
      case 'SITH': return '#dc2626';
      case 'REPUBLIC': return '#0ea5e9';
      case 'MANDALORE': return '#f97316';
      case 'HUTT': return '#84cc16';
      default: return '#00ffff';
    }
  };

  const getGlowFilter = (faction: string) => {
    switch (faction) {
      case 'SITH': return 'url(#glow-red)';
      case 'REPUBLIC': return 'url(#glow-blue)';
      case 'MANDALORE': return 'url(#glow-orange)';
      default: return 'url(#glow-cyan)';
    }
  };

  // Create polygon preview points string
  const getDrawingPolygonPoints = () => {
    if (drawingPoints.length === 0) return '';
    return drawingPoints.map(p => `${p.x},${p.y}`).join(' ');
  };

  // Create preview line to mouse
  const getPreviewLine = () => {
    if (drawingPoints.length === 0 || !mousePosition) return null;
    const lastPoint = drawingPoints[drawingPoints.length - 1];
    return { x1: lastPoint.x, y1: lastPoint.y, x2: mousePosition.x, y2: mousePosition.y };
  };

  const previewLine = getPreviewLine();

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Galaxy background */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, rgba(100, 50, 200, 0.4) 0%, rgba(50, 30, 120, 0.3) 30%, rgba(10, 14, 26, 0.9) 60%, rgba(10, 14, 26, 1) 100%)',
        }}
      />
      
      {/* Toggle rings button */}
      <button
        onClick={() => setShowRings(!showRings)}
        className="absolute top-4 right-4 z-20 cut-corner bg-[#0a1628]/80 border border-cyan-500/30 backdrop-blur-sm px-4 py-2 text-cyan-400 text-xs font-mono uppercase tracking-wider hover:bg-cyan-500/20 transition-colors"
      >
        {showRings ? 'HIDE RINGS' : 'SHOW RINGS'}
      </button>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
        <button onClick={() => setViewBox(prev => ({ ...prev, width: prev.width * 0.8, height: prev.height * 0.8 }))} className="cut-corner-sm bg-[#0a1628]/80 border border-cyan-500/30 w-10 h-10 flex items-center justify-center text-cyan-400 text-xl font-bold hover:bg-cyan-500/20 transition-colors">+</button>
        <button onClick={() => setViewBox(prev => ({ ...prev, width: prev.width * 1.2, height: prev.height * 1.2 }))} className="cut-corner-sm bg-[#0a1628]/80 border border-cyan-500/30 w-10 h-10 flex items-center justify-center text-cyan-400 text-xl font-bold hover:bg-cyan-500/20 transition-colors">−</button>
        <button onClick={() => setViewBox({ x: 0, y: 0, width: 1000, height: 800 })} className="cut-corner-sm bg-[#0a1628]/80 border border-cyan-500/30 w-10 h-10 flex items-center justify-center text-cyan-400 text-xs font-mono hover:bg-cyan-500/20 transition-colors">⌂</button>
      </div>
      
      <svg
        ref={svgRef}
        className={`w-full h-full relative z-10 ${
          selectedTool === 'select' ? (draggingPlanet ? 'cursor-grabbing' : 'cursor-grab') : 
          selectedTool === 'system' || selectedTool === 'territory' ? 'cursor-crosshair' : 'cursor-default'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onClick={handleMapClick}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      >
        <defs>
          <filter id="glow-red"><feGaussianBlur stdDeviation="3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id="glow-blue"><feGaussianBlur stdDeviation="3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id="glow-orange"><feGaussianBlur stdDeviation="3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id="glow-cyan"><feGaussianBlur stdDeviation="2" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id="glow-yellow"><feGaussianBlur stdDeviation="2" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" /></marker>
          <marker id="arrow-orange" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f97316" /></marker>
        </defs>

        {/* Galaxy Rings */}
        {showRings && galaxyRings.map((ring, index) => (
          <g key={ring.id}>
            <circle cx={GALAXY_CENTER.x} cy={GALAXY_CENTER.y} r={ring.radius} fill="none" stroke={ring.color} strokeWidth="1" strokeOpacity="0.3" strokeDasharray="10,5" className="ring-pulse" style={{ animationDelay: `${index * 0.5}s` }} />
            <text x={GALAXY_CENTER.x} y={GALAXY_CENTER.y - ring.labelOffset} textAnchor="middle" fill={ring.color} fontSize="10" fontFamily="'Orbitron', monospace" fontWeight="600" opacity="0.6" letterSpacing="2">{ring.label}</text>
          </g>
        ))}

        {/* Grid coordinates */}
        <g opacity="0.6">
          {['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'].map((letter, i) => (
            <g key={`letter-${letter}`}>
              <text x={100 + i * 45} y={25} textAnchor="middle" fill="#00ffff" fontSize="16" fontFamily="'Share Tech Mono', monospace" fontWeight="bold" opacity="0.7">{letter}</text>
              <text x={100 + i * 45} y={780} textAnchor="middle" fill="#00ffff" fontSize="16" fontFamily="'Share Tech Mono', monospace" fontWeight="bold" opacity="0.7">{letter}</text>
            </g>
          ))}
        </g>
        <g opacity="0.6">
          {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((num, i) => (
            <g key={`num-${num}`}>
              <text x={30} y={65 + i * 40} textAnchor="middle" fill="#00ffff" fontSize="16" fontFamily="'Share Tech Mono', monospace" fontWeight="bold" opacity="0.7">{num}</text>
              <text x={970} y={65 + i * 40} textAnchor="middle" fill="#00ffff" fontSize="16" fontFamily="'Share Tech Mono', monospace" fontWeight="bold" opacity="0.7">{num}</text>
            </g>
          ))}
        </g>

        {/* Territories */}
        {territories.map((territory) => (
          <g key={territory.id}>
            <polygon points={territory.points} fill={territory.color} fillOpacity="0.15" stroke={territory.color} strokeWidth="2" strokeOpacity="0.6" filter={getGlowFilter(territory.faction)} className="holographic" />
            <polygon points={territory.points} fill="none" stroke={territory.color} strokeWidth="1" strokeDasharray="8,4" strokeOpacity="0.4" />
            <text
              x={territory.points.split(' ').map(p => parseInt(p.split(',')[0])).reduce((a, b) => a + b) / territory.points.split(' ').length}
              y={territory.points.split(' ').map(p => parseInt(p.split(',')[1])).reduce((a, b) => a + b) / territory.points.split(' ').length}
              textAnchor="middle" fill={territory.color} fontSize="9" fontFamily="'Orbitron', monospace" fontWeight="bold" opacity="0.8" letterSpacing="1"
            >{territory.label}</text>
          </g>
        ))}

        {/* Drawing preview polygon */}
        {selectedTool === 'territory' && drawingPoints.length > 0 && (
          <g>
            {/* Preview polygon fill */}
            {drawingPoints.length >= 3 && (
              <polygon points={getDrawingPolygonPoints()} fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="5,5" />
            )}
            {/* Lines between placed points */}
            {drawingPoints.length > 1 && (
              <polyline points={getDrawingPolygonPoints()} fill="none" stroke="#a855f7" strokeWidth="2" strokeOpacity="0.8" />
            )}
            {/* Preview line to cursor */}
            {previewLine && (
              <line x1={previewLine.x1} y1={previewLine.y1} x2={previewLine.x2} y2={previewLine.y2} stroke="#a855f7" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="5,5" />
            )}
            {/* Closing line preview */}
            {drawingPoints.length >= 3 && mousePosition && (
              <line x1={mousePosition.x} y1={mousePosition.y} x2={drawingPoints[0].x} y2={drawingPoints[0].y} stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3,3" />
            )}
            {/* Point markers */}
            {drawingPoints.map((point, i) => (
              <g key={`draw-point-${i}`}>
                <circle cx={point.x} cy={point.y} r="8" fill="#a855f7" fillOpacity="0.3" stroke="#a855f7" strokeWidth="2" />
                <text x={point.x} y={point.y + 4} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">{i + 1}</text>
              </g>
            ))}
          </g>
        )}

        {/* Hyperspace routes */}
        {hyperspaceRoutes.map((route, i) => {
          const fromPlanet = planets.find(p => p.id === route.from);
          const toPlanet = planets.find(p => p.id === route.to);
          if (!fromPlanet || !toPlanet) return null;
          return <line key={`route-${i}`} x1={fromPlanet.x} y1={fromPlanet.y} x2={toPlanet.x} y2={toPlanet.y} stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="5,5" />;
        })}

        {/* Fleet markers */}
        {initialFleets.map((fleet) => (
          <FleetMarker key={fleet.id} x={fleet.x} y={fleet.y} rotation={fleet.rotation} faction={fleet.faction} size={fleet.size} id={fleet.id} />
        ))}

        {/* Planets */}
        {planets.map((planet) => {
          const planetColor = getFactionColor(planet.faction);
          const isSelected = selectedPlanet?.id === planet.id;
          const isDragging = draggingPlanet === planet.id;
          
          return (
            <g key={planet.id} onMouseDown={(e) => handlePlanetMouseDown(e, planet)} onClick={(e) => handlePlanetClick(e, planet)} className={`${selectedTool === 'select' ? 'cursor-grab' : 'cursor-pointer'} ${isDragging ? 'cursor-grabbing' : ''}`} style={{ transition: isDragging ? 'none' : 'transform 0.1s ease-out' }}>
              <circle cx={planet.x} cy={planet.y} r="15" fill="none" stroke={planetColor} strokeWidth="1" strokeOpacity="0.4" filter="url(#glow-cyan)" />
              <circle cx={planet.x} cy={planet.y} r="12" fill="none" stroke={planetColor} strokeWidth="1.5" strokeOpacity="0.7" className={isSelected ? 'animate-pulse' : ''} />
              <circle cx={planet.x} cy={planet.y} r="6" fill={planetColor} fillOpacity="0.5" stroke={planetColor} strokeWidth="2" />
              {isSelected && <circle cx={planet.x} cy={planet.y} r="20" fill="none" stroke={planetColor} strokeWidth="2" strokeOpacity="0.9" strokeDasharray="4,4" className="animate-pulse" />}
              <text x={planet.x} y={planet.y - 22} textAnchor="middle" fill={planetColor} fontSize="10" fontFamily="'Orbitron', monospace" fontWeight="600" letterSpacing="1">{planet.name}</text>
            </g>
          );
        })}

        {/* Destroyed planets */}
        {destroyedPlanets.map((planet) => (
          <DestroyedPlanetIcon key={planet.id} x={planet.x} y={planet.y} name={planet.name} />
        ))}
      </svg>

      {/* Legend */}
      <TerritoryLegend />

      {/* Territory drawing controls */}
      {selectedTool === 'territory' && (
        <div className="absolute bottom-4 left-4 z-20 cut-corner bg-[#0a1628]/90 border border-purple-500/40 backdrop-blur-sm p-4 glow-purple" style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)' }}>
          <div className="text-purple-400 text-xs font-mono uppercase tracking-wider mb-3" style={{ fontFamily: "'Orbitron', monospace" }}>
            TERRITORY DRAWING MODE
          </div>
          <div className="text-purple-300 text-xs font-mono mb-3">
            Points placed: <span className="text-purple-200 font-bold">{drawingPoints.length}</span>
            {drawingPoints.length < 3 && <span className="text-purple-500 ml-2">(min 3 required)</span>}
          </div>
          <div className="flex gap-2">
            {drawingPoints.length > 0 && (
              <button onClick={handleUndoPoint} className="cut-corner-sm bg-yellow-500/20 border border-yellow-500/40 px-3 py-2 text-yellow-400 text-xs font-mono uppercase hover:bg-yellow-500/30 transition-colors">
                UNDO
              </button>
            )}
            {drawingPoints.length >= 3 && (
              <button onClick={handleFinishTerritory} className="cut-corner-sm bg-green-500/20 border border-green-500/40 px-3 py-2 text-green-400 text-xs font-mono uppercase hover:bg-green-500/30 transition-colors flex items-center gap-2">
                <Check className="w-4 h-4" /> FINISH
              </button>
            )}
            {drawingPoints.length > 0 && (
              <button onClick={handleCancelDrawing} className="cut-corner-sm bg-red-500/20 border border-red-500/40 px-3 py-2 text-red-400 text-xs font-mono uppercase hover:bg-red-500/30 transition-colors flex items-center gap-2">
                <X className="w-4 h-4" /> CANCEL
              </button>
            )}
          </div>
          {drawingPoints.length === 0 && (
            <p className="text-purple-500 text-xs font-mono mt-2">Click on the map to place points</p>
          )}
        </div>
      )}

      {/* System tool indicator */}
      {selectedTool === 'system' && (
        <div className="absolute bottom-4 left-4 z-20 cut-corner bg-[#0a1628]/80 border border-cyan-500/30 backdrop-blur-sm px-4 py-2">
          <p className="text-cyan-400 text-xs font-mono uppercase tracking-wider">CLICK TO PLACE NEW SYSTEM</p>
        </div>
      )}

      {/* Territory name modal */}
      {showTerritoryModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="cut-corner bg-[#0a1628]/95 border border-purple-500/50 p-6 w-96 glow-purple" style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-purple-400 text-sm font-mono uppercase tracking-wider" style={{ fontFamily: "'Orbitron', monospace" }}>
                CREATE TERRITORY
              </h3>
              <button onClick={() => setShowTerritoryModal(false)} className="text-red-400 hover:text-red-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-purple-500 text-xs font-mono uppercase mb-2">Territory Name</label>
                <input
                  type="text"
                  value={newTerritoryName}
                  onChange={(e) => setNewTerritoryName(e.target.value)}
                  placeholder="Enter territory name..."
                  className="w-full bg-[#0f1b2e]/60 border border-purple-500/30 px-3 py-2 text-purple-200 font-mono text-sm uppercase placeholder:text-purple-700 outline-none focus:border-purple-400 cut-corner-sm"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-purple-500 text-xs font-mono uppercase mb-2">Faction Control</label>
                <div className="grid grid-cols-2 gap-2">
                  {FACTION_OPTIONS.map((faction) => (
                    <button
                      key={faction.id}
                      onClick={() => setNewTerritoryFaction(faction.id)}
                      className={`cut-corner-sm px-3 py-2 text-xs font-mono uppercase transition-colors flex items-center gap-2 ${
                        newTerritoryFaction === faction.id
                          ? 'border-2'
                          : 'border border-opacity-40'
                      }`}
                      style={{
                        backgroundColor: `${faction.color}20`,
                        borderColor: faction.color,
                        color: faction.color,
                      }}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: faction.color }} />
                      {faction.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowTerritoryModal(false)}
                  className="flex-1 cut-corner bg-gray-500/20 border border-gray-500/40 px-4 py-3 text-gray-400 text-xs font-mono uppercase hover:bg-gray-500/30 transition-colors"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleSaveTerritory}
                  disabled={!newTerritoryName.trim()}
                  className="flex-1 cut-corner bg-purple-500/20 border border-purple-500/40 px-4 py-3 text-purple-300 text-xs font-mono uppercase hover:bg-purple-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> CREATE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}