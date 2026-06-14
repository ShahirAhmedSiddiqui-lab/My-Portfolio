import { useFrame } from '@react-three/fiber'
import { MathUtils, PerspectiveCamera, Vector3 } from 'three'
import type { SceneState } from './sceneConfig'

type CameraRigProps = {
  reducedMotion: boolean
  sceneState: SceneState
}

const target = new Vector3(0, 0, 0)

export function CameraRig({ reducedMotion, sceneState }: CameraRigProps) {
  useFrame((state, delta) => {
    const camera = state.camera as PerspectiveCamera
    const [x, y, z] = sceneState.cameraPosition
    const moveFactor = reducedMotion ? 6.5 : 3.6
    const mouseOffsetX = reducedMotion ? 0 : state.mouse.x * 0.18
    const mouseOffsetY = reducedMotion ? 0 : state.mouse.y * 0.12

    camera.position.x = MathUtils.damp(camera.position.x, x + mouseOffsetX, moveFactor, delta)
    camera.position.y = MathUtils.damp(camera.position.y, y + mouseOffsetY, moveFactor, delta)
    camera.position.z = MathUtils.damp(camera.position.z, z, moveFactor, delta)
    camera.fov = MathUtils.damp(camera.fov, sceneState.cameraFov, reducedMotion ? 7 : 4.6, delta)
    camera.lookAt(target)
    camera.updateProjectionMatrix()
  })

  return null
}
