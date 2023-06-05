const product = {
    name: 'products',
    title: 'Products',
    type: 'document',
    fields: [
        {
            name: 'images_gallery',
            title: 'Images Gallery',
            type: 'array',
            of: [{ type: 'image' }]
        },
        {
            title: 'Product Name',
            name: 'product_name',
            type: 'string',
        },
        {
            title: 'Product Slug',
            name: "product_slug",
            type: 'slug',
            options: {
                source: 'product_name',
                maxLength: 200, // will be ignored if slugify is set
                slugify: (input: string) => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 200)
            }
        },
        // {
        //     title: '',
        //     name:'',
        //     type:'',
        // },
        {
            title: 'Actual Price',
            name: 'actual_price',
            type: 'number',
        },
        {
            title: 'Discout Price',
            name: 'discout_price',
            type: 'number',
            description: 'Put the deductable amount'
        },
        {
            name: 'product_varients',
            title: "Product Varients",
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        { type: 'product_varients' }
                    ]
                }
            ]
        },

        {
            title: 'Product Category',
            name: 'product_category',
            type: 'reference',
            to: [{ type: 'product_category' }]
        },
        {
            title: 'Product Tags',
            name: 'product_tags',
            type: 'reference',
            to: [{ type: 'product_tags' }]
        },
        {
            title: 'Product Description',
            name: 'product_description',
            type: 'array',
            of: [{ type: 'block' }]
        },
        {
            title: 'Product Care',
            name: 'product_care',
            type: 'array',
            of: [{ type: 'block' }]
        }

    ],
    initialValue: {
        discout_price: 0
    }
}

export default product