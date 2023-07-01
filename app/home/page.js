'use client'

import Quote from '@/components/Quote';
import getData from '@/firebase/firestore/getData'
import React, { useEffect, useState } from 'react';

export default function Home() {

    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const { querySnapshot, error } = await getData();
            if (error) {
                setError(error);
            } else {
                if (querySnapshot && querySnapshot.docs) {
                const quotesData = querySnapshot.docs.map((doc) => doc.data());
                setQuotes(quotesData);
                console.log(quotes);
                }
            }
            setLoading(false);
            } catch (error) {
            setError(error);
            setLoading(false);
            }
        }
        fetchData();
        }, []);

    if (loading) {
    return <div>Loading...</div>;
    }

    if (error) {
    return <div>Error: {error.message}</div>;
    }
    console.log(quotes);
    const displayQuotes = quotes.map((quote, idx) => {
        const seconds = quote.date.seconds;
        const nanoseconds = quote.date.nanoseconds;
        const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000); // Calculate milliseconds
        const date = new Date(milliseconds); // Create JavaScript Date object
        const dateString = date.toLocaleString();
        return (
          <Quote quote={quote} date={dateString} key={`${idx}-${quote.title}`}/>
        )
    })

  return (
    <div>
        <h1>Homepage</h1>
        {displayQuotes}
    </div>
  )
}
