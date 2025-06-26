// src/App.tsx
import React, { useCallback, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import CustomNode from './components/CustomNode'
import Sidebar from './components/Sidebar'
import AIModal from './components/AIModal'

import { convertFlowToLogicBlocks } from './utils/flowToLogic'
import { buildPrompt } from './utils/aiPromptBuilder'

const nodeTypes = {
  custom: CustomNode,
}

let id = 1
const getId = () => `node_${id++}`

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 100, y: 100 },
    data: {
      label: 'Start Block',
      description: 'This is the entry point.',
      logicType: 'input',
    },
  },
]

const initialEdges: Edge[] = []

function App() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const [aiOutput, setAiOutput] = useState<string>('')
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false)
  const [aiMode, setAiMode] = useState<'pseudocode' | 'explanation' | 'code'>(
    'pseudocode'
  )

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  )

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      const type = event.dataTransfer.getData('application/reactflow')
      const position = { x: event.clientX - 250, y: event.clientY }

      const newNode: Node = {
        id: getId(),
        type: 'custom',
        position,
        data: {
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} Block`,
          description: `This is a ${type} block`,
          logicType: type,
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [setNodes]
  )

  const handleGenerateAi = async () => {
    // 1. Convert the current flow into LogicBlock[]
    const logicBlocks = convertFlowToLogicBlocks(nodes, edges)

    // 2. Build the prompt based on selected mode
    const prompt = buildPrompt(logicBlocks, aiMode)

    try {
      // 3. Send prompt to backend API
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, mode: aiMode }),
      })
      const { response:reply } = await response.json()

      // 4. Show AI output in modal
      setAiOutput(reply)
      setIsAiModalOpen(true)
    } catch (err) {
      console.error(err)
      alert('AI request failed. Check console for details.')
    }
  }

  return (
    <div className="flex w-full h-screen">
      <Sidebar />

      <div
        className="flex-1 flex flex-col"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* Toolbar */}
        <div className="p-4 flex gap-6 bg-gray-900 border-b border-gray-700 items-center text-gray-200">
          {/* Export JSON */}
          <button
            className=" font-semibold tracking-wide bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={() => {
              const data = JSON.stringify({ nodes, edges }, null, 2)
              const blob = new Blob([data], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'flow.json'
              a.click()
            }}
          >
            Export JSON
          </button>

          {/* Import JSON */}
          <label className="font-semibold tracking-wide bg-green-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-700 transition-colors duration-200">
            Import JSON
            <input
              type="file"
              accept=".json"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const reader = new FileReader()
                reader.onload = (event) => {
                  try {
                    const { nodes: importedNodes, edges: importedEdges } = JSON.parse(
                      event.target?.result as string
                    )
                    setNodes(importedNodes)
                    setEdges(importedEdges)
                  } catch (err) {
                    alert('Invalid JSON file')
                  }
                }
                reader.readAsText(file)
              }}
            />
          </label>

          {/* AI Mode Selector */}
          <select
            className="font-semibold tracking-wide border border-gray-600 rounded p-2 bg-gray-700 text-gray-200 focus:outline-none focus:border-blue-500"
            value={aiMode}
            onChange={(e) =>
              setAiMode(e.target.value as 'pseudocode' | 'explanation' | 'code')
            }
          >
            <option value="pseudocode">Pseudocode</option>
            <option value="explanation">Explanation</option>
            <option value="code">JavaScript Code</option>
          </select>

          {/* Generate AI Output */}
          <button 
            className=" font-semibold tracking-wide bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
            onClick={handleGenerateAi}
          >
            Generate AI Output
          </button>
        </div>

        {/* React Flow Canvas */}
        <ReactFlow className="flex-1"
 nodes={nodes}
 edges={edges}
 onNodesChange={onNodesChange}
 onEdgesChange={onEdgesChange}
 onConnect={onConnect}
 onNodeClick={(_, node) => setSelectedNode(node)}
 nodeTypes={nodeTypes}
 fitView
 style={{ background: '#1e1e1e' }} // Slightly lighter dark background
 >
          <Background variant="dots" gap={12} size={1} color="#444" /> {/* Darker background dots */}
          <Controls
            style={{ bottom: 20, left: 20 }} // Position controls at bottom left
            showZoom={true}
            showFitView={true}
            showInteractive={false}
            className="react-flow__controls--dark" // Custom class for styling
 />
          <MiniMap
            position="bottom-right" // Position minimap at bottom right
 nodeColor={() => '#4a4a4a'} // Darker node color in minimap
            nodeBorderRadius={2}
            maskColor="#22262d99" // Darker mask color
          />
        </ReactFlow>
      </div>

      {/* Edit Block Side Panel */}
      {/* Edit Block Side Panel */}
      {selectedNode && (
        <div className="fixed top-0 right-0 w-80 h-full bg-gray-800 shadow-xl border-l border-gray-700 p-4 z-50 text-gray-200"> {/* Dark theme classes */}
          <h2 className="text-lg font-semibold mb-4 text-gray-100">Edit Block</h2> {/* Darker heading color */}

          <label className="block mb-2 text-sm font-medium text-gray-300">Label</label> {/* Label color */}
          <input
            type="text"
            className="w-full border border-gray-600 rounded p-2 mb-4 bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500" /* Input styling */
            value={selectedNode.data.label}
            onChange={(e) => {
              const updatedLabel = e.target.value
              setSelectedNode((prev) =>
                prev ? { ...prev, data: { ...prev.data, label: updatedLabel } } : null
              )
              setNodes((nds) =>
                nds.map((n) =>
                  n.id === selectedNode.id
                    ? { ...n, data: { ...n.data, label: updatedLabel } }
                    : n
                )
              )
            }}
          />

          <label className="block mb-2 text-sm font-medium text-gray-300">Description</label> {/* Label color */}
          <textarea
            className="w-full border border-gray-600 rounded p-2 mb-4 bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500" /* Textarea styling */
            value={selectedNode.data.description}
            onChange={(e) => {
              const updatedDesc = e.target.value
              setSelectedNode((prev) =>
                prev ? { ...prev, data: { ...prev.data, description: updatedDesc } } : null
              )
              setNodes((nds) =>
                nds.map((n) =>
                  n.id === selectedNode.id
                    ? { ...n, data: { ...n.data, description: updatedDesc } }
                    : n
                )
              )
            }}
          />

          <label className="block mb-2 text-sm font-medium text-gray-300">Logic Type</label> {/* Label color */}
          <select
            className="w-full border border-gray-600 rounded p-2 bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500" /* Select styling */
            value={selectedNode.data.logicType}
            onChange={(e) => {
              const newType = e.target.value
              setSelectedNode((prev) =>
                prev ? { ...prev, data: { ...prev.data, logicType: newType } } : null
              )
              setNodes((nds) =>
                nds.map((n) =>
                  n.id === selectedNode.id
                    ? { ...n, data: { ...n.data, logicType: newType } }
                    : n
                )
              )
            }}
          >
            <option value="input">Input</option>
            <option value="decision">Decision</option>
            <option value="api">API Call</option>
            <option value="output">Output</option>
          </select>

          <button
            className="mt-6 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded" /* Button styling */
            onClick={() => setSelectedNode(null)}
          >
            Close
          </button>
        </div>
      )}


      {/* AI Output Modal */}
      <AIModal
        open={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title={
          aiMode === 'pseudocode'
            ? 'Generated Pseudocode'
            : aiMode === 'explanation'
            ? 'Flow Explanation'
            : 'Generated JavaScript Code'
        }
        output={aiOutput}
      />
    </div>
  )
}

export default App
