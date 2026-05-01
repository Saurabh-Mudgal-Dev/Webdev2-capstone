// src/pages/EditorPage.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import { useUI } from '../hooks/useUI';
import NoteEditor from '../components/editor/NoteEditor';
import MarkdownPreview from '../components/editor/MarkdownPreview';
import BacklinksPanel from '../components/editor/BacklinksPanel';

export default function EditorPage() {
  const params = useParams();
  const noteId = params.noteId;
  const navigate = useNavigate();
  
  const notesContext = useNotes();
  const notes = notesContext.notes;
  const activeNote = notesContext.activeNote;
  const setActiveNoteId = notesContext.setActiveNoteId;
  const createNote = notesContext.createNote;
  
  const uiContext = useUI();
  const previewMode = uiContext.previewMode;

  useEffect(() => {
    if (noteId === 'welcome') {
      if (notes.length > 0) {
        // Open first note
        navigate(`/editor/${notes[0].id}`, { replace: true });
      } else {
        // Create first note
        const newId = createNote();
        navigate(`/editor/${newId}`, { replace: true });
      }
    } else if (noteId) {
      if (!activeNote || activeNote.id !== noteId) {
        // Check if ID is valid using a loop
        let exists = false;
        for (let i = 0; i < notes.length; i++) {
          if (notes[i].id === noteId) {
            exists = true;
            break;
          }
        }
        
        if (exists) {
          setActiveNoteId(noteId);
        } else {
          navigate('/editor/welcome', { replace: true });
        }
      }
    }
  }, [noteId, notes.length, activeNote, navigate, createNote, setActiveNoteId]);

  if (!activeNote || noteId === 'welcome') {
    return <div style={{ padding: '24px', color: 'white' }}>Loading...</div>;
  }

  let editorView;
  if (previewMode === true) {
    editorView = <MarkdownPreview content={activeNote.content} />;
  } else {
    editorView = <NoteEditor note={activeNote} />;
  }

  return (
    <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        {editorView}
      </div>
      
      <BacklinksPanel noteId={activeNote.id} />
    </div>
  );
}
