import { Html, Line, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useRef, type CSSProperties, type ReactNode } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { planets, type Planet } from './planetData'

type PlanetMeshProps = {
  planet: Planet
  selected: boolean
  playing: boolean
  showMissions: boolean
  onSelect: () => void
}

function seededRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}

export function makePlanetTexture(planet: Planet) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const context = canvas.getContext('2d')
  if (!context) return null

  const random = seededRandom(planet.id.length * 927 + Math.round(planet.orbitAu * 100))
  context.fillStyle = planet.texture === 'earth' ? '#174c77' : planet.color
  context.fillRect(0, 0, 512, 256)

  if (planet.texture === 'bands' || planet.texture === 'cloud' || planet.texture === 'ice') {
    const bands = planet.texture === 'bands' ? 17 : 24
    for (let i = 0; i < bands; i += 1) {
      const y = (i / bands) * 256
      const height = 256 / bands
      const shift = Math.sin(i * 1.7) * 5
      context.fillStyle = i % 2 === 0 ? 'rgba(255,244,225,0.19)' : 'rgba(25,38,55,0.12)'
      context.beginPath()
      context.moveTo(0, y)
      for (let x = 0; x <= 512; x += 24) {
        context.lineTo(x, y + Math.sin(x * 0.018 + i) * shift)
      }
      context.lineTo(512, y + height)
      context.lineTo(0, y + height)
      context.closePath()
      context.fill()
    }
    if (planet.id === 'jupiter') {
      context.fillStyle = 'rgba(159,77,49,0.82)'
      context.beginPath()
      context.ellipse(344, 153, 34, 17, -0.12, 0, Math.PI * 2)
      context.fill()
      context.strokeStyle = 'rgba(246,207,163,0.35)'
      context.lineWidth = 3
      context.stroke()
    }
  } else if (planet.texture === 'earth') {
    const land = ['#6d8156', '#a8996f', '#466b56']
    const continents = [
      [[74, 56], [103, 44], [129, 58], [137, 81], [119, 94], [113, 117], [94, 130], [79, 104], [67, 86]],
      [[125, 132], [151, 142], [159, 168], [151, 198], [137, 225], [123, 201], [121, 174]],
      [[239, 49], [279, 42], [306, 59], [333, 60], [361, 81], [351, 105], [326, 110], [304, 95], [282, 112], [264, 91], [238, 81]],
      [[264, 115], [294, 121], [302, 145], [287, 174], [271, 190], [258, 163], [251, 137]],
      [[366, 159], [400, 150], [419, 169], [406, 186], [382, 182]],
    ]
    continents.forEach((points, index) => {
      context.fillStyle = land[index % land.length]
      context.beginPath()
      points.forEach(([x, y], pointIndex) => pointIndex === 0 ? context.moveTo(x, y) : context.lineTo(x, y))
      context.closePath()
      context.fill()
    })
    context.strokeStyle = 'rgba(255,255,255,0.48)'
    context.lineWidth = 5
    for (let i = 0; i < 8; i += 1) {
      const y = 21 + i * 29 + random() * 8
      context.beginPath()
      context.ellipse(70 + random() * 350, y, 34 + random() * 78, 2 + random() * 4, 0.06, 0, Math.PI * 2)
      context.stroke()
    }
  } else {
    for (let i = 0; i < 170; i += 1) {
      const x = random() * 512
      const y = random() * 256
      const r = 1 + random() * (planet.texture === 'mars' ? 8 : 5)
      context.fillStyle = `rgba(15,18,22,${0.04 + random() * 0.2})`
      context.beginPath()
      context.arc(x, y, r, 0, Math.PI * 2)
      context.fill()
      context.strokeStyle = 'rgba(255,235,205,0.08)'
      context.lineWidth = Math.max(1, r * 0.28)
      context.stroke()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.RepeatWrapping
  texture.anisotropy = 4
  return texture
}

function AsteroidBelt() {
  const beltRef = useRef<THREE.InstancedMesh>(null)
  const count = 1800
  const asteroids = useMemo(() => {
    const random = seededRandom(82042)
    const dummy = new THREE.Object3D()
    const colors = ['#817c77', '#9b9387', '#666d74', '#b0a48f', '#76716b']
    return Array.from({ length: count }, () => {
      const angle = random() * Math.PI * 2
      const radius = 5.88 + random() * 0.78
      const size = 0.012 + random() * 0.038
      dummy.position.set(Math.cos(angle) * radius, (random() - 0.5) * 0.18, Math.sin(angle) * radius)
      dummy.rotation.set(random() * Math.PI, random() * Math.PI, random() * Math.PI)
      dummy.scale.set(size * (0.8 + random()), size * (0.7 + random() * 0.5), size * (0.7 + random()))
      dummy.updateMatrix()
      return { matrix: dummy.matrix.clone(), color: new THREE.Color(colors[Math.floor(random() * colors.length)]) }
    })
  }, [])

  useLayoutEffect(() => {
    const mesh = beltRef.current
    if (!mesh) return
    asteroids.forEach(({ matrix, color }, index) => {
      mesh.setMatrixAt(index, matrix)
      mesh.setColorAt(index, color)
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [asteroids])

  const innerEdge = Array.from({ length: 129 }, (_, index) => {
    const angle = (index / 128) * Math.PI * 2
    return [Math.cos(angle) * 5.88, 0, Math.sin(angle) * 5.88] as [number, number, number]
  })
  const outerEdge = Array.from({ length: 129 }, (_, index) => {
    const angle = (index / 128) * Math.PI * 2
    return [Math.cos(angle) * 6.66, 0, Math.sin(angle) * 6.66] as [number, number, number]
  })

  return (
    <group>
      <Line points={innerEdge} color="#a39a8d" transparent opacity={0.1} lineWidth={0.5} />
      <Line points={outerEdge} color="#a39a8d" transparent opacity={0.1} lineWidth={0.5} />
      <instancedMesh ref={beltRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial vertexColors roughness={0.96} metalness={0.02} />
      </instancedMesh>
      <Html position={[6.22, 0.16, 0]} center distanceFactor={20} style={{ pointerEvents: 'none' }}>
        <span className="scene-label feature-label">ASTEROID BELT</span>
      </Html>
    </group>
  )
}

function SpacecraftModel({ station = false }: { station?: boolean }) {
  return station ? (
    <group rotation={[0.22, 0.3, 0.12]}>
      <mesh><boxGeometry args={[0.13, 0.09, 0.09]} /><meshStandardMaterial color="#d8d5cc" metalness={0.65} roughness={0.35} /></mesh>
      <mesh position={[-0.2, 0, 0]}><boxGeometry args={[0.25, 0.012, 0.12]} /><meshStandardMaterial color="#55718d" metalness={0.35} roughness={0.45} /></mesh>
      <mesh position={[0.2, 0, 0]}><boxGeometry args={[0.25, 0.012, 0.12]} /><meshStandardMaterial color="#55718d" metalness={0.35} roughness={0.45} /></mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.08, 0]}><cylinderGeometry args={[0.026, 0.026, 0.16, 8]} /><meshStandardMaterial color="#dedbd2" metalness={0.7} roughness={0.3} /></mesh>
    </group>
  ) : (
    <group rotation={[0.2, 0.4, -0.25]}>
      <mesh><boxGeometry args={[0.11, 0.1, 0.1]} /><meshStandardMaterial color="#d8d5cc" metalness={0.65} roughness={0.35} /></mesh>
      <mesh position={[-0.13, 0, 0]}><boxGeometry args={[0.13, 0.07, 0.012]} /><meshStandardMaterial color="#52718d" metalness={0.35} roughness={0.45} /></mesh>
      <mesh position={[0.13, 0, 0]}><boxGeometry args={[0.13, 0.07, 0.012]} /><meshStandardMaterial color="#52718d" metalness={0.35} roughness={0.45} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}><coneGeometry args={[0.08, 0.045, 12, 1, true]} /><meshStandardMaterial color="#c7c5bc" side={THREE.DoubleSide} metalness={0.55} roughness={0.4} /></mesh>
    </group>
  )
}

function PlanetOrbiter({ name, source, radius, phase, speed, playing, color, station = false, modelScale = 1, eccentricity = 0.04, inclination = 0.16, labelOffset = 0.15, labelNudge = [0, 0] }: {
  name: string
  source: string
  radius: number
  phase: number
  speed: number
  playing: boolean
  color: string
  station?: boolean
  modelScale?: number
  eccentricity?: number
  inclination?: number
  labelOffset?: number
  labelNudge?: [number, number]
}) {
  const marker = useRef<THREE.Group>(null)
  const angle = useRef(phase)
  const orbit = useMemo(() => Array.from({ length: 81 }, (_, index) => {
    const theta = (index / 80) * Math.PI * 2
    const distance = radius * (1 - eccentricity * Math.cos(theta))
    return [Math.cos(theta) * distance, Math.sin(theta) * radius * inclination, Math.sin(theta) * distance] as [number, number, number]
  }), [radius, eccentricity, inclination])

  useFrame((_, delta) => {
    if (!playing || !marker.current) return
    angle.current += delta * speed
    const distance = radius * (1 - eccentricity * Math.cos(angle.current))
    marker.current.position.set(Math.cos(angle.current) * distance, Math.sin(angle.current) * radius * inclination, Math.sin(angle.current) * distance)
  })

  const initialDistance = radius * (1 - eccentricity * Math.cos(phase))

  return (
    <group>
      <Line points={orbit} color={color} transparent opacity={0.32} lineWidth={0.65} />
      <group ref={marker} position={[Math.cos(phase) * initialDistance, Math.sin(phase) * radius * inclination, Math.sin(phase) * initialDistance]}>
        <group scale={modelScale}><SpacecraftModel station={station} /></group>
        <Html position={[0, labelOffset, 0]} center distanceFactor={20} style={{ pointerEvents: 'auto' }}>
          <a className="mission-label" href={source} target="_blank" rel="noreferrer" aria-label={`${name} — open NASA mission information`} style={{ '--mission-accent': color, '--label-x': `${labelNudge[0]}px`, '--label-y': `${labelNudge[1]}px` } as CSSProperties}>{name}</a>
        </Html>
      </group>
    </group>
  )
}

function PlanetMesh({ planet, selected, playing, showMissions, onSelect }: PlanetMeshProps) {
  const orbitingGroup = useRef<THREE.Group>(null)
  const angle = useRef(planet.phase)
  const texture = useMemo(() => makePlanetTexture(planet), [planet])

  useFrame((_, delta) => {
    if (playing && orbitingGroup.current) {
      angle.current += delta * 0.19 * Math.sqrt(365.256 / planet.periodDays)
      orbitingGroup.current.position.set(
        Math.cos(angle.current) * planet.orbitRadius,
        0,
        Math.sin(angle.current) * planet.orbitRadius,
      )
    }
  })

  return (
    <>
      <Line
        points={Array.from({ length: 129 }, (_, index) => {
          const theta = (index / 128) * Math.PI * 2
          return [Math.cos(theta) * planet.orbitRadius, 0, Math.sin(theta) * planet.orbitRadius] as [number, number, number]
        })}
        color={selected ? '#a9c9e4' : '#8997a8'}
        transparent
        opacity={selected ? 0.6 : 0.22}
        lineWidth={selected ? 1 : 0.65}
      />
      <group ref={orbitingGroup} position={[Math.cos(planet.phase) * planet.orbitRadius, 0, Math.sin(planet.phase) * planet.orbitRadius]}>
        {planet.id === 'saturn' && (
          <mesh rotation={[Math.PI / 2 - 0.28, 0.08, 0.12]}>
            <ringGeometry args={[planet.sceneRadius * 1.3, planet.sceneRadius * 2.2, 112]} />
            <meshStandardMaterial color="#c7b697" side={THREE.DoubleSide} transparent opacity={0.78} roughness={0.84} />
          </mesh>
        )}
        {selected && <>
          <mesh raycast={() => null}>
            <sphereGeometry args={[planet.sceneRadius * 1.38, 36, 32]} />
            <meshBasicMaterial color="#a8c9e7" transparent opacity={0.1} side={THREE.BackSide} depthWrite={false} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.008, 0]} raycast={() => null}>
            <ringGeometry args={[planet.sceneRadius * 1.58, planet.sceneRadius * 1.7, 64]} />
            <meshBasicMaterial color="#b7d3eb" transparent opacity={0.72} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
        </>}
        <mesh
          scale={selected ? 1.16 : 1}
          onClick={(event) => { event.stopPropagation(); onSelect() }}
          onPointerOver={(event) => { event.stopPropagation(); document.body.style.cursor = 'pointer' }}
          onPointerOut={() => { document.body.style.cursor = 'auto' }}
        >
          <sphereGeometry args={[planet.sceneRadius, 48, 40]} />
          <meshStandardMaterial map={texture} color={texture ? '#ffffff' : planet.color} roughness={planet.texture === 'ice' ? 0.52 : 0.9} metalness={0.02} />
        </mesh>
        <Html position={[0, planet.sceneRadius + 0.34, 0]} center distanceFactor={20} style={{ pointerEvents: 'none' }}>
          <span className={`scene-label${selected ? ' is-selected' : ''}`}>{planet.name}</span>
        </Html>
        {showMissions && planet.id === 'earth' && <>
          <PlanetOrbiter name="ISS" source="https://www.nasa.gov/international-space-station/" radius={0.39} phase={0.7} speed={1.8} playing={playing} color="#a9c9e4" station modelScale={0.4} labelOffset={0.21} labelNudge={[18, 11]} />
          <PlanetOrbiter name="Hubble" source="https://science.nasa.gov/mission/hubble/" radius={0.55} phase={3.2} speed={1.65} playing={playing} color="#9eb7cf" modelScale={0.4} labelOffset={-0.16} labelNudge={[-30, 16]} />
        </>}
        {showMissions && planet.id === 'jupiter' && <PlanetOrbiter name="Juno" source="https://science.nasa.gov/mission/juno/juno-orbits/" radius={1.05} phase={2.1} speed={0.75} playing={playing} color="#d8bd91" eccentricity={0.58} inclination={0.5} />}
      </group>
    </>
  )
}

