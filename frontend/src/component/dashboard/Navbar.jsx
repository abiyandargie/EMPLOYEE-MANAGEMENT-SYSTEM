import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const {user,logout} = useAuth()
  return (
    <div className='flex items-center justify-between h-12 bg-teal-600 px-5 text-white'>
        <p>welcome {user.name}</p>
        <button className='px-4 py-1 bg-teal-700 hover:bg-teal-800' onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar