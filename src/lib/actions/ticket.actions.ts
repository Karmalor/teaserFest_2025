'use server'

import { db } from "@/db";
import { InsertTicket, SelectTicket, SelectWeekendPassType, tickets, weekendPassTypes } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export async function createTicket(
  ticketData: InsertTicket,
 ) {

  await db.insert(tickets).values(ticketData)
  
}

export async function updateTicket(id: SelectTicket['id'], formData: Partial<Omit<SelectTicket, 'id'>>) {
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

export async function getWeekendPassTypes(): Promise<
Array<{
 
}>
> 
 
{
  return (await db.query.weekendPassTypes.findMany(	{orderBy: [asc(weekendPassTypes.createdAt)],}
))
}