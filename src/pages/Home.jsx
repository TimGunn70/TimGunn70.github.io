import { useState, useEffect } from 'react';
import ScrambleText from '../components/home/ScrambleText';
import FloatingBoxes from '../components/home/FloatingBoxes';

function Home() {
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    // Show CTA message after scramble animation completes
    const timer = setTimeout(() => {
      setShowCta(true);
    }, 2500); // Adjust timing to match your scramble duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="tab-panel active">
      <div className="matrix-container">
        <ScrambleText text="WELCOME TO MY WEBSITE" />
        <p className={`cta-message ${showCta ? 'show' : ''}`}>
          Click another tab to learn more
        </p>
      </div>
      <FloatingBoxes />
    </div>
  );
}

export default Home;