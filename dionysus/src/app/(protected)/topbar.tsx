"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex items-center gap-2 rounded-md border border-sidebar-border bg-sidebar p-2 px-4 shadow">
      {/* Hamburger Icon for Mobile */}
      <button
        className="md:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <Menu />
      </button>
      <div className="ml-auto">
        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
