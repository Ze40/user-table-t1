import z from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(1, { message: "Имя обязательно" }),
  surName: z.string().min(1, { message: "Фамилия обязательна" }),
  email: z
    .string()
    .min(1, { message: "Почта обязательна" })
    .email({ message: "Некоректная почта" }),
  password: z
    .string()
    .min(1, { message: "Пароль обязателен" })
    .min(4, { message: "Пароль должен состоять минимум из 4 символов" })
    .max(16, { message: "Длина пароля не должна превышать 16 символов" }),
  fullName: z.string().min(1, { message: "Полное имя обязательно" }),
  birthDate: z.string().min(1, { message: "Дата обязательно" }),
  telephone: z.string().length(11, { message: "Некоректный номер" }),
  employment: z.string().min(1, { message: "Должность обязательна" }),
  userAgreement: z.boolean(),
});

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
