'use client'

import Link from "next/link"
import { useAuthContext } from "../app/context/AuthContext";
import { useState } from "react";

export default function Navbar() {
    
    const { user } = useAuthContext()
    const [activeButton, setActiveButton] = useState('');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <div className="fixed z-50 w-[95%] h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600"> 
            {user ? (<div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium bg-ash-black rounded-full">
                <Link href="/home" className={`inline-flex flex-col items-center justify-center px-5 group rounded-l-full ${activeButton === 'home' ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    <button type="button" className={`inline-flex flex-col items-center justify-center px-5 group rounded-l-full ${activeButton === 'home' ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`} onClick={() => handleButtonClick('home')}>
                        <svg className={`w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 ${activeButton === 'home' ? 'text-steel-blue dark:text-steel-blue' : 'group-hover:text-steel-blue dark:group-hover:text-steel-blue'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                        </svg>
                        <span className={`text-sm text-gray-500 dark:text-gray-400 ${activeButton === 'home' ? 'text-steel-blue dark:text-steel-blue' : 'group-hover:text-steel-blue dark:group-hover:text-steel-blue'}`}>Home</span>
                    </button>
                </Link>
                <Link href="/myquotes" className={`inline-flex flex-col items-center justify-center px-5 group ${activeButton === 'myquotes' ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    <button type="button" className={`inline-flex flex-col items-center justify-center px-1 group ${activeButton === 'myquotes' ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`} onClick={() => handleButtonClick('myquotes')}>
                        <svg className={`w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 ${activeButton === 'myquotes' ? 'text-steel-blue dark:text-steel-blue' : 'group-hover:text-steel-blue dark:group-hover:text-steel-blue'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                        </svg>
                        <span className={`w-20 text-xs text-gray-500 dark:text-gray-400 ${activeButton === 'myquotes' ? 'text-steel-blue dark:text-steel-blue' : 'group-hover:text-steel-blue dark:group-hover:text-steel-blue'}`}>My Quotes</span>
                    </button>
                </Link>
                <Link href="/newquote" className={`inline-flex flex-col items-center justify-center group ${activeButton === 'newquote' ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    <button type="button" className={`inline-flex flex-col items-center justify-center group ${activeButton === 'newquote' ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`} onClick={() => handleButtonClick('newquote')}>
                        <svg className={`w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 ${activeButton === 'newquote' ? 'text-steel-blue dark:text-steel-blue' : 'group-hover:text-steel-blue dark:group-hover:text-steel-blue'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
                        </svg>
                        <span className={`w-20 text-xs text-gray-500 dark:text-gray-400 ${activeButton === 'newquote' ? 'text-steel-blue dark:text-steel-blue' : 'group-hover:text-steel-blue dark:group-hover:text-steel-blue'}`}>New Quote</span>
                    </button>
                </Link>
                <Link href="/myprofile" className={`inline-flex flex-col items-center justify-center px-5 group rounded-r-full ${activeButton === 'myprofile' ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    <button type="button" className={`inline-flex flex-col items-center justify-center px-5 group rounded-r-full ${activeButton === 'myprofile' ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`} onClick={() => handleButtonClick('myprofile')}>
                        <svg className={`w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 ${activeButton === 'myprofile' ? 'text-steel-blue dark:text-steel-blue' : 'group-hover:text-steel-blue dark:group-hover:text-steel-blue'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"></path>
                        </svg>
                        <span className={`text-sm text-gray-500 dark:text-gray-400 ${activeButton === 'myprofile' ? 'text-steel-blue dark:text-steel-blue' : 'group-hover:text-steel-blue dark:group-hover:text-steel-blue'}`}>Profile</span>
                    </button>
                </Link>
            </div>) : (
            <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium bg-zinc-900 rounded-full">
                <Link href="/signin" className={`inline-flex flex-col items-center justify-center px-5 group rounded-l-full ${activeButton === 'signin' ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    <button type="button" className={`inline-flex flex-col items-center justify-center px-5 group rounded-l-full ${activeButton === 'signin' ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`} onClick={() => handleButtonClick('signin')}>
                        <svg className={`w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 ${activeButton === 'signin' ? 'text-steel-blue dark:text-steel-blue' : 'group-hover:text-steel-blue dark:group-hover:text-steel-blue'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                        </svg>
                        <span className={`text-sm text-gray-500 dark:text-gray-400 ${activeButton === 'signin' ? 'text-steel-blue dark:text-steel-blue' : 'group-hover:text-steel-blue dark:group-hover:text-steel-blue'}`}>Sign In</span>
                    </button>
                </Link>
                <Link href="/signup" className={`inline-flex flex-col items-center justify-center px-5 group rounded-r-full ${activeButton === 'signup' ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    <button type="button" className={`inline-flex flex-col items-center justify-center px-5 group rounded-r-full ${activeButton === 'signup' ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`} onClick={() => handleButtonClick('signup')}>
                        <svg className={`w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 ${activeButton === 'signup' ? 'text-steel-blue dark:text-steel-blue' : 'group-hover:text-steel-blue dark:group-hover:text-steel-blue'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4H1m3 4H1m3 4H1m3 4H1m6.071.286a3.429 3.429 0 1 1 6.858 0M4 1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm9 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                        </svg>
                        <span className={`text-sm text-gray-500 dark:text-gray-400 ${activeButton === 'signup' ? 'text-steel-blue dark:text-steel-blue' : 'group-hover:text-steel-blue dark:group-hover:text-steel-blue'}`}>Sign Up</span>
                    </button>
                </Link>
        </div>)}
        </div>
    )
}