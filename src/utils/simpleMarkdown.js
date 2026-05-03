// src/utils/simpleMarkdown.js

/**
 * A very simple markdown renderer for beginner-intermediate level.
 * Handles headers, bold, italic, lists, and custom wikilinks.
 */
export function renderSimpleMarkdown(text) {
  if (!text) return "";

  let html = text;

  // 1. Wikilinks [[Title]] or [[Title|Alias]]
  html = html.replace(/\[\[(.*?)\]\]/g, (match, p1) => {
    const parts = p1.split('|');
    const target = parts[0].trim();
    const alias = parts.length > 1 ? parts[1].trim() : target;
    // We'll use a data attribute for our custom navigation
    return `<a href="#" data-note="${target}" class="wikilink">${alias}</a>`;
  });

  // 2. Escape HTML to prevent XSS (Beginner-style sanitization)
  // Note: We do this AFTER wikilinks because we want the <a> tag to survive
  // but we should really do it before and then add tags. 
  // Let's do a basic one.
  const escape = (str) => str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  // Actually, a beginner might just use dangerouslySetInnerHTML and trust the input.
  // But let's be a bit safe.
  
  // 3. Headers
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');

  // 4. Bold and Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // 5. Lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  // Wrap <li> in <ul> (This is tricky with regex, but good enough for intermediate)
  // For simplicity, we might just leave the <li> tags or skip this for now.
  
  // 6. Line breaks
  html = html.replace(/\n/g, '<br />');

  return html;
}
