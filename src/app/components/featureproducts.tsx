import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactPortal } from "react";

import { createClient } from "next-sanity";

const client = createClient({
    projectId: "5nk4irff",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false
  });


  export default function FeatureProduct({ products }:any) {
    return (
      <>
        <header>
          <h1>Sanity + Next.js</h1>
        </header>
        <main>
          <h2>pets</h2>
          {/* {products.length > 0 && (
            <ul>
              {products.map((product: { _id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => (
                <li key={product._id}>{product?.name}</li>
              ))}
            </ul>
          )}
          {!(products.length > 0) && <p>No products to show</p>}
          {products.length > 0 && (
            <div>
              <pre>{JSON.stringify(products, null, 2)}</pre>
            </div>
          )}
          {!(products.length > 0) && (
            <div>
              <div>¯\_(ツ)_/¯</div>
              <p>
                Your data will show up here when you've configured everything
                correctly
              </p>
            </div>
          )} */}
          <div>
              <pre>{JSON.stringify(products, null, 2)}</pre>
            </div>
        </main>
      </>
    );
  }





  export async function getStaticProps() {
    const products = await client.fetch(`*[_type == "Products"]`);
  
    return {
      props: {
        products
      }
    };
  }