// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UIProvider } from './context/UIContext';
import { NotesProvider } from './context/NotesContext';
import AppShell from './components/layout/AppShell';
import EditorPage from './pages/EditorPage';
import GraphPage from './pages/GraphPage';
import CanvasPage from './pages/CanvasPage';

function App() {
  return (
    <BrowserRouter>
      <UIProvider>
        <NotesProvider>
          <AppShell>
            <Routes>
              <Route path="/" element={<Navigate to="/editor/welcome" replace />} />
              <Route path="/editor/:noteId" element={<EditorPage />} />
              <Route path="/graph" element={<GraphPage />} />
              <Route path="/canvas" element={<CanvasPage />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </AppShell>
        </NotesProvider>
      </UIProvider>
    </BrowserRouter>
  );
}

export default App;