export type Planet = {
  id: string
  name: string
  kind: string
  color: string
  orbitAu: number
  periodDays: number
  periodLabel: string
  diameterKm: number
  sceneRadius: number
  orbitRadius: number
  phase: number
  teaser: string
  description: string
  texture: 'rock' | 'cloud' | 'earth' | 'mars' | 'bands' | 'ice'
}

export const planets: Planet[] = [
  { id: 'mercury', name: 'Mercury', kind: 'Terrestrial', color: '#b7aaa0', orbitAu: 0.39, periodDays: 87.97, periodLabel: '88 days', diameterKm: 4_880, sceneRadius: 0.14, orbitRadius: 2.3, phase: 0.44, teaser: 'A world of extremes', description: 'The smallest planet completes a lap around the Sun in just 88 days.', texture: 'rock' },
  { id: 'venus', name: 'Venus', kind: 'Terrestrial', color: '#d4ae7e', orbitAu: 0.72, periodDays: 224.7, periodLabel: '225 days', diameterKm: 12_104, sceneRadius: 0.2, orbitRadius: 3.2, phase: 2.4, teaser: 'Our brilliant neighbour', description: 'A dense atmosphere traps heat, making Venus the hottest planet.', texture: 'cloud' },
  { id: 'earth', name: 'Earth', kind: 'Terrestrial', color: '#77aeca', orbitAu: 1, periodDays: 365.26, periodLabel: '365 days', diameterKm: 12_756, sceneRadius: 0.22, orbitRadius: 4.15, phase: 4.2, teaser: 'The living world', description: 'The only world known to support life, with liquid water on its surface.', texture: 'earth' },
  { id: 'mars', name: 'Mars', kind: 'Terrestrial', color: '#ca7659', orbitAu: 1.52, periodDays: 686.98, periodLabel: '687 days', diameterKm: 6_792, sceneRadius: 0.17, orbitRadius: 5.2, phase: 1.15, teaser: 'The red planet', description: 'A cold desert world shaped by ancient rivers, volcanoes, and impact craters.', texture: 'mars' },
  { id: 'jupiter', name: 'Jupiter', kind: 'Gas giant', color: '#d3b69a', orbitAu: 5.2, periodDays: 4_332.6, periodLabel: '11.9 years', diameterKm: 142_984, sceneRadius: 0.57, orbitRadius: 7.05, phase: 3.25, teaser: 'King of the planets', description: 'The largest planet is a vast world of cloud bands and enormous storms.', texture: 'bands' },
  { id: 'saturn', name: 'Saturn', kind: 'Gas giant', color: '#d9c8a3', orbitAu: 9.58, periodDays: 10_759, periodLabel: '29.4 years', diameterKm: 120_536, sceneRadius: 0.49, orbitRadius: 8.9, phase: 5.25, teaser: 'A world of rings', description: 'A gas giant encircled by bright rings made mostly of fragments of ice and rock.', texture: 'bands' },
  { id: 'uranus', name: 'Uranus', kind: 'Ice giant', color: '#a8d3d1', orbitAu: 19.2, periodDays: 30_685, periodLabel: '84 years', diameterKm: 51_118, sceneRadius: 0.33, orbitRadius: 10.8, phase: 0.12, teaser: 'The tilted planet', description: 'An ice giant with a blue-green atmosphere and an extreme axial tilt.', texture: 'ice' },
  { id: 'neptune', name: 'Neptune', kind: 'Ice giant', color: '#527fbd', orbitAu: 30.1, periodDays: 60_189, periodLabel: '165 years', diameterKm: 49_528, sceneRadius: 0.32, orbitRadius: 12.5, phase: 2.85, teaser: 'The distant blue', description: 'The most distant planet is a dark, cold world with supersonic winds.', texture: 'ice' },
]

export const planetSources = {
  nasaFacts: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/',
}
