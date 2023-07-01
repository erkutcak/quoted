'use client'

import Link from 'next/link'
import React from 'react'
import { useAuthContext } from '../context/AuthContext'

export default function MyProfile() {

  const { signOut, user } = useAuthContext();

  return (
    <div>
      <h1>My Profile</h1>
      <img src={user.photoURL} alt={user.displayName} />
      <h3>Username:</h3>
      <h2>{user.displayName}</h2>
      <h3>Email:</h3>
      <h2>{user.email}</h2>
      <Link href='/'>
        <button onClick={signOut}>Log Out</button>
      </Link>
    </div>
  )
}