import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/schemas/user";
import { createUser } from "@/services/users/users.service";
import { toast } from "react-toastify";
import { defaultLang, languages } from "@/i18n/ui";
import { useTranslations, getLangFromUrl } from "@/i18n/utils";

interface FormProps {
    lang?: keyof typeof languages;
}

export default function Form({ lang = defaultLang }: FormProps) {
    const {
        users: { form: tUsersForm },
    } = useTranslations(lang);

    const schema = userSchema.omit({ id: true }).extend({
        name: z
            .string({
                required_error: tUsersForm.validation.name.required,
            })
            .min(3, {
                message: tUsersForm.validation.name.min.replace(
                    "{{count}}",
                    "3"
                ),
            }),
        email: z
            .string({
                required_error: tUsersForm.validation.email.required,
            })
            .email({ message: tUsersForm.validation.email.invalid }),
        age: z.coerce
            .number({
                required_error: tUsersForm.validation.age.required,
                invalid_type_error: tUsersForm.validation.age.number,
            })
            .min(18, {
                message: tUsersForm.validation.age.min.replace(
                    "{{count}}",
                    "18"
                ),
            }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitted },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        await toast.promise(createUser(data), {
            pending: tUsersForm.toast.submitting,
            success: tUsersForm.toast.success,
            error: tUsersForm.toast.error,
        });
    };

    const isDisabled = Object.keys(errors).length > 0 || isSubmitting;

    const inputClasses = (field: keyof z.infer<typeof schema>) => {
        return `border border-gray-300 rounded-md p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors[field]
                ? "border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400"
                : ""
        } ${
            isSubmitted && !errors[field]
                ? "border-green-500 dark:border-green-400 focus:ring-green-500 dark:focus:ring-green-400"
                : ""
        }`;
    };

    const labelClasses = (field: keyof z.infer<typeof schema>) => {
        return `${
            errors[field]
                ? "text-red-500 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400"
        } ${
            isSubmitted && !errors[field]
                ? "text-green-500 dark:text-green-400"
                : ""
        }`;
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full max-w-md"
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className={labelClasses("name")}>
                    {tUsersForm.name}
                </label>
                <input
                    {...register("name")}
                    placeholder={tUsersForm.name}
                    type="text"
                    className={inputClasses("name")}
                />
                {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className={labelClasses("email")}>
                    {tUsersForm.email}
                </label>
                <input
                    {...register("email")}
                    placeholder={tUsersForm.email}
                    type="email"
                    className={inputClasses("email")}
                />
                {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="age" className={labelClasses("age")}>
                    {tUsersForm.age}
                </label>
                <input
                    {...register("age")}
                    type="number"
                    placeholder={tUsersForm.age}
                    className={inputClasses("age")}
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
                {isSubmitting ? tUsersForm.toast.submitting : tUsersForm.submit}
            </button>
        </form>
    );
}
