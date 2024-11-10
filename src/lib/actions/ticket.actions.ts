'use server'

import { db } from "@/db";
import { InsertTicket, SelectTicket, tickets } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createFormSubmission(
  ticketData: InsertTicket,
 ) {

  await db.insert(tickets).values(ticketData)
  
}

export async function updateFormSubmission(id: SelectTicket['id'], formData: Partial<Omit<SelectTicket, 'id'>>) {
await db.update(tickets).set(formData).where(eq(tickets.id, id));
}

export async function getTicketById(id: SelectTicket['id']): Promise<SelectTicket | undefined> 
 
{
  return db.query.tickets.findFirst({where: eq(tickets.id, id)})
}

export async function getTicketByUser(userEmail: SelectTicket['ticketHolder']): Promise<
Array<{
 
}>
> 
 
{
  return db.query.tickets.findMany({where: eq(tickets.ticketHolder, userEmail as string)})
}