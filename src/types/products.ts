export type AllProduct = {
    product_slug: {
        current: string;
    };
    actual_price: number;
    discout_price: number;
    images_gallery: {
        asset: {
            url: string;
        };
    };
    product_tags:{
        tags_name: string;
    }
    product_name: string;
};