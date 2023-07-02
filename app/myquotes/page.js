'use client'

import MyQuotes from "@/components/MyQuotes"

export default function Page() {

  return (
    <div className='flex flex-col items-center mt-5'>
      <h1 className='font-archivoblack text-2xl mb-5'>-myquotes.</h1>
      <MyQuotes />
    </div>
  )
}