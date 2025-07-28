import axios from "axios";

import type { UserSchemaType } from "../schemas";

class UserApi {
  private readonly instance;
  public constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:4000/api/v1/users",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }

  public async getAllUsers(): Promise<{
    message: string;
    data: UserSchemaType[] | null;
    sucsess: boolean;
  }> {
    try {
      const res = await this.instance.get<UserSchemaType[]>("");
      return {
        data: res.data,
        message: "Данные получены",
        sucsess: true,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.data.statusCode;
        switch (status) {
          case 401:
            return { sucsess: false, message: "Пользователь не авторизован", data: null };
          default:
            return { sucsess: false, message: "Ошибка получения пользователя", data: null };
        }
      } else if (axios.isAxiosError(error) && error.request) {
        return {
          sucsess: false,
          message: "Ответ не получен",
          data: null,
        };
      } else {
        return {
          sucsess: false,
          message: "Ошибка запроса",
          data: null,
        };
      }
    }
  }
}

export const userApi = new UserApi();
