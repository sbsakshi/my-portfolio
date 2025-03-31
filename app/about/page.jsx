import React from 'react'
import AboutText from '@/components/AboutText'
import TiltedImage from '@/components/TiltedImage'
import BallCluster from '@/components/Balls'
import Interest from '@/components/Interest'
import ProjectsSection from '@/components/projectSection'
import Footer from '@/components/Footer'
import Testimonials from '@/components/Testimonials'
import GetInTouch from '@/components/touch'
import Image from 'next/image'

const about = () => {
  return (
    <div className="bg-[#fffdea] text-black h-500vh overflow-x-hidden ">
      <div className='flex flex-col'>
      
      </div>
   <div className='z-100'>
    <Interest/>
    <div className=' mt-16 '>
      <GetInTouch/>
     <Footer/>
    </div>
    </div>
     </div>
  )
}

export default about