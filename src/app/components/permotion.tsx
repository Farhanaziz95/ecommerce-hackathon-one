import Image from 'next/image'
import React from 'react'

const EventsBanner = () => {
  return (
    
    <section className="w-full">
      <div className="flex flex-col justify-center items-center gap-y-3 my-5">
        <label className="uppercase font-semibold text-blue-600 text-sm">Promotions</label>
        <h1 className="text-black font-semibold text-4xl">Our Promotion Events</h1>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        <div className="flex flex-col flex-grow gap-4">
          <div className="h-36 px-3 flex flex-row justify-between items-center bg-gray-300">
            <div>
              <label className="block font-semibold text-xl">GET UP TO <span className="text-3xl">60%</span></label>
              <label className="block">for the summer season</label>
            </div>
            <div>
              <Image alt="Promotion Girl" width={180} height={180} src="/event1.png" />
            </div>
          </div>
          <div className="h-36 flex flex-col items-center justify-center flex-grow gap-y-3 bg-gray-900">
            <label className="text-3xl text-white font-bold">GET 30% OFF</label>
            <label className="text-sm text-white">USE PROMO CODE</label>
            <label className="text-lg tracking-widest text-white bg-gray-500 px-4 py-1 rounded-lg">DINEWEEKENDSALE</label>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center flex-grow pb-0 pt-3 px-2 bg-[#efe1c7]" >
          <div>
            <label className="text-md">Flex Sweatshirt</label>
            <label><span className="text-md line-through">$100.00</span> <span className="font-semibold">$75.00</span></label>
          </div>
          <div>
            <Image alt="Promotion Girl" width={180} height={180} src="/event2.png" />
          </div>
        </div>
        <div className="flex flex-col justify-between items-center flex-grow pb-0 pt-3 px-2 bg-gray-300">
          <div>
            <label className="text-md">Flex Push Button Bomber</label>
            <label><span className="text-md line-through">$225.00</span> <span className="font-semibold">$190.00</span></label>
          </div>
          <div>
            <Image alt="Promotion Girl" width={180} height={180} src="/event3.png" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsBanner;