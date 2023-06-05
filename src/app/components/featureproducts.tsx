import { Product, ProductFeature } from "@/types/featureproduct";

import Image from "next/image";
import Link from "next/link";
import { client } from "@/util/createClient";

export default async function FeatureProduct() {
  const products_feature = await client.fetch(`
  *[_type == "product_features"]{
    product_feature[]->{
    images_gallery[0]{asset->{url}},
    product_name,
    product_slug{
      current
    },
    actual_price,
    discout_price,
  }
}`);

  return (
    <>
      <main className="py-8">
        <div className="flex flex-col justify-center items-center gap-y-3 my-5">
          <label className="uppercase font-semibold text-blue-600 text-sm">PRODUCTS</label>
          <h1 className="text-black font-semibold text-4xl">Check What We Have</h1>
        </div>
        <div className={'flex flex-wrap gap-5 pt-8 justify-around items-center'}>
          {products_feature.map((element: Product) => (
            element.product_feature.map((element1: ProductFeature) => (
              <Link href={'/product_detail/' + element1.product_slug.current} key={element1.product_slug.current} className={'flex flex-col items-center justify-center gap-y-3 hover:scale-125 transition-all duration-500'}>
                <Image src={element1.images_gallery.asset.url} width={300} height={300} alt={""} />
                <label className={'font-semibold'}>{element1.product_name}</label>
                <label><span className="text-md line-through">${element1.actual_price}</span> <span className="font-semibold">${element1.actual_price - element1.discout_price}</span></label>

                {/* <label className={'font-semibold'}>$ / </label> */}
              </Link>
            ))
          ))}
        </div>


      </main>
    </>
  );
}



