import { db } from "@/db/config";
import { usersTable } from "@/db/schema/user.schema";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const prerender = false;

export const GET: APIRoute = async ({ params, redirect }) => {
    if (!params.slug) return redirect("/users");

    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.slug, params.slug),
    });

    if (!user) {
        return redirect("/users");
    }

    return new Response(JSON.stringify(user));
};
