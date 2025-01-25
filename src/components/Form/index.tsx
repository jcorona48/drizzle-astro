import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/schemas/user";
import { createUser } from "@/services/users/users.service";
import { toast } from "react-toastify";

const schema = userSchema.omit({ id: true });

export default function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        toast.promise(createUser(data), {
            pending: "Creating user...",
            success: "User created successfully",
            error: "Error creating user",
        });
    };

    const isDisabled = Object.keys(errors).length > 0 || isSubmitting;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="name"
                    className={`${
                        errors.name
                            ? "text-red-500 dark:text-red-400"
                            : "text-gray-500 dark:text-gray-400"
                    }`}
                >
                    Name
                </label>
                <input
                    {...register("name")}
                    placeholder="Name"
                    type="text"
                    className={`border border-gray-300 rounded-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white ${
                        errors.name ? "border-red-500 dark:border-red-400" : ""
                    }`}
                />
                {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="email"
                    className={`${
                        errors.email
                            ? "text-red-500 dark:text-red-400"
                            : "text-gray-500 dark:text-gray-400"
                    }`}
                >
                    Email
                </label>
                <input
                    {...register("email")}
                    placeholder="Email"
                    type="email"
                    className={`border border-gray-300 rounded-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white ${
                        errors.email ? "border-red-500 dark:border-red-400" : ""
                    }`}
                />
                {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="age"
                    className={`${
                        errors.age
                            ? "text-red-500 dark:text-red-400"
                            : "text-gray-500 dark:text-gray-400"
                    }`}
                >
                    Age
                </label>
                <input
                    {...register("age")}
                    type="number"
                    placeholder="Age"
                    className={`border border-gray-300 rounded-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white ${
                        errors.age ? "border-red-500 dark:border-red-400" : ""
                    }`}
                />
                {errors.age && (
                    <p className="text-red-500">{errors.age.message}</p>
                )}
            </div>
            <button
                type="submit"
                disabled={isDisabled}
                className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700 mt-4"
            >
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
}
