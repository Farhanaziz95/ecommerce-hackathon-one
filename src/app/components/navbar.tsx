'use client'

import { FaBars, FaShoppingCart } from 'react-icons/fa'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';

export default function NavBar() {

  // const {showCart, setShowCart, totalQty} = useStateContext();
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
    <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02">
      <h1 className="w-3/12">
        <Link href="">
          <Image src='/Logo.png' width={140} height={25} alt='logo' />
        </Link>
      </h1>

      <nav className="nav hidden md:block font-semibold text-lg">
        <ul className="flex items-center">
          <li className="font-light p-4 text-black border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
            <Link href="/Womens">Womens</Link>
          </li>
          <li className="font-light p-4 text-black border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
            <Link href="/Mens">Mens</Link>
          </li>
          <li className="font-light p-4 text-black border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
            <Link href="/Kids">Kids</Link>
          </li>
          <li className="font-light p-4 text-black border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
            <Link href="/products">All Product</Link>
          </li>
        </ul>
      </nav>

      <div className="w-3/12 flex justify-end">
        <Link href="">
          <FaShoppingCart className="w-8 h-8 p-1 text-black hover:text-green-500 duration-200" />
        </Link>
        <button onClick={() => setToggleMenu(!toggleMenu)} className={'z-10 hover:bg-gray-200 rounded-full p-2 lg:hidden'}>
          <FaBars color={'#000000'} size={30} />
        </button>
      </div>

      
    </header>
    {
      <div
        className={`absolute bg-white lg:hidden flex flex-col gap-y-8 items-center justify-center transition-all w-full overflow-hidden duration-500 ${toggleMenu ? 'h-screen' : 'h-0'}`}>
        {
          <>
            <Link href='/'>
              <h2 className={'font-semibold whitespace-nowrap hover:underline focus:underline'}
              >Men</h2>
            </Link>
            <Link href='/'>
              <h2 className={'font-semibold whitespace-nowrap hover:underline focus:underline'}
              >Women</h2>
            </Link>
            <Link href='/'>
              <h2 className={'font-semibold whitespace-nowrap hover:underline focus:underline'}
              >Kids</h2>
            </Link>
            <Link href='/'>
              <h2 className={'font-semibold whitespace-nowrap hover:underline focus:underline'}
              >All Products</h2>
            </Link>
          </>
        }
      </div>
    }
    </>
  )
}


