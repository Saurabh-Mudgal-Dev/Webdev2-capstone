// src/components/editor/NoteEditor.jsx
import React, { useState } from 'react';

export default function NoteEditor({ note, updateNote }) {
  // Beginner-friendly: Just use the initial note content as the starting state
  // The 'key' in the parent will handle refreshing this when a new note is picked
  const [content, setContent] = useState(note ? note.content : '');

  function handleChange(e) {
    const newContent = e.target.value;
    setContent(newContent);
    
    // Auto-extract title from the first line
    const title = newContent.split('\n')[0].replace(/^#+\s/, '').trim() || 'Untitled Note';

    if (note) {
      updateNote(note.id, { content: newContent, title: title });
    }
  }

  return (
    <div className="glass-panel" style={{ width: '100%', height: '100%', margin: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
      <textarea
        value={content}
        onChange={handleChange}
        className="editor-textarea"
        placeholder="Start typing your thoughts..."
        style={{
          flex: 1, padding: '24px', background: 'transparent', border: 'none', outline: 'none',
          resize: 'none', fontSize: '18px', lineHeight: '1.7', color: 'var(--text-primary)',
          fontFamily: 'var(--font-mono)'
        }}
      />
    </div>
  );
}
