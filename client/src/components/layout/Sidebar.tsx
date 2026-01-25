import { MousePointer2, Pentagon, Triangle, Plus } from 'lucide-react';

interface SidebarProps {
  selectedTool: string;
  onToolSelect: (tool: string) => void;
}

const tools = [
  { id: 'select', icon: MousePointer2, label: 'Select Cursor' },
  { id: 'territory', icon: Pentagon, label: 'Draw Territory Polygon' },
  { id: 'fleet', icon: Triangle, label: 'Deploy Fleet Marker' },
  { id: 'system', icon: Plus, label: 'Add New System' },
];

export function Sidebar({ selectedTool, onToolSelect }: SidebarProps) {
  return (
    <div className="absolute left-6 top-32 z-30 flex flex-col gap-6">
      <div className="cut-corner bg-[#0a1628]/80 border border-cyan-500/30 backdrop-blur-sm p-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolSelect(tool.id)}
            className={`cut-corner-sm w-16 h-16 flex items-center justify-center mb-4 last:mb-0 transition-all ${
              selectedTool === tool.id
                ? 'bg-cyan-500/30 border-2 border-cyan-400 glow-cyan'
                : 'bg-[#0f1b2e]/60 border border-cyan-500/20 hover:border-cyan-400/50'
            }`}
            title={tool.label}
          >
            <tool.icon
              className={`w-8 h-8 ${
                selectedTool === tool.id ? 'text-cyan-300' : 'text-cyan-500/70'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Tool label */}
      <div className="cut-corner bg-[#0a1628]/80 border border-cyan-500/30 backdrop-blur-sm px-5 py-3">
        <p className="text-cyan-400 text-sm font-mono uppercase tracking-wider whitespace-nowrap">
          {tools.find(t => t.id === selectedTool)?.label}
        </p>
      </div>
    </div>
  );
}
