import { type Node, type Edge } from '@xyflow/react'

export interface LogicBlock {
  id: string
  type: 'input' | 'output' | 'decision' | 'api'
  label: string
  description: string
  outputs: string[]
}

export function convertFlowToLogicBlocks(nodes: Node[], edges: Edge[]): LogicBlock[] {
  return nodes.map((node) => {
    const outgoingEdges = edges.filter((e) => e.source === node.id)
    const outputs = outgoingEdges.map((e) => e.target)

    return {
      id: node.id,
      type: node.data.logicType,
      label: node.data.label,
      description: node.data.description,
      outputs,
    }
  })
}
