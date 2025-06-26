import React from 'react'
import { Sparkles, Server, GitBranch, Terminal } from 'lucide-react' // Import icons

const blockTypes = [
  { type: 'input', label: 'Input Block', icon: <Sparkles size={16} /> }, // Add icon prop
  { type: 'api', label: 'API Call', icon: <Server size={16} /> }, // Add icon prop
  { type: 'decision', label: 'Decision Point', icon: <GitBranch size={16} /> }, // Add icon prop
  { type: 'output', label: 'Output Block', icon: <Terminal size={16} /> }, // Add icon prop
]

const Sidebar = () => {
  const handleDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData('application/reactflow', type)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="w-48 p-4 bg-gray-900 border-r border-gray-700 h-screen text-gray-200">
      <h2 className="text-sm font-bold mb-4 text-gray-100">🧱 Block Library</h2>
      {blockTypes.map((block) => (
        <div
          key={block.type}
          draggable
          onDragStart={(e) => handleDragStart(e, block.type)}
          className="p-2 mb-2 cursor-move rounded bg-gray-700 text-gray-100 text-sm hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2 font-semibold tracking-wide" // Added font-semibold and tracking-wide
        >
          {block.icon} {/* Render icon */}
          {block.label}
        </div>
      ))}
    </div>
  )
}

export default Sidebar
