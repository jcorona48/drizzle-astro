import { db } from "@/db/config";
import { usersTable } from "@/db/schema/user.schema";
import { eq, or } from "drizzle-orm";
import { type User } from "@/schemas/user";


export const validateUser = async (user: Omit<User, "id">) => {
    const duplicatesKeys = await validateUserData(user.slug, user.email);

    if (duplicatesKeys.length === 0) {
        return { valid: true, error: null };
    }

    const error = duplicatesKeys.reduce((acc: { [key: string]: { message: string; type: string } }, key) => {
        acc[key] = {
            message: `${key.charAt(0).toUpperCase() + key.slice(1)} already exists`,
            type: "duplicate",
        };
        return acc;
    }, {});

    return { valid: false, error };
};

const validateUserData = async (slug: string, email: string): Promise<string[]> => {
    const user = await db.query.usersTable.findFirst({
        where: or(
            eq(usersTable.slug, slug),
            eq(usersTable.email, email)
        ),
    });

    if (!user) return [];

    const duplicatesKeys = [];
    if (user.slug === slug) duplicatesKeys.push("slug");
    if (user.email === email) duplicatesKeys.push("email");

    return duplicatesKeys;
};