function StarField() {
  const positions = useMemo(() => {
    const random = seededRandom(2026)
    const values = new Float32Array(1_200 * 3)
    for (let i = 0; i < 1_200; i += 1) {
      const index = i * 3
      values[index] = (random() - 0.5) * 90
      values[index + 1] = (random() - 0.5) * 48
      values[index + 2] = (random() - 0.5) * 85 - 12
    }
    return values
  }, [])

  return <points position={[0, 0, -4]}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#dce5ee" size={0.045} transparent opacity={0.72} sizeAttenuation /></points>
}

function Sun() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.86, 48, 48]} />
        <meshStandardMaterial color="#f2d4a7" emissive="#f2aa5a" emissiveIntensity={1.25} roughness={0.95} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.08, 32, 32]} />
        <meshBasicMaterial color="#ebb86e" transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
      <pointLight color="#ffe2b1" intensity={90} distance={29} decay={2} />
      <Html position={[0, -1.28, 0]} center distanceFactor={20} style={{ pointerEvents: 'none' }}>
        <span className="scene-label sun-label">SUN</span>
      </Html>
    </group>
  )
}

function WebbMarker({ playing }: { playing: boolean }) {
  const marker = useRef<THREE.Group>(null)
  const time = useRef(0)
  const earth = planets.find((planet) => planet.id === 'earth')!

  useFrame((_, delta) => {
    if (!playing || !marker.current) return
    time.current += delta
    const angle = earth.phase + time.current * 0.19 * Math.sqrt(365.256 / earth.periodDays)
    const halo = time.current * 0.08
    const radius = earth.orbitRadius + 0.38 + Math.sin(halo) * 0.08
    marker.current.position.set(Math.cos(angle) * radius, 0.2 + Math.sin(halo) * 0.08, Math.sin(angle) * radius)
  })

  const initialRadius = earth.orbitRadius + 0.38
  return (
    <group ref={marker} position={[Math.cos(earth.phase) * initialRadius, 0.2, Math.sin(earth.phase) * initialRadius]}>
      <group scale={2.4}><SpacecraftModel /></group>
      <Html position={[0, 0.17, 0]} center distanceFactor={20} style={{ pointerEvents: 'auto' }}>
        <a className="mission-label" href="https://science.nasa.gov/mission/webb/orbit/" target="_blank" rel="noreferrer" aria-label="James Webb Space Telescope — open NASA orbit information" style={{ '--mission-accent': '#c8b394', '--label-x': '28px', '--label-y': '-5px' } as CSSProperties}>JWST · L2</a>
      </Html>
    </group>
  )
}

