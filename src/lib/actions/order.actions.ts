'use server'

import Stripe from "stripe"
import {CreateOrderParams} from '@/types'
import {redirect} from 'next/navigation'
import { handleError } from "../utils"
import { applicationOrdersTable } from "@/db/schema"
import { db } from "@/db"

export const createOrder = async (order: CreateOrderParams) => {
    try {
        const newOrder = await db.insert(applicationOrdersTable).values(order)

        return JSON.parse(JSON.stringify(newOrder))
    } catch (error) {
        handleError(error)
    }
}

// export const createUser = async (user: CreateUserParams) => {
//     try {
//         const newUser = await db.insert(usersTable).values(user);

//         return JSON.parse(JSON.stringify(newUser))

//     } catch (error) {
//         handleError(error)
//     }
// }