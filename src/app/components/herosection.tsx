import { FaShoppingCart } from 'react-icons/fa';
import Image from 'next/image'
import Link from 'next/link'

export const HeroSection = () => {
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
                <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
                    <div className="max-w-xl mb-6">
                        <div>
                            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider uppercase bg-teal-400 text-teal-900 rounded-full">Sale upto 70% off</p>
                        </div>
                        <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none max-w-lg mb-6">
                            Everything you
                            <br className="hidden md:block" />
                            can imagine{' '}
                            <span className="inline-block text-deep-purple-accent-400">is real</span>
                        </h2>
                        <p className="text-gray-700 text-base md:text-lg">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae. explicabo.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-green-400 hover:bg-green-700 focus:shadow-outline focus:outline-none"
                        >
                            <FaShoppingCart className='mr-3'/>
                            Start Shopping
                        </Link>
                    </div>
                    <br />
                    <div className="flex flex-col sm:flex-row items-center space-x-3">
                        <Image src='/support1.png' width={140} height={25} alt='logo' />
                        <Image src='/support2.png' width={140} height={25} alt='logo' />
                        <Image src='/support3.png' width={140} height={25} alt='logo' />
                        <Image src='/support4.png' width={140} height={25} alt='logo' />
                    </div>
                </div>
                <div className="flex items-center justify-center lg:w-1/2">
                    <div className="w-2/3">
                        <Image width={540} height={25} src="/heroImage.png" alt="heroImage" />
                    </div>
                </div>
            </div>
            <a
                href="/"
                aria-label="Scroll down"
                className="flex items-center justify-center w-10 h-10 mx-auto text-gray-600 hover:text-deep-purple-accent-400 hover:border-deep-purple-accent-400 duration-300 transform border border-gray-400 rounded-full hover:shadow hover:scale-110"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z" />
                </svg>
            </a>
        </div>
    );
};