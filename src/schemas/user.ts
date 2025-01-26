import { z } from "zod";

export const userSchema = z.object({
    id: z.number(),
    name: z.string().min(1),
    email: z.string().email(),
    age: z.coerce.number().min(1).max(100),
    slug: z.string().min(3),
});

export type User = z.infer<typeof userSchema>;
