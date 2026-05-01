// src/components/layout/FileTree.jsx
import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../../hooks/useNotes';

export default function FileTree(props) {
  const notesContext = useNotes();
  const notes = notesContext.notes;
  const activeNoteId = notesContext.activeNoteId;
  const setActiveNoteId = notesContext.setActiveNoteId;
  
  const navigate = useNavigate();

  function handleNoteClick(id) {
    setActiveNoteId(id);
    navigate(`/editor/${id}`);
  }

  // Filter notes using a simple loop
  const filteredNotes = [];
  const query = props.searchQuery.toLowerCase();
  
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const titleMatch = note.title.toLowerCase().includes(query);
    const contentMatch = note.content.toLowerCase().includes(query);
    
    if (titleMatch || contentMatch) {
      filteredNotes.push(note);
    }
  }

  if (notes.length === 0) {
    return <div style={{ color: '#4a6b8c', fontSize: '14px', padding: '8px' }}>No notes yet.</div>;
  }

  if (filteredNotes.length === 0) {
    return <div style={{ color: '#4a6b8c', fontSize: '14px', padding: '8px' }}>No matches.</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px' }}>
      {filteredNotes.map(function(note) {
        let isActive = false;
        if (activeNoteId === note.id) {
          isActive = true;
        }

        let bgStyle = 'transparent';
        let textColor = '#8bb6d9';
        let borderLeftStyle = '3px solid transparent';
        let iconColor = '#ff0055'; // accent-secondary
        let glowFilter = 'drop-shadow(0 0 5px rgba(255, 0, 85, 0.3))';

        if (isActive) {
          bgStyle = 'rgba(0, 242, 255, 0.05)';
          textColor = '#00f2ff'; // accent
          borderLeftStyle = '3px solid #00f2ff';
          iconColor = '#00f2ff';
          glowFilter = 'drop-shadow(0 0 5px rgba(0, 242, 255, 0.2))';
        }

        return (
          <div 
            key={note.id}
            onClick={function() { handleNoteClick(note.id); }}
            style={{
              padding: '12px',
              borderRadius: '2px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: bgStyle,
              color: textColor,
              borderLeft: borderLeftStyle,
              fontSize: '13px',
              transition: 'all 0.2s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={function(e) {
              if (!isActive) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.color = '#e0f2ff';
              }
            }}
            onMouseLeave={function(e) {
              if (!isActive) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#8bb6d9';
              }
            }}
          >
            <FileText size={14} color={iconColor} style={{ filter: glowFilter }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: isActive ? 700 : 400, letterSpacing: '0.5px' }}>
              {note.title}
            </span>
            {isActive && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
          </div>
        );
      })}
    </div>
  );
}
