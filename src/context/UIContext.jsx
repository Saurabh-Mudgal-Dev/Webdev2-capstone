// src/context/UIContext.jsx
import React, { createContext, useState } from 'react';

export const UIContext = createContext(null);

export function UIProvider(props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [previewMode, setPreviewMode] = useState(false);

  function toggleSidebar() {
    if (sidebarOpen === true) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }

  function toggleTheme() {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  function togglePreview() {
    if (previewMode === true) {
      setPreviewMode(false);
    } else {
      setPreviewMode(true);
    }
  }

  const value = {
    sidebarOpen: sidebarOpen,
    toggleSidebar: toggleSidebar,
    theme: theme,
    toggleTheme: toggleTheme,
    previewMode: previewMode,
    togglePreview: togglePreview
  };

  return (
    <UIContext.Provider value={value}>
      {props.children}
    </UIContext.Provider>
  );
}
