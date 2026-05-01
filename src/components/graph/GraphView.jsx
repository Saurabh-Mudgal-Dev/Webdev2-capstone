// src/components/graph/GraphView.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../../hooks/useNotes';
import { extractWikilinks } from '../../utils/wikilinkParser';
import { calculateCircularLayout } from '../../utils/graphLayout';

export default function GraphView() {
  const { notes, setActiveNoteId } = useNotes();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Resize observer to keep SVG responsive
  useEffect(() => {
    if (containerRef.current) {
      const observer = new ResizeObserver(function(entries) {
        for (let i = 0; i < entries.length; i++) {
          setDimensions({
            width: entries[i].contentRect.width,
            height: entries[i].contentRect.height
          });
        }
      });
      observer.observe(containerRef.current);
      
      return function cleanup() {
        observer.disconnect();
      };
    }
  }, []);

  // Compute graph data (nodes and edges) when notes or dimensions change
  useEffect(() => {
    let rawNodes = [];
    for (let i = 0; i < notes.length; i++) {
      rawNodes.push({
        id: notes[i].id,
        title: notes[i].title,
        linkCount: 0 // We'll compute this to size the nodes
      });
    }

    let foundEdges = [];
    
    for (let i = 0; i < notes.length; i++) {
      const sourceNote = notes[i];
      const links = extractWikilinks(sourceNote.content);
      
      for (let j = 0; j < links.length; j++) {
        const linkTitle = links[j].toLowerCase();
        
        // Find the target node
        let targetNode = null;
        for (let k = 0; k < rawNodes.length; k++) {
          if (rawNodes[k].title.toLowerCase() === linkTitle) {
            targetNode = rawNodes[k];
            break;
          }
        }

        if (targetNode) {
          foundEdges.push({ source: sourceNote.id, target: targetNode.id });
          
          // Increment link counts
          for (let k = 0; k < rawNodes.length; k++) {
            if (rawNodes[k].id === sourceNote.id) {
              rawNodes[k].linkCount = rawNodes[k].linkCount + 1;
            }
          }
          targetNode.linkCount = targetNode.linkCount + 1;
        }
      }
    }

    // Apply layout
    const positionedNodes = calculateCircularLayout(rawNodes, dimensions.width, dimensions.height);

    setNodes(positionedNodes);
    setEdges(foundEdges);
  }, [notes, dimensions.width, dimensions.height]); // update when these change

  function handleNodeClick(id) {
    setActiveNoteId(id);
    navigate(`/editor/${id}`);
  }

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', background: 'var(--bg-primary)', position: 'relative' }}>
      <svg width={dimensions.width} height={dimensions.height} style={{ display: 'block' }}>
        {/* Draw Edges */}
        {edges.map(function(edge, i) {
          let source = null;
          let target = null;
          
          for (let j = 0; j < nodes.length; j++) {
            if (nodes[j].id === edge.source) source = nodes[j];
            if (nodes[j].id === edge.target) target = nodes[j];
          }
          
          if (!source || !target) return null;
          
          let isHighlighted = false;
          if (hoveredNode === source.id || hoveredNode === target.id) {
            isHighlighted = true;
          }
          
          return (
            <line
              key={`edge-${i}`}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke={isHighlighted ? '#00f2ff' : 'rgba(0, 242, 255, 0.2)'}
              strokeWidth={isHighlighted ? 2 : 1}
              opacity={isHighlighted ? 1 : 0.4}
              style={{ transition: 'all 0.3s' }}
            />
          );
        })}

        {/* Draw Nodes */}
        {nodes.map(function(node) {
          // Node radius scales with number of links (min 8, max 24)
          let radius = 8 + (node.linkCount * 2);
          if (radius > 24) radius = 24;
          
          let isHovered = false;
          if (hoveredNode === node.id) {
            isHovered = true;
          }
          
          return (
            <g 
              key={node.id} 
              transform={`translate(${node.x}, ${node.y})`}
              onMouseEnter={function() { setHoveredNode(node.id); }}
              onMouseLeave={function() { setHoveredNode(null); }}
              onClick={function() { handleNodeClick(node.id); }}
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
            >
              <circle
                r={radius}
                fill={node.linkCount === 0 ? '#1a1a2e' : '#00f2ff'}
                stroke={isHovered ? 'white' : 'rgba(0, 242, 255, 0.1)'}
                strokeWidth={isHovered ? 2 : 0}
                style={{ filter: isHovered ? 'drop-shadow(0 0 15px rgba(0, 242, 255, 0.5))' : 'none', transition: 'all 0.2s' }}
              />
              <text
                y={radius + 16}
                textAnchor="middle"
                fill={isHovered ? '#e0f2ff' : '#8bb6d9'}
                fontSize={isHovered ? "14px" : "12px"}
                fontWeight={isHovered ? "bold" : "normal"}
                style={{ transition: 'all 0.2s', pointerEvents: 'none' }}
              >
                {node.title}
              </text>
            </g>
          );
        })}
      </svg>
      
      {nodes.length === 0 && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#4a6b8c' }}>
          Create some notes and link them to see the graph!
        </div>
      )}
    </div>
  );
}
