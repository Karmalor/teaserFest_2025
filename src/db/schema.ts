import { integer, pgTable, serial, text, timestamp, boolean, date } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  clerkId: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  username: text('username'),
  firstName: text('firstName'),
  lastName: text('lastName'),
  photo: text('imageUrl'),
  // orders: integer("orders").references(() => applicationOrders.id)
});

export const formSubmissionsTable = pgTable('form_submissions', {
    user: text('user'),
    stageName: text('stageName').notNull(),
    tagline: text('tagline')
}) 

export const applicationOrdersTable = pgTable("application_orders", {
  stripeId: text('id').primaryKey(),
  applicationSubmitted: boolean('applicationSubmitted').default(false),
  amount: text('amount'),
  buyerId: text('buyerId').references(() => usersTable.clerkId)
})

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertFormSubmission = typeof formSubmissionsTable.$inferInsert;
export type SelectFormSubmission = typeof formSubmissionsTable.$inferSelect;

export type InsertApplicationOrder = typeof applicationOrdersTable.$inferInsert;
export type SelectApplicationOrder = typeof applicationOrdersTable.$inferSelect;