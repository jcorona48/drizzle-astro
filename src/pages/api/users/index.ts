import { db } from "@/db/config";
import { usersTable } from "@/db/schema/user.schema";
import { validateUser } from "@/db/validate/unique";
import { userSchema } from "@/schemas/user";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

const schema = userSchema.omit({ id: true });

export const prerender = false;

export const GET: APIRoute = async () => {
    const users = await db.query.usersTable.findMany();
    return new Response(JSON.stringify(users));
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const user = schema.parse(await request.json());

        const { valid, error } = await validateUser(user);

        if (!valid) return new Response(JSON.stringify({error}), { status: 400 });

        const result = await db.insert(usersTable).values({
            name: user.name,
            email: user.email,
            age: user.age,
            slug: user.slug,
        });

        const newUser = await db.query.usersTable.findFirst({
            where: eq(usersTable.id, result.lastInsertRowid as unknown as number),
        });

        const response = {
            result,
            newUser,
        }

        return new Response(JSON.stringify(response));
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
};
