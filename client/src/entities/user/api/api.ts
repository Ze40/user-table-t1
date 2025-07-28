import axios from "axios";

import type { CreateUserSchemaType, EditUserSchemaType, UserSchemaType } from "../schemas";

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

  public async getUserById(id: string): Promise<{
    message: string;
    data: EditUserSchemaType | null;
    sucsess: boolean;
  }> {
    try {
      const res = await this.instance.get<EditUserSchemaType>(id);
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
          case 404:
            return { sucsess: false, message: "Пользователь не найден", data: null };
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

  public async createUser(
    newUser: CreateUserSchemaType
  ): Promise<{ sucsess: boolean; message: string }> {
    try {
      await this.instance.post("", newUser);
      return {
        sucsess: true,
        message: "Пользователь создан",
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          sucsess: false,
          message: error.message,
        };
      }
      return {
        sucsess: false,
        message: "Ошибка создания пользователя",
      };
    }
  }

  public async editUser(
    data: EditUserSchemaType,
    id: string
  ): Promise<{ sucsess: boolean; message: string }> {
    try {
      await this.instance.patch(id, data);
      return {
        sucsess: true,
        message: "Пользователь обновлен",
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          sucsess: false,
          message: error.message,
        };
      }
      return {
        sucsess: false,
        message: "Ошибка создания пользователя",
      };
    }
  }
}

export const userApi = new UserApi();
