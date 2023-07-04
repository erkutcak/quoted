'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';

export async function fetchData() {
    try {
        const response = await axios.get('/api/getData');
        return response.data;
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

    useEffect(() => {
    const getData = async () => {
        try {
        const responseData = await fetchData();
        setData(responseData);
        setLoading(false);
        } catch (error) {
        setError(error);
        setLoading(false);
        }
    };
    getData();
    }, []);

    const handleLike = async (quoteId, currentLikes) => {
        const updatedLikes = currentLikes + 1;
        try {
            await editLikes(quoteId, updatedLikes);
            const updatedData = await fetchData(); // Refetch the data after updating likes
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

    const displayQuotes = data.map((quote) => {
        const formattedDate = DateTime.fromISO(quote.date).toFormat('MM/dd/yyyy - HH:mm');
        return (
            <div key={quote.id} className="h-full w-full max-w-lg mx-auto mb-5 font-medium px-4 py-2 rounded-md bg-[#A37774] shadow-xl">
                <h3 className='text-off-white text-xl font-montserrat font-medium italic'>{`"${quote.title}"`}</h3>
                <h4 className='text-off-white text-lg font-montserrat font-light text-right italic'>{`-${quote.author}`}</h4>
                <div className="flex justify-around items-center mt-4">
                <button className="flex items-center justify-start border-none rounded-lg overflow-hidden shadow-md cursor-pointer bg-transparent w-30 h-35" onClick={() => handleLike(quote.id, quote.likes)}>
                    <span className="w-[60px] h-full flex items-center justify-start gap-2 bg-red-500 pl-[5px] pr-[5px] transition-colors duration-300 hover:bg-red-700 active:bg-red-800">
                        <svg fill="white" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
                        </svg>
                        <span className="text-white font-semibold">Like</span>
                    </span>
                    <span className="w-10 h-full flex items-center justify-center text-red-500 font-semibold relative bg-white">
                    {quote.likes}
                    </span>
                </button>
                <h5 className='text-off-white text-sm font-montserrat font-light text-right italic'>{formattedDate}</h5>
                </div>
            </div>
        )
    })

    return (
        <div className='flex w-[95%] flex-col'>
            {displayQuotes}
        </div>
    );
}