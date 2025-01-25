import type { APIRoute } from "astro";
import { usersTable, type InsertUser } from "@/db/schema/user.schema";
import { db } from "@/db/config";
import { eq } from "drizzle-orm";
import { userSchema } from "@/schemas/user";

const schema = userSchema.omit({ id: true });

export const prerender = false;

export const GET: APIRoute = async ({ request, params }) => {
    const users = await db.query.usersTable.findMany();
    return new Response(JSON.stringify(users));
};

export const POST: APIRoute = async ({ request, params }) => {
    try {
        const user = schema.parse(await request.json());

        const result = await db.insert(usersTable).values({
            name: user.name,
            email: user.email,
            age: user.age,
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
