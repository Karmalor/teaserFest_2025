'use server'

import { db } from "@/db";
import { formSubmissionsTable, InsertFormSubmission } from "@/db/schema";



export async function createFormSubmission(
    formData2: InsertFormSubmission,
   ) {

    await db.insert(formSubmissionsTable).values(formData2)
    
  }