'use server'

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const createUser = async (user: any) => {
    try {
        const newUser = await db.insert(usersTable).values(user);

        return JSON.parse(JSON.stringify(newUser))

    } catch (error) {
        handleError(error)
    }
}
