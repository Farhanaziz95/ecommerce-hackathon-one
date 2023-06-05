const varients = {
    name: 'product_varients',
    title: 'Product Varients',
    type: 'document',
    fields: [
        {
            name: 'varient_name',
            title: "Varients Name",
            type: 'string'
        },
        {
            name: 'varient_options',
            title: "Varients Options",
            type: 'array',
            of: [{type: 'string'}]
        },
        {
            name: 'varient_price',
            title: "Varients Price",
            type: 'array',
            of: [{type: 'number'}],
            description:'Put Additional Amount Only in varient option vise'
        },
    ]
}

export default varients