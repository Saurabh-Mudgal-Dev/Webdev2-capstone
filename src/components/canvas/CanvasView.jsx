// src/components/canvas/CanvasView.jsx
import React, { useEffect, useState } from 'react';
import { 
  ReactFlow, 
  Controls, 
  Background,
  useNodesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import NoteCardNode from './NoteCardNode';

const nodeTypes = {
  noteCard: NoteCardNode,
};

export default function CanvasView(props) {
  const { notes, setActiveNoteId } = props;
  
  // Load saved node positions from localStorage
  const [savedNodes, setSavedNodes] = useState(() => {
    const saved = localStorage.getItem('cognivault-canvas-nodes');
    return saved ? JSON.parse(saved) : [];
  });

  // Build the initial nodes array
  const initialNodes = notes.map((note, index) => {
    const saved = savedNodes.find(n => n.id === note.id);
    
    // Default grid position if not saved
    let position = { x: (index % 3) * 350 + 50, y: Math.floor(index / 3) * 300 + 50 };
    if (saved) {
      position = saved.position;
    }

    return {
      id: note.id,
      type: 'noteCard',
      position: position,
      data: { 
        title: note.title, 
        content: note.content,
        onOpen: () => setActiveNoteId(note.id)
      }
    };
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  // Sync node positions to local storage
  useEffect(() => {
    localStorage.setItem('cognivault-canvas-nodes', JSON.stringify(nodes));
  }, [nodes]);

  // When a user finishes dragging a node
  const onNodeDragStop = (event, node) => {
    const newNodes = nodes.map((n) => {
      if (n.id === node.id) {
        return node;
      }
      return n;
    });
    setNodes(newNodes);
  };

  return (
    <div style={{ width: '100%', height: '100%', background: 'transparent' }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        fitView
        colorMode={props.theme}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
