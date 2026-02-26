import { useEffect, useRef, useState } from 'react'

const services = [
  {
    title: 'New Construction',
    tagline: 'Residential & commercial • Permits • Full build-out',
    description: 'Ground-up builds from foundation to finish. We handle design coordination, permits, and execution so your project stays on schedule.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=85',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 20v20h32V20M8 20l6-12h20l6 12M8 20h32" />
      </svg>
    ),
  },
  {
    title: 'Renovation & Remodeling',
    tagline: 'Kitchens • Bathrooms • Whole-home',
    description: 'Transform existing spaces with precision. From kitchen and bath remodels to basement finishes and full-home renovations.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=85',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 8v32M24 8v32M36 8v32M8 16h32M8 28h32" />
      </svg>
    ),
  },
  {
    title: 'Commercial Builds',
    tagline: 'Offices • Retail • Industrial',
    description: 'We deliver on deadline and on budget. Offices, retail spaces, and industrial facilities built to the highest standards.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=85',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="14" width="36" height="24" rx="2" />
        <path d="M6 22h36M18 14V8M30 14V8" />
      </svg>
    ),
  },
  {
    title: 'Project Management',
    tagline: 'Scheduling • Quality control • Budget',
    description: 'End-to-end coordination so your project stays on track. Clear communication and accountability at every step.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=85',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 4v8M24 36v8M4 24h8M36 24h8M10.34 10.34l5.66 5.66M32 32l5.66 5.66M10.34 37.66l5.66-5.66M32 16l5.66-5.66" />
        <circle cx="24" cy="24" r="10" />
      </svg>
    ),
  },
]

const trustPills = ['Licensed & insured', 'On-time delivery', 'Transparent pricing']

export default function Services() {
  const gridRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="services">
      <div className="services-bg-pattern" aria-hidden="true" />
      <div className="container services-container">
        <header className="services-header">
          <p className="section-tag">What we do</p>
          <h2 className="services-title">Our Services</h2>
          <p className="services-subtitle">
            Full-spectrum construction and renovation—from concept to keys.
          </p>
          <div className="services-trust">
            {trustPills.map((pill) => (
              <span key={pill} className="services-trust-pill">
                {pill}
              </span>
            ))}
          </div>
        </header>

        <div
          ref={gridRef}
          className={`services-grid ${inView ? 'services-grid-visible' : ''}`}
        >
          {services.map(({ title, tagline, description, image, icon }, index) => (
            <article
              key={title}
              className="service-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="service-card-image-wrap">
                <div
                  className="service-card-image"
                  style={{ backgroundImage: `url(${image})` }}
                  aria-hidden="true"
                />
                <div className="service-card-image-overlay" aria-hidden="true" />
                <span className="service-card-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="service-card-icon-wrap">
                  <span className="service-card-icon" aria-hidden="true">
                    {icon}
                  </span>
                </div>
              </div>
              <div className="service-card-body">
                <h3 className="service-card-title">{title}</h3>
                <p className="service-card-tagline">{tagline}</p>
                <p className="service-card-desc">{description}</p>
                <a href="#contact" className="service-card-link">
                  Get a quote
                  <span className="service-card-link-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="services-cta">
          <div className="services-cta-inner">
            <p className="services-cta-headline">Let&apos;s build something great.</p>
            <p className="services-cta-text">
              Tell us about your project and we&apos;ll get back with a detailed estimate—no obligation.
            </p>
            <a href="#contact" className="btn btn-primary services-cta-btn">
              Free consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
