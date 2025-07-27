import { useState } from "react";

import { DoorClosed, DoorOpen } from "lucide-react";

const Logout = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <button
      className="rounded-full bg-secondary h-12 aspect-square flex items-center justify-center cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ? <DoorOpen size={24} /> : <DoorClosed size={24} />}
    </button>
  );
};

export default Logout;
