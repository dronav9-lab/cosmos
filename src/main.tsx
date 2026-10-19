import React from 'react'
import ReactDOM from 'react-dom/client'
import { lazy, Suspense } from 'react'
import App from './App'
import './styles.css'
import './type-scale.css'

const isExplorer = window.location.pathname.replace(/\/+$/, '') === '/explorer'
const isFieldNotes = window.location.pathname.replace(/\/+$/, '') === '/field-notes'
const isLearn = window.location.pathname.replace(/\/+$/, '') === '/learn'
const Explorer = lazy(() => import('./Explorer'))
const PlanetDetail = lazy(() => import('./PlanetDetail'))
const FieldNotes = lazy(() => import('./FieldNotes'))
const Learn = lazy(() => import('./Learn'))
const planetMatch = window.location.pathname.match(/^\/planet\/([a-z]+)\/?$/)
const planetIds = new Set(['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'])
const selectedPlanetId = planetMatch?.[1] && planetIds.has(planetMatch[1]) ? planetMatch[1] : null

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isExplorer ? <Suspense fallback={<div role="status" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#080c12', color: '#a8b2bd', fontSize: 14 }}>Opening the solar system…</div>}><Explorer /></Suspense> : isFieldNotes ? <Suspense fallback={<div role="status" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#080c12', color: '#a8b2bd', fontSize: 14 }}>Opening field notes…</div>}><FieldNotes /></Suspense> : isLearn ? <Suspense fallback={<div role="status" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#080c12', color: '#a8b2bd', fontSize: 14 }}>Opening the learning field guide…</div>}><Learn /></Suspense> : selectedPlanetId ? <Suspense fallback={<div role="status" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#080c12', color: '#a8b2bd', fontSize: 14 }}>Opening the field guide…</div>}><PlanetDetail planetId={selectedPlanetId} /></Suspense> : <App />}
  </React.StrictMode>,
)
