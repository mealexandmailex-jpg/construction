import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home', hash: '' },
  { to: '/', label: 'Services', hash: '#services' },
  { to: '/', label: 'About', hash: '#about' },
  { to: '/', label: 'Projects', hash: '#projects' },
  { to: '/gallery', label: 'Gallery', hash: '' },
  { to: '/', label: 'Testimonials', hash: '#testimonials' },
  { to: '/', label: 'Get a Quote', hash: '#contact', cta: true },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    closeMenu()
  }, [location.pathname, location.hash])

  const isGallery = location.pathname === '/gallery'

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''} ${menuOpen ? 'header-menu-open' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-icon">G</span>
          <span className="logo-text">GThink<span className="logo-accent">Construction</span></span>
        </Link>
        <nav className={`nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <ul className="nav-list">
            {navLinks.map(({ to, hash, label, cta }) => {
              const isActive =
                !cta &&
                ((to === '/gallery' && isGallery) ||
                  (to === '/' && !hash && !isGallery && !location.hash) ||
                  (hash && location.pathname === to && location.hash === hash))
              const className = `nav-link ${cta ? 'nav-cta' : ''} ${isActive ? 'nav-link-active' : ''}`
              return (
                <li key={to + (hash || '') + label}>
                  <Link
                    to={hash ? `${to}${hash}` : to}
                    className={className}
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="menu-toggle-line" />
          <span className="menu-toggle-line" />
          <span className="menu-toggle-line" />
        </button>
      </div>
    </header>
  )
}
