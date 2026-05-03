// src/pages/GraphPage.jsx
import React from 'react';
import GraphView from '../components/graph/GraphView';

export default function GraphPage(props) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <h2>Knowledge Graph</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>A visual map of how your notes are connected via wikilinks.</p>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <GraphView notes={props.notes} setActiveNoteId={props.setActiveNoteId} />
      </div>
    </div>
  );
}
