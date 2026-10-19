import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, RotateCcw } from 'lucide-react'
import { planets } from './planetData'
import { Brand } from './Brand'
import { getPlanetImageUrl, getProfile } from './planetProfiles'
import { PlanetPreviewCanvas } from './ExplorerScene'
import './planet-detail.css'
import './planet-image-adjustments.css'
import './planet-preview.css'

type PlanetDetailProps = { planetId: string }

export default function PlanetDetail({ planetId }: PlanetDetailProps) {
  const index = planets.findIndex((planet) => planet.id === planetId)
  const planet = planets[index]
  const profile = getProfile(planet)
  const previous = planets[(index - 1 + planets.length) % planets.length]
  const next = planets[(index + 1) % planets.length]
  const [autoRotate, setAutoRotate] = useState(false)
  const [resetToken, setResetToken] = useState(0)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stopForReducedMotion = (event: MediaQueryListEvent) => {
      if (event.matches) setAutoRotate(false)
    }
    preference.addEventListener('change', stopForReducedMotion)
    return () => preference.removeEventListener('change', stopForReducedMotion)
  }, [])

  return (
    <main className="planet-detail-page" style={{ '--planet-accent': planet.color } as React.CSSProperties}>
      <header className="planet-detail-header">
        <Brand />
        <span className="planet-header-title">FIELD GUIDE <span>/</span> {planet.name.toUpperCase()}</span>
        <a className="planet-back-link" href="/explorer"><ArrowLeft size={14} /> Solar system</a>
      </header>

      <section className="planet-detail-hero" aria-labelledby="planet-title">
        <img className={`planet-hero-image ${planet.id}`} src={getPlanetImageUrl(profile.imageId)} alt={`NASA spacecraft view of ${planet.name}`} />
        <div className="planet-hero-shade" />
        <div className="planet-hero-copy">
          <div className="section-kicker"><span>{String(index + 1).padStart(2, '0')}</span><span className="short-rule" /> {profile.eyebrow}</div>
          <h1 id="planet-title">{planet.name}</h1>
          <p>{profile.introduction}</p>
        </div>
        <div className="planet-image-credit">{profile.imageCaption} <a href={profile.imageSource} target="_blank" rel="noreferrer">Image source <ArrowUpRight size={10} /></a></div>
      </section>

      <section className="planet-preview-section" aria-labelledby="planet-preview-title">
        <div className="planet-preview-heading">
          <div>
            <div className="section-kicker"><span>02</span><span className="short-rule" /> CLOSE ENCOUNTER</div>
            <h2 id="planet-preview-title">Turn the world.</h2>
          </div>
          <div className="planet-preview-controls">
            <button type="button" onClick={() => setAutoRotate((current) => !current)} aria-pressed={autoRotate} aria-label={autoRotate ? 'Pause planet rotation' : 'Rotate planet slowly'}>
              {autoRotate ? <Pause size={14} /> : <Play size={14} />}<span>{autoRotate ? 'Pause' : 'Rotate slowly'}</span>
            </button>
            <button type="button" onClick={() => setResetToken((current) => current + 1)} aria-label="Reset planet view"><RotateCcw size={14} /><span>Reset view</span></button>
          </div>
        </div>
        <div className="planet-preview-frame" role="group" aria-label={`Interactive 3D view of ${planet.name}`}>
          <PlanetPreviewCanvas
            planet={planet}
            autoRotate={autoRotate}
            resetToken={resetToken}
            fallback={<div className="planet-preview-fallback"><img src={getPlanetImageUrl(profile.imageId)} alt="" /><span>3D view unavailable here. Use the field notes and NASA image below to continue exploring.</span></div>}
          />
          <span className="planet-preview-hint">DRAG TO ORBIT <span>·</span> SCROLL TO ZOOM</span>
          <span className="planet-preview-caption">SCHEMATIC 3D VIEW <span>Procedural surface · proportions adapted for viewing</span></span>
        </div>
      </section>

      <section className="planet-quickfacts" aria-label={`${planet.name} at a glance`}>
        <div className="section-kicker"><span>FIELD NOTES</span><span className="short-rule" /> AT A GLANCE</div>
        <dl>
          <div><dt>Type</dt><dd>{planet.kind}</dd></div>
          <div><dt>Mean distance from Sun</dt><dd>{planet.orbitAu.toLocaleString(undefined, { maximumFractionDigits: 2 })} <small>AU</small></dd></div>
          <div><dt>One orbit</dt><dd>{planet.periodLabel}</dd></div>
          <div><dt>Equatorial diameter</dt><dd>{planet.diameterKm.toLocaleString()} <small>km</small></dd></div>
        </dl>
      </section>

      <article className="planet-story">
        <div className="planet-story-index"><span>03</span><span className="short-rule" /> THE WORLD</div>
        <div className="planet-story-copy">
          <h2>{profile.featureTitle}</h2>
          <p>{profile.featureCopy}</p>
          <div className="mission-note"><span>EXPLORING {planet.name.toUpperCase()}</span><p>{profile.mission}</p><a href={profile.nasaPage} target="_blank" rel="noreferrer">NASA {planet.name} facts <ArrowUpRight size={13} /></a></div>
        </div>
      </article>

      <nav className="planet-neighbours" aria-label="Browse other planets">
        <a href={`/planet/${previous.id}`}><span><ArrowLeft size={14} /> PREVIOUS WORLD</span><strong>{previous.name}</strong></a>
        <a className="all-planets" href="/explorer">Return to the system <span>08 worlds <ArrowUpRight size={13} /></span></a>
        <a className="next-planet" href={`/planet/${next.id}`}><span>NEXT WORLD <ArrowRight size={14} /></span><strong>{next.name}</strong></a>
      </nav>
      <footer className="planet-detail-footer"><Brand /><span>Science and image references are linked to NASA.</span><a href={profile.nasaPage} target="_blank" rel="noreferrer">NASA source <ArrowUpRight size={12} /></a></footer>
    </main>
  )
}
