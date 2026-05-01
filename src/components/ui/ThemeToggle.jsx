// src/components/ui/ThemeToggle.jsx
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useUI } from '../../hooks/useUI';
import Button from './Button';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUI();
  
  return (
    <Button variant="icon" onClick={toggleTheme} title="Toggle Theme">
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}
