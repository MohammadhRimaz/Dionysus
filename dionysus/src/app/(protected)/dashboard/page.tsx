"use client";
import useProject from "@/hooks/use-project";
import { ExternalLink, GithubIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import CommitLog from "./commit-log";
import AskQuestionCard from "./ask-question-card";
import ArchiveButton from "./archive-button";
// import InviteButton from "./invite-button";
import dynamic from "next/dynamic";
const InviteButton = dynamic(() => import("./invite-button"), { ssr: false });
import TeamMembers from "./team-members";

const Dashboardpage = () => {
  const { project } = useProject();
  return (
    <div className="w-full max-w-full overflow-x-hidden px-2 sm:px-4">
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        {/* GitHub Link */}
        <div className="w-fit rounded-md bg-primary px-4 py-3">
          <div className="flex items-center break-words">
            <GithubIcon className="size-5 text-white" />
            <div className="ml-2 min-w-0">
              <p className="break-words break-all text-sm font-medium text-white">
                This project is linked to{" "}
                <Link
                  href={project?.githubUrl ?? ""}
                  className="inline-flex items-center text-white/80 hover:underline"
                >
                  {project?.githubUrl}
                  <ExternalLink className="ml-1 size-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="h-4"></div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <TeamMembers />
          <InviteButton />
          <ArchiveButton />
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          <AskQuestionCard />
        </div>
      </div>

      <div className="mt-8"></div>
      <CommitLog />
    </div>
  );
};

export default Dashboardpage;
