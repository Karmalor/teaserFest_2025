'use server'

import { toast } from "@/components/ui/use-toast"
import { db } from "@/db"
import { productsTable, ticketOrders, ticketTable, ticketTypesTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"
import { v4 } from "uuid"
import { z } from "zod"

// const fileSchema = z.instanceof(File, {message: "Required"})
// const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

 const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceInCents: z.coerce.number().int().min(1),
    // file: fileSchema.refine(file => file.size > 0, "Required"),
    // image: imageSchema.refine(file => file.size > 0, "Required")
})

export async function addTicket(prevState: unknown, formData: FormData) {
  
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    
    if(result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const data =  {
        ...result.data,
        id: v4(),
        createdAt: new Date()
    }

    await db.insert(ticketTypesTable).values(data)

    revalidatePath("/")
    revalidatePath("/schedule")
    revalidatePath("/showcases")
    redirect('/admin/tickets')
}

const editSchema = addSchema.extend({

})

export async function updateTicket(id:string , prevState: unknown, formData: FormData) {
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
    
    if(result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const data =  {
        ...result.data,
    }

    await db.update(ticketTypesTable).set(data).where(eq(ticketTypesTable.id, id))

    revalidatePath("/")
    revalidatePath("/schedule")
    revalidatePath("/showcases")
    redirect('/admin/tickets')
}

export async function toggleTicketAvailability(id: string, isAvailableForPurchase: boolean) {
    await db.update(ticketTypesTable)
    .set({isAvailableForPurchase: isAvailableForPurchase})
    .where(eq(ticketTypesTable.id, id))

    revalidatePath("/")
    revalidatePath("/schedule")
    revalidatePath("/showcases")
}

export async function deleteTicket(uuid: string) {
    const ticket = await db.delete(ticketTypesTable).where(eq(ticketTypesTable.id, uuid))
    
    if(ticket == null) return notFound()

    revalidatePath("/")
    revalidatePath("/schedule")
    revalidatePath("/showcases")
}