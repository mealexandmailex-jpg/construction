import { useEffect, useRef, useState } from 'react'

const TESTIMONIALS_BG = 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1920&q=80'

const testimonials = [
  {
    quote: "GThink delivered our office build-out on time and on budget. Professional from day one. We'll use them again.",
    name: 'James M.',
    role: 'Commercial Client',
    initial: 'J',
    rating: 5,
  },
  {
    quote: 'Our kitchen and bathroom remodel exceeded expectations. The crew was respectful and the quality is outstanding.',
    name: 'Sarah & David L.',
    role: 'Residential',
    initial: 'S',
    rating: 5,
  },
  {
    quote: "We needed a reliable partner for a tight deadline. GThink made it happen without cutting corners. Highly recommend.",
    name: 'Patricia K.',
    role: 'Retail Project',
    initial: 'P',
    rating: 5,
  },
]

function StarRating({ count = 5 }) {
  return (
    <span className="testimonial-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="testimonial-star" aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  )
}

export default function Testimonials() {
  const gridRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonials" className="testimonials">
      <div
        className="testimonials-bg"
        style={{ backgroundImage: `url(${TESTIMONIALS_BG})` }}
        aria-hidden="true"
      />
      <div className="testimonials-overlay" aria-hidden="true" />
      <div className="testimonials-container">
        <header className="testimonials-header">
          <p className="testimonials-tag">Testimonials</p>
          <h2 className="testimonials-title">What Our Clients Say</h2>
          <p className="testimonials-subtitle">
            Real feedback from people we&apos;ve worked with.
          </p>
        </header>
        <div
          ref={gridRef}
          className={`testimonials-grid ${inView ? 'testimonials-grid-visible' : ''}`}
        >
          {testimonials.map(({ quote, name, role, initial, rating }, index) => (
            <blockquote
              key={name}
              className="testimonial-card"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <span className="testimonial-quote-icon" aria-hidden="true">
                &ldquo;
              </span>
              <StarRating count={rating} />
              <p className="testimonial-quote">&ldquo;{quote}&rdquo;</p>
              <footer className="testimonial-author">
                <span className="testimonial-avatar" aria-hidden="true">
                  {initial}
                </span>
                <div className="testimonial-author-info">
                  <strong className="testimonial-name">{name}</strong>
                  <span className="testimonial-role">{role}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
