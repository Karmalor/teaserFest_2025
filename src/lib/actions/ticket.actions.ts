'use server'

import { db } from "@/db";
import { SelectTicket, tickets } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function getTicketById(id: SelectTicket['id']): Promise<SelectTicket | undefined> 
 
{
  return db.query.tickets.findFirst({where: eq(tickets.id, id)})
}