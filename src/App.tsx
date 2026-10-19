import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { planets } from './planetData'
import { Brand } from './Brand'
import { journeys, LEARNING_PROGRESS_STORAGE_KEY } from './learningData'
import './home-progress.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visitedStops, setVisitedStops] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LEARNING_PROGRESS_STORAGE_KEY)
      if (saved) setVisitedStops((JSON.parse(saved) as { stops?: string[] }).stops ?? [])
    } catch { /* The home page remains useful without saved progress. */ }
  }, [])

  const continueJourney = journeys.find((journey) => journey.stops.some((stop) => visitedStops.includes(stop)) && journey.stops.some((stop) => !visitedStops.includes(stop)))
    ?? journeys.find((journey) => journey.stops.some((stop) => !visitedStops.includes(stop)))
  const nextStop = continueJourney?.stops.find((stop) => !visitedStops.includes(stop))

  return (
    <main>
      <header className="site-header">
        <Brand href="#top" />
        <nav className="desktop-nav" aria-label="Main navigation">
          <a className="active" href="#explore">Explore</a>
          <a href="#worlds">Worlds</a>
          <a href="/field-notes">Field notes</a>
          <a href="/learn">Learn</a>
        </nav>
        <a className="header-cta" href="/explorer">Open the explorer <ArrowUpRight size={15} strokeWidth={1.6} /></a>
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        {menuOpen && <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          <a onClick={() => setMenuOpen(false)} href="#explore">Explore</a>
          <a onClick={() => setMenuOpen(false)} href="#worlds">Worlds</a>
          <a onClick={() => setMenuOpen(false)} href="/field-notes">Field notes</a>
          <a onClick={() => setMenuOpen(false)} href="/learn">Learn</a>
        </nav>}
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-art" role="img" aria-label="Saturn and its rings against the dark of space" />
        <div className="hero-vignette" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-rule" /> A field guide to our solar system</p>
          <h1 id="hero-title">A universe<br />within reach.</h1>
          <p className="hero-deck">Eight planets. Countless stories. Begin a closer look at the worlds that share our Sun.</p>
          <a className="button-primary" href="/explorer">Begin exploring <ArrowRight size={16} strokeWidth={1.7} /></a>
          <div className="hero-index"><span>01</span><span className="index-line" /><span>08</span><span className="index-label">Worlds in our system</span></div>
        </div>
        <div className="image-credit">SATURN · CASSINI, 2004 <span>NASA / JPL / SSI</span></div>
        <a className="scroll-cue" href="#explore"><ArrowDown size={15} /> Scroll to explore</a>
      </section>

      <section className="intro-section" id="explore">
        <div className="section-kicker"><span>01</span><span className="short-rule" /> THE NEIGHBOURHOOD</div>
        <div className="intro-grid">
          <h2>Our place in<br />the <em>cosmos.</em></h2>
          <div className="intro-text"><p>Our solar system is more than a collection of planets. It is a connected family of worlds, shaped by gravity, time, and the light of one star.</p><a className="text-link" href="#worlds">Meet the planets <ArrowRight size={15} /></a></div>
        </div>
        <div className="system-strip" aria-label="Solar system facts">
          <div><span className="fact-number">1</span><span className="fact-label">Star at the centre</span></div>
          <div><span className="fact-number">8</span><span className="fact-label">Worlds to discover</span></div>
          <div><span className="fact-number">4.6<span className="fact-unit">bn</span></span><span className="fact-label">Years in the making</span></div>
          <div className="system-note">A small address<br />in a vast universe.</div>
        </div>
      </section>

      <section className="worlds-section" id="worlds">
        <div className="worlds-heading">
          <div><div className="section-kicker"><span>02</span><span className="short-rule" /> THE PLANETS</div><h2>Choose a world.</h2></div>
          <a className="text-link all-worlds" href="/explorer">View solar system <ArrowUpRight size={15} /></a>
        </div>
        <div className="planet-list">
          {planets.map((planet, index) => (
            <a className="planet-row" href={`/planet/${planet.id}`} key={planet.name}>
              <span className="planet-count">0{index + 1}</span>
              <span className={`planet-orb ${planet.id}`} aria-hidden="true"><span /></span>
              <span className="planet-name">{planet.name}</span>
              <span className="planet-detail">{planet.teaser}</span>
              <span className="planet-type">{planet.kind}</span>
              <ArrowUpRight className="planet-arrow" size={17} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </section>

      <section className="fieldnote" id="fieldnotes">
        <div className="fieldnote-image" role="img" aria-label="The pale blue dot Earth seen from deep space" />
        <div className="fieldnote-copy"><div className="section-kicker"><span>FIELD NOTE 001</span><span className="short-rule" /> PERSPECTIVE</div><p className="quote">“Look again at that dot.<br />That’s here. That’s home.”</p><p className="quote-credit">CARL SAGAN · PALE BLUE DOT, 1994</p><a className="text-link" href="/field-notes">Read the field note <ArrowRight size={15} /></a></div>
      </section>

      {continueJourney && nextStop && <section className="continue-section" aria-labelledby="continue-title">
        <div className="section-kicker"><span>YOUR FIELD LOG</span><span className="short-rule"/> PICK UP WHERE YOU LEFT OFF</div>
        <div className="continue-layout"><div><h2 id="continue-title">Continue<br/><em>exploring.</em></h2><p>You’ve visited {visitedStops.length} {visitedStops.length === 1 ? 'world' : 'worlds'}. The next stop in <strong>{continueJourney.title}</strong> is {nextStop}.</p></div><a className="button-primary" href={`/explorer?journey=${continueJourney.id}&stop=${nextStop.toLowerCase()}`}>Resume journey <ArrowRight size={16}/></a></div>
      </section>}

      <section className="learning-section" id="learn">
        <div className="section-kicker"><span>03</span><span className="short-rule" /> KEEP LOOKING UP</div>
        <div className="learning-content"><h2>Curiosity has<br /><em>no horizon.</em></h2><div><p>Follow the questions that pull you farther out. Each world opens a new path through the science, stories, and missions of space.</p><a className="button-primary" href="/learn">Start learning <ArrowRight size={16} /></a></div></div>
      </section>

      <footer className="site-footer"><Brand href="#top" /><span className="footer-note">A field guide to our solar system</span><span className="footer-meta">MADE FOR THE CURIOUS <span>·</span> 2026</span></footer>
    </main>
  )
}

export default App
