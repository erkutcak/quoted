'use client'

import Link from "next/link"
import { useAuthContext } from "./context/AuthContext"

export default function Home() {

  const { user } = useAuthContext()
  console.log(user);
  return (
    <div className="landing-page">
      <h1>Welcome to quoted.</h1>
      <Link href="/signin">
        <button>Log-in</button>
      </Link>
      <Link href="/signup">
        <button>Create an account</button>
      </Link>
    </div>
  )
}
