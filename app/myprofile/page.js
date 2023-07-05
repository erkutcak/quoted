'use client'

import Profile from '@/components/Profile';
import { motion } from 'framer-motion';
import React from 'react'

export default function Page() {

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
        duration: 0.5,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01]
    }}
    >
      <div className='flex flex-col items-center mt-5'>
        <h1 className='font-archivoblack text-2xl mb-5'>-myprofile.</h1>
        <Profile />
      </div>
    </motion.div>
  )
}