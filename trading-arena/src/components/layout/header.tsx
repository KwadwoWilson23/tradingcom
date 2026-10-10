'use client'
import * as React from "react"
import { Search, Bell, Menu } from "lucide-react"
import { Avatar } from "../ui/avatar"

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200 z-30 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden sm:flex relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1D4ED8]/15 focus:border-[#1D4ED8] sm:text-sm transition-colors"
            placeholder="Search competitions..."
          />
        </div>
        
        <select className="hidden md:block appearance-none bg-transparent border-none text-sm font-medium text-slate-700 focus:ring-0 cursor-pointer">
          <option>All Competitions</option>
          <option>Active</option>
          <option>Upcoming</option>
        </select>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-success/10 rounded-full border border-success/20">
          <div className="w-2 h-2 rounded-full bg-success"></div>
          <span className="text-xs font-semibold text-success uppercase tracking-wider">Market Open / Live</span>
        </div>

        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 block w-2 h-2 rounded-full bg-destructive ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="hidden md:block text-right">
            <div className="text-sm font-semibold text-slate-900">Guest</div>
            <div className="text-xs font-medium text-slate-500">No account connected</div>
          </div>
          <Avatar initials="G" size="sm" />
        </div>
      </div>
    </header>
  )
}
