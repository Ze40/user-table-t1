import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import type { UserSchemaType } from "@/entities/user/schemas";
import { UserDataTableControl } from "@/entities/user/ui";

import { Button } from "../ui/button";

export const userTableColumns: ColumnDef<UserSchemaType>[] = [
  {
    id: "actions",
    cell: ({ row }) => <UserDataTableControl row={row} />,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "fullName",
    header: "Полное имя",
  },
  {
    accessorKey: "name",
    header: "Имя",
  },
  {
    accessorKey: "surName",
    header: "Фамилия",
  },
];
