// src/components/layout/FileTree.jsx
import React from 'react';

const FileIcon = ({ color, filter }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);

const StarIcon = ({ filled, onClick }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "var(--accent)" : "none"} stroke={filled ? "var(--accent)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={(e) => { e.stopPropagation(); onClick(); }} style={{ cursor: 'pointer', filter: filled ? 'drop-shadow(0 0 4px var(--accent-glow-strong))' : 'none', opacity: filled ? 1 : 0.4 }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export default function FileTree({ notes, activeNoteId, setActiveNoteId, searchQuery, updateNote }) {
  // Beginner-friendly filtering and sorting
  const query = (searchQuery || "").toLowerCase().trim();
  const filtered = notes
    .filter(n => n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query))
    .sort((a, b) => (b.pinned - a.pinned) || (b.updatedAt - a.updatedAt));

  if (notes.length === 0) return <div style={{ color: 'var(--text-muted)', padding: '8px' }}>No notes yet.</div>;
  if (filtered.length === 0) return <div style={{ color: 'var(--text-muted)', padding: '8px' }}>No matches found.</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px' }}>
      {filtered.map(note => (
        <div 
          key={note.id} 
          onClick={() => setActiveNoteId(note.id)}
          className={`note-item ${activeNoteId === note.id ? 'active' : ''}`}
        >
          <FileIcon 
            color={activeNoteId === note.id ? 'var(--accent)' : 'var(--accent-secondary)'} 
            filter={activeNoteId === note.id ? 'var(--shadow-glow)' : 'var(--pink-glow)'} 
          />
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: activeNoteId === note.id ? 700 : 400 }}>
            {note.title}
          </span>
          <StarIcon filled={note.pinned} onClick={() => updateNote(note.id, { pinned: !note.pinned })} />
        </div>
      ))}
    </div>
  );
}
