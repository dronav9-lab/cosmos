export type Question = { prompt: string; options: string[]; answer: number; explanation: string }
export const LEARNING_PROGRESS_STORAGE_KEY = 'orbital-learning-progress-v1'

export const quizQuestions: Question[] = [
  { prompt: 'Which planet has the shortest year?', options: ['Mars', 'Mercury', 'Venus', 'Earth'], answer: 1, explanation: 'Mercury completes an orbit in about 88 Earth days.' },
  { prompt: 'What gives Saturn’s rings most of their brightness?', options: ['Frozen water ice', 'Metal dust', 'Clouds of gas', 'Volcanic ash'], answer: 0, explanation: 'The rings are made mostly of water-ice particles, from grains to chunks many metres across.' },
  { prompt: 'Which world has the largest volcano known in the solar system?', options: ['Venus', 'Earth', 'Mars', 'Io'], answer: 2, explanation: 'Olympus Mons on Mars is a giant shield volcano about 22 km high.' },
  { prompt: 'What is the Sun made of mostly?', options: ['Oxygen and carbon', 'Hydrogen and helium', 'Iron and silicon', 'Nitrogen and hydrogen'], answer: 1, explanation: 'The Sun is composed primarily of hydrogen, which fuses into helium in its core.' },
  { prompt: 'Which planet rotates on its side?', options: ['Jupiter', 'Neptune', 'Uranus', 'Saturn'], answer: 2, explanation: 'Uranus is tilted by about 98 degrees, so it rotates nearly on its side.' },
]

export const dailyTrivia = [
  { question: 'A day on Venus lasts longer than its year.', answer: 'True. Venus takes about 243 Earth days to rotate once, and about 225 to orbit the Sun.' },
  { question: 'The footprints left on the Moon can be erased by rain.', answer: 'False. The Moon has no weather or liquid rain, so footprints can persist for a very long time.' },
  { question: 'Jupiter is the only planet with rings.', answer: 'False. All four giant planets have ring systems, though Saturn’s are the most prominent.' },
  { question: 'Sunlight takes about eight minutes to reach Earth.', answer: 'True. Light travels at about 300,000 kilometres per second; the journey takes roughly 8 minutes 20 seconds.' },
]

export const journeys = [
  { id: 'inner-worlds', title: 'Worlds of rock and metal', length: '4 stops · about 12 min', description: 'Follow the small, dense planets from Mercury to Mars and see how their surfaces tell different stories.', stops: ['Mercury', 'Venus', 'Earth', 'Mars'], links: ['/planet/mercury', '/planet/venus', '/planet/earth', '/planet/mars'] },
  { id: 'giant-worlds', title: 'The giant planets', length: '4 stops · about 15 min', description: 'Travel outward to the immense worlds, their rings, deep atmospheres, and unusual seasons.', stops: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'], links: ['/planet/jupiter', '/planet/saturn', '/planet/uranus', '/planet/neptune'] },
]
