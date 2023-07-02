'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext'

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
    return (
        <div key={quote.id}>
            <h3>{`"${quote.title}"`}</h3>
            <h4>{`-${quote.author}`}</h4>
            <h5>{quote.date}</h5>
            <h5>Likes: {quote.likes}</h5>
        </div>
    )
})

  return (
    <div>{displayQuotes}</div>
  )
}