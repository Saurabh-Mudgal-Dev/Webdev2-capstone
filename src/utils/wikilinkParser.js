// src/utils/wikilinkParser.js
export function extractWikilinks(text) {
  if (!text) {
    return [];
  }

  const links = [];
  // Regular expression to find [[something]]
  const regex = /\[\[(.*?)\]\]/g;
  
  let match;
  while ((match = regex.exec(text)) !== null) {
    const linkText = match[1];
    links.push(linkText);
  }

  return links;
}
