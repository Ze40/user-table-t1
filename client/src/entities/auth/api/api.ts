import axios from "axios";

import type { LoginType } from "../schemas";

class AuthApi {
  private readonly instance;

  public constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:4000/api/v1/auth",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }

  public async isAuth(): Promise<{ Authorized: boolean; message: string }> {
    try {
      await this.instance.get("me", {
        headers: {},
      });
      return {
        Authorized: true,
        message: "Сессия активна",
      };
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.data.statusCode;
        switch (status) {
          case 401:
            return { Authorized: false, message: "Пользователь не авторизован" };
          default:
            return { Authorized: false, message: "Ошибка получения пользователя" };
        }
      } else if (axios.isAxiosError(error) && error.request) {
        return {
          Authorized: false,
          message: "Ответ не получен",
        };
      } else {
        return {
          Authorized: false,
          message: "Ошибка запроса",
        };
      }
    }
  }

  public async login(data: LoginType): Promise<{ sucsess: boolean; message: string }> {
    try {
      await this.instance.post("login", data);
      return { sucsess: true, message: "Вы успешно зашли" };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { sucsess: false, message: "Ошибка входа" };
      } else if (axios.isAxiosError(error) && error.request) {
        return {
          sucsess: false,
          message: "Ответ не получен",
        };
      } else {
        return {
          sucsess: false,
          message: "Ошибка запроса",
        };
      }
    }
  }

  public async logout(): Promise<{ sucsess: boolean; message: string }> {
    try {
      await this.instance.post("logout");
      return { sucsess: true, message: "Вы успешно вышли" };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { sucsess: false, message: "Ошибка выхода" };
      } else if (axios.isAxiosError(error) && error.request) {
        return {
          sucsess: false,
          message: "Ответ не получен",
        };
      } else {
        return {
          sucsess: false,
          message: "Ошибка запроса",
        };
      }
    }
  }
}

export const authApi = new AuthApi();
