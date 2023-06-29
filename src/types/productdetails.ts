import { PortableTextBlock } from "sanity"

export type productDetails = {

    product_care: PortableTextBlock[];
    product_description: PortableTextBlock[];
    actual_price: number;
    discout_price: number;
    product_tags: {
        tags_name: string;
    }
    product_category: {
        category_name: string;
    }
    product_name: string;
    _id: string;
    images_gallery: [
        value: {
            asset: {
                url: string;
            }
        }
    ];
    product_varients: [
        {
            varient_price: [];
            varient_name: string;
            varient_options: [];
        }
    ]
}

export type ImageGallery = {
    value: {
        url: string;
    };
};
