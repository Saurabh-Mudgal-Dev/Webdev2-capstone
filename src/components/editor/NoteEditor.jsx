// src/components/editor/NoteEditor.jsx
import React, { useEffect, useState } from 'react';
import { useNotes } from '../../hooks/useNotes';

export default function NoteEditor(props) {
  const notesContext = useNotes();
  const updateNote = notesContext.updateNote;
  
  let initialContent = '';
  if (props.note) {
    initialContent = props.note.content;
  }
  const [localContent, setLocalContent] = useState(initialContent);

  useEffect(() => {
    if (props.note) {
      setLocalContent(props.note.content);
    } else {
      setLocalContent('');
    }
  }, [props.note]);

  function handleChange(event) {
    const newContent = event.target.value;
    setLocalContent(newContent);
    
    let title = 'Untitled Note';
    const lines = newContent.split('\n');
    if (lines.length > 0 && lines[0].trim().length > 0) {
      title = lines[0].replace(/^#+\s/, '').trim();
    }

    if (props.note) {
      updateNote(props.note.id, { content: newContent, title: title });
    }
  }

  return (
    <div className="glass-panel" style={{
      width: '100%',
      height: '100%',
      margin: '16px',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 8px 32px rgba(0,0,0,0.7)'
    }}>
      <textarea
        value={localContent}
        onChange={handleChange}
        style={{
          flex: 1,
          width: '100%',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          resize: 'none',
          fontSize: '18px',
          lineHeight: '1.7',
          padding: '24px',
          fontFamily: 'monospace',
          color: 'white',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}
        placeholder="Start typing your thoughts..."
      />
    </div>
  );
}
