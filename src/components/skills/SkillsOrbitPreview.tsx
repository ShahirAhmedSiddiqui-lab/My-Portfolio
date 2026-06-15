import { AdaptiveDpr, AdaptiveEvents, Float, MeshTransmissionMaterial, Sparkles } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { AdditiveBlending, Group, MathUtils, Mesh, ShaderMaterial } from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function OrbitCluster({ isMobile, reducedMotion }: { isMobile: boolean; reducedMotion: boolean }) {
  const rootRef = useRef<Group>(null)
  const coreRef = useRef<Mesh>(null)
  const auraRef = useRef<ShaderMaterial>(null)
  const ringARef = useRef<Mesh>(null)
  const ringBRef = useRef<Mesh>(null)
  const ringCRef = useRef<Mesh>(null)
  const nodesRef = useRef<Array<Mesh | null>>([])

  const nodes = useMemo(
    () => [
      { position: [1.85, 0.45, 0.2], scale: 0.16, color: '#4D8DFF' },
      { position: [-1.4, 1.2, -0.15], scale: 0.13, color: '#D6B981' },
      { position: [1.2, -1.5, 0.1], scale: 0.12, color: '#7CFFB2' },
      { position: [-1.75, -0.9, 0.22], scale: 0.15, color: '#F2E5C7' },
    ],
    [],
  )

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime()
    const root = rootRef.current
    const core = coreRef.current
    const aura = auraRef.current
    const ringA = ringARef.current
    const ringB = ringBRef.current
    const ringC = ringCRef.current

    if (!root || !core || !ringA || !ringB || !ringC) {
      return
    }

    root.rotation.y = MathUtils.lerp(root.rotation.y, reducedMotion || isMobile ? 0.18 : state.mouse.x * 0.5, 0.05)
    root.rotation.x = MathUtils.lerp(root.rotation.x, reducedMotion || isMobile ? 0.08 : state.mouse.y * -0.32, 0.05)
    root.position.x = MathUtils.lerp(root.position.x, reducedMotion || isMobile ? 0 : state.mouse.x * 0.38, 0.05)
    root.position.y = MathUtils.lerp(root.position.y, reducedMotion || isMobile ? 0 : state.mouse.y * 0.24, 0.05)

    core.rotation.x += delta * 0.34
    core.rotation.y += delta * (reducedMotion || isMobile ? 0.22 : 0.72)
    ringA.rotation.z += delta * (isMobile ? 0.24 : 0.34)
    ringA.rotation.x += delta * 0.1
    ringB.rotation.y -= delta * (isMobile ? 0.28 : 0.42)
    ringB.rotation.x += delta * 0.14
    ringC.rotation.y += delta * (isMobile ? 0.18 : 0.28)
    ringC.rotation.z -= delta * (isMobile ? 0.12 : 0.18)

    if (aura) {
      aura.uniforms.time.value = elapsed
    }

    nodesRef.current.forEach((node, index) => {
      if (!node) {
        return
      }

      node.position.y = nodes[index].position[1] + Math.sin(elapsed * 1.7 + index) * 0.2
      node.position.z = nodes[index].position[2] + Math.cos(elapsed * 1.25 + index) * 0.24
      node.scale.setScalar(nodes[index].scale * (1 + Math.sin(elapsed * 2 + index) * 0.14))
    })
  })

  return (
    <group ref={rootRef}>
      <Float
        floatIntensity={reducedMotion || isMobile ? 0.08 : 0.26}
        rotationIntensity={reducedMotion || isMobile ? 0.04 : 0.18}
        speed={reducedMotion || isMobile ? 0.6 : 1.2}
      >
        <Sparkles
          color="#D6B981"
          count={isMobile ? 12 : reducedMotion ? 18 : 36}
          opacity={0.55}
          scale={[6, 6, 6]}
          size={isMobile ? 2.4 : 3.1}
          speed={reducedMotion || isMobile ? 0.18 : 0.5}
        />
        <Sparkles
          color="#7CFFB2"
          count={isMobile ? 8 : reducedMotion ? 12 : 24}
          opacity={0.38}
          scale={[6.8, 6.8, 6.8]}
          size={isMobile ? 1.8 : 2.3}
          speed={reducedMotion || isMobile ? 0.12 : 0.34}
        />

        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.92, isMobile ? 0 : 1]} />
          <MeshTransmissionMaterial
            anisotropy={0.4}
            chromaticAberration={0.08}
            clearcoat={1}
            color="#D6B981"
            distortion={0.12}
            emissive="#D6B981"
            emissiveIntensity={0.2}
            roughness={0.1}
            thickness={0.68}
          />
        </mesh>

        <mesh scale={1.34}>
          <icosahedronGeometry args={[0.96, isMobile ? 1 : 2]} />
          <shaderMaterial
            blending={AdditiveBlending}
            depthWrite={false}
            fragmentShader={`
              uniform float time;
              varying vec3 vNormal;
              varying vec3 vWorldPosition;

              void main() {
                vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
                float fresnel = pow(1.0 - max(dot(viewDirection, normalize(vNormal)), 0.0), 2.6);
                float pulse = 0.7 + 0.3 * sin(time * 2.0);
                vec3 color = mix(vec3(0.48, 1.0, 0.7), vec3(0.84, 0.72, 0.5), clamp(vWorldPosition.y * 0.45 + 0.5, 0.0, 1.0));
                gl_FragColor = vec4(color, fresnel * (0.2 + pulse * 0.14));
              }
            `}
            ref={auraRef}
            transparent
            uniforms={{ time: { value: 0 } }}
            vertexShader={`
              varying vec3 vNormal;
              varying vec3 vWorldPosition;

              void main() {
                vNormal = normalize(normalMatrix * normal);
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
          />
        </mesh>

        <mesh ref={ringARef} rotation={[Math.PI / 2.4, 0.2, 0]}>
          <torusGeometry args={[1.7, 0.035, 12, isMobile ? 80 : 140]} />
          <meshStandardMaterial color="#4D8DFF" emissive="#4D8DFF" emissiveIntensity={0.3} metalness={0.38} roughness={0.28} />
        </mesh>

        <mesh ref={ringBRef} rotation={[Math.PI / 3.1, 0.65, 0]}>
          <torusGeometry args={[1.28, 0.024, 10, isMobile ? 72 : 120]} />
          <meshStandardMaterial color="#7CFFB2" emissive="#7CFFB2" emissiveIntensity={0.24} metalness={0.32} roughness={0.34} />
        </mesh>

        <mesh ref={ringCRef} rotation={[Math.PI / 2.7, -0.3, 0.45]}>
          <torusGeometry args={[2.08, 0.018, 8, isMobile ? 96 : 160]} />
          <meshStandardMaterial color="#F2E5C7" emissive="#F2E5C7" emissiveIntensity={0.18} metalness={0.2} roughness={0.22} transparent opacity={0.9} />
        </mesh>

        {nodes.map((node, index) => (
          <mesh
            key={`${node.color}-${index}`}
            position={node.position as [number, number, number]}
            ref={(mesh) => {
              nodesRef.current[index] = mesh
            }}
            scale={node.scale}
          >
            <sphereGeometry args={[1, isMobile ? 12 : 18, isMobile ? 12 : 18]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.42} />
          </mesh>
        ))}
      </Float>
    </group>
  )
}

type SkillsOrbitPreviewProps = {
  isMobile?: boolean
}

export function SkillsOrbitPreview({ isMobile = false }: SkillsOrbitPreviewProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ fov: 34, position: [0, 0, 8] }}
        dpr={isMobile ? [0.75, 1] : [1, 1.5]}
        gl={{ alpha: true, antialias: !isMobile, powerPreference: 'high-performance' }}
        shadows={false}
      >
        <AdaptiveDpr pixelated />
        {!isMobile ? <AdaptiveEvents /> : null}
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#050505', 7, 13]} />
        <ambientLight intensity={isMobile ? 0.42 : 0.55} />
        <hemisphereLight args={['#f5f0e8', '#050505', isMobile ? 0.7 : 0.9]} />
        <directionalLight color="#D6B981" intensity={isMobile ? 0.95 : 1.2} position={[3, 4, 4]} />
        <pointLight color="#4D8DFF" intensity={isMobile ? 4.2 : 7} distance={10} position={[2.8, 1.8, 3.4]} />
        <pointLight color="#7CFFB2" intensity={isMobile ? 3.1 : 5} distance={10} position={[-2.6, -1.4, 2.8]} />
        {!isMobile ? <pointLight color="#F2E5C7" intensity={3.6} distance={9} position={[0, -2.2, 2.4]} /> : null}
        <OrbitCluster isMobile={isMobile} reducedMotion={reducedMotion} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_28%,rgba(5,5,5,0.34)_66%,rgba(5,5,5,0.82)_100%)]" />
    </div>
  )
}
