'use client'

import { FaBars, FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import { UserButton } from '@clerk/nextjs';
import {  useState } from 'react';

import { AllCategory } from '@/types/category';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/util/createClient';
import { useAuth } from "@clerk/nextjs";

// Move the category fetching logic outside of the component
async function fetchCategories() {
  const response = await client.fetch(`
    *[_type == "product_category"]{
      _id,
      category_name
    }
  `);
  return response;
}



export default function NavBar({ categories }: { categories: AllCategory[] }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { userId } = useAuth();
  
  return (
    <>
      <header className="header sticky top-0 z-[1] bg-white shadow-md flex items-center justify-between px-8 py-02">
        <h1 className="w-3/12">
          <Link href="/">
            <Image src="/Logo.png" width={140} height={25} alt="logo" />
          </Link>
        </h1>

        <nav className="nav hidden md:block font-semibold text-lg">
          <ul className="flex items-center">
            {categories.map((element1: AllCategory) => (
              <li
                key={element1._id}
                className="font-light p-4 text-black border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active"
              >
                <Link href={'/' + element1.category_name}>{element1.category_name}</Link>
              </li>
            ))}
            <li className="font-light p-4 text-black border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              <Link href="/products">All Product</Link>
            </li>
          </ul>
        </nav>

        <div className="w-3/12 flex justify-end">
          {!userId ?  <Link href="/SignIn">
            <FaSignInAlt className=" sm:hidden hidden lg:block w-8 h-8 p-1 mr-4 text-black hover:text-green-500 duration-200" />
          </Link> :<div className='mr-4'><UserButton afterSignOutUrl="/"/></div>}

          <Link href="/Cart">
            <FaShoppingCart className=" w-8 h-8 p-1 text-black hover:text-green-500 duration-200" />
          </Link>
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            className="z-10 hover:bg-gray-200 rounded-full p-2 lg:hidden"
          >
            <FaBars color={'#000000'} size={30} />
          </button>
        </div>
      </header>

      <div
        className={`absolute bg-white lg:hidden flex flex-col gap-y-8 items-center justify-center transition-all w-full overflow-hidden z-[2] duration-500 ${toggleMenu ? 'h-screen' : 'h-0'
          }`}
      >
        {categories.map((element1: AllCategory) => (
          <Link href={'/' + element1.category_name} key={element1._id}>
            <h2 className={'font-semibold whitespace-nowrap hover:underline focus:underline'}>
              {element1.category_name}
            </h2>
          </Link>
        ))}
        <Link href="/products">
          <h2 className={'font-semibold whitespace-nowrap hover:underline focus:underline'}>
            All Products
          </h2>
        </Link>
      </div>
    </>
  );
}

// Fetch the categories asynchronously and pass them as props to the component
export async function getStaticProps() {
  const categories = await fetchCategories();

  return {
    props: {
      categories,
    },
  };
}