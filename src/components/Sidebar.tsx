import React from 'react'

const blockTypes = [
  { type: 'input', label: 'Input Block' },
  { type: 'api', label: 'API Call' },
  { type: 'decision', label: 'Decision Point' },
  { type: 'output', label: 'Output Block' },
]

const Sidebar = () => {
  const handleDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData('application/reactflow', type)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="w-48 p-4 bg-gray-100 border-r h-screen">
      <h2 className="text-sm font-bold mb-4">🧱 Block Library</h2>
      {blockTypes.map((block) => (
        <div
          key={block.type}
          draggable
          onDragStart={(e) => handleDragStart(e, block.type)}
          className="p-2 mb-2 cursor-move rounded bg-white shadow-sm text-sm border hover:bg-gray-50"
        >
          {block.label}
        </div>
      ))}
    </div>
  )
}

export default Sidebar
