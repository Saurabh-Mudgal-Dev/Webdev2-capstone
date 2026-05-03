// src/components/layout/AppShell.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ParticlesBackground from '../ui/ParticlesBackground';

export default function AppShell({ 
  sidebarOpen, toggleSidebar, currentView, setCurrentView, notes, 
  activeNoteId, setActiveNoteId, handleCreateNote, handleDeleteNote,
  previewMode, togglePreview, theme, toggleTheme, activeNoteTitle, 
  updateNote, children 
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Simplified layout logic using flex instead of complex grid
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <ParticlesBackground />
      
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div onClick={toggleSidebar} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 90 }} />
      )}

      {/* Sidebar - uses translateX for mobile and simple width for desktop */}
      <aside className="glass-panel-heavy" style={{
        width: sidebarOpen ? '280px' : '0px',
        minWidth: sidebarOpen ? '280px' : '0px',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        position: isMobile ? 'fixed' : 'relative',
        left: 0, top: 0, bottom: 0, zIndex: 100,
        transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'none',
        overflow: 'hidden'
      }}>
        <div style={{ width: '280px' }}>
          <Sidebar notes={notes} activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} handleCreateNote={handleCreateNote} handleDeleteNote={handleDeleteNote} currentView={currentView} setCurrentView={setCurrentView} updateNote={updateNote} />
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative', zIndex: 1 }}>
        <header className="glass-panel" style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '64px', zIndex: 5, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
          <Topbar toggleSidebar={toggleSidebar} previewMode={previewMode} togglePreview={togglePreview} currentView={currentView} setCurrentView={setCurrentView} theme={theme} toggleTheme={toggleTheme} activeNoteTitle={activeNoteTitle} />
        </header>
        <div className="animate-fade-in" style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
