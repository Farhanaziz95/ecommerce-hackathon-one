export type Product = {
    product_feature: ProductFeature[];
};

export type ProductFeature = {
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
    product_name: string;
};

export type featureproduct = Product[];