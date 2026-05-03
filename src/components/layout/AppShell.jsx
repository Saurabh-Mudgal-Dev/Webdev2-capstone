// src/components/layout/AppShell.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ParticlesBackground from '../ui/ParticlesBackground';

export default function AppShell(props) {
  const { 
    sidebarOpen, 
    toggleSidebar, 
    currentView, 
    setCurrentView, 
    notes, 
    activeNoteId, 
    setActiveNoteId,
    handleCreateNote,
    handleDeleteNote,
    previewMode,
    togglePreview,
    theme,
    toggleTheme,
    activeNoteTitle,
    children 
  } = props;
  
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let gridColumns = '1fr';
  if (!isMobile && sidebarOpen) {
    gridColumns = '280px 1fr';
  }

  const sidebarStyle = isMobile ? {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '280px',
    zIndex: 100,
    transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  } : {
    width: sidebarOpen ? '280px' : '0px',
    overflow: 'hidden',
    zIndex: 10,
    transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  };


  return (
    <div>
      <ParticlesBackground />
      <div style={{
        display: 'grid',
        gridTemplateColumns: gridColumns,
        height: '100vh',
        transition: 'grid-template-columns 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
          <div 
            onClick={toggleSidebar}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 90
            }}
          />
        )}

        <aside className="glass-panel-heavy" style={sidebarStyle}>
          <div style={{ width: '280px', height: '100%' }}>
            <Sidebar 
              notes={notes}
              activeNoteId={activeNoteId}
              setActiveNoteId={setActiveNoteId}
              handleCreateNote={handleCreateNote}
              handleDeleteNote={handleDeleteNote}
              currentView={currentView}
              setCurrentView={setCurrentView}
            />
          </div>
        </aside>
        
        <main style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100vh', 
          overflow: 'hidden',
          position: 'relative'
        }}>
          <header className="glass-panel" style={{ 
            padding: '8px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '64px',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            zIndex: 5
          }}>
            <Topbar 
              toggleSidebar={toggleSidebar}
              previewMode={previewMode}
              togglePreview={togglePreview}
              currentView={currentView}
              setCurrentView={setCurrentView}
              theme={theme}
              toggleTheme={toggleTheme}
              activeNoteTitle={activeNoteTitle}
            />
          </header>
          <div className="animate-fade-in" style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
