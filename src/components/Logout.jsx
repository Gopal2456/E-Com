import React from 'react'
import { Link } from 'react-router-dom'

const Logout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f3d4ba]">
  <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
    <h1 className="text-2xl font-bold text-center text-orange-600">Logout</h1>
      <div className='flex gap-5 justify-center'>
        <Link to = '/'>
            <button
                type="submit"
                className="w-24 py-2 text-white bg-rose-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Yes
            </button>
          </Link>
          <Link to = '/dashboard'>
          <button
            type="submit"
            className="w-24 py-2 text-white bg-orange-600 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            No
          </button>
          </Link>
        </div>
  </div>
</div>
  )
}

export default Logout
