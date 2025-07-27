import { useState } from "react";

import { DoorClosed, DoorOpen } from "lucide-react";
import { useNavigate } from "react-router";

import { authApi } from "../api";

const Logout = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    await authApi.logout().then((res) => {
      if (res.sucsess) {
        navigate("/login");
      }
    });
  };

  return (
    <button
      className="rounded-full bg-secondary h-12 aspect-square flex items-center justify-center cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleClick}
    >
      {isHover ? <DoorOpen size={24} /> : <DoorClosed size={24} />}
    </button>
  );
};

export default Logout;
