import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import WeatherWidget from './WeatherWidget';
import SocialLinks from './SocialLinks';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) => {
    // Special case for games - keep active for all /games/* routes
    if (path === '/games') {
      return location.pathname.startsWith('/games');
    }
    // For home, only match exact path
    if (path === '/') {
      return location.pathname === '/';
    }
    // For other routes, match exact path
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
      </div>

      <WeatherWidget />

      <ul className={`nav-tabs ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link 
            to="/" 
            className={`tab-link home-tab ${isActive('/') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/projects" 
            className={`tab-link projects-tab ${isActive('/projects') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Projects
          </Link>
        </li>
        <li>
          <Link 
            to="/games" 
            className={`tab-link games-tab ${isActive('/games') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Games
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            className={`tab-link about-tab ${isActive('/about') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About
          </Link>
        </li>
      </ul>

      <SocialLinks />
    </nav>
  );
}

export default Navbar;