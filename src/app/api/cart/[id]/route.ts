import { NextRequest, NextResponse } from "next/server";
import { cartTable, db } from "@/util/drizzle";

import { eq } from "drizzle-orm";

export const DELETE = async (request: NextRequest, context:any) => {
    try {
        const { id } = context.params;
    
        const res = await db.delete(cartTable).where(eq(cartTable.id, id)).returning()
        return NextResponse.json(res);
    } catch (error) {
        console.log((error as { message: string }).message);
        return NextResponse.json({ msg: "something went wrong" });
    }

}