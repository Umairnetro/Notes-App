import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col gap-4 items-center'>
      <h1 className='text-5xl font-semibold'>Welcome to Note App</h1>
      <Link to='/login' className='border px-4 py-2 rounded-full bg-white text-[#122524] hover:bg-transparent hover:text-white duration-300'>Join now</Link>
    </div>
  )
}

export default Home
