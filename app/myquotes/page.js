'use client'

import MyQuotes from "@/components/MyQuotes"
import { useAuthContext } from '../context/AuthContext'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/")
}, [user])

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
        duration: 0.5,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01]
    }}
    >
      <div className='flex flex-col items-center mt-5'>
        <h1 className='font-archivoblack text-2xl mb-5'>-myquotes.</h1>
        <MyQuotes />
      </div>
    </motion.div>
  )
}