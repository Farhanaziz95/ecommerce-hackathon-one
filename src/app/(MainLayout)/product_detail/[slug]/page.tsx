'use client'

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { FaCartPlus } from 'react-icons/fa';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [products, setProduct] = useState<productDetails[]>()
  const [size, setSize] = useState('')
  const [sizePrice, setSizePrice] = useState(0)
  const [quantity, setQuantity] = useState(1);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const ImageElement: MutableRefObject<HTMLImageElement | null> = useRef(null);

  const { slug } = params

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getproductdetails(slug);
        setProduct(result);

        // setLoading(false);
      } catch (error) {
        console.log(error)
      }
    }

    

    fetchData()

    // return () => {
    //   // Cleanup code (if necessary)
    // };
  }, [slug]);

  // try {
  //   const products: productDetails[] = getproductdetails(slug);
  //   // Handle the products array here
  //   console.log(products);
  // } catch (error) {
  //   // Handle any errors that occur during the fetch or processing
  //   console.error(error);
  // }

  

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

  const handleaddcart = async (id: string, price: number,image:string,tag:string,itemname:string) => {
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
    toast.success("Successfully Added to Cart.")
    
  }


  const imagearray: any[] = []

  products?.map((product) => (
    product.images_gallery.map((image: any) => {
      imagearray.push(image.asset.url)
    })
  ))



  const handlesizevarient = (cprice: number, csize: string) => {
    console.log(cprice);
    console.log(csize);
    setSize(csize);
    setSizePrice(cprice);
    console.log(size);
    console.log(sizePrice);
  };

  const handlequentityPlus = () => {
    const changed = quantity + 1;
    setQuantity(changed);
    console.log(changed);
    console.log(quantity); // This may not show the updated value immediately
  };

  const handlequentityminus = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    } else {

    }
  };

  // fetchconfigs();

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


          {/*  Main Image*/}
          <div className={'col-span-9 md:col-span-5 flex items-center justify-center'}>
            <div>
              <img ref={ImageElement} id="changingPicture" src={imagearray[currentImageIndex]} alt={'Product Image'} height={600}
                width={600} />
            </div>
          </div>
          {/*Info*/}
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
            {/* <VariantSelector product={product} /> */}

            {/* <Quantity /> */}

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
            {/* <AddToCart product={products.result[0]} /> */}
            {/* <button onClick={() => {
                     if(!isLoaded || !userId) {
                      toast.error("You must signIn to perform to add products.")
                    }else {
                      // handleAddToCart(item._id , qty)
                      // onAdd(item,qty)
                    }
                  }}>check</button> */}
            <div className="flex flex-nowrap gap-2 items-center">
              <button onClick={() => {
                if (!isLoaded || !userId) {
                  toast.error("You must signIn to perform to add products.")
                } else if(size == ''){
                  toast.error("You must select size to perform to add products.")

                } else {
                  handleaddcart(product._id, product.actual_price - product.discout_price + sizePrice,imagearray[0],product.product_tags.tags_name,product.product_name)
                  // handleAddToCart(item._id , qty)
                  // onAdd(item,qty)
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
        <div>
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
              className={'grid grid-cols-12 gap-5 sm:max-w-[80%] justify-items-center border-t border-t-black pt-5 px-5'}>

              <div className={'col-span-12 sm:col-span-4 flex items-center justify-center sm:justify-start w-full'}>
                <label className={'uppercase text-gray-500 text-xl font-semibold'}>Product Details</label>
              </div>
              <div className={'col-span-12 sm:col-span-8'}>
                {/* <p className={'uppercase text-gray-500 text-md font-light text-justify'}>
                {products.result[0].productDetails}
              </p> */}
              </div>

              <div className={'col-span-12 sm:col-span-4 flex items-center justify-center sm:justify-start w-full'}>
                <label className={'uppercase text-gray-500 text-xl font-semibold'}>Product Care</label>
              </div>
              <div className={'col-span-12 sm:col-span-8 w-full'}>

                {/* <ul className={'list-disc text-gray-500 text-md ml-4'}>
                {
                  products.result[0].productCare.map((bullet: string, index: number) => {
                    return (
                      <li key={index}>
                        <div>
                          <label className={'block uppercase text-gray-500 text-md font-light w-full text-left'}>
                            {bullet}
                          </label>
                        </div>
                      </li>
                    )
                  })
                }
              </ul> */}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />

      </main>
    ))
  )
}

