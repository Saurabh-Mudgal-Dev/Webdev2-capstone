// src/pages/EditorPage.jsx
import React from 'react';
import NoteEditor from '../components/editor/NoteEditor';
import MarkdownPreview from '../components/editor/MarkdownPreview';
import BacklinksPanel from '../components/editor/BacklinksPanel';

export default function EditorPage(props) {
  const { activeNote, updateNote, previewMode, notes, setActiveNoteId } = props;

  if (!activeNote) {
    return <div style={{ padding: '24px', color: 'white' }}>Loading...</div>;
  }

  return (
    <div className="editor-layout">
      <div style={{ flex: 1, position: 'relative' }}>
        {previewMode ? (
          <MarkdownPreview content={activeNote.content} />
        ) : (
          <NoteEditor note={activeNote} updateNote={updateNote} />
        )}
      </div>
      
      <BacklinksPanel 
        noteId={activeNote.id} 
        notes={notes} 
        setActiveNoteId={setActiveNoteId} 
      />
    </div>
  );
}
