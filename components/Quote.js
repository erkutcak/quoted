'use client'

import React from 'react';

export default function Quote ({ quote, date }) {
    
    return (
        <div>
            <h3>{`"${quote.title}"`}</h3>
            <h4>{`-${quote.author}`}</h4>
            <h5>{date}</h5>
        </div>
    )
}