import Image from 'next/image'
import React from 'react'
import logo5 from '../public/logo5.png'

const Header = () => {
  return (
    <div className="flex items-center justify-center w-full h-20 bg-[#2B2B2B]">
        <Image src={logo5} alt="logo" className="w-[60px]"/>
    </div>
  )
}

export default Header