import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { cartTable, db } from "@/util/drizzle";

import { auth } from '@clerk/nextjs';

// import { cookies } from "next/dist/client/components/headers";
// import { sql } from "@vercel/postgres";

// import { NextApiRequest, NextApiResponse } from 'next';


export const GET = async (request: NextRequest, response: NextResponse) => {
    try {
        const { userId } = auth();
        // It will create table if not exists
        //   await sql`
        //       CREATE TABLE IF NOT EXISTS cart( 
        //        id serial PRIMARY KEY , 
        //        user_id varchar(255)NOT NULL , 
        //        product_id varchar(255)NOT NULL, 
        //        quantity int NOT NULL 
        //         )
        //       `;
        // const user_id: string | any = cookies().get("user_id")?.value;
        // const res = await db.select().from(cartTable);
        const res = await db.select().from(cartTable).where(and(eq(cartTable.user_id, userId!),eq(cartTable.status,'Queue')));
        return NextResponse.json(res);
    } catch (error) {
        console.log((error as { message: string }).message);
        return NextResponse.json({ msg: "something went wrong" });
    }
};
export const POST = async (request: NextRequest) => {

    // body data passed from post req
    const req = await request.json();
    // const uid = uuid();
    // const setCookies = cookies();


    // const user_id = cookies().get("user_id")
    // if (!user_id) {
    //     setCookies.set("user_id", uid);
    // }
    try {
        if (req) {

            const existed = await db.select().from(cartTable).where(and(eq(cartTable.user_id, req.user_id), eq(cartTable.item_id, req.product_id),eq(cartTable.size,req.size)))
            let currentquentity = 0
            if (existed.length != 0) {
                existed.map((item) => {
                    currentquentity = item.quentity
                })
                const res = await db.update(cartTable)
                    .set({ quentity: currentquentity + req.quantity })
                    .where(and(eq(cartTable.user_id, req.user_id), eq(cartTable.item_id, req.product_id)))
                    .returning({ updatedId: cartTable.quentity });
                return NextResponse.json({ msg: "data added seccussfully", result: res })

            }
            else {
                const res = await db.insert(cartTable).values({
                    item_id: req.product_id,
                    item_name: req.product_name,
                    item_image: req.product_image,
                    item_tag: req.product_tag,
                    user_id: req.user_id,
                    quentity: req.quantity,
                    price: req.price,
                    size: req.size,
                }).returning()
                return NextResponse.json({ msg: "data added seccussfully", result: res })

            }

            return NextResponse.json({ msg: "data added seccussfully", result: existed })
        } else {
            throw new Error("Task field is required")
        }
    } catch (error) {
        return NextResponse.json({ message: (error as { message: string }).message })
    }
}
// export const DELETE = async (request: NextRequest) => {
//     try {
//         const user_id: string | any = cookies().get("user_id")?.value;
//         // const res = await db.select().from(cartTable);
//         const res = await db.delete(cartTable).where(eq(cartTable.user_id, user_id)).returning()
//         return NextResponse.json(res);
//     } catch (error) {
//         console.log((error as { message: string }).message);
//         return NextResponse.json({ msg: "something went wrong" });
//     }

// }