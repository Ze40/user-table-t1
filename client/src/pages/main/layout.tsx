import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router";

import { authApi } from "@/entities/auth/api";
import { SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar, Header } from "@/widgets";

const Layout = () => {
  const navigation = useNavigate();
  useEffect(() => {
    authApi.isAuth().then((res) => {
      console.log(res);
      if (res.Authorized) {
        navigation("/login");
      }
    });
  }, [navigation]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1">
        <Header />
        <Outlet />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
