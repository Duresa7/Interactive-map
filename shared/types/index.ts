// Planet types
export interface Planet {
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

// Fleet types
export interface Fleet {
  id: string;
  x: number;
  y: number;
  rotation: number;
  faction: string;
  size: number;
}

// Territory types
export interface Territory {
  id: string;
  points: string;
  faction: string;
  color: string;
  label: string;
}

// Faction types
export type FactionId = 'SITH' | 'REPUBLIC' | 'MANDALORE' | 'HUTT' | 'NEUTRAL' | 'CUSTOM';

export interface Faction {
  id: FactionId;
  label: string;
  color: string;
}

export const FACTIONS: Faction[] = [
  { id: 'SITH', label: 'Sith Empire', color: '#dc2626' },
  { id: 'REPUBLIC', label: 'Galactic Republic', color: '#0ea5e9' },
  { id: 'MANDALORE', label: 'Mandalorian Space', color: '#f97316' },
  { id: 'HUTT', label: 'Hutt Cartel', color: '#84cc16' },
  { id: 'NEUTRAL', label: 'Neutral Zone', color: '#00ffff' },
  { id: 'CUSTOM', label: 'Custom', color: '#a855f7' },
];

// Galaxy ring types
export interface GalaxyRing {
  id: string;
  radius: number;
  color: string;
  label: string;
  labelOffset: number;
}

// Hyperspace route types
export interface HyperspaceRoute {
  from: string;
  to: string;
}
