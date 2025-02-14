import charToBinary from './constants/binary';
import './styles.css'
import React, { useEffect, useState } from 'react';
import { MatrixDisplayProps, Pattern, CharPattern } from './types';
// Define interfaces for the data structures

const createPattern = (text: string): Pattern => {
  const pattern: Pattern = Array.from({ length: 5 }, () => Array.from({ length: 30 }, () => 0));
  let pos = 0;
  
  text.split('').forEach(char => {
    const charPattern = (charToBinary as Record<string, CharPattern>)[char.toUpperCase()];
    if (charPattern) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          pattern[i][pos + j] = charPattern[i][j];
        }
      }
      pos += 5;
    }
  });
  
  return pattern;
};

const MatrixDisplay: React.FC<MatrixDisplayProps> = ({ texts, duration = 5000 }) => {
  const [textIndex, setTextIndex] = useState<number>(0);
  const [displayPattern, setDisplayPattern] = useState<Pattern>(() => createPattern(texts[textIndex].pattern));
  const [nextPattern, setNextPattern] = useState<Pattern>(() => createPattern(texts[(textIndex+1)%texts.length].pattern));
  const [currentCol, setCurrentCol] = useState<number>(-1);

  useEffect(() => {
    const timer = setInterval(startTransition, duration);
    return () => clearInterval(timer);
  }, [textIndex, duration]);

  const startTransition = (): void => {
    const transitionSpeed = Math.floor(duration / 80); // Adjust transition speed based on duration
    for(let col = 0; col < 30; col++) {
      setTimeout(() => {
        setCurrentCol(col);
        setDisplayPattern(prev => {
          const newPattern = [...prev.map(row => [...row])];
          for(let row = 0; row < 5; row++) {
            newPattern[row][col] = nextPattern[row][col];
          }
          return newPattern;
        });

        if(col === 29) {
          setTimeout(() => {
            setTextIndex(prev => (prev + 1) % texts.length);
            setCurrentCol(-1);
          }, 250);
        }
      }, col * transitionSpeed);
    }
    setNextPattern(createPattern(texts[(textIndex + 2) % texts.length].pattern));
  };

  return (
    <div className="facts-wrapper">
      <div className="pattern-grid">
        {displayPattern.map((row, i) => (
          <div key={i} className="pattern-row">
            {row.map((cell, j) => (
              <div
                key={j}
                className={`pattern-cell ${cell ? 'active' : 'inactive'} ${(j+1) % 5 === 0 ? 'space-after' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="facts-secondary-text">
        {texts[textIndex].secondary_text}
      </div>
    </div>
  );
};

export default MatrixDisplay;
