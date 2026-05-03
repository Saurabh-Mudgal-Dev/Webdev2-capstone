// src/components/layout/FileTree.jsx
import React from 'react';

// Simple SVGs
const FileIcon = ({ color, filter }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);
const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

export default function FileTree(props) {
  const { notes, activeNoteId, setActiveNoteId, searchQuery } = props;

  // Filter notes using a simple loop
  const filteredNotes = [];
  const query = (searchQuery || "").toLowerCase();
  
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
        let isActive = (activeNoteId === note.id);

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
            onClick={() => setActiveNoteId(note.id)}
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
            <FileIcon color={iconColor} filter={glowFilter} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: isActive ? 700 : 400, letterSpacing: '0.5px' }}>
              {note.title}
            </span>
            {isActive && <div style={{ marginLeft: 'auto' }}><ChevronIcon /></div>}
          </div>
        );
      })}
    </div>
  );
}
