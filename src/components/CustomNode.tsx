import React from 'react'
import { Handle, Position } from '@xyflow/react'
import { Sparkles, Server, GitBranch, Terminal } from 'lucide-react'
import type { NodeProps } from '@xyflow/react';


export type CustomNodeData = {
    label?: string;
    description?: string;
    logicType: 'input' | 'api' | 'decision' | 'output';
  };

const icons: any = {
  input: <Sparkles className="text-blue-500" size={20} />,
  api: <Server className="text-purple-500" size={20} />,
  decision: <GitBranch className="text-yellow-500" size={20} />,
  output: <Terminal className="text-green-500" size={20} />,
}

const CustomNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="bg-white border-2 rounded-lg shadow-md px-4 py-3 w-56">
      <div className="flex items-center gap-2 mb-1">
        {icons[data.logicType]}
        <h3 className="font-bold text-sm">{data.label || 'Untitled Block'}</h3>
      </div>
      <p className="text-xs text-gray-500">{data.description || 'No description.'}</p>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      {/* <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} /> */}

    </div>
  )
}

export default CustomNode
