'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase/firebaseApp'
import { motion } from 'framer-motion';

export async function fetchData() {
    try {
      // quotes data
        const quotesResponse = await axios.get('/api/getData');
        const quotes = quotesResponse.data;
        console.log(quotes);

      // users data
        const usersResponse = await axios.get('/api/getUsers');
        const users = usersResponse.data;
        console.log(users);

      // Combine quotes and users
        const quotesWithAuthorInfo = quotes.map((quote) => {
        // author's details using their email
            const author = users.find((user) => user.email === quote.author);

            // new object combining quote and author details
            return {
                author: {
                    profile_pic: author?.profile_pic,
                    username: author?.username,
                },
                title: quote.title,
                likes: quote.likes,
                date: quote.date,
                id: quote.id,
            };
        });
        console.log(quotesWithAuthorInfo);
        return quotesWithAuthorInfo;
        
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function editLikes(quoteId, updatedLikes) {
    try {
        await axios.patch(`/api/addLikes?quoteId=${quoteId}`, { likes: updatedLikes });
    } catch (error) {
        console.error('Error editing quote:', error);
    }
};

export default function Quote () {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const placeholderImage = '/placeholder.png';

    
    useEffect(() => {
        const getData = async () => {
          try {
            console.log('Fetching data...');
            const responseData = await fetchData();
            console.log('Data received:', responseData);
            setData(responseData);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
            setLoading(false);
          }
        };
      
        getData();
      }, []);
      
      useEffect(() => {
        const fetchImageUrl = async () => {
          try {
            const authorProfilePics = data
              .map((quote) => quote.author?.profile_pic)
              .filter(Boolean);
            const imageUrlPromises = authorProfilePics.map((profilePic) => {
              const storageRef = ref(storage, `images/${profilePic}`);
              return getDownloadURL(storageRef);
            });
            const imageUrls = await Promise.all(imageUrlPromises);
            setImageUrl(imageUrls);
          } catch (error) {
            console.error('Error fetching image URLs:', error);
          }
        };
      
        if (data.length > 0) {
          fetchImageUrl();
        }
      }, [data]);

    const handleLike = async (quoteId, currentLikes) => {
        const updatedLikes = currentLikes + 1;
        try {
            await editLikes(quoteId, updatedLikes);
            const updatedData = await fetchData();
            setData(updatedData);
        } catch (error) {
            console.error('Error liking quote:', error);
        }
    };

    if (loading) {
    return <div>Loading...</div>;
    }

    if (error) {
    return <div>Error: {error.message}</div>;
    }

    const displayQuotes = data.map((quote, index) => {

        const formattedDate = DateTime.fromISO(quote.date).toFormat('MM/dd/yyyy - HH:mm');
        const author = quote.author || {};
        const { profile_pic, username } = author;
        const imageSrc = profile_pic && imageUrl.length > 0 ? imageUrl[index] || placeholderImage : placeholderImage;

        return (
          <motion.div
          key={quote.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0, 0.71, 0.2, 1.01]
          }}
          >
            <div key={index} className="h-full w-full max-w-lg mx-auto mb-5 font-medium px-4 py-2 rounded-md bg-[#A37774] shadow-xl">
                <img src={imageSrc} alt={username} className="w-[30px] h-[30px] rounded-full ml-auto my-4" />
                <h3 className='text-off-white text-xl font-montserrat font-medium italic'>{`"${quote.title}"`}</h3>
                <h4 className='text-off-white text-lg font-montserrat font-light text-right italic'>{`-${username || ''}`}</h4>
                <div className="flex justify-around items-center mt-4">
                <button className="flex items-center justify-start border-none rounded-lg overflow-hidden shadow-md cursor-pointer bg-transparent w-30 h-35" onClick={() => handleLike(quote.id, quote.likes)}>
                    <span className="w-[60px] h-full flex items-center justify-start gap-2 bg-steel-blue pl-[5px] pr-[5px] transition-colors duration-300 hover:bg-red-700 active:bg-red-800">
                        <svg fill="white" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
                        </svg>
                        <span className="text-white font-semibold">Like</span>
                    </span>
                    <span className="w-10 h-full flex items-center justify-center text-steel-blue font-semibold relative bg-white">
                    {quote.likes}
                    </span>
                </button>
                <h5 className='text-off-white text-sm font-montserrat font-light text-right italic'>{formattedDate}</h5>
                </div>
            </div>
          </motion.div>
        )
    })

    return (
        <div className='flex w-[95%] flex-col'>
            {displayQuotes}
        </div>
    );
}