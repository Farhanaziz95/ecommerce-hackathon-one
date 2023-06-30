import { AllProduct } from "@/types/products";

import Image from "next/image";
import Link from "next/link";
import { client } from "@/util/createClient";

export default async function AllProduct() {

    const products = await client.fetch(`
    *[_type == "products"]{
        images_gallery[0]{asset->{url}},
        product_name,
        product_slug{
          current
        },
      product_tags->{
        tags_name
      },
        actual_price,
        discout_price,
    }`);


    return (
        <>
            <div className={'container flex min-h-screen flex-col items-center justify-between my-16'}>
                <div className={'flex flex-row justify-around gap-x-3 gap-y-7 flex-wrap w-full'}>

                    {
                        products.map((element1: AllProduct) => (
                            <Link href={'/product_detail/' + element1.product_slug.current} key={element1.product_slug.current} className={'cursor-pointer min-w-md flex flex-col gap-2 hover:scale-110 transition-all duration-300'}>
                                <Image src={element1.images_gallery.asset.url} width={250} height={250} alt={""} />
                                <h2 className={'font-semibold text-xl'}>{element1.product_name}</h2>
                                <label className={'font-semibold text-lg text-gray-500'}>{element1.product_tags.tags_name}</label>
                                <label className={'font-semibold text-2xl'}>{element1.discout_price != 0 ?<span className="text-2xl line-through">${element1.actual_price}</span>:''} ${element1.actual_price - element1.discout_price}</label>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}