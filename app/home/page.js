'use client'

import Quote from '@/components/Quote';
import { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext'
import { useRouter } from 'next/navigation';

export default function Page() {

    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return (
        <div className='flex flex-col items-center mt-5'>
            <h1 className='font-archivoblack text-2xl mb-5'>-homepage.</h1>
            <Quote/>
        </div>
    )
}
