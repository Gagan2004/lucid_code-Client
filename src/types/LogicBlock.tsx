// types/LogicBlock.ts
export type LogicBlock = {
    id: string
    type: string
    label: string
    description?: string
    inputs: string[]   // node ids
    outputs: string[]  // node ids
  }
  