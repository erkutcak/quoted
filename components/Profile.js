'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../app/context/AuthContext'
import axios from 'axios';
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase/firebaseApp'

export async function fetchData(email) {
  try {
      const response = await axios.get(`/api/getUserProfile?email=${email}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }
}

export default function Profile() {

  const { signOut, user } = useAuthContext();
  const [userData, setUserData] = useState("");
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchData(user.email)
        setUserData(response)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [user.email])

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const storageRef = ref(storage, `images/${userData[0].profile_pic}`)
        const url = await getDownloadURL(storageRef)
        setImageUrl(url)
      } catch (error) {
        console.error('Error fetching image URL:', error)
      }
    }

    if (userData) {
      fetchImageUrl()
    }
  }, [userData])

  if (!userData || !imageUrl) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>My Profile</h1>
      <img src={imageUrl} alt={userData[0].username} />
      <h3>Username:</h3>
      <h2>{userData[0].username}</h2>
      <h3>Email:</h3>
      <h2>{user.email}</h2>
      <Link href="/">
        <button onClick={signOut}>Log Out</button>
      </Link>
    </div>
  )
}