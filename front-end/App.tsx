import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { PlanetInfoModal } from './components/PlanetInfoModal';
import { TacticalMap } from './components/TacticalMap';

export default function App() {
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [selectedPlanet, setSelectedPlanet] = useState<any>(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0e1a]">
      {/* Starfield background */}
      <div className="absolute inset-0 starfield" />
      
      {/* Hexagonal grid overlay */}
      <div className="absolute inset-0 hex-grid opacity-10" />

      {/* Top Navigation */}
      <TopNav />

      {/* Left Sidebar */}
      <Sidebar selectedTool={selectedTool} onToolSelect={setSelectedTool} />

      {/* Central Map Area */}
      <div className="absolute left-20 top-16 right-0 bottom-0">
        <TacticalMap 
          selectedTool={selectedTool} 
          onPlanetSelect={setSelectedPlanet}
          selectedPlanet={selectedPlanet}
        />
      </div>

      {/* Right Data Intel Panel */}
      {selectedPlanet && (
        <PlanetInfoModal 
          planet={selectedPlanet} 
          onClose={() => setSelectedPlanet(null)} 
        />
      )}
    </div>
  );
}