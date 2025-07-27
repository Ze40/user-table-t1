import axios from "axios";

import type { LoginType } from "../schemas";

class AuthApi {
  private readonly instance;

  public constructor() {
    this.instance = axios.create({
      baseURL: "api/v1/auth/",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async isAuth(): Promise<{ Authorized: boolean; message: string }> {
    try {
      await this.instance.get("me");
      return {
        Authorized: true,
        message: "Сессия активна",
      };
    } catch (error) {
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

  public async login(data: LoginType) {
    try {
      const res = await this.instance.post("login", data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}

export const authApi = new AuthApi();
