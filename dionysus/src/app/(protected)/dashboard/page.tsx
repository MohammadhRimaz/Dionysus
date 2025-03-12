"use client";
import useProject from "@/hooks/use-project";
import React from "react";

const Dashboardpage = () => {
  const { project } = useProject();
  return (
    <div>
      <h1>{project?.name}</h1>
    </div>
  );
};

export default Dashboardpage;
