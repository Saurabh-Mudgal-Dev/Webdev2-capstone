// src/pages/CanvasPage.jsx
import React from 'react';
import CanvasView from '../components/canvas/CanvasView';

export default function CanvasPage(props) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Spatial Canvas</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Organize your notes spatially. Drag them around and connect them.</p>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <CanvasView notes={props.notes} theme={props.theme} setActiveNoteId={props.setActiveNoteId} />
      </div>
    </div>
  );
}
