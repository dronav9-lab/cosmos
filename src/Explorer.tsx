import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Compass, Pause, Play, RotateCcw, Satellite, X } from 'lucide-react'
import { ExplorerCanvas } from './ExplorerScene'
import { planetSources, planets } from './planetData'
import { journeys, LEARNING_PROGRESS_STORAGE_KEY } from './learningData'
import { Brand } from './Brand'
import './explorer.css'

export default function Explorer() {
  const [selectedId, setSelectedId] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('planet')
    return planets.some((planet) => planet.id === requested) ? requested! : 'earth'
  })
  const [playing, setPlaying] = useState(false)
  const [showMissions, setShowMissions] = useState(true)
  const [showJourneyChooser, setShowJourneyChooser] = useState(false)
  const [activeJourneyId, setActiveJourneyId] = useState<string | null>(null)
  const [activeStopIndex, setActiveStopIndex] = useState(0)
  const [completedJourneyTitle, setCompletedJourneyTitle] = useState<string | null>(null)
  const [focusRequest, setFocusRequest] = useState<{ planetId: string; token: number } | null>(null)
  const [visitedStops, setVisitedStops] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LEARNING_PROGRESS_STORAGE_KEY)
      return saved ? (JSON.parse(saved) as { stops?: string[] }).stops ?? [] : []
    } catch { return [] }
  })
  const openedRequestedJourney = useRef(false)
  const [resetToken, setResetToken] = useState(0)
  const selectedPlanet = useMemo(() => planets.find((planet) => planet.id === selectedId) ?? planets[2], [selectedId])
  const activeJourney = journeys.find((journey) => journey.id === activeJourneyId)
  const activeStopName = activeJourney?.stops[activeStopIndex]
  const activeStopPlanet = planets.find((planet) => planet.name === activeStopName)
  const journeyVisitedCount = activeJourney?.stops.filter((stop) => visitedStops.includes(stop)).length ?? 0

  const startJourney = (journeyId: string, requestedStop?: string | null) => {
    const journey = journeys.find((item) => item.id === journeyId)
    if (!journey) return
    const requestedIndex = requestedStop ? journey.stops.findIndex((stop) => stop.toLowerCase() === requestedStop.toLowerCase()) : -1
    const startIndex = requestedIndex >= 0 ? requestedIndex : 0
    const firstPlanetId = journey.stops[startIndex].toLowerCase()
    setActiveJourneyId(journey.id)
    setPlaying(false)
    setActiveStopIndex(startIndex)
    setCompletedJourneyTitle(null)
    setShowJourneyChooser(false)
    setSelectedId(firstPlanetId)
    setFocusRequest((current) => ({ planetId: firstPlanetId, token: (current?.token ?? 0) + 1 }))
  }

  const saveCurrentStop = () => {
    if (!activeJourney || !activeStopName) return
    const nextStops = visitedStops.includes(activeStopName) ? visitedStops : [...visitedStops, activeStopName]
    setVisitedStops(nextStops)
    try {
      const saved = localStorage.getItem(LEARNING_PROGRESS_STORAGE_KEY)
      const progress = saved ? JSON.parse(saved) as Record<string, unknown> : {}
      localStorage.setItem(LEARNING_PROGRESS_STORAGE_KEY, JSON.stringify({ ...progress, stops: nextStops }))
    } catch { /* The current visit still updates even if browser storage is unavailable. */ }
  }

  const recordCurrentStop = () => {
    if (!activeJourney || !activeStopName) return
    saveCurrentStop()
    if (activeStopIndex >= activeJourney.stops.length - 1) {
      setCompletedJourneyTitle(activeJourney.title)
      setActiveJourneyId(null)
      return
    }
    const nextIndex = activeStopIndex + 1
    const nextPlanetId = activeJourney.stops[nextIndex].toLowerCase()
    setActiveStopIndex(nextIndex)
    setSelectedId(nextPlanetId)
    setFocusRequest((current) => ({ planetId: nextPlanetId, token: (current?.token ?? 0) + 1 }))
  }

  const leaveJourney = () => {
    setActiveJourneyId(null)
    setShowJourneyChooser(false)
    setCompletedJourneyTitle(null)
    setFocusRequest(null)
    setResetToken((current) => current + 1)
  }

  useEffect(() => {
    if (openedRequestedJourney.current) return
    const params = new URLSearchParams(window.location.search)
    const journeyId = params.get('journey')
    if (!journeyId || !journeys.some((journey) => journey.id === journeyId)) return
    openedRequestedJourney.current = true
    startJourney(journeyId, params.get('stop'))
  }, [])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stopForReducedMotion = (event: MediaQueryListEvent) => {
      if (event.matches) setPlaying(false)
    }
    preference.addEventListener('change', stopForReducedMotion)
    return () => preference.removeEventListener('change', stopForReducedMotion)
  }, [])

  const togglePlayback = () => setPlaying((current) => !current)

  return (
    <main className="explorer-page">
      <header className="explorer-header">
        <Brand />
        <div className="explorer-header-center"><span className="header-overline">FIELD GUIDE / 01</span><span>Solar system</span></div>
        <a className="back-link" href="/"><ArrowLeft size={15} /> Back to cosmos</a>
      </header>

      <section className="explorer-intro" aria-labelledby="explorer-title">
        <div className="section-kicker"><span>01</span><span className="short-rule" /> THE NEIGHBOURHOOD</div>
        <div className="explorer-title-row"><div><h1 id="explorer-title">Our solar system</h1><p>One star. Eight planets. A small corner of the Milky Way.</p></div><div className="system-count"><span>01 — 08</span><small>PLANETS</small></div></div>
      </section>

      <section className="explorer-workspace" aria-label="Interactive solar system explorer">
        <div className="scene-column">
          <div className="scene-toolbar">
            <div className="scene-state"><span className={`state-dot${playing ? ' is-live' : ''}`} />{playing ? 'ORBITAL MOTION ON' : 'ORBITAL MOTION PAUSED'}</div>
            <div className="scene-controls">
              <button className={`scene-control mission-control${showMissions ? ' is-active' : ''}`} onClick={() => setShowMissions((visible) => !visible)} aria-pressed={showMissions} aria-label={showMissions ? 'Hide spacecraft and satellites' : 'Show spacecraft and satellites'} title={showMissions ? 'Hide spacecraft and satellites' : 'Show spacecraft and satellites'}>
                <Satellite size={14} /><span>Missions</span>
              </button>
              <button className={`scene-control guided-tour-trigger${activeJourney ? ' is-active' : ''}`} onClick={() => { setCompletedJourneyTitle(null); setShowJourneyChooser((visible) => !visible) }} aria-expanded={showJourneyChooser} aria-label="Open guided journeys" title="Open guided journeys">
                <Compass size={14} /><span>Guided tour</span>
              </button>
              <button className="scene-control scene-play" onClick={togglePlayback} aria-label={playing ? 'Pause orbital motion' : 'Play orbital motion'} title={playing ? 'Pause orbital motion' : 'Play orbital motion'}>
                {playing ? <Pause size={14} /> : <Play size={14} />}<span>{playing ? 'Pause' : 'Play'}</span>
              </button>
              <button className="scene-control reset-control" onClick={() => setResetToken((current) => current + 1)} aria-label="Reset view" title="Reset view"><RotateCcw size={14} /><span>Reset view</span></button>
            </div>
          </div>
          <div className="scene-frame">
            <Suspense fallback={<div className="scene-fallback">Preparing the system view…</div>}>
              <ExplorerCanvas selectedId={selectedId} playing={playing} showMissions={showMissions} onSelect={setSelectedId} resetToken={resetToken} focusRequest={focusRequest} />
            </Suspense>
            <div className="scene-scale-note"><span className="scale-marker" />Distanced and sized for viewing</div>
            <div className="scene-instruction">DRAG TO ORBIT <span>·</span> SCROLL TO ZOOM</div>
          </div>
          <div className="scene-caption"><span>ORBITAL VIEW · ASTEROID BELT</span><span>Mission positions illustrative · motion accelerated · not to scale</span></div>
        </div>

        <aside className="planet-panel" aria-label="Planet selection and information">
          {(showJourneyChooser || activeJourney || completedJourneyTitle) && <section className="guided-tour" aria-label="Guided planet journey" aria-live="polite">
            <div className="guided-tour-heading"><span><Compass size={14}/> GUIDED JOURNEY</span><button className="guided-tour-close" onClick={leaveJourney} aria-label="Close guided journey"><X size={15}/></button></div>
            {activeJourney && activeStopPlanet ? <>
              <div className="guided-tour-count">STOP {activeStopIndex + 1} OF {activeJourney.stops.length} <span>{journeyVisitedCount} VISITED</span></div>
              <h2>{activeJourney.title}</h2>
              <p className="guided-tour-prompt">{activeStopPlanet.description}</p>
              <a className="guided-tour-detail" href={`/planet/${activeStopPlanet.id}`} onClick={saveCurrentStop}>Read the {activeStopPlanet.name} field guide <ArrowUpRight size={13}/></a>
              <button className="guided-tour-next" onClick={recordCurrentStop}><Check size={14}/>{activeStopIndex === activeJourney.stops.length - 1 ? 'Complete journey' : `Mark explored · continue to ${activeJourney.stops[activeStopIndex + 1]}`}</button>
            </> : completedJourneyTitle ? <div className="guided-tour-complete"><span><Check size={15}/> JOURNEY COMPLETE</span><h2>{completedJourneyTitle}</h2><p>Your planet visits have been added to your field log.</p><button className="guided-tour-next" onClick={() => { setCompletedJourneyTitle(null); setShowJourneyChooser(true) }}>Choose another journey <ArrowRight size={14}/></button></div> : <>
              <p className="guided-tour-prompt">Follow a short route through connected worlds. The camera will bring each stop into view.</p>
              {journeys.map((journey) => <button className="guided-tour-choice" key={journey.id} onClick={() => startJourney(journey.id)}><span><strong>{journey.title}</strong><small>{journey.length} · {journey.stops.join(' — ')}</small></span><ArrowRight size={15}/></button>)}
            </>}
          </section>}
          <div className="planet-panel-label"><span>SELECT A WORLD</span><span>08</span></div>
          <div className="planet-picker" role="group" aria-label="Planets">
            {planets.map((planet, index) => (
              <button key={planet.id} className={`planet-pick${selectedId === planet.id ? ' is-active' : ''}`} aria-pressed={selectedId === planet.id} onClick={() => setSelectedId(planet.id)}>
                <span className="pick-index">0{index + 1}</span><span className={`pick-symbol ${planet.id}`} /><span>{planet.name}</span><ArrowUpRight className="pick-arrow" size={14} />
              </button>
            ))}
          </div>
          <div className="planet-fact" aria-live="polite" aria-atomic="true">
            <div className="fact-rule" style={{ backgroundColor: selectedPlanet.color }} />
            <span className="selected-kind">{selectedPlanet.kind} <span>·</span> {String(planets.findIndex((planet) => planet.id === selectedId) + 1).padStart(2, '0')} / 08</span>
            <h2>{selectedPlanet.name}</h2>
            <p>{selectedPlanet.description}</p>
            <dl className="selected-stats">
              <div><dt>Mean distance</dt><dd>{selectedPlanet.orbitAu.toLocaleString(undefined, { maximumFractionDigits: 2 })} <small>AU</small></dd></div>
              <div><dt>One orbit</dt><dd>{selectedPlanet.periodLabel}</dd></div>
              <div><dt>Equatorial diameter</dt><dd>{selectedPlanet.diameterKm.toLocaleString()} <small>km</small></dd></div>
            </dl>
            <a className="planet-source" href={`/planet/${selectedPlanet.id}`}>Explore {selectedPlanet.name} <ArrowUpRight size={13} /></a>
          </div>
        </aside>
      </section>

      <footer className="explorer-footer">
        <span>SCHEMATIC VIEW <span className="footer-dot">·</span> ORBITS SHOWN AS CIRCLES</span>
        <span>Distance, diameter and period figures: <a href={planetSources.nasaFacts} target="_blank" rel="noreferrer">NASA Planetary Fact Sheet <ArrowUpRight size={12} /></a></span>
      </footer>
    </main>
  )
}
