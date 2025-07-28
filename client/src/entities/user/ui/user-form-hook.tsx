import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { DatePicker } from "@/feat/ui";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { LoadingCircle } from "@/shared/ui/loading-circle";

import { CreateUserSchema, type CreateUserSchemaType } from "../schemas";

interface UserFormHookProps {
  onSubmit: (data: CreateUserSchemaType) => void;
}

const UserFormSchema = CreateUserSchema.and(z.object({ confPassword: z.string() })).refine(
  (data) => data.password === data.confPassword,
  { message: "Пароли не совпадают", path: ["password"] }
);

type UserFormSchemaType = z.infer<typeof UserFormSchema>;

const UserFormHook = ({ onSubmit }: UserFormHookProps) => {
  const {
    register,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
  } = useForm<UserFormSchemaType>({
    resolver: zodResolver(UserFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-xl relative">
      <div className="flex gap-5">
        <div className="flex-1/2">
          <label htmlFor="name">Имя:</label>
          <Input placeholder="Имя" {...register("name")} />
          {errors.name && (
            <p className="text-destructive text-sm text-center">{errors.name.message}</p>
          )}
        </div>
        <div className="flex-1/2">
          <label htmlFor="surName">Фамилия:</label>
          <Input placeholder="Фамилия" {...register("surName")} />
          {errors.surName && (
            <p className="text-destructive text-sm text-center">{errors.surName.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-5 ">
        <div className="flex-3/4">
          <label htmlFor="fullName">Полное имя:</label>
          <Input placeholder="Полное имя" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-destructive text-sm text-center">{errors.fullName.message}</p>
          )}
        </div>
        <div className="flex-1/4">
          <label htmlFor="birthDate">Дата рождения:</label>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                ref={field.ref}
                className="w-full"
              />
            )}
          />
          {errors.birthDate && (
            <p className="text-destructive text-sm text-center">{errors.birthDate.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-5">
        <div className="flex-1/2">
          <label htmlFor="telephone">Телефон:</label>
          <Input placeholder="Телефон" {...register("telephone")} />
          {errors.telephone && (
            <p className="text-destructive text-sm text-center">{errors.telephone.message}</p>
          )}
        </div>
        <div className="flex-1/2">
          <label htmlFor="employment">Должность:</label>
          <Input placeholder="Должность" {...register("employment")} />
          {errors.employment && (
            <p className="text-destructive text-sm text-center">{errors.employment.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email">Почта:</label>
        <Input placeholder="Почта" {...register("email")} />
        {errors.email && (
          <p className="text-destructive text-sm text-center">{errors.email.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-center gap-5">
          <div className="flex-1/2">
            <label htmlFor="password">Пароль:</label>
            <Input placeholder="Пароль" type="password" {...register("password", {})} />
          </div>

          <div className="flex-1/2">
            <label htmlFor="confPassword">Подтверждение пароля:</label>
            <Input placeholder="Подтвердите пароль" type="password" {...register("confPassword")} />
          </div>
        </div>
        {errors.password && (
          <p className="text-destructive text-sm text-center">{errors.password.message}</p>
        )}
      </div>

      <div className="self-center flex gap-2 items-center p-4 shadow-sm rounded-md">
        <Controller
          name="userAgreement"
          control={control}
          render={({ field }) => (
            <Checkbox
              className="w-5 h-5"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
            />
          )}
        />
        {errors.userAgreement && (
          <p className="text-destructive text-sm text-center">{errors.userAgreement.message}</p>
        )}

        <label htmlFor="">Согласие с обработкой данных</label>
      </div>

      <Button type="submit">
        {isSubmitting && <LoadingCircle size={24} />}
        {isSubmitSuccessful && <Check size={24} />}
        Создать
      </Button>
      {errors.root && <p className="text-destructive text-sm text-center">{errors.root.message}</p>}
    </form>
  );
};

export default UserFormHook;
