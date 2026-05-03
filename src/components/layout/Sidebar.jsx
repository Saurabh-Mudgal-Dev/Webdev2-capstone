// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import Button from '../ui/Button';
import FileTree from './FileTree';

// Simple SVG Icons to remove lucide-react dependency
const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00f2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const FolderIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff0055" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px #ff0055)' }}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
);
const TrashIcon = ({ color }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
);

export default function Sidebar(props) {
  const { 
    notes, 
    activeNoteId, 
    setActiveNoteId, 
    handleCreateNote, 
    handleDeleteNote,
    currentView,
    setCurrentView 
  } = props;
  
  const [searchQuery, setSearchQuery] = useState('');

  function onNewNote() {
    handleCreateNote();
    setSearchQuery('');
  }

  let trashIconColor = "var(--text-muted)";
  if (activeNoteId !== null) {
    trashIconColor = "var(--accent)";
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 className="glow-text-alt animate-pulse-glow" style={{ fontSize: '22px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 800, cursor: 'pointer' }} onClick={() => setCurrentView('editor')}>
          <FolderIcon />
          CogniVault
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <Button onClick={onNewNote} style={{ flex: 1, justifyContent: 'center' }}>
          <PlusIcon /> New Note
        </Button>
        <Button 
          variant="icon" 
          onClick={() => handleDeleteNote(activeNoteId)}
          disabled={activeNoteId === null}
          style={{ 
            padding: '8px', 
            border: '1px solid var(--border)',
            opacity: activeNoteId ? 1 : 0.5
          }}
          title="Delete current note"
        >
          <TrashIcon color={trashIconColor} />
        </Button>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        background: 'rgba(255, 255, 255, 0.05)', 
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid var(--border)',
        marginBottom: '8px',
        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)'
      }}>
        <SearchIcon />
        <input 
          type="text" 
          placeholder="Search vault..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '14px', color: 'var(--text-primary)', marginLeft: '8px' }}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <FileTree 
          notes={notes} 
          activeNoteId={activeNoteId} 
          setActiveNoteId={(id) => { setActiveNoteId(id); setCurrentView('editor'); }}
          searchQuery={searchQuery} 
        />
      </div>
    </div>
  );
}
