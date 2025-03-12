import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isFarmer: boolean("is_farmer").notNull().default(false),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  unit: text("unit").notNull(),
  seller: text("seller").notNull(),
  sellerId: integer("seller_id").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isFarmer: true,
});

export const insertProductSchema = createInsertSchema(products);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;