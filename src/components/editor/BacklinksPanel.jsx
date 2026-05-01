// src/components/editor/BacklinksPanel.jsx
import React from 'react';
import { Link } from 'lucide-react';
import { useWikiLinks } from '../../hooks/useWikiLinks';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../../hooks/useNotes';

export default function BacklinksPanel(props) {
  const wikiLinks = useWikiLinks(props.noteId);
  const backlinks = wikiLinks.backlinks;
  
  const notesContext = useNotes();
  const setActiveNoteId = notesContext.setActiveNoteId;
  const navigate = useNavigate();

  function handleLinkClick(id) {
    setActiveNoteId(id);
    navigate(`/editor/${id}`);
  }

  return (
    <div className="glass-panel-heavy" style={{
      width: '280px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      borderTop: 'none',
      borderBottom: 'none',
      borderRight: 'none',
      zIndex: 5
    }}>
      <h3 className="glow-text" style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
        <Link size={18} color="#00f2ff" />
        Backlinks ({backlinks.length})
      </h3>
      
      {backlinks.length === 0 ? (
        <div style={{ 
          background: 'rgba(0,0,0,0.2)', 
          padding: '16px', 
          borderRadius: '8px',
          border: '1px dashed rgba(0, 242, 255, 0.1)',
          textAlign: 'center'
        }}>
          <p style={{ color: '#4a6b8c', fontSize: '14px' }}>
            No connections yet.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {backlinks.map(function(note, index) {
            
            // Extract preview text without regex if possible, but keep it simple
            let preview = note.content;
            if (preview.startsWith('# ')) {
               preview = preview.substring(2);
            }

            return (
              <div 
                key={note.id}
                onClick={function() { handleLinkClick(note.id); }}
                className="animate-slide-in-right"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both',
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(15, 15, 25, 0.4)',
                  border: '1px solid rgba(0, 242, 255, 0.1)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={function(e) {
                  e.currentTarget.style.borderColor = 'rgba(0, 242, 255, 0.4)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 242, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={function(e) {
                  e.currentTarget.style.borderColor = 'rgba(0, 242, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <strong style={{ color: 'white' }}>{note.title}</strong>
                <div style={{ color: '#8bb6d9', fontSize: '12px', marginTop: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
