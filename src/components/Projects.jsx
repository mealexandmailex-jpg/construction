import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const recentProjects = [
  {
    title: 'Riverside Office Complex',
    category: 'Commercial',
    type: 'Full build-out',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85',
    featured: true,
  },
  {
    title: 'Modern Family Home',
    category: 'Residential',
    type: 'New construction',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=85',
    featured: false,
  },
  {
    title: 'Downtown Retail Renovation',
    category: 'Commercial',
    type: 'Renovation',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=85',
    featured: false,
  },
]

export default function Projects() {
  const gridRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="projects">
      <div className="projects-bg" aria-hidden="true" />
      <div className="container projects-container">
        <header className="projects-header">
          <p className="projects-tag">Portfolio</p>
          <h2 className="projects-title">Recent Projects</h2>
          <p className="projects-subtitle">
            A selection of our completed commercial and residential work.
          </p>
        </header>
        <div
          ref={gridRef}
          className={`projects-grid ${inView ? 'projects-grid-visible' : ''}`}
        >
          {recentProjects.map(({ title, category, type, image, featured }, index) => (
            <article
              key={title}
              className={`project-card ${featured ? 'project-card-featured' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <a href="#contact" className="project-card-link" aria-label={`View ${title}`}>
                <div className="project-image-wrap">
                  <img
                    src={image}
                    alt=""
                    className="project-image"
                    loading="lazy"
                    width={featured ? 800 : 400}
                    height={featured ? 500 : 320}
                  />
                  <div className="project-image-overlay" aria-hidden="true" />
                  <div className="project-card-content">
                    <span className="project-card-category">{category}</span>
                    <h3 className="project-card-title">{title}</h3>
                    <p className="project-card-type">{type}</p>
                    <span className="project-card-cta">Get a quote →</span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
        <div className="projects-footer">
          <Link to="/gallery" className="projects-gallery-cta">
            See more in our gallery
            <span className="projects-gallery-arrow" aria-hidden="true">→</span>
          </Link>
          <a href="#contact" className="btn btn-primary">Start your project</a>
        </div>
      </div>
    </section>
  )
}
