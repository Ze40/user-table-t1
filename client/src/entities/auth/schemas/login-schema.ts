import z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Почта обязательна" })
    .email({ message: "Некоректная почта" }),
  password: z
    .string()
    .min(1, { message: "Пароль обязателен" })
    .min(8, { message: "Пароль должен состоять минимум из 8 символов" })
    .max(16, { message: "Длина пароля не должна превышать 16 символов" }),
});

export type LoginType = z.infer<typeof LoginSchema>;
