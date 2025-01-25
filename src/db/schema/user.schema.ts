import { sqliteTable, text,int } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
    id: int('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    age: int('age').notNull(),
});

export type User = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;