// src/App.jsx
import React, { useState, useEffect } from 'react';
import AppShell from './components/layout/AppShell';
import EditorPage from './pages/EditorPage';
import GraphPage from './pages/GraphPage';
import CanvasPage from './pages/CanvasPage';
import FlashcardsPage from './pages/FlashcardsPage';

function App() {
  // --- STATE ---
  
  // Initialize notes from localStorage
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('cognivault-notes');
    return saved ? JSON.parse(saved) : [];
  });

  // UI State
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [currentView, setCurrentView] = useState('editor'); // 'editor', 'graph', 'canvas'
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [theme, setTheme] = useState('dark');

  // --- EFFECTS ---

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cognivault-notes', JSON.stringify(notes));
  }, [notes]);

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle initial redirect/welcome
  useEffect(() => {
    if (notes.length > 0 && !activeNoteId) {
      setActiveNoteId(notes[0].id);
    } else if (notes.length === 0) {
      handleCreateNote();
    }
  }, []);

  // --- HANDLERS ---

  function handleCreateNote() {
    const newNote = {
      id: crypto.randomUUID(),
      title: 'Untitled Note',
      content: '# Untitled Note\n\nStart writing here...',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setCurrentView('editor');
    return newNote.id;
  }

  function handleUpdateNote(id, patch) {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return { ...note, ...patch, updatedAt: Date.now() };
      }
      return note;
    });
    setNotes(updatedNotes);
  }

  function handleDeleteNote(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (confirmDelete) {
      const filtered = notes.filter(n => n.id !== id);
      setNotes(filtered);
      if (activeNoteId === id) {
        setActiveNoteId(filtered.length > 0 ? filtered[0].id : null);
      }
    }
  }

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  function togglePreview() {
    setPreviewMode(!previewMode);
  }

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  // --- RENDERING ---

  const activeNote = notes.find(n => n.id === activeNoteId) || null;

  function renderView() {
    if (currentView === 'graph') {
      return <GraphPage notes={notes} setActiveNoteId={(id) => { setActiveNoteId(id); setCurrentView('editor'); }} />;
    }
    if (currentView === 'canvas') {
      return <CanvasPage notes={notes} setActiveNoteId={(id) => { setActiveNoteId(id); setCurrentView('editor'); }} />;
    }
    if (currentView === 'flashcards') {
      return <FlashcardsPage notes={notes} setActiveNoteId={(id) => { setActiveNoteId(id); setCurrentView('editor'); }} />;
    }
    // Default to editor
    return (
      <EditorPage 
        activeNote={activeNote} 
        updateNote={handleUpdateNote}
        previewMode={previewMode}
        notes={notes}
        setActiveNoteId={setActiveNoteId}
      />
    );
  }

  return (
    <AppShell
      sidebarOpen={sidebarOpen}
      toggleSidebar={toggleSidebar}
      currentView={currentView}
      setCurrentView={setCurrentView}
      notes={notes}
      activeNoteId={activeNoteId}
      setActiveNoteId={setActiveNoteId}
      handleCreateNote={handleCreateNote}
      handleDeleteNote={handleDeleteNote}
      previewMode={previewMode}
      togglePreview={togglePreview}
      theme={theme}
      toggleTheme={toggleTheme}
      activeNoteTitle={activeNote?.title}
    >
      {renderView()}
    </AppShell>
  );
}

export default App;