import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, RotateCcw } from 'lucide-react'
import { dailyTrivia, journeys, LEARNING_PROGRESS_STORAGE_KEY, quizQuestions } from './learningData'
import { Brand } from './Brand'
import './learn.css'

type LearningProgress = { answered: number[]; correct: number[]; stops: string[] }
const emptyProgress: LearningProgress = { answered: [], correct: [], stops: [] }

function readProgress(): LearningProgress {
  try {
    const value = localStorage.getItem(LEARNING_PROGRESS_STORAGE_KEY)
    if (!value) return emptyProgress
    const parsed = JSON.parse(value) as Partial<LearningProgress>
    return { answered: parsed.answered ?? [], correct: parsed.correct ?? [], stops: parsed.stops ?? [] }
  } catch { return emptyProgress }
}

function dayIndex(length: number) {
  const today = new Date()
  const start = new Date(today.getFullYear(), 0, 0)
  return Math.floor((today.getTime() - start.getTime()) / 86400000) % length
}

export default function Learn() {
  const [progress, setProgress] = useState<LearningProgress>(readProgress)
  const [selected, setSelected] = useState<number | null>(null)
  const trivia = dailyTrivia[dayIndex(dailyTrivia.length)]
  const questionIndex = quizQuestions.findIndex((_, index) => !progress.answered.includes(index))
  const question = quizQuestions[questionIndex]
  const correctCount = progress.correct.length

  useEffect(() => {
    try { localStorage.setItem(LEARNING_PROGRESS_STORAGE_KEY, JSON.stringify(progress)) } catch { /* Progress remains available for this visit. */ }
  }, [progress])

  function answerQuestion(option: number) {
    if (!question || selected !== null) return
    setSelected(option)
  }

  function continueQuiz() {
    if (!question || selected === null) return
    setProgress((current) => ({
      ...current,
      answered: [...current.answered, questionIndex],
      correct: selected === question.answer ? [...current.correct, questionIndex] : current.correct,
    }))
    setSelected(null)
  }

  function markStop(stop: string) {
    setProgress((current) => ({ ...current, stops: current.stops.includes(stop) ? current.stops : [...current.stops, stop] }))
  }

  function resetQuiz() {
    setSelected(null)
    setProgress((current) => ({ ...current, answered: [], correct: [] }))
  }

  return <main className="learn-page">
    <header className="learn-header"><Brand /><nav aria-label="Main navigation"><a href="/explorer">Explore</a><a href="/#worlds">Worlds</a><a href="/field-notes">Field notes</a><a className="is-current" href="/learn" aria-current="page">Learn</a></nav><a className="learn-back" href="/"><ArrowLeft size={15}/> Back to cosmos</a></header>
    <section className="learn-hero"><div className="learn-kicker">A FIELD GUIDE TO KEEPING CURIOUS</div><h1>Knowledge takes<br/><em>you farther.</em></h1><p>One small question can open a much bigger view. Begin with a daily observation, test what you know, or follow a path through the planets.</p></section>
    <section className="learn-progress" aria-label="Your learning progress"><div><span className="learn-kicker">YOUR FIELD LOG</span><strong>{correctCount}<small> / {quizQuestions.length}</small></strong><span>quiz answers correct</span></div><div className="progress-track" role="progressbar" aria-label="Quiz progress" aria-valuenow={progress.answered.length} aria-valuemin={0} aria-valuemax={quizQuestions.length}><span style={{ width: `${(progress.answered.length / quizQuestions.length) * 100}%` }}/></div><div className="learn-stops-count"><strong>{progress.stops.length}<small> / 8</small></strong><span>worlds visited</span></div></section>
    <section className="learn-daily" aria-labelledby="daily-title"><div className="learn-section-label"><span>01</span><span className="learn-rule"/> TODAY’S TRIVIA</div><div className="daily-layout"><div><h2 id="daily-title">A fact to carry<br/><em>into the night.</em></h2><p className="daily-question">{trivia.question}</p><p className="daily-answer">{trivia.answer}</p></div><div className="daily-mark" aria-hidden="true">?</div></div></section>
      <section className="learn-quiz" aria-labelledby="quiz-title"><div className="learn-section-label"><span>02</span><span className="learn-rule"/> QUICK QUIZ</div><div className="quiz-layout"><div><h2 id="quiz-title">A closer look.</h2><p>Five questions, each rooted in the worlds we can observe.</p></div><div className="quiz-panel">{question ? <><div className="quiz-count">QUESTION {progress.answered.length + 1} OF {quizQuestions.length}</div><h3>{question.prompt}</h3><div className="quiz-options">{question.options.map((option, index) => <button key={option} className={selected === index ? (index === question.answer ? 'is-correct' : 'is-wrong') : selected !== null && index === question.answer ? 'is-correct' : ''} onClick={() => answerQuestion(index)} disabled={selected !== null}>{option}{selected !== null && index === question.answer && <Check size={16}/>}</button>)}</div>{selected !== null && <><p className="quiz-explanation" role="status">{question.explanation}</p><button className="learn-reset" onClick={continueQuiz}>{progress.answered.length === quizQuestions.length - 1 ? 'See results' : 'Next question'} <ArrowRight size={15}/></button></>}</> : <div className="quiz-complete"><span className="learn-kicker">FIELD CHECK COMPLETE</span><h3>You got {correctCount} of {quizQuestions.length} right.</h3><p>The best discoveries begin with another question.</p><button className="learn-reset" onClick={resetQuiz}><RotateCcw size={15}/> Try again</button></div>}</div></div></section>
    <section className="learn-journeys" aria-labelledby="journey-title"><div className="learn-section-label"><span>03</span><span className="learn-rule"/> GUIDED JOURNEYS</div><div className="journey-heading"><h2 id="journey-title">Choose a direction.</h2><p>Follow a route across connected worlds. Your visits are saved here on this device.</p></div><div className="journey-list">{journeys.map((journey) => { const done = journey.stops.filter((stop) => progress.stops.includes(stop)).length; return <article className="journey" key={journey.id}><div className="journey-meta"><span>{journey.length}</span><span>{done} OF {journey.stops.length} VISITED</span></div><h3>{journey.title}</h3><p>{journey.description}</p><ol>{journey.stops.map((stop, index) => <li key={stop} className={progress.stops.includes(stop) ? 'is-visited' : ''}><span>{String(index + 1).padStart(2, '0')}</span><a href={journey.links[index]} onClick={() => markStop(stop)}>{stop}<ArrowUpRight size={14}/></a></li>)}</ol><div className="journey-progress"><span style={{ width: `${(done / journey.stops.length) * 100}%` }}/></div></article>})}</div></section>
    <footer className="learn-footer"><Brand /><span>Keep looking up.</span><a href="/explorer">Explore the solar system <ArrowRight size={14}/></a></footer>
  </main>
}
