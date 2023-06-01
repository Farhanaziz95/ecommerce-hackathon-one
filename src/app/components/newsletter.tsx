export default function NewsLetter() {
    return (
        <section
            className='relative mt-24 mb-32 w-full flex justify-center items-center'>

            <div className='relative flex flex-col justify-center items-center gap-y-4 z-10 w-4/5 sm:w-3/5'>
                <h1 className='text-2xl text-center sm:text-left sm:text-3xl font-semibold'>Subscribe Our Newsletter</h1>
                <label className='font-thin text-sm text-center sm:text-left'>Get the latest information and promo offers directly</label>
                <div className='flex flex-col gap-y-3 sm:flex-row gap-x-5 w-full lg:max-w-md'>
                    <input className='border border-black text-sm flex-grow focus:outline-0 px-1'
                        placeholder='Input email address' type="email" />
                    <button onClick={undefined}
                        className='text-white font-semibold bg-black px-5 py-2 text-sm border-t-2 border-l-2 border-gray-500'>
                        Get Started
                    </button>
                </div>
            </div>

            <div className='absolute justify-center text-center w-full z-[-1]'>
                <h1 className='text-6xl xs:text-8xl sm:text-9xl text-gray-100 font-semibold tracking-tighter'>
                    Newsletter
                </h1>
            </div>
        </section>
    )
}