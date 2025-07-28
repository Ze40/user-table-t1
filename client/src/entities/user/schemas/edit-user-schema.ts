import z from "zod";

export const EditUserSchema = z.object({
  name: z.string().min(1, { message: "Имя обязательно" }),
  fullName: z.string().min(1, { message: "Полное имя обязательно" }),
  surName: z.string().min(1, { message: "Фамилия обязательна" }),
  birthDate: z.string().transform((value) => (value === undefined ? "" : value)),
  telephone: z.string(),
  employment: z.string(),
  userAgreement: z.boolean(),
});

export type EditUserSchemaType = z.infer<typeof EditUserSchema>;
