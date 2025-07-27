import { Outlet } from "react-router";

import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import AppSidebar from "@/widgets/app-sidebar";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="">
        <header>
          <SidebarTrigger />
          header
        </header>
        <Outlet />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
