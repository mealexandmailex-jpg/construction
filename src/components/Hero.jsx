const HERO_IMAGE = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=85'

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '15+', label: 'Years Experience' },
  { value: '98%', label: 'Client Satisfaction' },
]

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div
        className="hero-bg"
        aria-hidden="true"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      <div className="hero-bg-overlay" aria-hidden="true" />
      <div className="hero-inner">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-tag-wrap">
              <span className="hero-tag-line" aria-hidden="true" />
              <p className="hero-tag">Licensed & Insured • 15+ Years Experience</p>
            </div>
            <h1 className="hero-title">
              We Build Your <em>Vision</em> Into Reality
            </h1>
            <p className="hero-desc">
              From ground-up construction to major renovations, we deliver quality, safety, and on-time completion for commercial and residential projects.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">Request a Free Quote</a>
              <a href="#projects" className="btn btn-secondary">View Our Work</a>
            </div>
            <p className="hero-trust">Free estimates • No obligation</p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-accent-card">
              <span className="hero-accent-card-value">500+</span>
              <span className="hero-accent-card-label">Projects delivered</span>
            </div>
          </div>
        </div>
        <a href="#services" className="hero-scroll" aria-label="Scroll to content">
          <span className="hero-scroll-icon" />
        </a>
        <div className="hero-stats">
          {stats.map(({ value, label }) => (
            <div key={label} className="stat">
              <span className="stat-num">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
