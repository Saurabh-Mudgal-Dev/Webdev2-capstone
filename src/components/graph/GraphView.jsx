// src/components/graph/GraphView.jsx
import React, { useMemo, useState } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { extractWikilinks } from '../../utils/wikilinkParser';

// A simple circular node for the graph
const GraphNode = ({ data }) => {
  const radius = 10 + (data.linkCount * 2);
  const size = Math.min(radius * 2, 40);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      {/* Handles with IDs and minimal size. Positioned exactly at center. */}
      <Handle 
        id="target"
        type="target" 
        position={Position.Top} 
        style={{ background: 'transparent', border: 'none', top: '50%', left: '50%', width: '1px', height: '1px' }} 
      />
      <Handle 
        id="source"
        type="source" 
        position={Position.Bottom} 
        style={{ background: 'transparent', border: 'none', top: '50%', left: '50%', width: '1px', height: '1px' }} 
      />
      
      <div style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: 'var(--accent)',
        border: '1px solid var(--border-focus)',
        boxShadow: 'var(--shadow-glow)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        zIndex: 10
      }} />
      <div style={{ 
        marginTop: '8px', 
        fontSize: '12px', 
        color: 'var(--text-primary)', 
        fontWeight: 'bold',
        textShadow: 'none',
        whiteSpace: 'nowrap',
        pointerEvents: 'none'
      }}>
        {data.label}
      </div>
    </div>
  );
};

const nodeTypes = {
  graphNode: GraphNode
};

export default function GraphView(props) {
  const { notes, setActiveNoteId } = props;
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Load saved node positions from localStorage
  const [savedNodes, setSavedNodes] = React.useState(() => {
    const saved = localStorage.getItem('cognivault-graph-nodes');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync node positions to local storage
  React.useEffect(() => {
    if (nodes.length > 0) {
      localStorage.setItem('cognivault-graph-nodes', JSON.stringify(nodes));
    }
  }, [nodes]);

  // Calculate Nodes and Edges when notes or hover state changes
  React.useEffect(() => {
    const nodesArr = [];
    const edgesArr = [];
    const centerX = 400;
    const centerY = 300;
    const radius = 250;

    if (!notes || notes.length === 0) {
      setNodes([]);
      setEdges([]);
      return;
    }

    // Create Nodes
    notes.forEach((note, i) => {
      const angle = (i / notes.length) * 2 * Math.PI;
      
      // Calculate link count
      let linkCount = 0;
      notes.forEach(otherNote => {
        if (otherNote.id === note.id) return;
        const links = extractWikilinks(otherNote.content);
        if (links.some(l => l.toLowerCase() === (note.title || "").toLowerCase())) {
          linkCount++;
        }
      });

      nodesArr.push({
        id: note.id,
        type: 'graphNode',
        position: { 
          x: centerX + radius * Math.cos(angle), 
          y: centerY + radius * Math.sin(angle) 
        },
        data: { label: note.title, linkCount: linkCount }
      });
    });

    // Create Edges
    notes.forEach(sourceNote => {
      const links = extractWikilinks(sourceNote.content);
      links.forEach(linkTitle => {
        const targetNote = notes.find(n => (n.title || "").toLowerCase() === (linkTitle || "").toLowerCase());
        if (targetNote && targetNote.id !== sourceNote.id) {
          const isHovered = hoveredNodeId === sourceNote.id || hoveredNodeId === targetNote.id;
          
          edgesArr.push({
            id: `edge-${sourceNote.id}-${targetNote.id}`,
            source: sourceNote.id,
            target: targetNote.id,
            sourceHandle: 'source',
            targetHandle: 'target',
            type: 'straight',
            animated: true,
            style: { 
              strokeWidth: isHovered ? 4 : 2, 
              opacity: isHovered ? 1 : 0.4,
            },
            zIndex: isHovered ? 10 : 1
          });
        }
      });
    });

    setNodes((prevNodes) => {
      return nodesArr.map(n => {
        const prev = prevNodes.find(pn => pn.id === n.id);
        const saved = savedNodes.find(sn => sn.id === n.id);
        if (prev) {
          return { ...n, position: prev.position };
        } else if (saved) {
          return { ...n, position: saved.position };
        }
        return n;
      });
    });
    setEdges(edgesArr);
  }, [notes, hoveredNodeId, setNodes, setEdges, savedNodes]);

  if (!notes || notes.length === 0) {
    return (
      <div style={{ width: '100%', height: '100%', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        Create some notes to see the graph!
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', background: 'transparent' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(e, node) => setActiveNoteId(node.id)}
        onNodeMouseEnter={(e, node) => setHoveredNodeId(node.id)}
        onNodeMouseLeave={() => setHoveredNodeId(null)}
        nodeTypes={nodeTypes}
        fitView
        colorMode={props.theme}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
