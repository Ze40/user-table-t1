import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { LoadingCircle } from "@/shared/ui/loading-circle";

import { authApi } from "../api";
import { LoginSchema, type LoginType } from "../schemas";

const LoginFormHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({ resolver: zodResolver(LoginSchema) });

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginType) => {
    authApi.login(data).then((res) => {
      if (res.sucsess) {
        navigate("/");
      } else {
        setError(res.message);
      }
    });
  };

  return (
    <div className="w-xl px-5 py-10 shadow-2xl rounded-2xl">
      <h4 className="text-center text-4xl font-medium mb-10">Войти</h4>
      <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Введите почту</label>
          <Input
            placeholder="Почта"
            type="email"
            {...register("email")}
            className={errors.email && "border-destructive"}
          />
          {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Введите пароль</label>
          <Input
            placeholder="Пароль"
            type="password"
            {...register("password")}
            className={errors.password && "border-destructive"}
          />
          {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
        </div>
        {error && <p className="text-destructive text-sm text-center">{error}</p>}
        <Button type="submit">{isSubmitting && <LoadingCircle />}Войти</Button>
      </form>
    </div>
  );
};

export default LoginFormHook;
