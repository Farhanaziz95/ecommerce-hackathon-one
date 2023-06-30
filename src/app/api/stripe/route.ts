import { Cart, cartTable, db } from '@/util/drizzle';
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
});

export const POST = async (request: NextRequest) => {
    const { data } = await request.json();

    let userid = '';
    try {
        const lineItems = data?.map((item: Cart) => {
            userid = item.user_id
            // userid = item.item_id
            const img = item.item_image;
            const newImage = img.replace('image-', 'https://cdn.sanity.io/images/dow10h3v/production/').replace('-png', '.png');

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.item_name,
                        images: [newImage],
                    },
                    //multiply by 100 is so if a unit price is 3650 it will show $36.50 not $3650
                    unit_amount: item.price * 100,
                },
                quantity: item.quentity,
            };
        });

        const params: Stripe.Checkout.SessionCreateParams = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            success_url: `${request.headers.get('origin')}/Cart`,
            cancel_url: `${request.headers.get('origin')}/`,
            line_items: lineItems,
        };

        const stringSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);
        
        const res = await db.update(cartTable)
                    .set({ status: stringSession.id })
                    .where(eq(cartTable.user_id, userid))
                    
        return NextResponse.json(stringSession)

    } catch (error) {
        return NextResponse.json({ message: (error as { message: string }).message })
    }
}