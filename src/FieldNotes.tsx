import { ArrowLeft, ArrowUpRight, ArrowRight } from 'lucide-react'
import { dispatchStories, dispatchUpdatedAt, skyEvents } from './fieldNotesData'
import { Brand } from './Brand'
import './field-notes.css'

function localDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day, 12)
}

function dateStamp(value: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(localDate(value))
}

function eventDate(start: string, end: string) {
  const startDate = localDate(start)
  const endDate = localDate(end)
  const startParts = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).formatToParts(startDate)
  const endParts = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).formatToParts(endDate)
  const startMonth = startParts.find((part) => part.type === 'month')?.value ?? ''
  const startDay = startParts.find((part) => part.type === 'day')?.value ?? ''
  const endMonth = endParts.find((part) => part.type === 'month')?.value ?? ''
  const endDay = endParts.find((part) => part.type === 'day')?.value ?? ''
  return start === end ? `${startMonth} ${startDay}` : startMonth === endMonth ? `${startMonth} ${startDay}–${endDay}` : `${startMonth} ${startDay}–${endMonth} ${endDay}`
}

function currentDateKey() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

export default function FieldNotes() {
  const today = currentDateKey()
  const upcomingEvents = skyEvents.filter((event) => event.end >= today)
  const firstEvent = upcomingEvents[0]

  return (
    <main className="dispatch-page">
      <header className="dispatch-header">
        <Brand />
        <nav aria-label="Main navigation">
          <a href="/explorer">Explore</a>
          <a href="/#worlds">Worlds</a>
          <a className="is-current" href="/field-notes" aria-current="page">Field notes</a>
        </nav>
        <a className="dispatch-back" href="/"><ArrowLeft size={15} /> Back to cosmos</a>
      </header>

      <section className="dispatch-hero" aria-labelledby="dispatch-title">
        <div className="dispatch-kicker"><span>FIELD NOTES</span><span className="dispatch-rule" /> SKY, SCIENCE & EXPLORATION</div>
        <div className="dispatch-hero-grid">
          <div>
            <h1 id="dispatch-title">The sky<br /><em>keeps moving.</em></h1>
            <p className="dispatch-deck">A considered guide to what is happening beyond our atmosphere — and what you can look for from here.</p>
          </div>
          <div className="dispatch-edition"><span>THIS EDITION</span><strong>{dateStamp(dispatchUpdatedAt)}</strong><span>Sources: NASA and JPL</span></div>
        </div>
        <a className="dispatch-hero-credit" href="https://science.nasa.gov/image-detail/orion-nebula-xlarge_web/" target="_blank" rel="noreferrer">
          Orion Nebula · NASA / ESA / M. Robberto <ArrowUpRight size={13} />
        </a>
      </section>

      <section className="dispatch-sky" aria-labelledby="sky-title">
        <div className="dispatch-section-head">
          <div><div className="dispatch-kicker"><span>01</span><span className="dispatch-rule" /> LOOK UP</div><h2 id="sky-title">On the horizon.</h2></div>
          <p>Dates are shown in your local calendar. Visibility depends on where you are, local weather, and light pollution.</p>
        </div>

        {firstEvent ? (
          <div className="dispatch-event-layout">
            <article className="dispatch-next-event">
              <span className="dispatch-next-label">NEXT IN THE SKY</span>
              <span className="dispatch-next-date">{eventDate(firstEvent.start, firstEvent.end)}</span>
              <span className="dispatch-next-kind">{firstEvent.kind}</span>
              <h3>{firstEvent.title}</h3>
              <p>{firstEvent.note}</p>
              <a href={firstEvent.source} target="_blank" rel="noreferrer">Viewing notes from NASA <ArrowUpRight size={14} /></a>
            </article>
            <ol className="dispatch-event-list">
              {upcomingEvents.slice(1).map((event) => (
                <li key={`${event.start}-${event.title}`}>
                  <time dateTime={event.start}>{eventDate(event.start, event.end)}</time>
                  <div><span>{event.kind}</span><h3>{event.title}</h3><p>{event.note}</p></div>
                  <a href={event.source} target="_blank" rel="noreferrer" aria-label={`NASA information about ${event.title}`}><ArrowUpRight size={16} /></a>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="dispatch-empty"><span>THE NIGHT SKY HAS ITS OWN PACE</span><p>There are no upcoming entries in this edition. NASA’s skywatching calendar has the latest month-by-month guide.</p><a href="https://science.nasa.gov/skywatching/" target="_blank" rel="noreferrer">Open NASA skywatching <ArrowUpRight size={14} /></a></div>
        )}
      </section>

      <section className="dispatch-fieldnote" aria-labelledby="fieldnote-title">
        <div className="dispatch-fieldnote-index"><span>FIELD NOTE 001</span><span>THE ORIONIDS</span></div>
        <div className="dispatch-fieldnote-copy">
          <div className="dispatch-kicker"><span>THE LONG WAY HOME</span><span className="dispatch-rule" /> A COMET’S TRAIL</div>
          <h2 id="fieldnote-title">A meteor shower<br />with a familiar origin.</h2>
          <p>The Orionids begin as tiny fragments left by Halley’s Comet. Earth crosses that old stream of dust each year; the particles meet our atmosphere and briefly become streaks of light. The shower appears to radiate from Orion, but meteors can cross any part of the sky.</p>
          <a href="https://science.nasa.gov/solar-system/skywatching/whats-up-october-2026-skywatching-tips-from-nasa/" target="_blank" rel="noreferrer">Read NASA’s skywatching guide <ArrowUpRight size={14} /></a>
        </div>
      </section>

      <section className="dispatch-news" aria-labelledby="news-title">
        <div className="dispatch-section-head">
          <div><div className="dispatch-kicker"><span>02</span><span className="dispatch-rule" /> FROM THE MISSIONS</div><h2 id="news-title">Further out, lately.</h2></div>
          <p>Recent work and discoveries, with the source linked at the story.</p>
        </div>
        <div className="dispatch-story-list">
          {dispatchStories.map((story, index) => (
            <article className="dispatch-story" key={story.title}>
              <span className="dispatch-story-index">0{index + 1}</span>
              <div className="dispatch-story-meta"><span>{story.section}</span><time dateTime={story.date}>{dateStamp(story.date)}</time></div>
              <div className="dispatch-story-copy"><h3>{story.title}</h3><p>{story.summary}</p></div>
              <a href={story.source} target="_blank" rel="noreferrer" aria-label={`Read ${story.title} at ${story.sourceName}`}><span>{story.sourceName}</span><ArrowUpRight size={17} /></a>
            </article>
          ))}
        </div>
        <a className="dispatch-explorer-link" href="/explorer">Return to the solar system <ArrowRight size={15} /></a>
      </section>

      <footer className="dispatch-footer">
        <Brand />
        <span>NASA and JPL links open the original source.</span>
        <span>UPDATED {dateStamp(dispatchUpdatedAt).toUpperCase()}</span>
      </footer>
    </main>
  )
}
