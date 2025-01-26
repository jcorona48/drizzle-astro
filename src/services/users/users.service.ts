import type { CreateUserResponse, CreateUserDTO } from "./index.d";

const createUser = async (user: CreateUserDTO): Promise<CreateUserResponse> => {
    try {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify(user),
        });
        const createdUser = await response.json() as CreateUserResponse;

        if (createdUser.error) {
            throw createdUser.error;
        }

        return createdUser;
    } catch (error) {
        throw error;
    }
};

export { createUser };
