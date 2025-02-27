import { z } from "astro:schema";
import { defineAction } from "astro:actions";
import { count, db, eq, User } from "astro:db";
import bcrypt from "bcrypt";

export const server = {
  handleAvailable: defineAction({
    input: z.string(),
    handler: async (name) => {
      const result = await db
        .select({ count: count() })
        .from(User)
        .where(eq(User.name, name));

      return result[0].count > 0;
    },
  }),

  signUp: defineAction({
    input: z.object({
      handle: z
        .string()
        .min(5)
        .max(32)
        .trim()
        .toLowerCase()
        .refine((h) => !h.includes(" ")),
      email: z.string().email().trim(),
      password: z
        .string()
        .min(5)
        .max(32)
        .trim()
        .toLowerCase()
        .refine((h) => !h.includes(" ")),
    }),
    handler: (input) => {
      db.insert(User).values({
        id: crypto.randomUUID(),
        name: input.handle,
        handle: input.handle,
        email: input.email,
        password: bcrypt.hashSync(input.password, 10),
      });
    },
  }),
};