function VoyagerMarker({ playing }: { playing: boolean }) {
  const marker = useRef<THREE.Group>(null)
  const distance = useRef(14.35)
  useFrame((_, delta) => {
    if (!playing || !marker.current) return
    distance.current = Math.min(16.4, distance.current + delta * 0.025)
    marker.current.position.set(distance.current, 0.35, -distance.current * 0.18)
  })
  return (
    <>
      <Line points={[[12.3, 0.2, -2.2], [16.4, 0.2, -2.95]]} color="#bd9c79" transparent opacity={0.28} lineWidth={0.8} />
      <group ref={marker} position={[distance.current, 0.35, -distance.current * 0.18]}>
        <group scale={0.45}><SpacecraftModel /></group>
        <Html position={[0, 0.18, 0]} center distanceFactor={20} style={{ pointerEvents: 'auto' }}>
          <a className="mission-label" href="https://science.nasa.gov/mission/voyager/voyager-1/" target="_blank" rel="noreferrer" aria-label="Voyager 1 — open NASA mission information" style={{ '--mission-accent': '#c8a783', '--label-x': '12px' } as CSSProperties}>VOYAGER 1</a>
        </Html>
      </group>
    </>
  )
}

function CameraFocus({ focusRequest }: { focusRequest: { planetId: string; token: number } | null }) {
  const camera = useThree((state) => state.camera)
  const controls = useThree((state) => state.controls)

  useEffect(() => {
    if (!focusRequest || !controls || !('target' in controls)) return
    const planet = planets.find((item) => item.id === focusRequest.planetId)
    if (!planet) return
    const target = new THREE.Vector3(Math.cos(planet.phase) * planet.orbitRadius, 0, Math.sin(planet.phase) * planet.orbitRadius)
    camera.position.copy(target).add(new THREE.Vector3(0, 2.3, 4.7))
    const orbitControls = controls as THREE.EventDispatcher & { target: THREE.Vector3; minDistance: number; update: () => void }
    orbitControls.minDistance = 2.6
    orbitControls.target.copy(target)
    orbitControls.update()
  }, [camera, controls, focusRequest])

  return null
}

