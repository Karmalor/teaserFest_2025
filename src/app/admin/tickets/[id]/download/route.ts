import { db } from "@/db";
import { ticketTypesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";
import fs from 'fs/promises'

export async function GET(req: NextRequest, { params: {id}}: {params: {id:string}}) {
    const ticket = await db.select({name: ticketTypesTable.name}).from(ticketTypesTable).where(eq(ticketTypesTable.id, id))

    if (ticket == null) return notFound()

        const {size}= await fs.stat(ticket.name)
}