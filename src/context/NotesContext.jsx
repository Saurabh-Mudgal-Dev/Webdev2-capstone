// src/context/NotesContext.jsx
import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [notes, setNotes] = useLocalStorage('cognivault-notes', []);
  const [activeNoteId, setActiveNoteId] = useState(null);

  const createNote = useCallback(() => {
    const newNote = {
      id: crypto.randomUUID(),
      title: 'Untitled Note',
      content: '# Untitled Note\n\nStart writing here...',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setNotes(prev => [newNote, ...prev]);
    return newNote.id;
  }, [setNotes]);

  const updateNote = useCallback((id, patch) => {
    setNotes(prev => prev.map(note =>
      note.id === id ? { ...note, ...patch, updatedAt: Date.now() } : note
    ));
  }, [setNotes]);

  const deleteNote = useCallback((id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    if (activeNoteId === id) {
      setActiveNoteId(null);
    }
  }, [activeNoteId, setNotes]);

  const activeNote = useMemo(() =>
    notes.find(n => n.id === activeNoteId) || null
    , [notes, activeNoteId]);

  const value = {
    notes,
    activeNote,
    activeNoteId,
    setActiveNoteId,
    createNote,
    updateNote,
    deleteNote
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
}
