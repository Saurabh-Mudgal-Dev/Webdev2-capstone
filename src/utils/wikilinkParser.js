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
    // If there's a pipe (alias), take only the target part
    const linkText = match[1].split('|')[0].trim();
    links.push(linkText);
  }

  return links;
}
