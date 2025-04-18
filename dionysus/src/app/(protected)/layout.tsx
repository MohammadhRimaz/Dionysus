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
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden px-2 sm:px-4">
          <Topbar />
          <div className="mt-2 w-full max-w-full rounded-md border border-sidebar-border bg-sidebar p-4 shadow">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Sidebarlayout;
