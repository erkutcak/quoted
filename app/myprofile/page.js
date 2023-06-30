'use client'

import Link from 'next/link'
import React from 'react'
import { useAuthContext } from '../context/AuthContext'

export default function MyProfile() {

  const { signOut } = useAuthContext();

  return (
    <div>
      <h1>My Profile</h1>
      <Link href='/'>
        <button onClick={signOut}>Log Out</button>
      </Link>
    </div>
  )
}