import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <span className="logo-icon">G</span>
            <span className="logo-text">GThink<span className="logo-accent">Construction</span></span>
          </Link>
          <p>Building excellence with integrity and skill.</p>
        </div>
        <div className="footer-links">
          <a href="/#services">Services</a>
          <a href="/#about">About</a>
          <a href="/#projects">Projects</a>
          <Link to="/gallery">Gallery</Link>
          <a href="/#contact">Contact</a>
        </div>
        <p className="footer-copy">&copy; {year} GThink Construction. All rights reserved.</p>
      </div>
    </footer>
  )
}
