import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // Replace with your form backend or email service
    setTimeout(() => {
      setStatus('sent')
      e.target.reset()
      setTimeout(() => setStatus('idle'), 3000)
    }, 800)
  }

  const buttonText = status === 'sending' ? 'Sending…' : status === 'sent' ? "Request sent! We'll be in touch." : 'Send Request'

  const CONTACT_BG = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80'

  return (
    <section id="contact" className="contact">
      <div
        className="contact-bg"
        style={{ backgroundImage: `url(${CONTACT_BG})` }}
        aria-hidden="true"
      />
      <div className="contact-overlay" aria-hidden="true" />
      <div className="container contact-inner">
        <div className="contact-info">
          <p className="section-tag">Get in Touch</p>
          <h2 className="section-title">Request a Free Quote</h2>
          <p>Describe your project and we'll get back with a detailed estimate. No obligation.</p>
          <div className="contact-details">
            <p>
              <strong>Phone</strong>
              <br />
              <a href="tel:+15551234567">(555) 123-4567</a>
            </p>
            <p>
              <strong>Email</strong>
              <br />
              <a href="mailto:info@gthinkconstruction.com">info@gthinkconstruction.com</a>
            </p>
            <p>
              <strong>Office</strong>
              <br />
              123 Builder's Lane, Suite 100
              <br />
              Your City, ST 12345
            </p>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} aria-label="Contact form">
          <label htmlFor="name">Name *</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email *</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" />
          <label htmlFor="project">Project type</label>
          <select id="project" name="project">
            <option value="">Select...</option>
            <option value="new">New construction</option>
            <option value="renovation">Renovation / Remodel</option>
            <option value="commercial">Commercial</option>
            <option value="other">Other</option>
          </select>
          <label htmlFor="message">Tell us about your project *</label>
          <textarea id="message" name="message" rows={4} required />
          <button type="submit" className="btn btn-primary btn-full" disabled={status === 'sending'}>
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  )
}
