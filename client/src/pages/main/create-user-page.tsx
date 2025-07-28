import { userApi } from "@/entities/user/api/api";
import type { CreateUserSchemaType } from "@/entities/user/schemas";
import { UserFormHook } from "@/entities/user/ui";

const CreateUserPage = () => {
  const onSubmit = (data: CreateUserSchemaType) => {
    userApi.createUser(data).then((res) => console.log(res));
    console.log(data);
  };

  return (
    <main className="p-10">
      <div className="w-min p-10 shadow-lg rounded-xl m-auto">
        <h2 className="text-center text-4xl font-semibold mb-10">Создать пользователя</h2>
        <UserFormHook onSubmit={onSubmit} />
      </div>
    </main>
  );
};

export default CreateUserPage;
