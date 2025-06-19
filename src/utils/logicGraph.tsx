import { type Node, type Edge } from '@xyflow/react';

export type LogicBlock = {
  id: string
  label: string
  type: string
  description: string
  inputs: string[]
  outputs: string[]
}

export function buildLogicGraph(nodes: Node[], edges: Edge[]): LogicBlock[] {
  const idToBlock: Record<string, LogicBlock> = {}

  // Initialize logic blocks
  nodes.forEach((node) => {
    idToBlock[node.id] = {
      id: node.id,
      label: node.data.label || '',
      type: node.data.logicType || 'unknown',
      description: node.data.description || '',
      inputs: [],
      outputs: [],
    }
  })

  // Populate connections
  edges.forEach((edge) => {
    const source = idToBlock[edge.source]
    const target = idToBlock[edge.target]
    if (source && target) {
      source.outputs.push(target.id)
      target.inputs.push(source.id)
    }
  })

  return Object.values(idToBlock)
}
