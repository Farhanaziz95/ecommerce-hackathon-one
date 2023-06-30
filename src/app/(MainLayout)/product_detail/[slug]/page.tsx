'use client'

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { FaCartPlus } from 'react-icons/fa';
import { PortableText } from "@portabletext/react";
import { client } from "@/util/createClient";
import { productDetails } from "@/types/productdetails";
import { useAuth } from "@clerk/nextjs";

async function getproductdetails(slug: string) {
  const newproduct: productDetails[] = await client.fetch(`
    *[_type == "products" && product_slug.current == '${slug}']{
      actual_price,
      product_care,
      discout_price,
      _id,
      product_description,
      images_gallery[]{
        asset->{url}
      },
      product_name,
      product_tags->{
        tags_name
      },
      product_category->{
        category_name
      },
      product_varients[]->{
        varient_name,
        varient_options,
        varient_price
      }
    }`);

  return newproduct;
}

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const [products, setProduct] = useState<productDetails[]>()
  const [size, setSize] = useState('')
  const [sizePrice, setSizePrice] = useState(0)
  const [quantity, setQuantity] = useState(1);
  const { isLoaded, userId} = useAuth();

  const ImageElement: MutableRefObject<HTMLImageElement | null> = useRef(null);

  const { slug } = params

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getproductdetails(slug);
        setProduct(result);

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()

  }, [slug]);

  const handleClick = (event: { target: any; }) => {
    if (ImageElement.current !== null) {
      ImageElement.current.src = event.target.src;
    }
  };

  const handleleaveClick = () => {
    if (ImageElement.current !== null) {
      ImageElement.current.src = imagearray[0];
    }
  };

  const handleaddcart = async (id: string, price: number, image: string, tag: string, itemname: string) => {
    const res = await fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify({
        product_id: id,
        user_id: userId,
        product_image: image,
        product_tag: tag,
        product_name: itemname,
        price: price,
        size: size,
        quantity: quantity
      })
    });
    const result = await res.json();
    if (result == null) {
      toast.success("Something went wrong try again.")
    } else {
      if (result.code == 200) {
        toast.success("Successfully Added to Cart.")
      } else if (result.code == 206) {
        toast.success("Successfully Updated to Cart.")
      } else if (result.code == 400) {
        toast.success("Bad Request Please try again.")
      }
    }

  }


  const imagearray: any[] = []

  products?.map((product) => (
    product.images_gallery.map((image: any) => {
      imagearray.push(image.asset.url)
    })
  ))



  const handlesizevarient = (cprice: number, csize: string) => {
    setSize(csize);
    setSizePrice(cprice);
  };

  const handlequentityPlus = () => {
    const changed = quantity + 1;
    setQuantity(changed);
  };

  const handlequentityminus = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    } else {

    }
  };

  return (
    products?.map((product) => (
      <main key={product._id} className={`container flex flex-col min-h-[90%] my-16`}>
        <div className={'grid grid-cols-12 w-full gap-x-3'}>
          <div
            className={'col-span-3 md:col-span-2 flex flex-col items-center justify-start gap-y-2'}>
            {
              imagearray.map((image: any, index: number) => {
                return (
                  <button key={index}
                    className={` cursor-pointer`}>
                    <img onMouseOver={handleClick}
                      onMouseLeave={handleleaveClick}
                      src={image} alt={'Product Image'} height={120} width={120} />
                  </button>
                )
              })
            }
          </div>

          <div className={'col-span-9 md:col-span-5 flex items-center justify-center'}>
            <div>
              <img ref={ImageElement} id="changingPicture" src={imagearray[0]} alt={'Product Image'} height={600}
                width={600} />
            </div>
          </div>
          <div
            className={'mt-16 md:mt-0 md:px-6 col-span-12 md:col-span-5 flex flex-col justify-center gap-y-6'}>
            <div>
              <h1 className={'text-3xl'}>{product.product_name}</h1>
              <h2 className={'text-xl font-semibold text-gray-500'}>{product.product_tags.tags_name}</h2>
            </div>


            <>
              {product.product_varients.map((data) => (
                <div key={data.varient_name}>
                  <label className={"text-md uppercase font-semibold"}>
                    {data.varient_name}
                  </label>
                  <div className={"flex flex-row justify-start items-center gap-x-10 mt-4"}>
                    {data.varient_options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handlesizevarient(data.varient_price[index], option)}
                        className={`text-lg bg-gray-300 h-10 w-10 font-semibold text-gray-400 border-2 rounded-full ${size === option ? "border-black bg-white" : "border-white"
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </>

            <div className={'flex flex-row gap-x-3'}>
              <label className={'text-md font-semibold'}>Quantity:</label>
              <div className={'flex flex-row gap-x-2'}>
                <button
                  disabled={quantity === 1}
                  onClick={handlequentityminus}
                  className={`${quantity === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                    } border-2 border-black h-7 w-7 rounded-full text-xl flex items-center justify-center`}
                >
                  -
                </button>
                <label className={'text-xl w-6 text-center'}>{quantity}</label>
                <button
                  onClick={handlequentityPlus}
                  className={'cursor-pointer border-2 border-black h-7 w-7 rounded-full text-xl flex items-center justify-center'}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-nowrap gap-2 items-center">
              <button onClick={() => {
                if (!isLoaded || !userId) {
                  toast.error("You must signIn to perform to add products.")
                } else if (size == '') {
                  toast.error("You must select size to perform to add products.")

                } else {
                  handleaddcart(product._id, product.actual_price - product.discout_price + sizePrice, imagearray[0], product.product_tags.tags_name, product.product_name)
                }
              }} className="bg-gray-900 flex rounded-xl text-base lg:text-lg  font-normal gap-1 m-2 p-6 text-white">
                <FaCartPlus size={20} /> Add to card
              </button>
              <h1 className=" text-xl lg:text-2xl font-bold">
                <span className="line-through">${(product.actual_price + sizePrice) * quantity}</span> <span className="font-semibold">${(product.actual_price - product.discout_price + sizePrice) * quantity}</span>

              </h1>
            </div>
          </div>
        </div>
        <div className="w-full">
          <section
            className={'relative my-14 sm:mt-24 sm:mb-32 w-full flex justify-center items-center'}>
            <div className={'relative flex flex-col justify-center items-center gap-y-4 z-10 w-4/5 sm:w-3/5'}>
              <h1 className={'text-2xl text-center sm:text-left sm:text-3xl font-semibold'}>Product Information</h1>
            </div>
            <div className={'absolute justify-center text-center w-full z-[-1]'}>
              <h1 className={'text-6xl xs:text-8xl sm:text-9xl text-gray-100 font-semibold tracking-tighter'}>
                Overview
              </h1>
            </div>
          </section>
          <div className={'flex flex-col items-center'}>
            <div
              className={'grid grid-cols-12 gap-5 sm:max-w-[80%] w-full justify-items-center border-t border-t-black pt-5 px-5'}>

              <div className={'col-span-12 sm:col-span-4 flex items-center justify-center sm:justify-start w-full'}>
                <label className={'uppercase text-gray-500 text-xl font-semibold'}>Product Details</label>
              </div>
              <div className={'col-span-12 sm:col-span-8'}>
                <PortableText
                  value={product.product_description}
                  components={components}

                />
              </div>

              <div className={'col-span-12 sm:col-span-4 flex items-center justify-between sm:justify-start w-full'}>
                <label className={'uppercase text-gray-500 text-xl font-semibold'}>Product Care</label>
              </div>
              <div className={'col-span-12 sm:col-span-8 w-full'}>
                <PortableText
                  value={product.product_care}
                  components={components}
                />
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />

      </main >
    ))
  )
}

const components = {
  list: {
    bullet: ({ children }: any) => <ul className="mt-xl list-disc list-inside text-left">{children}</ul>,
    number: ({ children }: any) => <ol className="mt-lg">{children}</ol>,

  },
  block: {
    h1: ({ children }: any) => <h1 className="text-2xl">{children}</h1>,
    blockquote: ({ children }: any) => <blockquote className="border-l-purple-500">{children}</blockquote>,
    normal: ({ children }: any) => <p className="text-gray-600 text-base -tracking-tighter text-justify leading-7 font-light">{children}</p>,

  },

}