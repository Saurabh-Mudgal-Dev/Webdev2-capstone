// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { Plus, Search, FolderClosed, Trash2 } from 'lucide-react';
import { useNotes } from '../../hooks/useNotes';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import FileTree from './FileTree';

export default function Sidebar() {
  const notesContext = useNotes();
  const createNote = notesContext.createNote;
  const deleteNote = notesContext.deleteNote;
  const activeNoteId = notesContext.activeNoteId;
  
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  function handleCreateNote() {
    const newId = createNote();
    navigate(`/editor/${newId}`);
    setSearchQuery('');
  }

  function handleDelete() {
    if (activeNoteId !== null) {
      const confirmDelete = window.confirm("Are you sure you want to delete this note?");
      if (confirmDelete === true) {
        deleteNote(activeNoteId);
        navigate('/editor/welcome');
      }
    }
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  let trashIconColor = "#4a6b8c"; // text-muted
  if (activeNoteId !== null) {
    trashIconColor = "#ff0055"; // accent-secondary
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 className="glow-text-alt animate-pulse-glow" style={{ fontSize: '22px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 800 }}>
          <FolderClosed size={24} color="#ff0055" style={{ filter: 'drop-shadow(0 0 8px #ff0055)' }} />
          CogniVault
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <Button onClick={handleCreateNote} style={{ flex: 1, justifyContent: 'center' }}>
          <Plus size={18} /> New Note
        </Button>
        <Button 
          variant="icon" 
          onClick={handleDelete}
          disabled={activeNoteId === null}
          style={{ 
            padding: '8px', 
            border: '1px solid rgba(0, 242, 255, 0.1)',
            opacity: activeNoteId ? 1 : 0.5
          }}
          title="Delete current note"
        >
          <Trash2 size={18} color={trashIconColor} />
        </Button>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        background: 'rgba(0,0,0,0.4)', 
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid rgba(0, 242, 255, 0.1)',
        marginBottom: '8px',
        boxShadow: 'inset 0 0 10px rgba(0, 242, 255, 0.05)'
      }}>
        <Search size={16} color="#00f2ff" style={{ marginRight: '8px' }} />
        <input 
          type="text" 
          placeholder="Search vault..." 
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '14px', color: '#e0f2ff' }}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <FileTree searchQuery={searchQuery} />
      </div>
    </div>
  );
}
