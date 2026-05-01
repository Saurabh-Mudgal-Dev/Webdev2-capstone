// src/components/layout/AppShell.jsx
import React from 'react';
import { useUI } from '../../hooks/useUI';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ParticlesBackground from '../ui/ParticlesBackground';

export default function AppShell(props) {
  const uiContext = useUI();
  const sidebarOpen = uiContext.sidebarOpen;
  
  let gridColumns = '0px 1fr';
  if (sidebarOpen === true) {
    gridColumns = '280px 1fr';
  }

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
        <aside className="glass-panel-heavy" style={{ 
          overflow: 'hidden',
          zIndex: 10
        }}>
          <div style={{ width: '280px', height: '100%' }}>
            <Sidebar />
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
            <Topbar />
          </header>
          <div className="animate-fade-in" style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
            {props.children}
          </div>
        </main>
      </div>
    </div>
  );
}
