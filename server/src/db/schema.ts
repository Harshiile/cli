import { uuid, unique, boolean, pgTable, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("cli-users", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: varchar('username').notNull().unique(),
    email: varchar('email').notNull(),
    password: varchar('password').notNull()
});

export const workspaceTable = pgTable("cli-workspaces", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    owner: varchar('owner').notNull().references(() => userTable.username),
    zip_id: varchar('zip_id').notNull(),
    visibility_public: boolean("visibility_public")
}, (table) => ({
    uniqueUserVideo: unique().on(table.name, table.owner),
}));
