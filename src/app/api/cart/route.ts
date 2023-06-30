import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { cartTable, db } from "@/util/drizzle";

import { auth } from '@clerk/nextjs';

export const GET = async (request: NextRequest, response: NextResponse) => {
    try {
        const { userId } = auth();
        
        const res = await db.select().from(cartTable).where(and(eq(cartTable.user_id, userId!),eq(cartTable.status,'Queue')));
        return NextResponse.json(res);
    } catch (error) {
        console.log((error as { message: string }).message);
        return NextResponse.json({ msg: "something went wrong" });
    }
};
export const POST = async (request: NextRequest) => {

    const req = await request.json();
    
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
                return NextResponse.json({ msg: "data added seccussfully", result: res , code: 206})

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
                return NextResponse.json({ msg: "data added seccussfully", result: res , code:200})

            }
        } else {
            throw new Error("Task field is required")
        }
    } catch (error) {
        return NextResponse.json({ message: (error as { message: string }).message , code: 400 })
    }
}