// src/components/canvas/NoteCardNode.jsx
import React from 'react';
import { renderSimpleMarkdown } from '../../utils/simpleMarkdown';

export default function NoteCardNode({ data }) {
  const previewText =
    data.content.length > 150
      ? data.content.substring(0, 150) + '...'
      : data.content;

  return (
    <div
      className="glass-panel"
      style={{
        padding: 'var(--space-4)',
        width: '250px',
        color: 'var(--text-primary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
      }}
    >
      <h3
        className="glow-text"
        style={{
          fontSize: '1rem',
          marginBottom: 'var(--space-2)',
          borderBottom: '1px solid var(--border)',
          paddingBottom: 'var(--space-2)',
        }}
      >
        {data.title}
      </h3>

      <div
        style={{
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          maxHeight: '80px',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
        dangerouslySetInnerHTML={{
          __html: renderSimpleMarkdown(previewText),
        }}
      />

      <div style={{ marginTop: 'var(--space-3)', textAlign: 'right' }}>
        <button
          onClick={data.onOpen}
          style={{
            fontSize: '0.7rem',
            color: 'var(--accent)',
            background: 'transparent',
            border: '1px solid var(--accent-glow)',
            padding: '2px 8px',
            borderRadius: '2px',
            cursor: 'pointer',
          }}
        >
          OPEN
        </button>
      </div>
    </div>
  );
}