import * as React from "react"
import { X } from "lucide-react"

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, title, children, className = '' }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className={`relative z-50 w-full max-w-lg bg-white rounded-xl shadow-modal border border-slate-200 p-6 m-4 flex flex-col max-h-[90vh] ${className}`}>
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-headline-md font-semibold text-slate-900">{title}</h2>
            <button 
              onClick={onClose}
              className="rounded-full p-1 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors ml-auto"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
