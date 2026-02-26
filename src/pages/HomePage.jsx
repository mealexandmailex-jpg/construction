import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Projects from '../components/Projects'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <hr className="section-divider" aria-hidden="true" />
      <Services />
      <hr className="section-divider" aria-hidden="true" />
      <About />
      <hr className="section-divider" aria-hidden="true" />
      <Projects />
      <hr className="section-divider" aria-hidden="true" />
      <Testimonials />
      <hr className="section-divider" aria-hidden="true" />
      <Contact />
    </>
  )
}
