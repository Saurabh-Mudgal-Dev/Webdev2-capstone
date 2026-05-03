// src/components/ui/Button.jsx
import React from 'react';

export default function Button({ variant = 'solid', children, onClick, style, className, disabled, title }) {
  // Use CSS classes instead of complex JS logic
  const variantClass = `btn-${variant}`;
  
  return (
    <button 
      className={`btn ${variantClass} ${className || ''}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
        {children}
      </span>
      <div className="btn-scan" />
    </button>
  );
}
