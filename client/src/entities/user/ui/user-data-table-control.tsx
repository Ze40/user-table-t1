import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import type { UserSchemaType } from "../schemas";

interface UserDataTableControlProps {
  row: Row<UserSchemaType>;
}

const UserDataTableControl = ({ row }: UserDataTableControlProps) => {
  const navigation = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Открыть меню</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigation(`/user/edit/${row.original.id}`)}>
          Редактировать
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Удалить</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDataTableControl;
