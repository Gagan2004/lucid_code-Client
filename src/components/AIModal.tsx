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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg w-11/12 max-w-4xl max-h-[80vh] overflow-auto p-4 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <pre className="bg-gray-100 text-gray-800 p-4 rounded whitespace-pre-wrap overflow-x-auto text-sm">
          {output}
        </pre>
      </div>
    </div>
  )
}
