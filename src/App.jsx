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
      id: "note-" + Date.now(),
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
    setNotes(notes.map(note => note.id === id ? { ...note, ...patch, updatedAt: Date.now() } : note));
  }

  function handleDeleteNote(id) {
    if (window.confirm("Delete this note?")) {
      const filtered = notes.filter(n => n.id !== id);
      setNotes(filtered);
      if (activeNoteId === id) setActiveNoteId(filtered[0]?.id || null);
    }
  }

  function renderView() {
    switch (currentView) {
      case 'graph': return <GraphPage notes={notes} theme={theme} setActiveNoteId={(id) => { setActiveNoteId(id); setCurrentView('editor'); }} />;
      case 'canvas': return <CanvasPage notes={notes} theme={theme} setActiveNoteId={(id) => { setActiveNoteId(id); setCurrentView('editor'); }} />;
      case 'flashcards': return <FlashcardsPage notes={notes} theme={theme} setActiveNoteId={(id) => { setActiveNoteId(id); setCurrentView('editor'); }} />;
      default: return (
        <EditorPage 
          activeNote={notes.find(n => n.id === activeNoteId)} 
          updateNote={handleUpdateNote}
          previewMode={previewMode}
          notes={notes}
          setActiveNoteId={setActiveNoteId}
        />
      );
    }
  }

  return (
    <AppShell
      sidebarOpen={sidebarOpen}
      toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      currentView={currentView}
      setCurrentView={setCurrentView}
      notes={notes}
      activeNoteId={activeNoteId}
      setActiveNoteId={setActiveNoteId}
      handleCreateNote={handleCreateNote}
      handleDeleteNote={handleDeleteNote}
      previewMode={previewMode}
      togglePreview={() => setPreviewMode(!previewMode)}
      theme={theme}
      toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      activeNoteTitle={notes.find(n => n.id === activeNoteId)?.title}
      updateNote={handleUpdateNote}
    >
      {renderView()}
    </AppShell>
  );
}

export default App;