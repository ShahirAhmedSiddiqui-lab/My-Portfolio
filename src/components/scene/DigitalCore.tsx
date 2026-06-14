import { Float, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { AdditiveBlending, Color, Group, MathUtils, Mesh, ShaderMaterial, Vector3 } from 'three'
import type { SceneState } from './sceneConfig'

type DigitalCoreProps = {
  isMobile: boolean
  reducedMotion: boolean
  sceneQuality: number
  sceneState: SceneState
}

export function DigitalCore({ isMobile, reducedMotion, sceneQuality, sceneState }: DigitalCoreProps) {
  const anchorRef = useRef<Group>(null)
  const layoutRef = useRef<Group>(null)
  const coreRef = useRef<Mesh>(null)
  const coreAuraRef = useRef<ShaderMaterial>(null)
  const shellRef = useRef<Mesh>(null)
  const innerRingRef = useRef<Mesh>(null)
  const outerRingRef = useRef<Mesh>(null)
  const skillOrbitRef = useRef<Group>(null)
  const projectPanelsRef = useRef<Group>(null)
  const roadmapRef = useRef<Group>(null)
  const terminalRef = useRef<Group>(null)
  const terminalScreenRef = useRef<ShaderMaterial>(null)
  const orbitNodesRef = useRef<Array<Mesh | null>>([])
  const skillNodesRef = useRef<Array<Mesh | null>>([])
  const projectCardsRef = useRef<Array<Group | null>>([])
  const roadmapNodesRef = useRef<Array<Mesh | null>>([])

  const coreUniforms = useMemo(
    () => ({
      time: { value: 0 },
      colorA: { value: new Color(sceneState.accent) },
      colorB: { value: new Color(sceneState.secondaryAccent) },
    }),
    [sceneState.accent, sceneState.secondaryAccent],
  )

  const terminalUniforms = useMemo(
    () => ({
      time: { value: 0 },
      glow: { value: new Color(sceneState.secondaryAccent) },
      accent: { value: new Color(sceneState.accent) },
    }),
    [sceneState.accent, sceneState.secondaryAccent],
  )

  const orbitNodes = useMemo(
    () => [
      { position: [1.85, 0.15, 0.15], scale: 0.12, color: '#D6B981' },
      { position: [-1.35, 0.8, -0.1], scale: 0.08, color: '#4D8DFF' },
      { position: [0.45, -1.55, 0.2], scale: 0.1, color: '#7CFFB2' },
      { position: [-0.6, 1.45, 0.18], scale: 0.07, color: '#F2A7C6' },
      { position: [1.3, -1.1, -0.12], scale: 0.09, color: '#E7A84B' },
    ],
    [],
  )

  const skillNodes = useMemo(
    () => [
      { position: [2.52, 0, 0], scale: 0.12, color: '#7CFFB2' },
      { position: [0, 2.52, 0], scale: 0.09, color: '#4D8DFF' },
      { position: [-2.52, 0, 0], scale: 0.11, color: '#D6B981' },
      { position: [0, -2.52, 0], scale: 0.1, color: '#F2A7C6' },
    ],
    [],
  )

  const projectCardOffsets = useMemo(
    () => [
      { position: [0, 0, 0], rotation: [0.12, -0.28, 0.04] },
      { position: [0.28, -0.18, -0.08], rotation: [0.16, -0.22, 0.06] },
      { position: [-0.22, 0.22, -0.16], rotation: [0.1, -0.34, 0.02] },
    ],
    [],
  )

  const roadmapOffsets = useMemo(() => [-1.4, -0.55, 0.2, 0.95, 1.6], [])

  useFrame((state, delta) => {
    const anchor = anchorRef.current
    const layout = layoutRef.current
    const core = coreRef.current
    const shell = shellRef.current
    const innerRing = innerRingRef.current
    const outerRing = outerRingRef.current
    const skillOrbit = skillOrbitRef.current
    const projectPanels = projectPanelsRef.current
    const roadmap = roadmapRef.current
    const terminal = terminalRef.current

    if (!anchor || !layout || !core || !shell || !innerRing || !outerRing || !skillOrbit || !projectPanels || !roadmap || !terminal) {
      return
    }

    const elapsed = state.clock.getElapsedTime()
    const [stateX, stateY] = sceneState.corePosition
    const baseX = isMobile ? stateX * 0.7 : stateX
    const baseY = isMobile ? stateY * 0.7 + 0.14 : stateY
    const targetX = baseX + (reducedMotion ? 0 : state.mouse.x * 0.35)
    const targetY = baseY + (reducedMotion ? 0 : state.mouse.y * 0.28)

    anchor.position.x = MathUtils.lerp(anchor.position.x, targetX, 0.06)
    anchor.position.y = MathUtils.lerp(anchor.position.y, targetY, 0.06)
    anchor.rotation.z = MathUtils.lerp(anchor.rotation.z, reducedMotion ? 0 : state.mouse.x * 0.12, 0.05)

    const targetScale = sceneState.coreScale * (isMobile ? 0.84 : 1)
    layout.scale.x = MathUtils.lerp(layout.scale.x, targetScale, 0.06)
    layout.scale.y = MathUtils.lerp(layout.scale.y, targetScale, 0.06)
    layout.scale.z = MathUtils.lerp(layout.scale.z, targetScale, 0.06)

    core.rotation.x += delta * 0.24 * sceneState.rotationBoost
    core.rotation.y += delta * (reducedMotion ? 0.16 : 0.42) * sceneState.rotationBoost

    shell.rotation.x -= delta * 0.16 * sceneState.rotationBoost
    shell.rotation.y += delta * 0.22 * sceneState.rotationBoost

    innerRing.rotation.x += delta * 0.24 * sceneState.rotationBoost
    innerRing.rotation.y += delta * 0.12 * sceneState.rotationBoost

    outerRing.rotation.z += delta * (reducedMotion ? 0.14 : 0.3) * sceneState.rotationBoost
    outerRing.rotation.x -= delta * 0.07

    const supportFactor = isMobile ? 0 : 1

    skillOrbit.rotation.y += delta * (reducedMotion ? 0.08 : 0.18)
    skillOrbit.rotation.z -= delta * 0.035
    skillOrbit.scale.x = MathUtils.lerp(skillOrbit.scale.x, sceneState.skillOrbit * supportFactor, 0.08)
    skillOrbit.scale.y = MathUtils.lerp(skillOrbit.scale.y, sceneState.skillOrbit * supportFactor, 0.08)
    skillOrbit.scale.z = MathUtils.lerp(skillOrbit.scale.z, sceneState.skillOrbit * supportFactor, 0.08)

    projectPanels.rotation.y += delta * 0.08
    projectPanels.rotation.x = MathUtils.lerp(projectPanels.rotation.x, reducedMotion ? 0.1 : state.mouse.y * 0.08, 0.05)
    projectPanels.scale.x = MathUtils.lerp(projectPanels.scale.x, sceneState.projectPanels * supportFactor, 0.08)
    projectPanels.scale.y = MathUtils.lerp(projectPanels.scale.y, sceneState.projectPanels * supportFactor, 0.08)
    projectPanels.scale.z = MathUtils.lerp(projectPanels.scale.z, sceneState.projectPanels * supportFactor, 0.08)

    roadmap.rotation.z += delta * 0.04
    roadmap.scale.x = MathUtils.lerp(roadmap.scale.x, sceneState.roadmap * supportFactor, 0.08)
    roadmap.scale.y = MathUtils.lerp(roadmap.scale.y, sceneState.roadmap * supportFactor, 0.08)
    roadmap.scale.z = MathUtils.lerp(roadmap.scale.z, sceneState.roadmap * supportFactor, 0.08)

    terminal.scale.x = MathUtils.lerp(terminal.scale.x, sceneState.terminal * supportFactor, 0.08)
    terminal.scale.y = MathUtils.lerp(terminal.scale.y, sceneState.terminal * supportFactor, 0.08)
    terminal.scale.z = MathUtils.lerp(terminal.scale.z, sceneState.terminal * supportFactor, 0.08)
    terminal.rotation.y -= delta * 0.05

    if (coreAuraRef.current) {
      coreAuraRef.current.uniforms.time.value = elapsed
      coreAuraRef.current.uniforms.colorA.value.set(sceneState.accent)
      coreAuraRef.current.uniforms.colorB.value.set(sceneState.secondaryAccent)
    }

    if (terminalScreenRef.current) {
      terminalScreenRef.current.uniforms.time.value = elapsed
      terminalScreenRef.current.uniforms.glow.value.set(sceneState.secondaryAccent)
      terminalScreenRef.current.uniforms.accent.value.set(sceneState.accent)
    }

    orbitNodesRef.current.forEach((node, index) => {
      if (!node) {
        return
      }

      node.visible = !isMobile || index < 3
      node.rotation.x += delta * (0.16 + index * 0.02)
      node.rotation.y -= delta * (0.2 + index * 0.015)
    })

    skillNodesRef.current.forEach((node, index) => {
      if (!node) {
        return
      }

      node.position.z = Math.sin(elapsed * 1.2 + index) * 0.14
      node.scale.setScalar(skillNodes[index].scale * (1 + Math.sin(elapsed * 1.8 + index) * 0.14))
    })

    projectCardsRef.current.forEach((card, index) => {
      if (!card) {
        return
      }

      card.position.y = projectCardOffsets[index].position[1] + Math.sin(elapsed * 1.1 + index) * 0.08
      card.rotation.z = projectCardOffsets[index].rotation[2] + Math.sin(elapsed * 0.8 + index) * 0.03
    })

    roadmapNodesRef.current.forEach((node, index) => {
      if (!node) {
        return
      }

      const pulse = 0.1 + Math.sin(elapsed * 2 + index * 0.5) * 0.03
      node.scale.setScalar(pulse)
      node.position.y = Math.sin(elapsed * 0.9 + index * 0.7) * 0.18
    })
  })

  return (
    <group ref={anchorRef} position={[isMobile ? 1.45 : 2.4, isMobile ? 0.55 : 0.15, 0]}>
      <Float
        floatIntensity={reducedMotion ? 0.08 : 0.24}
        rotationIntensity={reducedMotion ? 0.04 : 0.12}
        speed={reducedMotion ? 0.45 : 1.15}
      >
        <group ref={layoutRef} scale={isMobile ? 0.8 : 1}>
          <Sparkles
            color={sceneState.accent}
            count={Math.max(
              8,
              isMobile
                ? Math.round(sceneState.particleCount * 0.58)
                : Math.round(sceneState.particleCount * sceneQuality),
            )}
            opacity={0.75}
            scale={[5.4, 5.4, 5.4]}
            size={reducedMotion ? 2.2 : 2.8}
            speed={reducedMotion ? sceneState.particleSpeed * 0.45 : sceneState.particleSpeed}
          />
          <Sparkles
            color={sceneState.secondaryAccent}
            count={Math.max(
              6,
              isMobile
                ? Math.round(sceneState.particleCount * 0.32)
                : Math.round(sceneState.particleCount * 0.56 * sceneQuality),
            )}
            opacity={0.45}
            scale={[6.6, 6.6, 6.6]}
            size={reducedMotion ? 1.6 : 2.2}
            speed={reducedMotion ? sceneState.particleSpeed * 0.3 : sceneState.particleSpeed * 0.66}
          />

          <mesh ref={coreRef}>
            <icosahedronGeometry args={[0.88, 2]} />
            <meshPhysicalMaterial
              clearcoat={1}
              clearcoatRoughness={0.12}
              color={sceneState.accent}
              emissive={sceneState.accent}
              emissiveIntensity={0.65}
              iridescence={0.5}
              iridescenceIOR={1.1}
              metalness={0.58}
              roughness={0.18}
              sheen={0.2}
              sheenColor={sceneState.secondaryAccent}
            />
          </mesh>

          <mesh scale={1.38}>
            <icosahedronGeometry args={[0.9, 3]} />
            <shaderMaterial
              blending={AdditiveBlending}
              depthWrite={false}
              fragmentShader={`
                uniform float time;
                uniform vec3 colorA;
                uniform vec3 colorB;
                varying vec3 vNormal;
                varying vec3 vWorldPosition;

                void main() {
                  vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
                  float fresnel = pow(1.0 - max(dot(viewDirection, normalize(vNormal)), 0.0), 2.6);
                  float pulse = 0.6 + 0.4 * sin(time * 1.8);
                  vec3 color = mix(colorA, colorB, clamp(vWorldPosition.y * 0.35 + 0.5, 0.0, 1.0));
                  float alpha = fresnel * (0.28 + pulse * 0.14);
                  gl_FragColor = vec4(color, alpha);
                }
              `}
              ref={coreAuraRef}
              transparent
              uniforms={coreUniforms}
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

          <mesh ref={shellRef} scale={1.2}>
            <octahedronGeometry args={[0.94, 0]} />
            <meshBasicMaterial color="#F5F0E8" opacity={0.16} transparent wireframe />
          </mesh>

          <mesh ref={innerRingRef} rotation={[Math.PI / 2.8, 0, 0]}>
            <torusGeometry args={[1.45, 0.03, 18, 140]} />
            <meshStandardMaterial
              color={sceneState.secondaryAccent}
              emissive={sceneState.secondaryAccent}
              emissiveIntensity={0.48}
              metalness={0.42}
              roughness={0.34}
            />
          </mesh>

          <mesh ref={outerRingRef} rotation={[Math.PI / 3.4, 0.35, 0]}>
            <torusGeometry args={[2.05, 0.02, 12, 160]} />
            <meshStandardMaterial
              color={sceneState.accent}
              emissive={sceneState.accent}
              emissiveIntensity={0.38}
              metalness={0.52}
              roughness={0.32}
            />
          </mesh>

          {orbitNodes.map((node, index) => (
            <mesh
              key={`${node.color}-${index}`}
              position={node.position as [number, number, number]}
              ref={(mesh) => {
                orbitNodesRef.current[index] = mesh
              }}
              scale={node.scale}
            >
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.45} />
            </mesh>
          ))}

          <group ref={skillOrbitRef} scale={0.001}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[2.65, 0.032, 14, 180]} />
              <meshStandardMaterial
                color="#7CFFB2"
                emissive="#7CFFB2"
                emissiveIntensity={0.3}
                metalness={0.42}
                roughness={0.3}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0.42, 0]}>
              <torusGeometry args={[2.25, 0.014, 10, 150]} />
              <meshStandardMaterial color="#4D8DFF" emissive="#4D8DFF" emissiveIntensity={0.22} roughness={0.42} />
            </mesh>
            {skillNodes.map((node, index) => (
              <group key={`${node.color}-${index}`} position={node.position as [number, number, number]}>
                <mesh
                  ref={(mesh) => {
                    skillNodesRef.current[index] = mesh
                  }}
                  scale={node.scale}
                >
                  <sphereGeometry args={[1, 16, 16]} />
                  <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.7} />
                </mesh>
                <mesh
                  position={new Vector3().copy(new Vector3(...(node.position as [number, number, number])).multiplyScalar(0.5))}
                  rotation={[0, 0, Math.atan2((node.position as [number, number, number])[1], (node.position as [number, number, number])[0])]}
                >
                  <cylinderGeometry args={[0.012, 0.012, 1.2, 8]} />
                  <meshStandardMaterial color="#F5F0E8" emissive="#F5F0E8" emissiveIntensity={0.08} transparent opacity={0.45} />
                </mesh>
              </group>
            ))}
          </group>

          <group ref={projectPanelsRef} position={[-2.55, -0.18, -0.6]} scale={0.001}>
            {projectCardOffsets.map((card, index) => (
              <group
                key={`project-card-${index}`}
                position={card.position as [number, number, number]}
                ref={(group) => {
                  projectCardsRef.current[index] = group
                }}
                rotation={card.rotation as [number, number, number]}
              >
                <mesh>
                  <boxGeometry args={[1.18, 1.6, 0.05]} />
                  <meshPhysicalMaterial
                    clearcoat={0.8}
                    clearcoatRoughness={0.12}
                    color="#111317"
                    emissive={index === 0 ? sceneState.accent : sceneState.secondaryAccent}
                    emissiveIntensity={index === 0 ? 0.18 : 0.1}
                    metalness={0.32}
                    roughness={0.3}
                  />
                </mesh>
                <mesh position={[0, 0, 0.03]}>
                  <planeGeometry args={[0.92, 1.28]} />
                  <meshStandardMaterial
                    color={index === 0 ? sceneState.accent : index === 1 ? sceneState.secondaryAccent : '#F5F0E8'}
                    emissive={index === 0 ? sceneState.accent : sceneState.secondaryAccent}
                    emissiveIntensity={0.16}
                    metalness={0.14}
                    roughness={0.62}
                    transparent
                    opacity={0.88}
                  />
                </mesh>
                <mesh position={[0, -0.42, 0.05]}>
                  <planeGeometry args={[0.62, 0.1]} />
                  <meshStandardMaterial color="#050505" emissive="#050505" roughness={0.8} />
                </mesh>
              </group>
            ))}
          </group>

          <group ref={roadmapRef} position={[-2.15, -1.45, -0.4]} scale={0.001}>
            <mesh rotation={[0, 0, 0.12]}>
              <torusGeometry args={[1.56, 0.012, 8, 90, Math.PI * 0.92]} />
              <meshStandardMaterial color="#F5F0E8" emissive="#F5F0E8" emissiveIntensity={0.12} transparent opacity={0.78} />
            </mesh>
            {roadmapOffsets.map((x, index) => (
              <mesh
                key={`road-${x}`}
                position={[x, 0, index % 2 === 0 ? 0 : 0.06]}
                ref={(mesh) => {
                  roadmapNodesRef.current[index] = mesh
                }}
              >
                <sphereGeometry args={[1, 18, 18]} />
                <meshStandardMaterial
                  color={index % 2 === 0 ? '#D6B981' : '#7CFFB2'}
                  emissive={index % 2 === 0 ? '#D6B981' : '#7CFFB2'}
                  emissiveIntensity={0.45}
                />
              </mesh>
            ))}
          </group>

          <group ref={terminalRef} position={[-2.35, 0.1, -0.45]} scale={0.001}>
            <mesh>
              <boxGeometry args={[1.82, 1.26, 0.08]} />
              <meshPhysicalMaterial clearcoat={0.8} color="#090B10" metalness={0.42} roughness={0.28} />
            </mesh>
            <mesh position={[0, 0, 0.05]}>
              <planeGeometry args={[1.5, 0.94]} />
              <shaderMaterial
                fragmentShader={`
                  uniform float time;
                  uniform vec3 glow;
                  uniform vec3 accent;
                  varying vec2 vUv;

                  float scan(vec2 uv) {
                    return 0.08 * sin((uv.y + time * 0.16) * 120.0);
                  }

                  void main() {
                    float grid = smoothstep(0.45, 0.0, abs(fract(vUv.y * 8.0 + time * 0.12) - 0.5));
                    float pulse = 0.55 + 0.45 * sin(time * 1.4);
                    vec3 base = mix(vec3(0.03, 0.07, 0.12), glow * 0.35, vUv.x);
                    vec3 line = mix(accent, glow, vUv.y);
                    vec3 color = base + line * grid * 0.38 + scan(vUv);
                    gl_FragColor = vec4(color, 0.96);
                  }
                `}
                ref={terminalScreenRef}
                transparent
                uniforms={terminalUniforms}
                vertexShader={`
                  varying vec2 vUv;

                  void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                  }
                `}
              />
            </mesh>
            {[-0.24, -0.04, 0.16].map((y, index) => (
              <mesh key={y} position={[-0.12 + index * 0.08, y, 0.08]}>
                <planeGeometry args={[0.88 - index * 0.14, 0.06]} />
                <meshStandardMaterial
                  color={index === 0 ? '#7CFFB2' : '#4D8DFF'}
                  emissive={index === 0 ? '#7CFFB2' : '#4D8DFF'}
                  emissiveIntensity={0.32}
                  transparent
                  opacity={0.88}
                />
              </mesh>
            ))}
          </group>
        </group>
      </Float>
    </group>
  )
}
