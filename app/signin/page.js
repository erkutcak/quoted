'use client'
import React from "react";
import signIn from "../../firebase/auth/signin";
import { useRouter } from 'next/navigation'
import Link from "next/link";

export default function SignIn() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()
        const { result, error } = await signIn(email, password);
        if (error) {
            return console.log(error)
        }
        return router.push("/home")
    }
    
    return (
        <div className='flex flex-col items-center justfiy-center mt-5 top-20'>
            <h1 className='font-archivoblack text-2xl mb-5'>-welcome back.</h1>
            <div className="flex flex-col items-center justify-center w-[95%] max-w-lg mx-auto mb-5 font-medium px-4 py-8 rounded-md bg-[#A37774] shadow-xl">
                <form onSubmit={handleForm} className="form">
                    <label htmlFor="email">
                        <p className="text-off-white text-md font-montserrat font-light italic mb-2">E-mail</p>
                        <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" className="text-off-white text-lg font-montserrat font-medium italic mb-6 px-2"/>
                    </label>
                    <label htmlFor="password">
                        <p className="text-off-white text-md font-montserrat font-light italic mb-2">Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" className="text-off-white text-lg font-montserrat font-medium italic mb-6 px-2"/>
                    </label>
                    <div className="flex justify-around items-center mt-4">
                        <button className='text-off-white bg-steel-blue py-2 px-4 rounded' type="submit">Sign in</button>
                        <Link href="/">
                            <button className='text-off-white ml-4 mr-4 bg-steel-blue py-2 px-4 rounded'>Back</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}