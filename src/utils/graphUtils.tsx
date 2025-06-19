// utils/graphUtils.ts
import {type LogicBlock } from '../types/LogicBlock'

export function topologicalSort(blocks: LogicBlock[]): LogicBlock[] {
    const inDegree: Record<string, number> = {}
    const adj: Record<string, string[]> = {}
    const map: Record<string, LogicBlock> = {}
  
    blocks.forEach((block) => {
      inDegree[block.id] = 0
      adj[block.id] = []
      map[block.id] = block
    })
  
    blocks.forEach((block) => {
      block.outputs.forEach((outId) => {
        adj[block.id].push(outId)
        inDegree[outId]++
      })
    })
  
    const queue: string[] = Object.keys(inDegree).filter((id) => inDegree[id] === 0)
    const sorted: LogicBlock[] = []
  
    while (queue.length > 0) {
      const currentId = queue.shift()!
      sorted.push(map[currentId])
  
      adj[currentId].forEach((neighbor) => {
        inDegree[neighbor]--
        if (inDegree[neighbor] === 0) {
          queue.push(neighbor)
        }
      })
    }
  
    if (sorted.length !== blocks.length) {
      throw new Error("Cycle detected or invalid graph")
    }
  
    return sorted
  }
  