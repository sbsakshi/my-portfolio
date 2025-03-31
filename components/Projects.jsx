import React from 'react'
import Image from 'next/image'

const Projects = () => {
  return (
    <div className=' w-100vw h-screen opacity-80'>

          <Image src='/assets/noise.png'  alt='noise' layout='fill'/>
          <video width="320" height="240" controls preload="none"
            >
          <track src='/textures/project/project1.mp4'>
          </track>
        </video>
    </div>
  )
}

export default Projects
