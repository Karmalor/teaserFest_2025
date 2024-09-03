'use server'

import { db } from "@/db";
import { formSubmissionsTable, InsertFormSubmission, SelectFormSubmission } from "@/db/schema";
import { eq } from "drizzle-orm";



export async function createFormSubmission(
    formData: InsertFormSubmission,
   ) {

    await db.insert(formSubmissionsTable).values(formData)
    
  }

export async function updateFormSubmission(id: SelectFormSubmission['uuid'], formData: Partial<Omit<SelectFormSubmission, 'uuid'>>) {
  await db.update(formSubmissionsTable).set(formData).where(eq(formSubmissionsTable.uuid, id));
}

export async function getFormSubmissionById(uuid: SelectFormSubmission['uuid']): Promise<
  Array<{
   
  }>
> {
  
  return db.select().from(formSubmissionsTable).where(eq(formSubmissionsTable.uuid, uuid))

}