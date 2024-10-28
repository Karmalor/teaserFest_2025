import { pgTable, text, boolean, uuid, json, jsonb, date, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { array } from 'zod';

export const rolesEnum = pgEnum("role", ["user", "admin"]);

export const usersTable = pgTable('users_table', {
  clerkId: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  username: text('username'),
  firstName: text('firstName'),
  lastName: text('lastName'),
  photo: text('imageUrl'),
  role: rolesEnum('role').default("user"),
  // orders: integer("orders").references(() => applicationOrders.id)
});

export  const formSubmissionsTable = pgTable('form_submissions', {
    uuid: uuid('uuid').primaryKey(),
    applicant: text('applicant').references(() => usersTable.clerkId),
    stageName: text('stageName'),
    tagline: text('tagline'),
    applicantResponse: jsonb('applicantResponse').default({}),
    applicationSubmitted: boolean('applicationSubmitted').default(false),
    submittedAt: date('submittedAt'),
    createdAt: date('createdAt')
}) 

export const applicationOrdersTable = pgTable("application_orders", {
  stripeId: text('id').primaryKey(),
  amount: text('amount'),
  buyerId: text('buyerId').references(() => usersTable.clerkId),
  createdAt: date('createdAt')
})

// export const ticketOrdersTable = pgTable("ticket_orders", {
//   stripeId: text('id').primaryKey(),
//   amount: text('amount'),
//   buyerId: text('buyerId').references(() => usersTable.clerkId),
//   createdAt: date('createdAt'),
  
// })

export const ticketTypesTable = pgTable("ticketTypes", {
  id: uuid('id').primaryKey(),
  name: text('name').unique(),
  // showcase: text('showcase').references(() => showcaseTable.title),
  // tier: text('tier') ,
  priceInCents: integer('priceInCents').notNull(),
  // capacity: integer('capacity'),
  description: text('description'),
  isAvailableForPurchase: boolean('isAvailableForPurchase').default(true),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdate(()=> new Date()),
  showcase: uuid('showcase').references(() => showcaseTable.uuid)
})

export const showcaseTable = pgTable("showcase", {
  uuid: uuid('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  location: text('location'),
  imageUrl: text('photo'),
  startDateTime: timestamp('startDateTime'),
  endDateTime: timestamp('endDateTime'),
  // tickets: text('tickets'),
  url: text('url'),
  createdAt: timestamp('createdAt')
})

export const ticketTable = pgTable("tickets", {
  uuid: uuid('id').primaryKey(),
  // tier: text('tier').references(() => ticketTypesTable.tier, { onDelete: 'cascade' }),
  // showcase: text('showcase').references(() => ticketTypesTable.showcase),
  ticketHolder:  text('ticketHolder').references(() => usersTable.clerkId),
  isComp: boolean('isComp').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  orderId: text('orderId').references(() => ticketOrders.uuid)
})

export const productsTable = pgTable("products", {
  uuid: uuid('id').primaryKey(),
  name: text('name'),
  priceInCents: integer('priceInCents'),
  // filePath: text('filePath'),
  // imageUrl: text('imageUrl'),
  description: text('description'),
  isAvailableForPurchase: boolean('isAvailableForPurchase').default(true),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdate(()=> new Date()),
  // orders: text('orders').array().references(()=> ticketOrders.uuid)
})

export const ticketOrders = pgTable('ticket_orders', {
  uuid: uuid('id').primaryKey(),
  pricePaidInCents: integer('pricePaidInCents'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdate(()=> new Date()),
  buyer: text('buyer').references(() => usersTable.clerkId),
  productId: text('productId').references(() => productsTable.uuid)
})

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertFormSubmission = typeof formSubmissionsTable.$inferInsert;
export type SelectFormSubmission = typeof formSubmissionsTable.$inferSelect;

export type InsertApplicationOrder = typeof applicationOrdersTable.$inferInsert;
export type SelectApplicationOrder = typeof applicationOrdersTable.$inferSelect;

export type InsertTicketOrders = typeof ticketOrders.$inferInsert;
export type SelectTicketOrders = typeof ticketOrders.$inferSelect;

export type InsertTicketTypes = typeof ticketTypesTable.$inferInsert;
export type SelectTicketTypes = typeof ticketTypesTable.$inferSelect;

export type InsertShowcase= typeof showcaseTable.$inferInsert;
export type SelectShowcase= typeof showcaseTable.$inferSelect;