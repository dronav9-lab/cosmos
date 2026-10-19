import type { Planet } from './planetData'

export type PlanetProfile = {
  eyebrow: string
  introduction: string
  featureTitle: string
  featureCopy: string
  mission: string
  imageId: string
  imageCaption: string
  imageSource: string
  nasaPage: string
}

export const planetProfiles: Record<string, PlanetProfile> = {
  mercury: {
    eyebrow: 'THE INNERMOST WORLD',
    introduction: 'A small, ancient world where the Sun looms large and a year lasts less than three Earth months.',
    featureTitle: 'A surface written in impact',
    featureCopy: 'Mercury has almost no atmosphere to soften incoming impacts or hold warmth. Its heavily cratered surface preserves a long record of collisions from the early solar system.',
    mission: 'MESSENGER became the first spacecraft to orbit Mercury, mapping the planet and studying its magnetic field and exosphere.',
    imageId: 'PIA15163',
    imageCaption: 'Global mosaic of Mercury from NASA’s MESSENGER mission. NASA / JHU APL / Carnegie Institution of Washington.',
    imageSource: 'https://science.nasa.gov/photojournal/mercury-globe-0n-270e/',
    nasaPage: 'https://science.nasa.gov/mercury/facts/',
  },
  venus: {
    eyebrow: 'THE CLOUD-WRAPPED WORLD',
    introduction: 'Earth’s near twin in size hides a radically different surface beneath a dense, hot atmosphere.',
    featureTitle: 'A world mapped by radar',
    featureCopy: 'Opaque clouds conceal the ground from ordinary cameras. NASA’s Magellan spacecraft used radar to map most of Venus, revealing volcanic plains, mountains, and a surface shaped by immense heat and pressure.',
    mission: 'Magellan mapped Venus from orbit between 1990 and 1994, using radar to see through the planet’s clouds.',
    imageId: 'PIA23791',
    imageCaption: 'Venus’ cloud-wrapped globe from NASA’s Mariner 10 spacecraft. NASA / JPL-Caltech.',
    imageSource: 'https://science.nasa.gov/photojournal/venus-from-mariner-10/',
    nasaPage: 'https://science.nasa.gov/venus/facts/',
  },
  earth: {
    eyebrow: 'OUR HOME WORLD',
    introduction: 'A restless planet of oceans, continents, clouds, and life — the only world known to support living things.',
    featureTitle: 'A planet in motion',
    featureCopy: 'Earth’s atmosphere and oceans move heat around the planet. Water cycles between sea, sky, ice, and land, while living systems shape and respond to those changing conditions.',
    mission: 'NASA’s Earth-observing missions measure changes across land, ocean, atmosphere, and ice from space.',
    imageId: 'PIA18033',
    imageCaption: 'A global Blue Marble mosaic assembled from Suomi NPP VIIRS observations. NASA.',
    imageSource: 'https://science.nasa.gov/photojournal/earth/',
    nasaPage: 'https://science.nasa.gov/earth/facts/',
  },
  mars: {
    eyebrow: 'THE RED PLANET',
    introduction: 'A cold desert with giant volcanoes, deep canyons, and a record of ancient rivers and lakes.',
    featureTitle: 'A climate with a past',
    featureCopy: 'Mars is dry and cold today, but its terrain preserves signs that liquid water once flowed and pooled on the surface. Orbiters and rovers continue to investigate how that environment changed.',
    mission: 'NASA’s Mars Reconnaissance Orbiter studies the planet from above, mapping surface minerals, weather, and terrain.',
    imageId: 'PIA02992',
    imageCaption: 'A Viking Orbiter image mosaic forming a digital globe of Mars. NASA / JPL / USGS.',
    imageSource: 'https://science.nasa.gov/photojournal/mars-digital-image-mosaic-globe/',
    nasaPage: 'https://science.nasa.gov/mars/facts/',
  },
  jupiter: {
    eyebrow: 'THE GIANT PLANET',
    introduction: 'A vast planet of swirling cloud bands and storms, with a family of moons that are worlds in their own right.',
    featureTitle: 'Weather on a giant scale',
    featureCopy: 'Jupiter’s visible clouds form bands and long-lived storms. The Great Red Spot is a persistent storm system large enough to be seen through a telescope from Earth.',
    mission: 'NASA’s Juno spacecraft studies Jupiter’s atmosphere, interior, magnetic field, and auroras from a looping polar orbit.',
    imageId: 'PIA09243',
    imageCaption: 'A full-disk mosaic of Jupiter captured by New Horizons’ LORRI camera. NASA / JHU APL / Southwest Research Institute.',
    imageSource: 'https://science.nasa.gov/photojournal/full-jupiter-mosaic/',
    nasaPage: 'https://science.nasa.gov/jupiter/facts/',
  },
  saturn: {
    eyebrow: 'THE RINGED GIANT',
    introduction: 'A gas giant surrounded by a broad, bright ring system made mostly of countless pieces of water ice.',
    featureTitle: 'Rings made of worlds',
    featureCopy: 'Saturn’s rings span a great distance but are remarkably thin. Their particles range from fine grains to chunks, and small moons help shape gaps and edges within the ring system.',
    mission: 'The Cassini-Huygens mission spent 13 years exploring Saturn, its rings, and its moons before ending in the planet’s atmosphere in 2017.',
    imageId: 'PIA17474',
    imageCaption: 'A natural-color view of Saturn and its rings from NASA’s Cassini spacecraft. NASA / JPL-Caltech / SSI.',
    imageSource: 'https://science.nasa.gov/photojournal/jewel-of-the-solar-system/',
    nasaPage: 'https://science.nasa.gov/saturn/facts/',
  },
  uranus: {
    eyebrow: 'THE TILTED ICE GIANT',
    introduction: 'A pale blue-green planet that rotates on its side, giving it some of the most unusual seasons in the solar system.',
    featureTitle: 'A planet tipped over',
    featureCopy: 'Uranus rotates with an extreme axial tilt. Methane in its atmosphere absorbs red light and helps give the planet its blue-green appearance.',
    mission: 'Voyager 2 is the only spacecraft to have visited Uranus up close, passing the planet in 1986.',
    imageId: 'PIA00032',
    imageCaption: 'Voyager 2 views of Uranus in true and false color, made from images returned in 1986. NASA / JPL.',
    imageSource: 'https://science.nasa.gov/photojournal/uranus-in-true-and-false-color/',
    nasaPage: 'https://science.nasa.gov/uranus/facts/',
  },
  neptune: {
    eyebrow: 'THE OUTERMOST PLANET',
    introduction: 'A distant, dark-blue world where fast winds sweep through a dynamic atmosphere of clouds and storms.',
    featureTitle: 'Weather at the edge',
    featureCopy: 'Neptune is so far from the Sun that it receives little sunlight, yet its atmosphere is active. Voyager 2 revealed changing clouds and major storm systems during its 1989 flyby.',
    mission: 'Voyager 2 remains the only spacecraft to have visited Neptune, returning images and measurements during a single 1989 flyby.',
    imageId: 'PIA02210',
    imageCaption: 'Neptune’s atmosphere imaged by NASA’s Voyager 2 in 1989. NASA / JPL.',
    imageSource: 'https://science.nasa.gov/photojournal/neptune-3/',
    nasaPage: 'https://science.nasa.gov/neptune/facts/',
  },
}

export function getPlanetImageUrl(imageId: string) {
  const folder = imageId.slice(3, 5).padStart(2, '0')
  return `https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia${folder.toLowerCase()}/${imageId.toLowerCase()}/${imageId}.jpg?crop=faces%2Cfocalpoint&fit=clip&h=1200&w=1800`
}

export function getProfile(planet: Planet) {
  return planetProfiles[planet.id]
}
