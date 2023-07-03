'use client'

import Profile from '@/components/Profile';
import React from 'react'

export default function Page() {

  return (
    <div className='flex flex-col items-center mt-5'>
      <h1 className='font-archivoblack text-2xl mb-5'>-myprofile.</h1>
      <Profile />
    </div>
  )
}