function SceneContents({ selectedId, playing, showMissions, onSelect, focusRequest }: { selectedId: string; playing: boolean; showMissions: boolean; onSelect: (id: string) => void; focusRequest: { planetId: string; token: number } | null }) {
  return (
    <>
      <color attach="background" args={['#070a10']} />
      <fog attach="fog" args={['#070a10', 22, 54]} />
      <ambientLight intensity={0.18} />
      <StarField />
      <Sun />
      <AsteroidBelt />
      {planets.map((planet) => (
        <PlanetMesh key={planet.id} planet={planet} selected={selectedId === planet.id} playing={playing} showMissions={showMissions} onSelect={() => onSelect(planet.id)} />
      ))}
      {showMissions && <><WebbMarker playing={playing} /><VoyagerMarker playing={playing} /></>}
      <CameraFocus focusRequest={focusRequest} />
      <OrbitControls makeDefault enablePan={false} minDistance={focusRequest ? 2.6 : 12} maxDistance={37} minPolarAngle={0.3} maxPolarAngle={1.49} enableDamping dampingFactor={0.055} />
    </>
  )
}

export function ExplorerCanvas({ selectedId, playing, showMissions, onSelect, resetToken, focusRequest }: {
  selectedId: string
  playing: boolean
  showMissions: boolean
  onSelect: (id: string) => void
  resetToken: number
  focusRequest: { planetId: string; token: number } | null
}) {
  return (
    <Canvas key={resetToken} className="explorer-canvas" fallback={<div className="canvas-unavailable" role="status">This browser cannot start the 3D view. Choose a planet from the list to keep exploring its facts.</div>} camera={{ position: [0, 24, 31], fov: 43, near: 0.1, far: 110 }} dpr={[1, 1.6]} frameloop={playing ? 'always' : 'demand'} gl={{ antialias: true, alpha: false }}>
      <SceneContents selectedId={selectedId} playing={playing} showMissions={showMissions} onSelect={onSelect} focusRequest={focusRequest} />
    </Canvas>
  )
}

