import type { ResultSet } from "@libsql/client";
import { userSchema, User } from "@/schemas/user";

export type CreateUserResponse = {
    result: ResultSet;
    newUser: Omit<User, "id">;
}

export type CreateUserDTO = Omit<User, "id">;

export type User = z.infer<typeof userSchema>;

