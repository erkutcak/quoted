'use client'
import { db } from '@/firebase/firebaseApp';
import { useEffect, useState, React } from 'react';
import { useAuthContext } from '../context/AuthContext'
import axios from 'axios';

export default function NewQuote() {

  const { user } = useAuthContext();
  const [content, setContent] = useState({
    title: "",
    author: user.email,
    likes: 0,
    date: new Date().toISOString(),
  })

  const onSubmit = async () => {
    const { title, author, likes, date } = content;
    await axios.post('/api/addData', { title, author, likes, date },  {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } 

  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }

  console.log(content);

  return (
    <div className='flex flex-col items-center mt-5'>
        <h1 className='font-archivoblack text-2xl mb-5'>-newquote.</h1>
      <form className="form h-full w-full max-w-lg mx-auto mb-5 font-medium px-4 py-2 rounded-md bg-[#A37774] shadow-xl" onSubmit={onSubmit}>
        <label className="flex flex-col">
            <textarea
              className='py-4 px-6 text-white rounded-lg outlined-none border font-medium bg-[#A37774]'
              id="name"
              type="text"
              name="title"
              rows='4'
              onChange={onChange}
              value={content.title}
              placeholder='Be creative!'
              required
            />
        </label>
        <button className='text-off-white ml-4 mr-4 bg-steel-blue py-2 px-4 rounded' type="submit" onSubmit={onSubmit}>Submit</button>
      </form>
    </div>
  )
}