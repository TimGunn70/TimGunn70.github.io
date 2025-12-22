import { useEffect, useRef } from 'react';
import VanillaTilt from '../../utils/vanilla-tilt.js';

function ProjectCard({ title, description, image, alternate }) {
  const cardRef = useRef(null);

  useEffect(() => {
    // Only initialize tilt on non-touch devices
    const isTouchDevice = ('ontouchstart' in window) || 
                          (navigator.maxTouchPoints > 0) || 
                          (navigator.msMaxTouchPoints > 0);
    
    if (cardRef.current && !isTouchDevice) {
      VanillaTilt.init(cardRef.current, {
        max: 10,
        speed: 100,
        perspective: 2000,
        glare: true,
        'max-glare': 0.8
      });
    }

    // Cleanup
    return () => {
      if (cardRef.current && cardRef.current.vanillaTilt) {
        cardRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`Project-Card ${alternate ? 'alternate-card' : ''}`}
    >
      <div className="content-parallax">
        <div className="project-image">
          <img src={image} alt={title} />
        </div>
        <div className="project-details">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;