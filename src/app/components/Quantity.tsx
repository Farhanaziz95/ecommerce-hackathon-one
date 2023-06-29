'use client'

import { useState } from "react";

export default function test() {

    const [quantity, setQuantity] = useState(1);

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
    return (
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
    )
}