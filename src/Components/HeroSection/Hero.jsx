import React from 'react';
import { Link } from 'react-router-dom'; // Import Link 
import './Hero.css';
import dark_arrow from '../../Assets/dark-arrow.png';

const Hero = () => {
  return (
    <section className='hero container' id='hero'>
      <div className="hero-text">
        <h1>Effortless Fare Payment with Face Recognition</h1>
        <p>
          Simplify and automate your fare payment system. Our advanced face recognition technology 
          accurately deducts fare from your package, saving you time and ensuring reliable records. 
          Ready to experience the future of fare payment?
        </p>
        <Link to="/login" className='btn'> {/* Use Link component */}
          Get Started <img src={dark_arrow} alt="icon_login" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;