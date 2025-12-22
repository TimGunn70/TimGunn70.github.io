import { useEffect, useRef } from 'react';
import VanillaTilt from '../../utils/vanilla-tilt.js';

function AboutCard() {
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
    <div ref={cardRef} className="About-Card">
      <div className="content-parallax">
        <div className="personal-image">
          <img src="/tgunn2@nd.edu-1.jpg" alt="Timothy Gunn" />
        </div>
        <div className="bio">
          <h3>About me</h3>
          <p>
            My name is Tim Gunn and I am a student at the University of Notre Dame studying Computer Science. 
            I'm driven by a deep curiosity and a passion for continuous learning, especially in areas like data science and machine learning.
            I enjoy breaking down complex problems, uncovering patterns in data, and using analytical thinking to build solutions that make a real-world impact.
            Outside of tech, I enjoy working out, playing basketball with friends, and watching Cardinals baseball.
          </p>
          <h3>Contact</h3>
          <p>
            If you have any questions or would like to collaborate feel free to contact me at: tgunn2@nd.edu
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutCard;