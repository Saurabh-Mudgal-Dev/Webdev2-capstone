// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import Button from '../ui/Button';
import FileTree from './FileTree';

const PlusIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const SearchIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const FolderIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'var(--shadow-glow)' }}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>;
const TrashIcon = ({ active }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--accent)" : "var(--text-muted)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

export default function Sidebar({ notes, activeNoteId, setActiveNoteId, handleCreateNote, handleDeleteNote, setCurrentView, updateNote }) {
  const [query, setQuery] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px' }}>
      <h2 className="glow-text-alt animate-pulse-glow" style={{ fontSize: '22px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 800, marginBottom: '24px', cursor: 'pointer' }} onClick={() => setCurrentView('editor')}>
        <FolderIcon /> CogniVault
      </h2>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <Button onClick={() => { handleCreateNote(); setQuery(''); }} style={{ flex: 1 }}>
          <PlusIcon /> New Note
        </Button>
        <Button variant="icon" onClick={() => handleDeleteNote(activeNoteId)} disabled={!activeNoteId}>
          <TrashIcon active={!!activeNoteId} />
        </Button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', background: 'var(--surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '8px' }}>
        <SearchIcon />
        <input placeholder="Search vault..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', marginLeft: '8px', color: 'var(--text-primary)' }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <FileTree notes={notes} activeNoteId={activeNoteId} setActiveNoteId={(id) => { setActiveNoteId(id); setCurrentView('editor'); }} searchQuery={query} updateNote={updateNote} />
      </div>
    </div>
  );
}
