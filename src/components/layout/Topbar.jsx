// src/components/layout/Topbar.jsx
import React from 'react';
import { Menu, Edit3, Eye } from 'lucide-react';
import { useUI } from '../../hooks/useUI';
import { useNotes } from '../../hooks/useNotes';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Topbar() {
  const uiContext = useUI();
  const toggleSidebar = uiContext.toggleSidebar;
  const previewMode = uiContext.previewMode;
  const togglePreview = uiContext.togglePreview;
  
  const notesContext = useNotes();
  const activeNote = notesContext.activeNote;
  
  const navigate = useNavigate();
  const location = useLocation();

  const isEditor = location.pathname.startsWith('/editor');

  let titleText = 'CogniVault';
  if (activeNote) {
    titleText = activeNote.title;
  }

  let editorVariant = 'ghost';
  if (isEditor) editorVariant = 'solid';

  let graphVariant = 'ghost';
  if (location.pathname === '/graph') graphVariant = 'solid';

  let canvasVariant = 'ghost';
  if (location.pathname === '/canvas') canvasVariant = 'solid';

  let toggleIcon;
  if (previewMode === true) {
    toggleIcon = <Edit3 size={18} color="#ff0055"/>;
  } else {
    toggleIcon = <Eye size={18} color="#00f2ff"/>;
  }

  let toggleTitle = "Switch to Preview";
  if (previewMode === true) {
    toggleTitle = "Switch to Edit";
  }

  return (
    <React.Fragment>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button variant="icon" onClick={toggleSidebar}>
          <Menu size={18} color="#00f2ff" />
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
            onClick={function() { navigate('/editor/welcome'); }} 
            style={{ padding: '6px 12px', fontSize: '10px', border: 'none', boxShadow: 'none' }}
          >
            Editor
          </Button>
          <Button 
            variant={graphVariant} 
            onClick={function() { navigate('/graph'); }} 
            style={{ padding: '6px 12px', fontSize: '10px', border: 'none', boxShadow: 'none' }}
          >
            Graph
          </Button>
          <Button 
            variant={canvasVariant} 
            onClick={function() { navigate('/canvas'); }} 
            style={{ padding: '6px 12px', fontSize: '10px', border: 'none', boxShadow: 'none' }}
          >
            Canvas
          </Button>
        </div>
      </div>

      <div className="glow-text animate-flicker" style={{ flex: 1, textAlign: 'center', fontWeight: 800, letterSpacing: '2px', fontSize: '13px', textTransform: 'uppercase' }}>
        {titleText}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isEditor && (
          <Button 
            variant="icon" 
            onClick={togglePreview} 
            title={toggleTitle}
            style={{ border: '1px solid rgba(0, 242, 255, 0.1)' }}
          >
            {toggleIcon}
          </Button>
        )}
        <ThemeToggle />
      </div>
    </React.Fragment>
  );
}
