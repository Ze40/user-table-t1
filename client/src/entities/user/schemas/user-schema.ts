import z from "zod";

export const UserSchema = z.object({
  email: z
    .string({ message: "Почта должна быть строкой" })
    .min(1, { message: "Почта обязательна" })
    .email({ message: "Почта некоректна" }),
  fullName: z
    .string({ message: "Имя должно быть строкой" })
    .min(1, { message: "Полное имя обязательно" }),
  id: z.string().min(1, { message: "ID обязателен" }),
  name: z.string({ message: "Имя должно быть строкой" }).min(1, { message: "Имя обязательно" }),
  surName: z
    .string({ message: "Фамилия должна быть строкой" })
    .min(1, { message: "Фамилия обязательна" }),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
