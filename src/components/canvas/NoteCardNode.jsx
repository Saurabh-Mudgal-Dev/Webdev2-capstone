// src/components/canvas/NoteCardNode.jsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { renderMarkdown } from '../../utils/markdownRenderer';

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
      {/* ✅ TARGET */}
      <Handle
        type="target"
        id="top"
        position={Position.Top}
        style={{
          background: 'var(--accent-secondary)',
          width: '10px',
          height: '10px',
          border: '2px solid var(--bg-primary)',
        }}
      />

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
          __html: renderMarkdown(previewText),
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

      {/* ✅ SOURCE */}
      <Handle
        type="source"
        id="bottom"
        position={Position.Bottom}
        style={{
          background: 'var(--accent)',
          width: '10px',
          height: '10px',
          border: '2px solid var(--bg-primary)',
        }}
      />
    </div>
  );
}