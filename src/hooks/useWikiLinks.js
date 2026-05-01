// src/hooks/useWikiLinks.js
import { useMemo } from 'react';
import { useNotes } from './useNotes';
import { extractWikilinks } from '../utils/wikilinkParser';

export function useWikiLinks(noteId) {
  const { notes } = useNotes();

  // Get the current note
  const note = notes.find(n => n.id === noteId);

  // Calculate outgoing links (links FROM this note TO others)
  const outgoingLinks = useMemo(() => {
    if (!note) return [];
    return extractWikilinks(note.content);
  }, [note]);

  // Calculate incoming links (backlinks FROM others TO this note)
  const backlinks = useMemo(() => {
    if (!note) return [];
    const targetTitle = note.title.toLowerCase();

    return notes.filter(otherNote => {
      if (otherNote.id === note.id) return false;
      const linksInOther = extractWikilinks(otherNote.content);
      return linksInOther.some(link => link.toLowerCase() === targetTitle);
    });
  }, [notes, note]);

  return { outgoingLinks, backlinks };
}
