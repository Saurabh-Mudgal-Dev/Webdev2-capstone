// src/components/editor/BacklinksPanel.jsx
import React from 'react';

// Simple SVG
const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
);

export default function BacklinksPanel(props) {
  const { noteId, notes, setActiveNoteId } = props;

  // Find backlinks (beginner style: loop through all notes)
  const backlinks = [];
  
  // Get current note to find its title for matching wikilinks
  let currentNote = null;
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === noteId) {
      currentNote = notes[i];
      break;
    }
  }

  if (currentNote) {
    const searchTitle = currentNote.title.toLowerCase();
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      // Don't link to itself
      if (note.id === noteId) continue;
      
      // Check if note content contains [[Current Note Title]]
      if (note.content.toLowerCase().includes(`[[${searchTitle}]]`) || 
          note.content.toLowerCase().includes(`[[${searchTitle}|`)) {
        backlinks.push(note);
      }
    }
  }

  return (
    <div className="glass-panel-heavy backlinks-panel">
      <h3 className="glow-text" style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-primary)' }}>
        <LinkIcon />
        Backlinks ({backlinks.length})
      </h3>
      
      {backlinks.length === 0 ? (
        <div style={{ 
          background: 'var(--surface)', 
          padding: '16px', 
          borderRadius: '8px',
          border: '1px dashed var(--border)',
          textAlign: 'center'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            No connections yet.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {backlinks.map(function(note, index) {
            let preview = note.content;
            if (preview.startsWith('# ')) {
               preview = preview.substring(2);
            }

            return (
              <div 
                key={note.id}
                onClick={() => setActiveNoteId(note.id)}
                className="animate-slide-in-right"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both',
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={function(e) {
                  e.currentTarget.style.borderColor = 'var(--border-focus)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={function(e) {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <strong style={{ color: 'var(--text-primary)' }}>{note.title}</strong>
                <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {preview}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
