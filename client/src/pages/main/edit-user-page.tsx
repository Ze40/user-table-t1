import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";

import { userApi } from "@/entities/user/api/api";
import type { EditUserSchemaType } from "@/entities/user/schemas";
import UserEditForm from "@/entities/user/ui/user-edit-form";

const EditUserPage = () => {
  const { id } = useParams<string>();
  const [user, setUser] = useState<EditUserSchemaType>();
  const [error, setError] = useState<string>();
  const navigation = useNavigate();

  useEffect(() => {
    if (!id) {
      navigation("/");
      return;
    }
    userApi.getUserById(id).then((res) => {
      if (res.sucsess && res.data !== null) {
        setUser(res.data);
      } else {
        setError(res.message);
      }
    });
  }, [id, navigation]);

  if (!id) return;

  if (error || !user) {
    return (
      <main>
        <h3 className="text-center text-4xl font-bold">{error}</h3>
      </main>
    );
  }

  const onSubmit = (data: EditUserSchemaType) => {
    console.log(data);
    userApi.editUser(data, id).then((res) => {
      if (res.sucsess) {
        navigation("/");
      } else {
        setError(res.message);
      }
    });
  };

  return (
    <main className="p-10">
      <div className="p-10 m-auto w-min">
        <UserEditForm defaultValues={user} onSubmit={onSubmit} />
      </div>
    </main>
  );
};

export default EditUserPage;
