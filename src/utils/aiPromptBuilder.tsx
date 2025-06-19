// utils/aiPromptBuilder.ts
import {type LogicBlock } from '../types/LogicBlock'

export function buildPrompt(blocks: LogicBlock[], mode: 'pseudocode'|'explanation'|'code'): string {
    const base = JSON.stringify(blocks, null, 2)
  
    switch (mode) {
      case 'pseudocode':
        return `Convert the following logic blocks into readable pseudocode:\n${base}`
  
      case 'explanation':
        return `Explain the function of the following logic blocks in natural language:\n${base}`
  
      case 'code':
        return `Convert the logic blocks into runnable JavaScript code using async functions and axios for APIs. Add comments:\n${base}`
    }
  }
  