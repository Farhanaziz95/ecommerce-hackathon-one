'use client'

import { useEffect, useState } from 'react';
import { Cart } from "@/util/drizzle";
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineShopping } from 'react-icons/ai'
import { urlFor } from '@/util/createClient';
import { toast } from 'react-toastify';
import { useUser } from '@clerk/nextjs';
import getStripe from '@/util/stripe'

export default function Cart() {
    const [data, setData] = useState<Cart[]>([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQty, setTotalQty] = useState(0)
    const [loading, setLoading] = useState(false)
    const { isLoaded, isSignedIn, user } = useUser();


    useEffect(() => {
        const fetchCart = async () => {
            const response = await fetch('/api/cart', { method: 'GET' });
            const CartItems = await response.json();
            // console.log(CartItems)
            setData(CartItems);

            calculateTotal()
            setLoading(!loading)
        };
        fetchCart();

    }, []);

    useEffect(() => {
        calculateTotal();
    }, [data])


    const handleDeleteItem = async (itemId: number) => {
        try {
            // Make an API request to delete the item from the cart
            await fetch(`/api/cart/${itemId}`, { method: 'DELETE' });

            // Update the state by removing the deleted item
            setData(prevData => prevData.filter(item => item.id !== itemId));

            toast.success('Item removed from cart successfully!');

        } catch (error) {
            console.error('Error deleting item from cart:', error);
            toast.error('Failed to remove item from cart.');
        }
        // ButtonElement.current?.click()
    };

    const handleplus = (id: number) => {
        data.map((item) => {
            if (item.id == id) {

                return item.quentity = item.quentity + 1

            }
        })
        calculateTotal()
    }
    const handleminus = (id: number) => {
        data.map((item) => {
            if (item.id == id && item.quentity != 1) {

                return item.quentity = item.quentity - 1

            }
        })
        calculateTotal()
    }
    const calculateTotal = async () => {
        let tempprice = 0
        let tempqty = 0
        data.map((item) => {
            tempprice += item.price * item.quentity
            tempqty += item.quentity

            console.log(item.price * item.quentity)
            console.log(item.quentity)
        })
        setTotalPrice(tempprice)
        setTotalQty(tempqty)
        console.log(totalPrice)
        console.log(totalQty)

    }


    const handlePayNow = async () => {
        const stripe = await getStripe()
        // const stripedata = JSON.parse(data)
        try {
            const response = await fetch('/api/stripe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: data }),
            });

            //   console.log('json stringify data',JSON.stringify(data))
            if (response.status === 500) return

            const res = await response.json();
            console.log("res data of stripe ", res.id)
            toast.loading('Redirecting...')

            stripe?.redirectToCheckout({ sessionId: res.id })

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className='  md:p-12 justify-center items-center mx-auto '>
            {/* <button ref={ButtonElement} id='hiddenbutton' onClick={()=>{calculateTotal()}}></button> */}
            {/* name */}
            <div className="flex flex-row md:flex-col justify-between  ">
                <h2 className='text-3xl md:text-left text-center  font-bold text-primary '>Shopping Cart</h2>
            </div>


            <div className=" mx-auto flex justify-center gap-4 p-8 lg:flex-row flex-col ">
                <div className="  mt-8 ">

                    {/* {cartItems.length < 1 && ( */}
                    {data.length < 1 &&  (
                        loading ?
                        <div className="flex flex-col items-center mx-auto ">
                            <AiOutlineShopping size={150} />
                            <h1 className='text-3xl lg:text-2xl md:text-xl font-bold text-primary '>Your shopping bag is empty.</h1>
                        </div>:
                        <div className="flex flex-col items-center mx-auto">
                        {/* Skeleton Loading */}
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="bg-gray-300 h-40 w-40 mb-4 rounded-full"></div>
                            <div className="bg-gray-300 h-8 w-80 mb-2 rounded"></div>
                            {/* <div className="bg-gray-300 h-6 w-40 mb-2 rounded"></div>
                            <div className="bg-gray-300 h-6 w-40 mb-2 rounded"></div> */}
                        </div>
                    </div>
                    )
                    }

                    {
                        data.length >= 1 && data.map((item) => (
                            // item card
                            <div className="   flex flex-wrap items-center " key={item.id}>
                                {/* item image // w-full  md:w-[80%] h-[20%]  */}
                                <div className=" my-4 w-full md:w-[40%] h-[20%]">
                                    <img src={urlFor(item.item_image).url()} alt={item.item_name} />
                                </div>
                                {/* item details */}
                                <div className=" justify-around my-[20px] md:my-0 ml-auto w-full md:w-[50%]  ">
                                    {/* name and remove  icon */}
                                    <div className="flex  gap-4 md:justify-evenly ">
                                        <h3 className=' text-xl md:text-2xl lg:text-3xl  text-primary  '> {item.item_name} <span className='text-md md:text-xl lg:text-2xl text-gray-700'>({item.size})</span> </h3>
                                        <button type='button' className='ml-auto hover:text-red-500' onClick={() => {
                                            if (!isLoaded || !isSignedIn) {
                                                toast.error("You cannot proceed to checkout untill you login.")
                                            } else {
                                                // onRemove(item);
                                                handleDeleteItem(item.id)
                                            }
                                        }}>
                                            <HiOutlineTrash size={28} />
                                        </button>
                                    </div>
                                    {/* item tags */}
                                    <h2 className=" text-2xl font-semibold opacity-30">
                                        {item.item_tag}
                                    </h2>
                                    {/* delivery estiumation */}
                                    <p className=' text-[#212121] font-semibold text-xl '>Delivery Estimation</p>
                                    {/* item delivery time */}
                                    <p className=' text-yellow-500 font-semibold text-xl '>5 Working Days</p>
                                    {/* item price */}
                                    <div className="flex justify-items-center  ">
                                        <span className=" text-xl lg:text-2xl font-bold">
                                            ${item.price * item.quentity}
                                        </span>
                                        {/* plus and minus btn */}
                                        <div className="flex ml-auto gap-4 items-center text-center ">
                                            {/* <div className="btn2" onClick={() => toggleCartItemQuantity(item._id, "dec")}>-</div> */}
                                            <button className="btn2" onClick={() => { handleminus(item.id) }}>-</button>
                                            <p>{item.quentity}</p>
                                            <button className="btn3" onClick={() => { handleplus(item.id) }}>+</button>
                                            {/* <div className="btn3" onClick={() => toggleCartItemQuantity(item._id, 'inc')}>+</div> */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    data.length >= 1 && (
                        <div className="mt-2 md:w-[40%] w-full border-[1px] max-h-[360px] bg-white/60 border-yellow-500 shadow-sm shadow-primary p-4 flex-grow space-y-6 mx-auto text-center text-black max-w-full lg:max-w-sm  ">
                            <h1 className="py-6 text-2xl font-bold text-black">Order Details</h1>
                            <div className="text-sm  space-y-6  divide-yellow-500 text-black">
                                <div className=" border-b-[1px] pb-1 border-b-orange flex px-2 justify-between m-2  ">
                                    <p className='text-sm'> All  price </p>
                                    <h3> ${totalPrice}  </h3>
                                </div>
                                <div className=" border-b-[1px] pb-1 border-b-orange flex px-2 justify-between m-2  ">
                                    <p className='text-sm'> Total Products </p>
                                    {/* <h3> {totalQty}  </h3> */}
                                    <h3> {totalQty} </h3>
                                </div>
                                <div className=" border-b-[1px] pb-1 border-b-orange flex px-2 justify-between m-2  ">
                                    <p>Tax</p>
                                    <h3>${0}</h3>
                                </div>
                                <div className=" border-b-[1px] pb-1 border-b-orange flex px-2 justify-between m-2  ">
                                    <p>Total</p>
                                    <h3> ${totalPrice}  </h3>
                                </div>
                            </div>
                            <div className=" text-end mx-auto items-center justify-center justify-items-center text-white font-sans  ">
                                <button type="button" onClick={() => {
                                    // calculateTotal()
                                    handlePayNow();
                                    // handleDeleteNow();
                                }} className="hbtn mx-auto justify-end px-5 py-[2px] rounded-[4px] w-full bg-gray-900  ">
                                    PROCEED TO CHECKOUT
                                </button>
                            </div>
                        </div>
                    )


                }
            </div>
        </div>
    )
}

function MyButton(currentcount: number) {
    const [count, setCount] = useState(currentcount);

    function handleadd() {
        setCount(count + 1);

    }

    function handlesub() {
        setCount(count - 1);
    }

    return (
        <>
            <div className="btn2" onClick={handlesub}>-</div>
            <p>{count}</p>
            <div className="btn3" onClick={handleadd}>+</div>
        </>
    );
}