"use client"

import { useMemo, useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useTexture, Environment } from "@react-three/drei"
import * as THREE from "three"
import { BallCollider, Physics, RigidBody, CylinderCollider } from "@react-three/rapier"

// Component to handle file uploads
const FileUploader = ({ onFilesUploaded }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      const fileUrls = files.map((file) => URL.createObjectURL(file))
      onFilesUploaded(fileUrls)
    }
  }

  return (
    <div className="file-uploader">
      <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
      >
        Upload Images
      </label>
    </div>
  )
}

// Ball component with physics and properly applied texture
function Ball({ textureUrl, scale = 1, isActive }) {
  const api = useRef(null)
  const meshRef = useRef(null)
  const vec = useMemo(() => new THREE.Vector3(), [])
  const r = THREE.MathUtils.randFloatSpread

  // Load texture with proper settings
  const texture = useTexture(textureUrl)

  // Set texture properties for better quality
  useEffect(() => {
    if (texture) {
      texture.anisotropy = 16
      texture.needsUpdate = true
    }
  }, [texture])

  useFrame((_, delta) => {
    if (!isActive || !api.current) return
    delta = Math.min(0.1, delta)
    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiply(new THREE.Vector3(-50 * delta * scale, -150 * delta * scale, -50 * delta * scale))

    api.current.applyImpulse(impulse, true)
  })

  // Generate initial position with better distribution
  const initialPosition = useMemo(() => {
    return [r(20), r(20) + 5, r(20)]
  }, [r])

  // Create spherical UV mapping for the texture
  // const sphericalMapping = useMemo(() => {
  //   // Create a custom material that maps the texture spherically
  //   const material = new THREE.MeshStandardMaterial({
  //     color: "white",
  //     roughness: 0.2,
  //     metalness: 0.3,
  //   })

  //   // Apply the texture directly to the material
  //   if (texture) {
  //     material.map = texture
  //     material.needsUpdate = true
  //   }

  //   return material
  // }, [texture])

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={initialPosition}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh castShadow receiveShadow scale={scale} ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="white" roughness={0.2} metalness={0.3} map={texture} />
      </mesh>
    </RigidBody>
  )
}

// Pointer for interaction
function Pointer({ vec = new THREE.Vector3(), isActive }) {
  const ref = useRef(null)

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return
    const targetVec = vec.lerp(
      new THREE.Vector3((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0),
      0.2,
    )
    ref.current.setNextKinematicTranslation(targetVec)
  })

  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  )
}

// Main component
const BallCluster = () => {
  const [imageUrls, setImageUrls] = useState([])
  const [isActive, setIsActive] = useState(false)

  // Default to sample images if no uploads
  useEffect(() => {
    if (imageUrls.length === 0) {
      // Use default images
      const defaultUrls = Array.from({ length: 18 }, (_, i) => `/assets/logo${i + 1}.png`)
      setImageUrls(defaultUrls)
    }
  }, [])

  // Generate random scales for variety
  const sphereData = useMemo(() => {
    return Array.from({ length: Math.max(18, imageUrls.length) }, () => ({
      scale: [0.7, 0.8, 0.9, 1, 1.1][Math.floor(Math.random() * 5)],
    }))
  }, [imageUrls.length])

  const handleFilesUploaded = (urls) => {
    setImageUrls(urls)
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="p-4 z-10 relative flex">
        <FileUploader onFilesUploaded={handleFilesUploaded} />
        <button
          onClick={() => setIsActive(!isActive)}
          className="ml-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors"
        >
          {isActive ? "Pause" : "Animate"}
        </button>
      </div>

      <div className="flex-1 relative">
        <Canvas
          shadows
          gl={{ alpha: true, stencil: false, depth: false, antialias: true }}
          camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        >
          <ambientLight intensity={1.5} />
          <spotLight
            position={[20, 20, 25]}
            penumbra={1}
            angle={0.2}
            color="white"
            castShadow
            shadow-mapSize={[512, 512]}
          />
          <directionalLight position={[0, 5, -4]} intensity={2} />

          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} />
            {imageUrls.length > 0 &&
              sphereData.map(
                (props, i) =>
                  imageUrls[i % imageUrls.length] && (
                    <Ball
                      key={i}
                      textureUrl={imageUrls[i % imageUrls.length]}
                      scale={props.scale}
                      isActive={isActive}
                    />
                  ),
              )}
          </Physics>

          <Environment preset="studio" />
          <OrbitControls enableZoom={true} enablePan={true} />
        </Canvas>
      </div>
    </div>
  )
}

export default BallCluster

