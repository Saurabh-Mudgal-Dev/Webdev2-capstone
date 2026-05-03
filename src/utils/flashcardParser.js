// src/utils/flashcardParser.js

/**
 * Extracts flashcards from notes based on Q: and A: syntax.
 * @param {Array} notes - Array of note objects.
 * @returns {Array} Array of flashcard objects.
 */
export function extractFlashcards(notes) {
  const cards = [];
  
  notes.forEach(note => {
    if (!note.content) return;
    
    const lines = note.content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('Q:')) {
        const question = line.substring(2).trim();
        let answer = '';
        
        // Look ahead for the answer
        for (let j = i + 1; j < lines.length; j++) {
           const nextLine = lines[j].trim();
           if (nextLine.startsWith('A:')) {
             answer = nextLine.substring(2).trim();
             break;
           } else if (nextLine !== '') {
             // If we hit a non-blank line that isn't A:, stop looking.
             // This prevents a Q: from matching with an A: way further down unrelated.
             break; 
           }
        }
        
        if (question && answer) {
          cards.push({
            id: crypto.randomUUID(),
            noteId: note.id,
            noteTitle: note.title,
            question,
            answer
          });
        }
      }
    }
  });
  
  return cards;
}
