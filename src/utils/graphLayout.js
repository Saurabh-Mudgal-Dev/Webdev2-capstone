// src/utils/graphLayout.js
export function calculateCircularLayout(nodes, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  // Make the radius fit inside the screen with some padding
  let radius = width / 3;
  if (height / 3 < radius) {
    radius = height / 3;
  }

  const totalNodes = nodes.length;

  for (let i = 0; i < totalNodes; i++) {
    const angle = (i / totalNodes) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    nodes[i].x = x;
    nodes[i].y = y;
  }

  return nodes;
}