function FocusedPlanet({ planet, autoRotate }: { planet: Planet; autoRotate: boolean }) {
  const mesh = useRef<THREE.Mesh>(null)
  const texture = useMemo(() => makePlanetTexture(planet), [planet])

  useFrame((_, delta) => {
    if (autoRotate && mesh.current) mesh.current.rotation.y += delta * 0.12
  })

  return (
    <group>
      {planet.id === 'saturn' && (
        <mesh rotation={[Math.PI / 2.35, 0.05, 0.2]}>
          <ringGeometry args={[1.48, 2.25, 144]} />
          <meshStandardMaterial color="#d2c19f" side={THREE.DoubleSide} transparent opacity={0.72} roughness={0.92} />
        </mesh>
      )}
      <mesh ref={mesh}>
        <sphereGeometry args={[1.24, 72, 64]} />
        <meshStandardMaterial map={texture} color={texture ? '#ffffff' : planet.color} roughness={planet.texture === 'ice' ? 0.48 : 0.88} metalness={0.01} />
      </mesh>
      {planet.id === 'earth' && (
        <mesh scale={1.04}>
          <sphereGeometry args={[1.24, 72, 64]} />
          <meshBasicMaterial color="#6198c2" transparent opacity={0.08} side={THREE.BackSide} />
        </mesh>
      )}
      <pointLight position={[-3.5, 2.4, 4]} intensity={70} distance={18} decay={2} color="#e9f2ff" />
    </group>
  )
}

export function PlanetPreviewCanvas({ planet, autoRotate, resetToken, fallback }: {
  planet: Planet
  autoRotate: boolean
  resetToken: number
  fallback: ReactNode
}) {
  return (
    <Canvas key={resetToken} className="planet-preview-canvas" fallback={fallback} camera={{ position: [0, 0.18, 4.9], fov: 36, near: 0.1, far: 40 }} dpr={[1, 1.5]} frameloop={autoRotate ? 'always' : 'demand'} gl={{ antialias: true, alpha: false }}>
      <color attach="background" args={['#070a10']} />
      <ambientLight intensity={0.42} />
      <StarField />
      <FocusedPlanet planet={planet} autoRotate={autoRotate} />
      <OrbitControls makeDefault enablePan={false} minDistance={2.4} maxDistance={8} minPolarAngle={0.25} maxPolarAngle={Math.PI - 0.25} enableDamping dampingFactor={0.06} />
    </Canvas>
  )
}
