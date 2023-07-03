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

export async function editUser(userId, newUsername) {
  try {
    const response = await axios.patch(`/api/editProfile?userId=${userId}`, { username: newUsername });
    return response.data;
  } catch (error) {
    console.error('Error editing user:', error);
    throw error;
  }
}

export default function Profile() {

  const { signOut, user } = useAuthContext();
  const [userData, setUserData] = useState("");
  const [imageUrl, setImageUrl] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [editing, setEditing] = useState(false);

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

  const handleEdit = () => {
    setEditing(true);
    setNewUsername(userData[0].username);
  };

  const handleSave = async () => {
    try {
      await editUser(userData[0].id, newUsername);
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
  };

  console.log(userData);

  return (
    <div className="flex flex-col items-center justify-center w-[95%] max-w-lg mx-auto mb-5 font-medium px-4 py-8 rounded-md bg-[#A37774] shadow-xl">
      <img src={imageUrl} alt={userData[0].username} className="w-[120px] mb-6 rounded-full" />
      <h3 className="text-off-white text-md font-montserrat font-light italic">Username:</h3>
      {editing ? (
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="text-off-white text-2xl font-montserrat font-medium italic mb-6 outline-none"
        />
      ) : (
        <h2 className="text-off-white text-2xl font-montserrat font-medium italic mb-6">
          {userData[0].username}
        </h2>
      )}
      <h3 className="text-off-white text-md font-montserrat font-light italic">Email:</h3>
      <h2 className="text-off-white text-2xl font-montserrat font-medium italic mb-6">{user.email}</h2>
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
          <button className="text-off-white ml-4 mr-4 bg-steel-blue py-2 px-4 rounded" onClick={signOut}>
            Log Out
          </button>
        </Link>
      </div>
    </div>
  );
}