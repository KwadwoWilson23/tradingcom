'use client';
import * as React from "react"
import { Sidebar } from './sidebar';
import { Header } from './header';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <React.Suspense fallback={null}>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      </React.Suspense>
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 pt-16">
          <div className="px-4 lg:px-8 py-6 max-w-container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
