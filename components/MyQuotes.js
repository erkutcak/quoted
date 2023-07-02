'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useAuthContext } from '@/app/context/AuthContext';

export async function fetchData(author) {
    try {
        const response = await axios.get(`/api/getUserQuotes?author=${author}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default function MyQuotes() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const getData = async () => {
            try {
            const responseData = await fetchData(user.email);
            setData(responseData);
            setLoading(false);
            } catch (error) {
            setError(error);
            setLoading(false);
            }
        };
        getData();
        }, [user.email]);
    
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
                    <h5 className='text-off-white text-sm font-montserrat font-light text-right italic'>{formattedDate}</h5>
                </div>
                <div className="flex justify-around items-center mt-4">
                    <button className='text-off-white ml-4 mr-4 bg-steel-blue py-2 px-4 rounded'>Edit</button>
                    <button className='text-off-white ml-4 mr-4 bg-steel-blue py-2 px-4 rounded'>Delete</button>
                </div>
            </div>
        )
    })

    return (
        <div className='flex w-[95%] flex-col'>
            {displayQuotes}
        </div>
    )
}