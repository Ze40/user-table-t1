import { SidebarTrigger } from "@/shared/ui/sidebar";

const Header = () => {
  return (
    <header className="h-20 border-b w-full flex items-center p-6 justify-between sticky top-0 bg-background">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-4">{/* Поиск */}</div>
    </header>
  );
};

export default Header;
