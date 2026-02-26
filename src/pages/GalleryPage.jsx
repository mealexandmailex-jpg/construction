import { Link } from 'react-router-dom'
import Gallery from '../components/Gallery'

export default function GalleryPage() {
  return (
    <>
      <div className="gallery-page-header">
        <div className="container gallery-page-header-inner">
          <Link to="/" className="gallery-page-back">
            ← Back to home
          </Link>
        </div>
      </div>
      <Gallery />
    </>
  )
}
