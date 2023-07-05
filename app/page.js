'use client'

import { useAuthContext } from "./context/AuthContext"
import logo4 from '../public/logo4.png'
import Image from "next/image"
import { motion } from "framer-motion"

export default function Home() {

  const { user } = useAuthContext()
  console.log(user);
  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("/bg.jpg")' }}>
      <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
          duration: 1.9,
          delay: .5,
          ease: [0, 0.71, 0.2, 1.01]
      }}
      >
        <div className="h-[85vh] flex flex-column justify-center items-center">
          <Image src={logo4} alt="logo" className="max-h-[500px] w-[370px] rounded-full shadow-2xl max-w-[90%]"/>
        </div>
      </motion.div>
    </div>
  )
}
