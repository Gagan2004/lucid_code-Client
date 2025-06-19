// utils/aiGenerator.ts
import {type LogicBlock } from './logicGraph'

export function generatePseudocodeFromGraph(blocks: LogicBlock[]): string {
  const lines: string[] = []
  const visited = new Set<string>()

  function dfs(blockId: string, indent: number = 0) {
    const block = blocks.find((b) => b.id === blockId)
    if (!block || visited.has(block.id)) return

    visited.add(block.id)
    const prefix = '  '.repeat(indent)

    switch (block.type) {
      case 'input':
        lines.push(`${prefix}// Input: ${block.label}`)
        break
      case 'decision':
        lines.push(`${prefix}if (${block.label}) {`)
        block.outputs.forEach((outId) => dfs(outId, indent + 1))
        lines.push(`${prefix}}`)
        return // already recursed in this block
      case 'api':
        lines.push(`${prefix}callApi('${block.label}')`)
        break
      case 'output':
        lines.push(`${prefix}return ${block.label}`)
        break
      default:
        lines.push(`${prefix}// ${block.type}: ${block.label}`)
    }

    block.outputs.forEach((outId) => dfs(outId, indent))
  }

  const startNode = blocks.find((b) => b.type === 'input') || blocks[0]
  if (startNode) dfs(startNode.id)

  return lines.join('\n')
}
