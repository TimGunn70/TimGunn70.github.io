import { useState, useEffect, useRef } from 'react';

function ScrambleText({ text }) {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalsRef = useRef([]);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*#@/*!%&^".split('');

  const randomCharacter = () => {
    return characters[Math.floor(Math.random() * characters.length)];
  };

  const generateScrambled = (length) => {
    return Array(length).fill('').map(() => randomCharacter()).join('');
  };

  const unscramble = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const targetText = text;
    const solveMilliseconds = 800;
    const characterSelectionMilliseconds = 40;
    const delayMilliseconds = 250;

    // Clear any existing intervals
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];

    let delay = 0;

    targetText.split('').forEach((char, index) => {
      setTimeout(() => {
        const intervalId = setInterval(() => {
          setDisplayText(prev => {
            const chars = prev.split('');
            chars[index] = randomCharacter();
            return chars.join('');
          });
        }, characterSelectionMilliseconds);

        intervalsRef.current.push(intervalId);

        setTimeout(() => {
          clearInterval(intervalId);
          setDisplayText(prev => {
            const chars = prev.split('');
            chars[index] = char;
            return chars.join('');
          });
        }, solveMilliseconds);
      }, delay);

      delay += delayMilliseconds;
    });

    // Lock animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, delay + solveMilliseconds);
  };

  useEffect(() => {
    // Initial scrambled state
    setDisplayText(generateScrambled(text.length));
    
    // Start unscrambling after a short delay
    const timer = setTimeout(() => {
      unscramble();
    }, 800);

    return () => {
      clearTimeout(timer);
      intervalsRef.current.forEach(clearInterval);
    };
  }, []);

  const handleClick = () => {
    if (!isAnimating) {
      setDisplayText(generateScrambled(text.length));
      setTimeout(unscramble, 100);
    }
  };

  return (
    <a 
      href="#" 
      className={`cipher ${isAnimating ? 'active' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      {displayText}
    </a>
  );
}

export default ScrambleText;