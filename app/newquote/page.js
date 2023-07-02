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
    <div>
      <form className="form mx-3" onSubmit={onSubmit}>
        <label className="flex flex-col">
            <span className='font-medium mb-4'>New Quote</span>
            <input
              className='py-4 px-6 text-white rounded-lg outlined-none border-none font-medium'
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
        <button type="submit" onSubmit={onSubmit}>Submit</button>
      </form>
    </div>
  )
}