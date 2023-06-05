export default function slugProduct({ params }: { params: { slug: string } }){
    const {slug} = params
    // console.log(slug)
    return(
        <p>this is all {slug} product page</p>
    )
}

