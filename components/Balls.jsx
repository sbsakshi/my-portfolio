"use client"

import { useMemo, useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Decal, Environment } from "@react-three/drei"
import * as THREE from "three"
import { BallCollider, Physics, RigidBody, CylinderCollider } from "@react-three/rapier"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Ball component with physics
function Ball({ texture, scale = 1, isActive }) {
  const api = useRef(null)
  const vec = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    if (!isActive || !api.current) return
    delta = Math.min(0.1, delta)
    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiply(new THREE.Vector3(-50 * delta * scale, -150 * delta * scale, -50 * delta * scale))

    api.current.applyImpulse(impulse, true)
  })

  const initialPosition = useMemo(() => {
    return [THREE.MathUtils.randFloatSpread(20), THREE.MathUtils.randFloatSpread(20) + 5, THREE.MathUtils.randFloatSpread(20)]
  }, [])

  return (
    <RigidBody linearDamping={0.75} angularDamping={0.15} friction={0.2} position={initialPosition} ref={api} colliders={false}>
      <BallCollider args={[scale]} />
      <CylinderCollider rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1.2 * scale]} args={[0.15 * scale, 0.275 * scale]} />
      <mesh castShadow receiveShadow scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="white" roughness={0.2} metalness={0.3} />
        <Decal position={[0, 0, 1]} scale={1.5} rotation={[0, 0, 0]}>
          <meshBasicMaterial map={texture} transparent />
        </Decal>
        <Decal position={[0, 0, -1]} scale={1.75} rotation={[0, Math.PI, 0]}>
          <meshBasicMaterial map={texture} transparent />
        </Decal>
      </mesh>
    </RigidBody>
  )
}

// Pointer for interaction
function Pointer({ vec = new THREE.Vector3(), isActive }) {
  const ref = useRef(null)

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return
    const targetVec = vec.lerp(new THREE.Vector3((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0), 0.2)
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
  const [textures, setTextures] = useState([])
  const sectionRef = useRef(null)

  useEffect(() => {
    if (imageUrls.length === 0) {
      const defaultUrls = Array.from({ length: 18 }, (_, i) => `/assets/logo${i + 1}.png`)
      setImageUrls(defaultUrls)
    }
  }, [])

  useEffect(() => {
    if (imageUrls.length > 0) {
      const textureLoader = new THREE.TextureLoader()
      textureLoader.setCrossOrigin("anonymous")
      const loadedTextures = imageUrls.map((url) => textureLoader.load(url))
      setTextures(loadedTextures)
    }
  }, [imageUrls])

  const sphereData = useMemo(() => {
    return Array.from({ length: Math.max(18, imageUrls.length) }, () => ({
      scale: [0.7, 0.8, 0.9, 1, 1.1][Math.floor(Math.random() * 5)],
    }))
  }, [imageUrls.length])

  // Start animation when scrolled into view
  useEffect(() => {
    if (sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%", 
        onEnter: () => setIsActive(true),
        onLeaveBack: () => setIsActive(false),
      })
    }
  }, [])

  return (
    <div ref={sectionRef} className="w-full h-dvh flex flex-col ">
      <Image src="/assets/blur1.png" fill className="opacity-0.1" alt="blur" />
      <Image src="/assets/blurs.png" fill className="relative opacity-0.1 left-0" alt="blur" />
      <div className="p-4 z-10 relative flex">
        <h1 className="text-[96px] absolute left-1/2 -translate-x-1/2 top-[80%] translate-y-1/2 font-[MomFont]">TECH STACK</h1>
      </div>

      <div className="flex-1 relative">
        <Canvas shadows gl={{ alpha: true, stencil: false, depth: false, antialias: false }} camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          <ambientLight intensity={1.5} />
          <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="white" castShadow shadow-mapSize={[512, 512]} />
          <directionalLight position={[0, 5, -4]} intensity={2} />
          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} />
            {textures.length > 0 &&
              sphereData.map((props, i) =>
                textures[i % textures.length] ? <Ball key={i} texture={textures[i % textures.length]} scale={props.scale} isActive={isActive} /> : null
              )}
          </Physics>
          <Environment preset="studio" />
          <OrbitControls enableZoom={false} enablePan={true} />
        </Canvas>
      </div>
    </div>
  )
}

export default BallCluster
