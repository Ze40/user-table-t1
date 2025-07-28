import { useEffect, useState } from "react";

import { userApi } from "@/entities/user/api/api";
import type { UserSchemaType } from "@/entities/user/schemas";
import { userTableColumns } from "@/shared/models";
import { DataTable } from "@/widgets";

const UserTablePage = () => {
  const [data, setData] = useState<UserSchemaType[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    userApi.getAllUsers().then((res) => {
      if (res.sucsess) {
        setData(res.data);
      } else {
        setMessage(res.message);
      }
    });
  }, []);

  return (
    <main className="p-10">
      <div className="container mx-auto">
        {data ? <DataTable columns={userTableColumns} data={data} /> : <p>{message}</p>}
      </div>
    </main>
  );
};

export default UserTablePage;
