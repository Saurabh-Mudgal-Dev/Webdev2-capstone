// src/utils/markdownRenderer.js
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked to handle custom things if needed later
marked.setOptions({
  gfm: true,
  breaks: true,
});

export function renderMarkdown(markdownText) {
  if (!markdownText) return '';
  
  // 1. Process wikilinks to HTML links BEFORE marked processes the rest
  // This replaces [[My Note]] with <a href="#/editor/title-match" class="wikilink">My Note</a>
  const preprocessed = markdownText.replace(/\[\[(.*?)\]\]/g, (match, p1) => {
    const parts = p1.split('|');
    const target = parts[0].trim();
    const alias = parts.length > 1 ? parts[1].trim() : target;
    return `<a href="#" data-note="${target}" class="wikilink">${alias}</a>`;
  });

  // 2. Parse markdown to HTML
  const rawHtml = marked.parse(preprocessed);

  // 3. Sanitize the HTML to prevent XSS
  return DOMPurify.sanitize(rawHtml, {
    ADD_ATTR: ['data-note'] // allow our custom data attribute
  });
}
