import ImageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "5nk4irff",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);

export async function fetchCategories() {
  const response = await client.fetch(`
    *[_type == "product_category"]{
      _id,
      category_name
    }
  `);
  return response;
}