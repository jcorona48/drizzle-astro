import type { CreateUserResponse, CreateUserDTO } from "./index.d";

const createUser = async (user: CreateUserDTO): Promise<CreateUserResponse> => {
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(user),
    });
    const createdUser = await response.json();
    return createdUser;
};

export { createUser };
