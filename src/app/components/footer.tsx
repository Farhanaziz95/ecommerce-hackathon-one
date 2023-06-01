import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

import Image from 'next/image'
import Link from "next/link";

export default function Footer() {

    return (
        <>
            <footer className=' bg-white container w-full border-t border-t-gray-300 border-dashed mt-14 pt-14'>
            <div className='flex flex-col md:flex-row gap-y-3 w-full'>
                <div className='max-w-full md:max-w-[30%] flex flex-col gap-y-3 justify-start items-start'>
                    <Image src='/Logo.png' alt='Dine Market Logo' width={200} height={200} />
                    <label className='text-gray-500 text-sm text-left'>
                        Small, artisan label that offers a thoughtfully curated collection of high quality everyday essentials made.
                    </label>
                    
                    <div className='flex flex-row items-center gap-x-5'>
                        <Link href='#' className='bg-gray-100 rounded-md h-10 w-10 flex justify-center items-center'>
                            <FaFacebookF color={'#000000'} size={20} />
                        </Link>
                        <Link href='#' className='bg-gray-100 rounded-md h-10 w-10 flex justify-center items-center'>
                            <FaTwitter color={'#000000'} size={20} />
                        </Link>
                        <Link href='#' className='bg-gray-100 rounded-md h-10 w-10 flex justify-center items-center'>
                            <FaLinkedinIn color={'#000000'} size={20} />
                        </Link>
                    </div>
                </div>

                <div className='flex flex-col items-center sm:flex-row justify-around flex-around w-full'>

                    <section className='w-full flex-col items-start h-full'>
                        <h1 className='font-bold py-2 text-gray-700 text-lg text-left'>Company</h1>
                        <div className='flex flex-col items-start gap-y-2'>

                            <Link href='#' className='text-gray-500'>About</Link>
                            <Link href='#' className='text-gray-500'>Terms of Use</Link>
                            <Link href='#' className='text-gray-500'>Privacy Policy</Link>
                            <Link href='#' className='text-gray-500'>How it Works</Link>
                            <Link href='#' className='text-gray-500'>Contact Us</Link>

                        </div>
                    </section>

                    <section className='w-full flex-col items-start h-full'>
                        <h1 className='font-bold py-2 text-gray-700 text-lg text-left'>Support</h1>
                        <div className='flex flex-col items-start gap-y-2'>

                            <Link href='#' className='text-gray-500'>Support Carrer</Link>
                            <Link href='#' className='text-gray-500'>24h Service</Link>
                            <Link href='#' className='text-gray-500'>Quick Chat</Link>

                        </div>
                    </section>

                    <section className='w-full flex-col items-start h-full'>
                        <h1 className='font-bold py-2 text-gray-700 text-lg text-left'>Contact</h1>
                        <div className='flex flex-col items-start gap-y-2'>

                            <Link href='#' className='text-gray-500'>Support 24h</Link>
                            <Link href='#' className='text-gray-500'>Whatsapp</Link>

                        </div>
                    </section>


                </div>
            </div>
            <div className='border-t border-black flex flex-wrap justify-between gap-3 py-4 px-8 mt-14'
                style={{ marginLeft: -32, marginRight: -32 }}>
                <label className='text-gray-500'>Copyright &copy; 2023 Dine Market</label>
                <label className='text-gray-500'>Designed by <span
                    className='font-semibold text-black'>I Dont Know who did this awesome work</span></label>
                <label className='text-gray-500'>Developed by <span
                    className='font-semibold text-black'>Farhan Aziz Umrani</span></label>
            </div>
        </footer >
        </>
    )
}