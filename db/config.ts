import { column, defineDb, defineTable } from "astro:db";

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    handle: column.text(),
    email: column.text(),
    password: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { User },
});
