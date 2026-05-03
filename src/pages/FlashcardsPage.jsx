// src/pages/FlashcardsPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { extractFlashcards } from '../utils/flashcardParser';

export default function FlashcardsPage({ notes, setActiveNoteId }) {
  const allCards = useMemo(() => extractFlashcards(notes), [notes]);
  const [selectedNoteId, setSelectedNoteId] = useState('all');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCards, setSessionCards] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get unique notes that actually have flashcards for the filter dropdown
  const notesWithCards = useMemo(() => {
    const ids = [...new Set(allCards.map(c => c.noteId))];
    return notes.filter(n => ids.includes(n.id));
  }, [allCards, notes]);

  const selectedNoteTitle = selectedNoteId === 'all' 
    ? 'All Notes' 
    : (notes.find(n => n.id === selectedNoteId)?.title || 'All Notes');

  // Initialize session cards when notes or filter change
  useEffect(() => {
    let filtered = allCards;
    if (selectedNoteId !== 'all') {
      filtered = allCards.filter(c => c.noteId === selectedNoteId);
    }
    
    // Simple shuffle
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setSessionCards(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [allCards, selectedNoteId]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % sessionCards.length);
    }, 300); // Wait for flip animation to finish before changing text
  };

  if (sessionCards.length === 0 && selectedNoteId === 'all') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', color: 'var(--text-muted)' }}>
        <h2 className="glow-text" style={{ marginBottom: '16px' }}>No Flashcards Found</h2>
        <p>Create flashcards in your notes using this syntax:</p>
        <pre className="glass-panel" style={{ marginTop: '16px', padding: '16px', borderRadius: '8px', color: 'var(--text-primary)' }}>
          Q: What is React?{'\n'}
          A: A JavaScript library for building user interfaces.
        </pre>
      </div>
    );
  }

  const currentCard = sessionCards[currentCardIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', position: 'relative' }}>
      
      {/* Custom Dropdown Filter */}
      <div style={{ marginBottom: '40px', position: 'relative', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 'bold' }}>Filter by Note:</span>
          
          <div 
            className="glass-panel glow-hover"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{ 
              padding: '8px 20px', 
              borderRadius: '8px', 
              minWidth: '200px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer',
              border: '1px solid var(--accent-glow)',
              background: 'rgba(0, 242, 255, 0.05)'
            }}
          >
            <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{selectedNoteTitle}</span>
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="var(--accent)" 
              strokeWidth="3" 
              style={{ transition: 'transform 0.3s', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        {isDropdownOpen && (
          <div 
            className="glass-panel-heavy animate-fade-in"
            style={{ 
              position: 'absolute', 
              top: '100%', 
              right: 0, 
              width: '200px', 
              marginTop: '8px', 
              borderRadius: '8px', 
              overflow: 'hidden',
              border: '1px solid var(--accent-glow)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            <div 
              style={{ 
                padding: '10px 16px', 
                cursor: 'pointer', 
                transition: 'all 0.2s', 
                background: selectedNoteId === 'all' ? 'rgba(0, 242, 255, 0.15)' : 'transparent', 
                color: selectedNoteId === 'all' ? 'var(--accent)' : 'var(--text-primary)' 
              }}
              onClick={() => { setSelectedNoteId('all'); setIsDropdownOpen(false); }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(0, 242, 255, 0.15)';
                e.target.style.color = 'var(--accent)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = selectedNoteId === 'all' ? 'rgba(0, 242, 255, 0.15)' : 'transparent';
                e.target.style.color = selectedNoteId === 'all' ? 'var(--accent)' : 'var(--text-primary)';
              }}
            >
              All Notes
            </div>
            {notesWithCards.map(note => (
              <div 
                key={note.id}
                style={{ 
                  padding: '10px 16px', 
                  cursor: 'pointer', 
                  transition: 'all 0.2s', 
                  background: selectedNoteId === note.id ? 'rgba(0, 242, 255, 0.15)' : 'transparent', 
                  color: selectedNoteId === note.id ? 'var(--accent)' : 'var(--text-primary)', 
                  borderTop: '1px solid rgba(255,255,255,0.05)' 
                }}
                onClick={() => { setSelectedNoteId(note.id); setIsDropdownOpen(false); }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(0, 242, 255, 0.15)';
                  e.target.style.color = 'var(--accent)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = selectedNoteId === note.id ? 'rgba(0, 242, 255, 0.15)' : 'transparent';
                  e.target.style.color = selectedNoteId === note.id ? 'var(--accent)' : 'var(--text-primary)';
                }}
              >
                {note.title}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
        Card {currentCardIndex + 1} of {sessionCards.length}
      </div>

      {/* The 3D Flip Container */}
      <div 
        style={{ 
          perspective: '1000px', 
          width: 'min(400px, 90vw)', 
          height: 'min(250px, 40vh)',
          cursor: 'pointer'
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transition: 'transform 0.6s',
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front of Card (Question) */}
          <div 
            className="glass-panel-heavy"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backfaceVisibility: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px',
              borderRadius: '16px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-glow)',
              border: '1px solid var(--border-focus)'
            }}
          >
            <span style={{ position: 'absolute', top: '16px', left: '16px', fontSize: '12px', color: 'var(--accent)', fontWeight: 'bold' }}>Q</span>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', lineHeight: '1.5' }}>
              {currentCard.question}
            </h3>
            <div style={{ position: 'absolute', bottom: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
              Click to reveal
            </div>
          </div>

          {/* Back of Card (Answer) */}
          <div 
            className="glass-panel"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backfaceVisibility: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px',
              borderRadius: '16px',
              textAlign: 'center',
              transform: 'rotateY(180deg)',
              background: 'rgba(0, 242, 255, 0.05)', // Bluish tinge for answer
              border: '1px solid var(--accent)'
            }}
          >
            <span style={{ position: 'absolute', top: '16px', left: '16px', fontSize: '12px', color: 'var(--accent-secondary)', fontWeight: 'bold' }}>A</span>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', lineHeight: '1.5' }}>
              {currentCard.answer}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '40px', opacity: isFlipped ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: isFlipped ? 'auto' : 'none' }}>
        <button 
          className="glow-border"
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          style={{
            padding: '12px 24px',
            background: 'transparent',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Needs Review
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          style={{
            padding: '12px 24px',
            background: 'var(--accent)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 0 15px var(--accent-glow)'
          }}
        >
          Got it!
        </button>
      </div>

      {/* Source Note Link */}
      <div style={{ marginTop: '32px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        From note: <span style={{ color: 'var(--accent)', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setActiveNoteId(currentCard.noteId)}>{currentCard.noteTitle}</span>
      </div>
    </div>
  );
}
