import { integer, pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

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

export const applicationOrders = pgTable("application_orders", {
  id: serial('id').primaryKey(),
  applicationSubmitted: boolean('applicationSubmitted')
})

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertFormSubmission = typeof formSubmissionsTable.$inferInsert;
export type SelectFormSubmission = typeof formSubmissionsTable.$inferSelect;

export type InsertApplicationOrder = typeof applicationOrders.$inferInsert;
export type SelectApplicationOrder = typeof applicationOrders.$inferSelect;