// src/components/editor/MarkdownPreview.jsx
import React, { useMemo } from 'react';
import { renderMarkdown } from '../../utils/markdownRenderer';

export default function MarkdownPreview({ content }) {
  const html = useMemo(() => renderMarkdown(content), [content]);

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
