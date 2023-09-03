import React from 'react'
import { FaBars } from 'react-icons/fa'

function Header() {
  return (
    <div className='bg-gray-100 shadow-sm px-20 flex font-bold text-lg justify-between w-full h-16 items-center'>
      <div>
        <a>Boko</a>
      </div>
      <div>
        <div className='md:hidden'>
          <FaBars />
        </div>
        <nav className='hidden md:block'>
          <ul className='flex'>
            <li className='pl-12'><a>Home</a></li>
            <li className='pl-12'><a>Prices</a></li>
            <li className='pl-12'><a>Favorites</a></li>
            <li className='pl-12'><a>Categories</a></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header