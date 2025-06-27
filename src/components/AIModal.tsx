// Test comment
// src/components/AIModal.tsx
import React from 'react'

interface AIModalProps {
  open: boolean
  onClose: () => void
  title: string
  output: string
}

export default function AIModal({ open, onClose, title, output }: AIModalProps) {
  if (!open) return null

  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    //   <div className="relative bg-black rounded-lg w-11/12 max-w-4xl max-h-[80vh] overflow-auto p-4 shadow-lg">
    //     {/* Header */}
    //     <div className="flex justify-between items-center mb-4">
    //       <h2 className="text-lg font-semibold">{title}</h2>
    //       <button
    //         onClick={onClose}
    //         className="text-gray-500 hover:text-gray-700"
    //         aria-label="Close modal"
    //       >
    //         ✕
    //       </button>
    //     </div>

    //     {/* Content */}
    //     <pre className="bg-gray-100 text-gray-800 p-4 rounded whitespace-pre-wrap overflow-x-auto text-sm">
    //       {output}
    //     </pre>
    //   </div>
    // </div>

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
  <div className="relative bg-zinc-900 rounded-xl w-11/12 max-w-4xl max-h-[80vh] overflow-auto shadow-2xl border border-zinc-700">
    {/* Header */}
    <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-700">
      <h2 className="text-xl font-semibold text-white tracking-wide">{title}</h2>
      <button
        onClick={onClose}
        className="text-zinc-400 hover:text-white transition-colors duration-200 text-2xl leading-none"
        aria-label="Close modal"
      >
        &times;
      </button>
    </div>

    {/* Content */}
    <div className="p-6"> {/* Added padding directly to this div for consistency */}
      <pre className="bg-zinc-800 text-green-400 font-mono p-4 rounded-lg whitespace-pre-wrap overflow-x-auto text-sm leading-relaxed border border-zinc-700 shadow-inner">
        {output}
      </pre>
    </div>
  </div>
</div>

    
  )
}
