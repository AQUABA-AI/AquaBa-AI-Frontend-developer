// src/components/sections/Navbar.jsx
import { useState, useEffect } from 'react'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'About',    href: '#about' },
  { label: 'Contact',  href: '#contact' },
]

// Droplet icon for the logo mark
function DropletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6 8 4 13 4 16a8 8 0 0016 0c0-3-2-8-8-14z"/>
    </svg>
  )
}

function NavBar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  // Add scrolled class after 20px scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container">
        <div className="navbar__inner">

          {/* Logo */}
          <a href="#home" className="navbar__logo">
            <div className="navbar__logo-mark">
              <DropletIcon />
            </div>
            <span className="navbar__logo-text">AquaBa</span>
          </a>

          {/* Desktop nav links */}
          <ul className="navbar__links">
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <a href={link.href} className="navbar__link">{link.label}</a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="navbar__cta">
            <PrimaryButton
              text="Get Started"
              icon="→"
              onClick={() => {}}
            />
          </div>

          {/* Mobile hamburger */}
          <button
            className="navbar__toggle"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`navbar__mobile ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(link => (
          <a
            key={link.label}
            href={link.href}
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <PrimaryButton text="Get Started →" onClick={() => setMenuOpen(false)} fullWidth />
      </div>
    </nav>
  )
}

export default NavBar
