'use client'

import Link from "next/link"

export default function Home() {
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
