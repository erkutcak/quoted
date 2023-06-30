'use client'

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
          if (querySnapshot && querySnapshot.docs) { // Add null check
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

  return (
    <div>
        <h1>Homepage</h1>
        {quotes.map((quote, idx) => (
        <div key={idx}>{quote.title} - {quote.author}</div>
      ))}
    </div>

  )
}
