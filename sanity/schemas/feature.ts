
const feature = {
    name: 'product_features',
    title: 'Product Features',
    type: 'document',
    fields: [
        {
            name: 'product_feature',
            title: "Feature Products",
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        { type: 'products' }
                    ]
                }
            ]
        },
    ]
}

export default feature