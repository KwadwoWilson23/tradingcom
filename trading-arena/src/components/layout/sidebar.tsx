'use client'
import * as React from "react"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Trophy, 
  Award, 
  Hash, 
  User, 
  Settings,
  X
} from "lucide-react"

export function Sidebar({ 
  isOpen, 
  onClose,
  isAdmin = false 
}: { 
  isOpen?: boolean
  onClose?: () => void
  isAdmin?: boolean
}) {
  const currentPath = usePathname()

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Live Leaderboard', icon: Trophy, path: '/leaderboard' },
    { name: 'Competitions', icon: Award, path: '/competitions' },
    { name: 'Join Competition', icon: Hash, path: '/join' },
    { name: 'My Profile', icon: User, path: '/profile' },
  ]

  if (isAdmin) {
    navItems.push({ name: 'Admin Portal', icon: Settings, path: '/admin' })
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      <div className="p-6 flex items-center justify-between">
        <div>
          <h1 className="text-headline-md font-bold text-slate-900 tracking-tight">Traders Ring</h1>
          <p className="text-label-table-header text-slate-400 mt-1">FOREX ARENA</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-2 text-slate-500 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentPath === item.path || (currentPath === '/' && item.path === '/dashboard')
          return (
            <a
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive 
                  ? "bg-[#1D4ED8] text-white font-medium" 
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
              {item.name}
            </a>
          )
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <p className="text-label-sm text-slate-500 mb-2">Broker Bridge</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success"></div>
            <span className="text-sm font-medium text-slate-900">Connected</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 flex-col z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
          <aside className="fixed top-0 left-0 bottom-0 w-64 max-w-[80%] flex-col">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}
