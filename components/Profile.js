'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../app/context/AuthContext'
import axios from 'axios';
import { ref, getDownloadURL } from 'firebase/storage'
import { initFirebase, storage } from '../firebase/firebaseApp'
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

export async function fetchData(email) {
  try {
      const response = await axios.get(`/api/getUserProfile?email=${email}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }
}

export async function editUser(userId, newUsername, newFirstName, newLastName) {
  try {
    const response = await axios.patch(`/api/editProfile?userId=${userId}`, { username: newUsername, firstname: newFirstName, lastname: newLastName });
    return response.data;
  } catch (error) {
    console.error('Error editing user:', error);
    throw error;
  }
}

export default function Profile() {

  const { clear, user } = useAuthContext();
  const [userData, setUserData] = useState("");
  const [imageUrl, setImageUrl] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newFirstName, setNewFirstName] = useState("")
  const [newLastName, setNewLastName] = useState("")
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(initFirebase);
      clear();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    if (!user || !user.email) {
      router.push('/');
      return;
    }
    const fetchUserData = async () => {
      try {
        const response = await fetchData(user.email)
        setUserData(response)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [user])

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

  const handleEdit = () => {
    setEditing(true);
    setNewUsername(userData[0].username);
    setNewFirstName(userData[0].firstname);
    setNewLastName(userData[0].lastname);
  };

  const handleSave = async () => {
    try {
      await editUser(userData[0].id, newUsername, newFirstName, newLastName);
      const updatedData = await fetchData(user.email);
      setUserData(updatedData);
      setEditing(false);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setNewUsername(userData[0].username);
    setNewFirstName(userData[0].firstname);
    setNewLastName(userData[0].lastname);
  };

  return (
    <div className="flex flex-col items-center justify-center w-[95%] max-w-lg mx-auto mb-2 font-medium px-4 py-8 rounded-md bg-[#A37774] shadow-xl h-[65%] overflow-y-scroll">
      <img src={imageUrl} alt={userData[0].username} className="w-[120px] mb-6 rounded-full" />
      <h3 className="text-off-white text-md font-montserrat font-light border px-[14px]">Username</h3>
      {editing ? (
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="text-off-white text-xl font-montserrat font-medium mb-1 outline-none"
        />
      ) : (
        <h2 className="text-off-white text-xl font-montserrat font-medium mb-6">
          {userData[0].username}
        </h2>
      )}
      <h3 className="text-off-white text-md font-montserrat font-light border px-[14px]">First Name</h3>
      {editing ? (
        <input
          type="text"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
          className="text-off-white text-xl font-montserrat font-medium mb-1 outline-none"
        />
      ) : (
        <h2 className="text-off-white text-xl font-montserrat font-medium mb-6">
          {userData[0].firstname}
        </h2>
      )}
      <h3 className="text-off-white text-md font-montserrat font-light border px-[14px]">Last Name</h3>
      {editing ? (
        <input
          type="text"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
          className="text-off-white text-xl font-montserrat font-medium mb-1 outline-none"
        />
      ) : (
        <h2 className="text-off-white text-xl font-montserrat font-medium mb-6">
          {userData[0].lastname}
        </h2>
      )}
      <h3 className="text-off-white text-md font-montserrat font-light border px-[14px]">Email</h3>
      <h2 className="text-off-white text-xl font-montserrat font-medium mb-6">{userData[0].email}</h2>
      <div>
        {editing ? (
          <>
            <button
              className="text-off-white ml-4 mr-4 bg-steel-blue py-2 px-4 rounded"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="text-off-white ml-4 mr-4 bg-steel-blue py-2 px-4 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        ) : (
          <button className="text-off-white ml-4 mr-4 bg-steel-blue py-2 px-4 rounded" onClick={handleEdit}>
            Edit
          </button>
        )}
        <Link href="/">
          <button className="text-off-white ml-4 mr-4 bg-steel-blue py-2 px-4 rounded" onClick={handleSignOut}>
            Log Out
          </button>
        </Link>
      </div>
    </div>
  );
}