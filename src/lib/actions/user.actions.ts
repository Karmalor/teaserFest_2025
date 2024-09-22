'use server'

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import { db } from "@/db";
import { SelectUser, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await db.insert(usersTable).values(user);

        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        handleError(error)
    }
}

 export const updateUser = async (id: SelectUser['clerkId'], user: UpdateUserParams) => {
    try {
        const updatedUser = await db.update(usersTable).set(user).where(eq(usersTable.clerkId, id));

        if (!updatedUser) throw new Error("User update failed");
        return JSON.parse(JSON.stringify(updatedUser))
    } catch (error) {
        handleError(error)
    }

    
 }

 export const deleteUser = async (id: SelectUser['clerkId']) => {
    await db.delete(usersTable).where(eq(usersTable.clerkId, id));

 }

//  export async function updateUser(id: SelectUser['clerkId'], user: Partial<Omit<SelectUser, 'clerkId'>>) {
//     await db.update(usersTable).set(user).where(eq(usersTable.clerkId, id));
//   }


