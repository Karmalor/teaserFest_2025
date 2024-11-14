import { relations } from 'drizzle-orm';
import { pgTable, text, boolean, uuid, json, jsonb, date, integer, timestamp, pgEnum, time, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { array } from 'zod';

export const UserRole = pgEnum("userRole", ["user", "admin"]);

export const users = pgTable('users', {
  clerkId: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  username: text('username'),
  firstName: text('firstName'),
  lastName: text('lastName'),
  photo: text('imageUrl'),
  role: UserRole('userRole').default("user"),
  // orders: integer("orders").references(() => applicationOrders.id)
}, table => {
  return{  emailIndex: uniqueIndex("emailIndex").on(table.email)
  }
});

export const attendees = pgTable('attendees', {
  email: text('email').notNull().unique(),
  firstName: text('firstName'),
  lastName: text('lastName'),
});

export  const formSubmissions = pgTable('form_submissions', {
    id: uuid('uuid').primaryKey(),
    applicant: text('applicant').references(() => users.clerkId),
    stageName: text('stageName'),
    tagline: text('tagline'),
    applicantResponse: jsonb('applicantResponse').default({}),
    applicationSubmitted: boolean('applicationSubmitted').default(false),
    submittedAt: date('submittedAt'),
    createdAt: date('createdAt')
}) 

export const applicationOrders = pgTable("application_orders", {
  stripeId: text('id').primaryKey(),
  amount: text('amount'),
  buyerId: text('buyerId').references(() => users.clerkId),
  createdAt: date('createdAt')
})

export const ticketOrdersTable = pgTable("ticket_orders", {
  stripeId: text('id').primaryKey(),
  amount: text('amount'),
  tickets: uuid('tickets'),
  qty: integer('qty'),
  buyerId: uuid('buyerId'),
  createdAt: date('createdAt'),
})

export const ticketTypes = pgTable("ticket_types", {
  id: uuid('id').primaryKey(),
  name: text('name').unique(),
  showcase: text('showcase'),
  priceInCents: integer('priceInCents').notNull(),
  capacity: integer('capacity'),
  description: text('description'),
  isAvailableForPurchase: boolean('isAvailableForPurchase').default(true),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdate(()=> new Date()),
})

export const showcases = pgTable("showcases", {
  id: uuid('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  location: text('location'),
  imageUrl: text('photo'),
  startDate: date('startDate'),
  endDate: date('endDate'),
  startTime: time('startTime'),
  endTime: time('endTime'),
  ticketTypes: uuid('ticketTypes'),
  tickets: uuid('tickets'),
  attendees: uuid('attendees'),
  url: text('url'),
  createdAt: timestamp('createdAt').defaultNow(),
})

export const tickets = pgTable("tickets", {
  id: uuid('id').primaryKey(),
  ticketType: text('ticketType'),
  ticketHolder:  text('ticketHolder'),
  isComp: boolean('isComp').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  firstName: text('firstName'),
  lastName: text('lastName'),
  isCheckedIn: boolean('isCheckedIn')
})

export const weekendPassTypes = pgTable("weekend_pass_types", {
  id: uuid('id').primaryKey(),
  name: text('name').unique(),
  priceInCents: integer('priceInCents').notNull(),
  capacity: integer('capacity'),
  description: text('description'),
  isAvailableForPurchase: boolean('isAvailableForPurchase').default(true),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdate(()=> new Date()),
  showcase: uuid('showcase'),
  content: text('content').array(),
  imgUrl: text("imgUrl").default("https://utfs.io/f/DUm6U8TUOYo64BRqfKidBVXmUF3OwH08zeWxkvjfTsuiDtC1")
})

export const weekendPasses = pgTable("weekend_passes", {
  id: uuid('id').primaryKey(),
  // tier: text('tier').references(() => ticketTypesTable.tier, { onDelete: 'cascade' }),
  // showcase: text('showcase').references(() => ticketTypesTable.showcase),
  ticketHolder:  text('ticketHolder').references(() => attendees.email),
  isComp: boolean('isComp').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  // orderId: text('orderId').references(() => ticketOrders.id)
})

export const products = pgTable("products", {
  id: uuid('id').primaryKey(),
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
  id: uuid('id').primaryKey(),
  pricePaidInCents: integer('pricePaidInCents'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdate(()=> new Date()),
  buyer: text('buyer').references(() => users.clerkId),
  productId: text('productId').references(() => products.id)
})

// Relations

export const usersRelations = relations(attendees, ({many}) => ({
  tickets: many(tickets)
}))

export const ticketRelations = relations(tickets, ({one})=> ({
  attendees: one(attendees, {
    fields: [tickets.ticketHolder],
    references: [attendees.email]
  })
}))

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertFormSubmission = typeof formSubmissions.$inferInsert;
export type SelectFormSubmission = typeof formSubmissions.$inferSelect;

export type InsertApplicationOrder = typeof applicationOrders.$inferInsert;
export type SelectApplicationOrder = typeof applicationOrders.$inferSelect;

export type InsertTicketOrders = typeof ticketOrders.$inferInsert;
export type SelectTicketOrders = typeof ticketOrders.$inferSelect;

export type InsertTicketTypes = typeof ticketTypes.$inferInsert;
export type SelectTicketTypes = typeof ticketTypes.$inferSelect;

export type InsertShowcase= typeof showcases.$inferInsert;
export type SelectShowcase= typeof showcases.$inferSelect;

export type InsertTicket = typeof tickets.$inferInsert;
export type SelectTicket = typeof tickets.$inferSelect;

export type InsertWeekendPassType = typeof weekendPassTypes.$inferInsert;
export type SelectWeekendPassType = typeof weekendPassTypes.$inferSelect;