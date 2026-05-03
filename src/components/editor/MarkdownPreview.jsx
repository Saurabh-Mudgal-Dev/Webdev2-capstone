// src/components/editor/MarkdownPreview.jsx
import React from 'react';
import { renderSimpleMarkdown } from '../../utils/simpleMarkdown';

export default function MarkdownPreview({ content }) {
  // Beginner style: directly call the renderer in the render cycle
  const html = renderSimpleMarkdown(content);

  return (
    <div
      className="markdown-preview"
      style={{
        width: '100%',
        height: '100%',
        padding: 'var(--space-4)',
        overflowY: 'auto',
        fontSize: '1.1rem',
        lineHeight: '1.6'
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
