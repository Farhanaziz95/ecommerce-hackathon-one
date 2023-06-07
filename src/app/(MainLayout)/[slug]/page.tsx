import { AllProduct } from "@/types/products";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/util/createClient";

export default async function slugProduct({ params }: { params: { slug: string } }){
    const {slug} = params
    // console.log(slug)
    const products = await client.fetch(`
    *[_type == "products" && product_category._ref in *[_type=="product_category" && category_name=="${slug}"]._id]{
        images_gallery[0]{asset->{url}},
        product_name,
        product_slug{
          current
        },
      product_tags->{
        tags_name
      },
        product_category->{
        category_name
      },
        actual_price,
        discout_price,
    }`);
    return(
        <>
        <div className={'container flex min-h-screen flex-col items-center justify-between my-16'}>
            <div className={'flex flex-row justify-around gap-x-3 gap-y-7 flex-wrap w-full'}>

                {
                    products.map((element1: AllProduct) => (
                        <Link href={'/product_detail/' + element1.product_slug.current} key={element1.product_slug.current} className={'cursor-pointer min-w-md flex flex-col gap-2 hover:scale-110 transition-all duration-300'}>
                            <Image src={element1.images_gallery.asset.url} width={250} height={250} alt={""} />
                            {/* <label className={'font-semibold'}>{element1.product_name}</label>
                            <label><span className="text-md line-through">${element1.actual_price}</span> <span className="font-semibold">${element1.actual_price - element1.discout_price}</span></label> */}
                            <h2 className={'font-semibold text-xl'}>{element1.product_name}</h2>
                            <label className={'font-semibold text-lg text-gray-500'}>{element1.product_tags.tags_name}</label>
                            <label className={'font-semibold text-2xl'}><span className="text-2xl line-through">${element1.discout_price}</span> ${element1.actual_price - element1.discout_price}</label>
                            {/* <label className={'font-semibold'}>$ / </label> */}
                        </Link>
                    ))
                }
            </div>
        </div>
    </>
    )
}

