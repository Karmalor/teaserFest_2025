'use server'

import { db } from "@/db";
import { formSubmissions, InsertFormSubmission, SelectFormSubmission, SelectTicket, tickets } from "@/db/schema";
import { eq } from "drizzle-orm";



export async function createFormSubmission(
    formData: InsertFormSubmission,
   ) {

    await db.insert(formSubmissions).values(formData)
    
  }

export async function updateFormSubmission(id: SelectFormSubmission['id'], formData: Partial<Omit<SelectFormSubmission, 'id'>>) {
  await db.update(formSubmissions).set(formData).where(eq(formSubmissions.id, id));
}

export async function getFormSubmissionById(id: SelectFormSubmission['id']): Promise<
  Array<{
   
  }>
> {
  
  return db.select().from(formSubmissions).where(eq(formSubmissions.id, id))

}

