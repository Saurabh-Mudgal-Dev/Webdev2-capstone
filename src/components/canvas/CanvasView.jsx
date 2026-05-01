// src/components/canvas/CanvasView.jsx
import React, { useEffect, useState } from 'react';
import { 
  ReactFlow, 
  Controls, 
  Background,
  useNodesState,
  useEdgesState,
  addEdge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../../hooks/useNotes';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import NoteCardNode from './NoteCardNode';

const nodeTypes = {
  noteCard: NoteCardNode,
};

export default function CanvasView() {
  const { notes, setActiveNoteId } = useNotes();
  const navigate = useNavigate();
  
  const [savedNodes, setSavedNodes] = useLocalStorage('cognivault-canvas-nodes', []);
  const [savedEdges, setSavedEdges] = useLocalStorage('cognivault-canvas-edges', []);

  // Simple function to open a note
  const handleOpenNote = (id) => {
    setActiveNoteId(id);
    navigate(`/editor/${id}`);
  };

  // Build the initial nodes array
  const initialNodes = notes.map((note, index) => {
    const saved = savedNodes.find(n => n.id === note.id);
    
    // If we have a saved position, use it. Otherwise, calculate a grid position.
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
        onOpen: () => handleOpenNote(note.id)
      }
    };
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(savedEdges);

  // When a connection is made
  const onConnect = (params) => {
    const edge = { 
      ...params, 
      animated: true, 
      id: `edge-${Date.now()}`,
      style: { stroke: '#00f2ff', strokeWidth: 2 } 
    };
    
    // Add the edge to React Flow
    const newEdges = addEdge(edge, edges);
    setEdges(newEdges);
    
    // Save to local storage
    setSavedEdges(newEdges);
  };

  // When a user finishes dragging a node
  const onNodeDragStop = (event, node) => {
    const newNodes = nodes.map((n) => {
      if (n.id === node.id) {
        return node;
      }
      return n;
    });
    setNodes(newNodes);
    setSavedNodes(newNodes);
  };

  // When a user deletes an edge
  const onEdgesDelete = (deletedEdges) => {
    const newEdges = edges.filter((edge) => {
      // Keep the edge if it's NOT in the deleted list
      return !deletedEdges.find((deleted) => deleted.id === edge.id);
    });
    setEdges(newEdges);
    setSavedEdges(newEdges);
  };

  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--bg-primary)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onEdgesDelete={onEdgesDelete}
        nodeTypes={nodeTypes}
        fitView
        colorMode="dark"
      >
        <Background color="#111" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
