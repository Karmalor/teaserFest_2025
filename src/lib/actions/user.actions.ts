'use server'

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import { db } from "@/db";
import { SelectUser, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await db.insert(users).values(user);

        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        handleError(error)
    }
}

 export const updateUser = async (id: SelectUser['clerkId'], user: UpdateUserParams) => {
    try {
        const updatedUser = await db.update(users).set(user).where(eq(users.clerkId, id));

        if (!updatedUser) throw new Error("User update failed");
        return JSON.parse(JSON.stringify(updatedUser))
    } catch (error) {
        handleError(error)
    }

    
 }

 export const deleteUser = async (id: SelectUser['clerkId']) => {
    await db.delete(users).where(eq(users.clerkId, id));

 }

//  export async function updateUser(id: SelectUser['clerkId'], user: Partial<Omit<SelectUser, 'clerkId'>>) {
//     await db.update(users).set(user).where(eq(users.clerkId, id));
//   }


