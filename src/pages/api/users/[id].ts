import { db } from "@/db/config";
import { usersTable } from "@/db/schema/user.schema";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const prerender = false;

export const GET: APIRoute = async ({ params, redirect }) => {
    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, Number(params.id)),
    });

    if (!user) {
        return redirect("/users");
    }

    return new Response(JSON.stringify(user));
};
