// src/components/layout/Topbar.jsx
import React from 'react';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';

// Simple SVGs
const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff0055" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);
const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

export default function Topbar(props) {
  const { 
    toggleSidebar, 
    previewMode, 
    togglePreview, 
    currentView, 
    setCurrentView,
    activeNoteTitle 
  } = props;
  
  const isEditor = currentView === 'editor';

  let titleText = activeNoteTitle || 'CogniVault';

  let editorVariant = isEditor ? 'solid' : 'ghost';
  let graphVariant = currentView === 'graph' ? 'solid' : 'ghost';
  let canvasVariant = currentView === 'canvas' ? 'solid' : 'ghost';
  let flashcardsVariant = currentView === 'flashcards' ? 'solid' : 'ghost';

  return (
    <React.Fragment>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button variant="icon" onClick={toggleSidebar}>
          <MenuIcon />
        </Button>
        
        <div style={{ 
          display: 'flex', 
          background: 'rgba(0,0,0,0.5)', 
          padding: '2px', 
          borderRadius: '4px',
          border: '1px solid rgba(0, 242, 255, 0.1)',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
        }}>
          <Button 
            variant={editorVariant} 
            onClick={() => setCurrentView('editor')} 
            style={{ padding: '6px 12px', fontSize: '10px', border: 'none', boxShadow: 'none' }}
          >
            Editor
          </Button>
          <Button 
            variant={graphVariant} 
            onClick={() => setCurrentView('graph')} 
            style={{ padding: '6px 12px', fontSize: '10px', border: 'none', boxShadow: 'none' }}
          >
            Graph
          </Button>
          <Button 
            variant={canvasVariant} 
            onClick={() => setCurrentView('canvas')} 
            style={{ padding: '6px 12px', fontSize: '10px', border: 'none', boxShadow: 'none' }}
          >
            Canvas
          </Button>
          <Button 
            variant={flashcardsVariant} 
            onClick={() => setCurrentView('flashcards')} 
            style={{ padding: '6px 12px', fontSize: '10px', border: 'none', boxShadow: 'none' }}
          >
            Flashcards
          </Button>
        </div>
      </div>

      <div className="glow-text animate-flicker desktop-only" style={{ flex: 1, textAlign: 'center', fontWeight: 800, letterSpacing: '2px', fontSize: '13px', textTransform: 'uppercase' }}>
        {titleText}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isEditor && (
          <Button 
            variant="icon" 
            onClick={togglePreview} 
            title={previewMode ? "Switch to Edit" : "Switch to Preview"}
            style={{ border: '1px solid rgba(0, 242, 255, 0.1)' }}
          >
            {previewMode ? <EditIcon /> : <EyeIcon />}
          </Button>
        )}
        <ThemeToggle theme={props.theme} toggleTheme={props.toggleTheme} />
      </div>
    </React.Fragment>
  );
}
