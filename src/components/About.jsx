import { useEffect, useRef, useState } from 'react'

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85'
const ABOUT_IMAGE_2 = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=85'

const points = [
  { text: 'Licensed, bonded, and fully insured', icon: '✓' },
  { text: 'Transparent pricing and detailed estimates', icon: '✓' },
  { text: 'On-time completion with clear communication', icon: '✓' },
  { text: 'Quality materials and skilled tradespeople', icon: '✓' },
]

const stats = [
  { value: '15+', label: 'Years in business' },
  { value: '500+', label: 'Projects delivered' },
]

export default function About() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-bg" aria-hidden="true" />
      <div className="container about-inner">
        <div className={`about-content ${inView ? 'about-content-visible' : ''}`}>
          <p className="about-tag">Who We Are</p>
          <h2 className="about-title">Built on Trust & Craftsmanship</h2>
          <p className="about-lead">
            GThink Construction has been a trusted name in construction for over 15 years. We combine traditional craftsmanship with modern methods to deliver projects that stand the test of time.
          </p>
          <ul className="about-list">
            {points.map(({ text, icon }) => (
              <li key={text}>
                <span className="about-list-icon" aria-hidden="true">{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="about-actions">
            <a href="#contact" className="btn btn-primary">Start Your Project</a>
            <a href="#projects" className="about-link">View our work →</a>
          </div>
        </div>
        <div className={`about-visual ${inView ? 'about-visual-visible' : ''}`}>
          <div className="about-image-wrap">
            <img
              src={ABOUT_IMAGE}
              alt="Modern construction and residential build by GThink"
              className="about-image"
              width={520}
              height={400}
            />
            <div className="about-image-accent" aria-hidden="true" />
            <div className="about-stats-card">
              {stats.map(({ value, label }) => (
                <div key={label} className="about-stat">
                  <span className="about-stat-value">{value}</span>
                  <span className="about-stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-visual-secondary">
            <div
              className="about-image-small"
              style={{ backgroundImage: `url(${ABOUT_IMAGE_2})` }}
              role="img"
              aria-label="Construction team at work"
            />
            <p className="about-quote">
              &ldquo;We don&apos;t just build structures—we build relationships and lasting quality.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
