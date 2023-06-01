import Image from 'next/image'
import Link from "next/link";

export default function About() {
    return (
        <div className="grid grid-cols-2 mt-24">
            <div className="col-span-2 sm:col-span-2 md:col-span-1">
                <div className={'mt-20 md:mt-40 flex flex-col gap-3'}>
                    <div className={'flex flex-col md:flex-row sm:flex-col flex-wrap justify-between'}>
                        <div className={'py-2 md:w-1/2 w-full sm:w-full'}>
                            <label className={'font-semibold text-lg'}>Using Good Quality Materials</label>
                            <p>Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                        </div>
                        <div className={'py-2 md:w-1/2 w-full sm:w-full'}>
                            <label className={'font-semibold text-lg'}>100% Handmade Products</label>
                            <p>Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div className={'flex flex-col md:flex-row sm:flex-col flex-wrap justify-between'}>
                        <div className={'py-2 md:w-1/2 w-full sm:w-full'}>
                            <label className={'font-semibold text-lg'}>Modern Fashion Design</label>
                            <p>Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                        </div>
                        <div className={'py-2 md:w-1/2 w-full sm:w-full'}>
                            <label className={'font-semibold text-lg'}>Discount for Bulk Orders</label>
                            <p>Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                </div>

                <div className='pl-8 relative mt-[-300px] justify-center  w-full z-[-1]'>
                    <h1 className='text-6xl xs:text-8xl sm:text-9xl text-gray-100 font-semibold tracking-tighter'>
                        Different <br /> From <br /> Others
                    </h1>
                </div>
            </div>
            <div className="col-span-2 sm:col-span-2 md:col-span-1">
                <div className={'flex flex-col justify-center items-center gap-y-3 mt-32 md:mt-0 md:my-5'}>
                    {/*  Mini Heading*/}
                    <label className={'uppercase font-semibold text-blue-600 text-sm'}></label>
                    {/*  Main Heading*/}
                    <h1 className={'text-black font-semibold text-4xl'}>Unique and Authentic Vintage Designer Jewellery</h1>
                </div>
                <div className={'mt-14 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4'}>
                    <div className={'min-w-fit'}>
                        <Image src={'/images/productsGirl3.webp'} alt={'Products Girl 3'} width={300} height={300} />
                    </div>
                    <div className={'min-w-[50%] flex flex-col items-center gap-y-3 mt-3'}>
                        <p className={'font-light text-center sm:text-left'}>
                            This piece is ethically crafted in our small family-owned workshop in Peru with unmatched attention to
                            detail and care. The Natural color is the actual natural color of the fiber, undyed and 100% traceable.
                        </p>
                        <Link href={'/allProducts'} className={'mt-4'}>
                            <button onClick={undefined}
                                className='px-14 text-white font-semibold bg-black py-2 text-sm border-t-2 border-l-2 border-gray-500'>
                                See All Products
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}