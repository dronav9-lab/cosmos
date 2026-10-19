export type DispatchStory = {
  title: string
  date: string
  section: string
  summary: string
  source: string
  sourceName: string
}

export type SkyEvent = {
  title: string
  start: string
  end: string
  kind: string
  note: string
  source: string
}

export const dispatchUpdatedAt = '2026-10-20'

export const dispatchStories: DispatchStory[] = [
  {
    title: 'Hubble spies a spiral’s edge',
    date: '2026-10-16',
    section: 'Deep field',
    summary: 'A new Hubble image catches the edge-on galaxy NGC 1827, where dark dust lanes cut across a disk 37 million light-years away.',
    source: 'https://science.nasa.gov/missions/hubble/nasas-hubble-spies-spirals-edge/',
    sourceName: 'NASA Science',
  },
  {
    title: 'Artemis III hardware moves forward',
    date: '2026-10-13',
    section: 'Human exploration',
    summary: 'Teams at Kennedy Space Center completed another major booster-stacking step as NASA prepares the SLS rocket for its next crewed lunar mission.',
    source: 'https://www.nasa.gov/blogs/missions/2026/10/13/nasa-completes-artemis-iii-booster-stacking-shares-status-update/',
    sourceName: 'NASA Missions',
  },
  {
    title: 'Perseverance sets a driving record on Mars',
    date: '2026-10-12',
    section: 'Mars',
    summary: 'NASA’s rover has driven farther on another world than any other wheeled vehicle, extending the reach of surface exploration on Mars.',
    source: 'https://science.nasa.gov/blogs/perseverance-mars-rover/2026/10/12/nasas-perseverance-sets-off-world-record-for-total-distance-driven/',
    sourceName: 'NASA Science',
  },
]

export const skyEvents: SkyEvent[] = [
  {
    title: 'Orionid meteor shower',
    start: '2026-10-21',
    end: '2026-10-22',
    kind: 'Meteor shower',
    note: 'Debris from Halley’s Comet can streak across any part of the sky. Try the hours before dawn, after moonset; the shower appears to radiate from Orion.',
    source: 'https://science.nasa.gov/solar-system/skywatching/whats-up-october-2026-skywatching-tips-from-nasa/',
  },
  {
    title: 'Hunter’s Moon',
    start: '2026-10-26',
    end: '2026-10-26',
    kind: 'Full Moon',
    note: 'The October full Moon rises bright in the evening sky. The name is a seasonal tradition, not a change in the Moon itself.',
    source: 'https://www.nasa.gov/blogs/watch-the-skies/2026/10/05/disappearing-planets-dragon-fireballs-hunters-moon-fill-octobers-spooky-skies/',
  },
  {
    title: 'The Moon meets the Pleiades',
    start: '2026-10-27',
    end: '2026-10-28',
    kind: 'Moon & stars',
    note: 'Look east in the evening for the Moon passing close to the Seven Sisters. Binoculars reveal more of the star cluster.',
    source: 'https://science.nasa.gov/solar-system/skywatching/whats-up-october-2026-skywatching-tips-from-nasa/',
  },
  {
    title: 'Taurid meteor shower',
    start: '2026-11-04',
    end: '2026-11-05',
    kind: 'Meteor shower',
    note: 'The Taurids are a modest shower. Find a dark, open sky and give your eyes time to adapt.',
    source: 'https://www.nasa.gov/blogs/watch-the-skies/2026/01/16/most-notable-2026-astronomical-events-a-year-of-watching-the-skies/',
  },
  {
    title: 'Leonid meteor shower',
    start: '2026-11-17',
    end: '2026-11-17',
    kind: 'Meteor shower',
    note: 'The Leonids are known for fast meteors. Watch after midnight from a dark location, with an unobstructed view of the sky.',
    source: 'https://www.nasa.gov/blogs/watch-the-skies/2026/01/16/most-notable-2026-astronomical-events-a-year-of-watching-the-skies/',
  },
  {
    title: 'November Supermoon',
    start: '2026-11-24',
    end: '2026-11-24',
    kind: 'Full Moon',
    note: 'November’s full Moon is also a supermoon: it occurs near the Moon’s closest approach to Earth in its orbit.',
    source: 'https://www.nasa.gov/blogs/watch-the-skies/2026/01/16/most-notable-2026-astronomical-events-a-year-of-watching-the-skies/',
  },
  {
    title: 'Uranus at opposition',
    start: '2026-11-25',
    end: '2026-11-25',
    kind: 'Planet watch',
    note: 'Earth passes between the Sun and Uranus. The distant planet is best viewed with binoculars or a telescope.',
    source: 'https://www.nasa.gov/blogs/watch-the-skies/2026/01/16/most-notable-2026-astronomical-events-a-year-of-watching-the-skies/',
  },
]
