import{date, decimal, integer, pgTable, serial, timestamp, varchar} from 'drizzle-orm/pg-core'

import { InferModel } from 'drizzle-orm'
import {drizzle} from 'drizzle-orm/vercel-postgres'
import {sql} from '@vercel/postgres'

export const cartTable = pgTable("cart",{
    id: serial("id").primaryKey(),
    user_id: varchar("user_id",{length:255}).notNull(),
    item_id: varchar("item_id",{length:255}).notNull(),
    item_name:varchar("item_name",{length:255}).notNull(),
    item_image:varchar("item_image",{length:255}).notNull(),
    item_tag:varchar("item_tag",{length:50}).notNull(),
    status: varchar("status",{length:255}).notNull().default('Queue'),
    quentity: integer("quentity").notNull(),
    price: integer("price").notNull(),
    size: varchar("size",{length:255}).notNull(),
    created_on:timestamp('created_on').defaultNow(),
})

export type Cart=InferModel<typeof cartTable>
export const db = drizzle(sql); 