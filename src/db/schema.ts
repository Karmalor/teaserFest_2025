import { pgTable, text, boolean, uuid, json, jsonb, date, integer } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  clerkId: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  username: text('username'),
  firstName: text('firstName'),
  lastName: text('lastName'),
  photo: text('imageUrl'),
  // orders: integer("orders").references(() => applicationOrders.id)
});

export  const formSubmissionsTable = pgTable('form_submissions', {
    uuid: uuid('uuid').primaryKey(),
    applicant: text('applicant').references(() => usersTable.clerkId),
    stageName: text('stageName'),
    tagline: text('tagline'),
    // imageUrl: text('photo'),
    applicantResponse: jsonb('applicantResponse').notNull(),
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

export const ticketOrdersTable = pgTable("ticket_orders", {
  stripeId: text('id').primaryKey(),
  amount: text('amount'),
  buyerId: text('buyerId').references(() => usersTable.clerkId),
  createdAt: date('createdAt'),
  
})

export const ticketTypesTable = pgTable("types", {
  uuid: uuid('id').primaryKey(),
  showcase: text('showcase').references(() => showcaseTable.title),
  tier: text('tier') ,
  price: text('price'),
  capacity: integer('capacity'),
})

export const showcaseTable = pgTable("showcase", {
  uuid: uuid('id').primaryKey(),
  title: text('title'),
  description: text('description'),
  location: text('location'),
  imageUrl: text('photo'),
  startDateTime: date('startDateTime'),
  endDateTime: date('endDateTime'),
  tickets: text('tickets'),
  url: text('url'),
  createdAt: date('createdAt')
})

export const ticketsTable = pgTable("showcase", {
  uuid: uuid('id').primaryKey(),
  tier: text('tier').references(() => ticketTypesTable.tier),
  showcase: text('showcase').references(() => ticketTypesTable.showcase),
  ticketHolder:  text('ticketHolder').references(() => usersTable.clerkId),
  isComp: boolean('isComp').default(false),
})


export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertFormSubmission = typeof formSubmissionsTable.$inferInsert;
export type SelectFormSubmission = typeof formSubmissionsTable.$inferSelect;

export type InsertApplicationOrder = typeof applicationOrdersTable.$inferInsert;
export type SelectApplicationOrder = typeof applicationOrdersTable.$inferSelect;