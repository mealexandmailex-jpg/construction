import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const CATEGORIES = ['All', 'Residential', 'Commercial']

const STAR_BURST = [
  { dx: 0, dy: -1, delay: 0 },
  { dx: 0.7, dy: -0.7, delay: 0.05 },
  { dx: 1, dy: 0, delay: 0.1 },
  { dx: 0.7, dy: 0.7, delay: 0.15 },
  { dx: 0, dy: 1, delay: 0.2 },
  { dx: -0.7, dy: 0.7, delay: 0.25 },
  { dx: -1, dy: 0, delay: 0.3 },
  { dx: -0.7, dy: -0.7, delay: 0.35 },
  { dx: 0.5, dy: -0.85, delay: 0.08 },
  { dx: 0.85, dy: 0.5, delay: 0.18 },
  { dx: -0.5, dy: 0.85, delay: 0.28 },
  { dx: -0.85, dy: -0.5, delay: 0.38 },
]

const galleryProjects = [
  { id: 1, title: 'Lakeside Residence', category: 'Residential', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=85', large: true },
  { id: 2, title: 'Industrial Warehouse', category: 'Commercial', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=85', large: false },
  { id: 3, title: 'Kitchen & Bath Remodel', category: 'Residential', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85', large: false },
  { id: 4, title: 'Corporate Office Build-out', category: 'Commercial', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85', large: true },
  { id: 5, title: 'Custom Home', category: 'Residential', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85', large: false },
  { id: 6, title: 'Retail Space', category: 'Commercial', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85', large: false },
  { id: 7, title: 'Multi-Family Development', category: 'Residential', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=85', large: false },
  { id: 8, title: 'Restaurant Renovation', category: 'Commercial', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=85', large: true },
  { id: 9, title: 'Modern Loft Conversion', category: 'Residential', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85', large: false },
  { id: 10, title: 'Medical Office Suite', category: 'Commercial', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=85', large: false },
]

export default function Gallery() {
  const gridRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = filter === 'All'
    ? galleryProjects
    : galleryProjects.filter((p) => p.category === filter)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!lightbox) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowLeft') {
        const idx = galleryProjects.findIndex((p) => p.id === lightbox.id)
        const prev = galleryProjects[idx - 1] ?? galleryProjects[galleryProjects.length - 1]
        setLightbox(prev)
      }
      if (e.key === 'ArrowRight') {
        const idx = galleryProjects.findIndex((p) => p.id === lightbox.id)
        const next = galleryProjects[idx + 1] ?? galleryProjects[0]
        setLightbox(next)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightbox])

  const goPrev = () => {
    const idx = galleryProjects.findIndex((p) => p.id === lightbox.id)
    setLightbox(galleryProjects[idx - 1] ?? galleryProjects[galleryProjects.length - 1])
  }
  const goNext = () => {
    const idx = galleryProjects.findIndex((p) => p.id === lightbox.id)
    setLightbox(galleryProjects[idx + 1] ?? galleryProjects[0])
  }

  return (
    <>
      <section id="gallery" className="gallery">
        <div className="gallery-bg" aria-hidden="true" />
        <div className="gallery-container">
          <header className="gallery-header">
            <h1 className="gallery-title">Project Gallery</h1>
            <p className="gallery-subtitle">
              Explore our completed commercial and residential projects.
            </p>
            <div className="gallery-filters">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`gallery-filter-btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </header>
          <div
            ref={gridRef}
            className={`gallery-grid ${inView ? 'gallery-grid-visible' : ''}`}
          >
            {filtered.map((item, index) => (
              <article
                key={item.id}
                className={`gallery-item ${item.large ? 'gallery-item-large' : ''}`}
                style={{ animationDelay: `${Math.min(index * 0.05, 0.4)}s` }}
              >
                <button
                  type="button"
                  className="gallery-item-trigger"
                  onClick={() => setLightbox(item)}
                  aria-label={`View ${item.title}`}
                >
                  <div className="gallery-item-image-wrap">
                    <img
                      src={item.image}
                      alt=""
                      className="gallery-item-image"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                    <div className="gallery-item-overlay" aria-hidden="true" />
                    <div className="gallery-item-stars" aria-hidden="true">
                      {STAR_BURST.map(({ dx, dy, delay }, i) => (
                        <span
                          key={i}
                          className="gallery-star"
                          style={{
                            '--dx': dx,
                            '--dy': dy,
                            '--delay': `${delay}s`,
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="gallery-item-expand" aria-hidden="true">
                      ⊕
                    </span>
                    <div className="gallery-item-info">
                      <span className="gallery-item-category">{item.category}</span>
                      <span className="gallery-item-title">{item.title}</span>
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
          <div className="gallery-footer">
            <p className="gallery-footer-text">Like what you see? Let&apos;s talk about your project.</p>
            <Link to="/#contact" className="btn btn-primary">Get a quote</Link>
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${lightbox.title}`}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            ×
          </button>
          <button
            type="button"
            className="gallery-lightbox-prev"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            className="gallery-lightbox-next"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            aria-label="Next"
          >
            ›
          </button>
          <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.image.replace('w=800', 'w=1200')}
              alt={lightbox.title}
              className="gallery-lightbox-image"
            />
            <div className="gallery-lightbox-caption">
              <span className="gallery-lightbox-category">{lightbox.category}</span>
              <h2 className="gallery-lightbox-title">{lightbox.title}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
