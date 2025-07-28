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
  birthDate: z
    .date()
    .min(1900, { message: "Вам точно столько лет?" })
    .max(new Date().getFullYear() - 18, { message: "Вы должны быть совершенолетним" }),
  telephone: z.string().length(10, { message: "Некоректный номер" }),
  employment: z.string(),
  userAgreement: z.boolean(),
});

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
