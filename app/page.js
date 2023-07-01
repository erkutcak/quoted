'use client'

import Link from "next/link"
import { useAuthContext } from "./context/AuthContext"
import logo2 from '../public/logo2.png'
import Image from "next/image"

export default function Home() {

  const { user } = useAuthContext()
  console.log(user);
  return (
    <div className="h-screen flex flex-column justify-center items-center">
      <Image src={logo2} alt="logo" className="max-h-[500px]"/>
      {/* <Link href="/signin">
        <button>Log-in</button>
      </Link>
      <Link href="/signup">
        <button>Create an account</button>
      </Link> */}
    </div>
  )
}
