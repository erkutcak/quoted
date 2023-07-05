'use client'

import { useState } from 'react';
import { useAuthContext } from '@/app/context/AuthContext';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function NewQuote() {

    const { user } = useAuthContext();
    const [content, setContent] = useState({
      title: "",
      author: user ? user.email : "",
      likes: 0,
      date: new Date().toISOString(),
    })
  
    const onSubmit = async (e) => {
      e.preventDefault();
      const { title, author, likes, date } = content;
      await axios.post('/api/addData', { title, author, likes, date },  {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setContent({
        title: "",
        author: user ? user.email : "",
        likes: 0,
        date: new Date().toISOString(),
      });
      toast('📝 New Quote Posted!', {
        hideProgressBar: false,
        autoClose: 4600,
        type: "success",
    });
    } 
  
    const onChange = (e) => {
      const { value, name } = e.target;
      setContent(prevState => ({ ...prevState, [name]: value }));
    }
  
    return (
      <form className="form flex flex-col items-center justify-center h-full w-[95%] max-w-lg mx-auto mb-5 font-medium px-4 py-2 rounded-md bg-[#A37774] shadow-xl" onSubmit={onSubmit}>
        <ToastContainer />
          <label className="flex flex-col w-full">
              <textarea
                className='py-4 px-6 text-white rounded-lg mt-4 outlined-none border font-medium bg-[#A37774] w-full italic'
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
          <button className='text-off-white mx-4 my-4 bg-steel-blue py-2 px-4 rounded' type="submit" onSubmit={onSubmit}>Submit</button>
        </form>
    )
  }