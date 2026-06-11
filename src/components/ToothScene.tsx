import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

const enamelProps = {
  color: '#EEF8FF' as const,
  roughness: 0.06,
  metalness: 0,
  clearcoat: 1.0,
  clearcoatRoughness: 0.04,
  reflectivity: 0.6,
  envMapIntensity: 1.4,
}

function EnamelMaterial() {
  return <meshPhysicalMaterial {...enamelProps} />
}

function ToothMesh() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.elapsedTime * 0.22
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.28) * 0.07
  })

  return (
    <group ref={groupRef}>
      {/* Crown cylinder */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.7, 0.76, 0.88, 36]} />
        <EnamelMaterial />
      </mesh>
      {/* Crown top dome */}
      <mesh position={[0, 0.62, 0]}>
        <sphereGeometry args={[0.7, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <EnamelMaterial />
      </mesh>
      {/* Neck */}
      <mesh position={[0, -0.26, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.76, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
        <EnamelMaterial />
      </mesh>
      {/* Cusps */}
      {([
        [-0.28, 0.88, 0.22] as [number, number, number],
        [0.28, 0.88, 0.22] as [number, number, number],
        [0, 0.94, -0.18] as [number, number, number],
        [-0.26, 0.84, -0.2] as [number, number, number],
        [0.26, 0.84, -0.2] as [number, number, number],
      ]).map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[i < 2 ? 0.19 : 0.16, 20, 20]} />
          <EnamelMaterial />
        </mesh>
      ))}
      {/* Root 1 */}
      <mesh position={[-0.24, -0.92, 0.1]} rotation={[0.1, 0, 0.13]}>
        <capsuleGeometry args={[0.21, 0.72, 8, 20]} />
        <EnamelMaterial />
      </mesh>
      {/* Root 2 */}
      <mesh position={[0.24, -0.92, 0.1]} rotation={[0.1, 0, -0.13]}>
        <capsuleGeometry args={[0.21, 0.72, 8, 20]} />
        <EnamelMaterial />
      </mesh>
      {/* Root 3 – lingual */}
      <mesh position={[0, -0.88, -0.2]} rotation={[-0.18, 0, 0]}>
        <capsuleGeometry args={[0.18, 0.65, 8, 20]} />
        <EnamelMaterial />
      </mesh>
    </group>
  )
}

function OrbitRings() {
  const r1 = useRef<THREE.Group>(null)
  const r2 = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (r1.current) {
      r1.current.rotation.y = clock.elapsedTime * 0.55
      r1.current.rotation.x = Math.PI / 3.5
    }
    if (r2.current) {
      r2.current.rotation.y = -clock.elapsedTime * 0.38
      r2.current.rotation.z = Math.PI / 5
    }
  })

  return (
    <>
      <group ref={r1}>
        <mesh>
          <torusGeometry args={[1.95, 0.018, 12, 120]} />
          <meshStandardMaterial
            color="#22D3EE"
            emissive="#22D3EE"
            emissiveIntensity={1.8}
            transparent
            opacity={0.65}
          />
        </mesh>
      </group>
      <group ref={r2}>
        <mesh>
          <torusGeometry args={[1.55, 0.01, 8, 100]} />
          <meshStandardMaterial
            color="#67E8F9"
            emissive="#67E8F9"
            emissiveIntensity={1.2}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </>
  )
}

function Scene() {
  return (
    <>
      <Environment preset="dawn" />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 8, 4]} intensity={2.5} color="#FFFFFF" castShadow />
      <pointLight position={[-4, 3, 3]} intensity={2.2} color="#22D3EE" />
      <pointLight position={[3, -3, -2]} intensity={0.9} color="#BAE6FD" />
      <spotLight position={[0, 6, 0]} intensity={1.2} angle={0.5} penumbra={1} color="#E0F7FF" />

      <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.7}>
        <ToothMesh />
      </Float>

      <OrbitRings />

      <Sparkles
        count={55}
        scale={4.5}
        size={1.6}
        speed={0.35}
        color="#38BDF8"
        opacity={0.75}
      />

      <ContactShadows
        opacity={0.18}
        scale={5}
        blur={1.8}
        far={4}
        resolution={256}
        position={[0, -2, 0]}
        color="#0891B2"
      />
    </>
  )
}

export default function ToothScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.2, 4.8], fov: 44 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        shadows
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
