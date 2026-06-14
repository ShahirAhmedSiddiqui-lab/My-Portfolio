import { AdaptiveDpr, AdaptiveEvents, ContactShadows, PerformanceMonitor, Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { CameraRig } from './CameraRig'
import { DigitalCore } from './DigitalCore'
import { sceneStates, type SceneSection } from './sceneConfig'

function useSceneViewport() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')

    const updateViewport = () => {
      setIsMobile(mediaQuery.matches)
    }

    updateViewport()
    mediaQuery.addEventListener('change', updateViewport)

    return () => {
      mediaQuery.removeEventListener('change', updateViewport)
    }
  }, [])

  return isMobile
}

type SceneCanvasProps = {
  activeSection: SceneSection
}

export function SceneCanvas({ activeSection }: SceneCanvasProps) {
  const reducedMotion = useReducedMotion()
  const isMobile = useSceneViewport()
  const sceneState = sceneStates[activeSection]
  const [sceneQuality, setSceneQuality] = useState(1)
  const lightingIntensity = sceneQuality < 0.9 ? 0.88 : 1

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <Canvas
        camera={{ fov: isMobile ? 40 : sceneState.cameraFov, position: [0, 0, 8] }}
        dpr={isMobile ? [1, 1] : reducedMotion ? [1, 1.2] : sceneQuality < 0.9 ? [1, 1.2] : [1, 1.5]}
        gl={{
          alpha: true,
          antialias: !isMobile,
          powerPreference: 'high-performance',
        }}
        shadows={!isMobile}
        onCreated={({ gl }) => {
          gl.outputColorSpace = SRGBColorSpace
          gl.toneMapping = ACESFilmicToneMapping
        }}
      >
        <Suspense fallback={null}>
          <PerformanceMonitor
            bounds={() => (isMobile ? [0.65, 0.9] : [0.7, 1])}
            onDecline={() => {
              setSceneQuality(0.82)
            }}
            onIncline={() => {
              setSceneQuality(1)
            }}
          />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <CameraRig reducedMotion={reducedMotion} sceneState={sceneState} />
          <color attach="background" args={['#050505']} />
          <fog attach="fog" args={['#050505', 9, 16]} />
          <ambientLight intensity={0.34 * lightingIntensity} />
          <hemisphereLight args={['#f5f0e8', '#040506', 0.95 * lightingIntensity]} />
          <directionalLight
            castShadow={!isMobile}
            color="#f6e7c1"
            intensity={1.55 * lightingIntensity}
            position={[3.4, 4.2, 5]}
            shadow-mapSize-height={1024}
            shadow-mapSize-width={1024}
          />
          <directionalLight color="#9bc8ff" intensity={0.55 * lightingIntensity} position={[-4.2, 1.8, 3.6]} />
          <pointLight
            color={sceneState.secondaryAccent}
            distance={10}
            intensity={(isMobile ? 8 : 11) * lightingIntensity}
            position={[3.4, 1.2, 3.4]}
          />
          <pointLight
            color={sceneState.accent}
            distance={11}
            intensity={(isMobile ? 5 : 7) * lightingIntensity}
            position={[0.8, -2.2, 2.8]}
          />
          <spotLight
            angle={0.46}
            color={sceneState.accent}
            distance={12}
            intensity={(isMobile ? 4 : 6) * lightingIntensity}
            penumbra={0.65}
            position={[-1.4, 3.4, 4.6]}
          />
          <DigitalCore
            isMobile={isMobile}
            reducedMotion={reducedMotion}
            sceneQuality={sceneQuality}
            sceneState={sceneState}
          />
          {!isMobile ? (
            <ContactShadows
              blur={2.4}
              color={sceneState.secondaryAccent}
              far={10}
              opacity={sceneQuality < 0.9 ? 0.18 : 0.24}
              position={[0.6, -3.05, 0]}
              resolution={sceneQuality < 0.9 ? 256 : 512}
              scale={10}
            />
          ) : null}
          <Preload all />
        </Suspense>
      </Canvas>

      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: sceneState.overlay,
          opacity: (isMobile ? sceneState.glowOpacity * 0.72 : sceneState.glowOpacity) * (sceneQuality < 0.9 ? 0.94 : 1),
        }}
      />
    </div>
  )
}
