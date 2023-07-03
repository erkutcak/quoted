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
                    <h5 className='text-off-white inline-block text-xl text-center'>{quote.likes} Likes</h5>
                    <button onClick={() => handleLike(quote.id, quote.likes)} className='text-off-white ml-4 mr-4 bg-steel-blue py-2 px-4 rounded'>Like!</button>
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