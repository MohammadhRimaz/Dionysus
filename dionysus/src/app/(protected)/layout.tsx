import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./app-sidebar";
import Topbar from "./topbar";

type Props = {
  children: React.ReactNode;
};

const Sidebarlayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main className="m-2 flex-1">
          <Topbar />
          <div className="max-h-[calc(100vh)] rounded-md border border-sidebar-border bg-sidebar p-4 shadow">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Sidebarlayout;
