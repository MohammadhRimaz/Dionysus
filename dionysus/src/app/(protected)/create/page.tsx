"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import { Info } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject = api.project.createProject.useMutation();
  const checkCredits = api.project.checkCredits.useMutation();
  const refetch = useRefetch();

  const [projectId, setProjectId] = React.useState<string | null>(null);

  const { refetch: refetchCommits } = api.project.getCommits.useQuery(
    { projectId: projectId ?? "" },
    {
      enabled: false,
    },
  );

  function onSubmit(data: FormInput) {
    if (!!checkCredits.data) {
      createProject.mutate(
        {
          githubUrl: data.repoUrl,
          name: data.projectName,
          githubToken: data.githubToken,
        },
        {
          onSuccess: async (project) => {
            toast.success("Project created successfully");
            setProjectId(project.id);
            await new Promise((res) => setTimeout(res, 500)); // optional delay

            // Fetch commits (includes summaries)
            await refetchCommits();
            refetch();
            reset();
          },
          onError: (error) => {
            toast.error("Failed to create project");
          },
        },
      );
    } else {
      checkCredits.mutate({
        githubUrl: data.repoUrl,
        githubToken: data.githubToken,
      });
    }
  }

  const hasEnoughCredits = checkCredits?.data?.userCredits
    ? checkCredits.data.fileCount <= checkCredits.data.userCredits
    : true;

  return (
    <div className="flex flex-col-reverse items-center justify-center gap-8 px-4 lg:flex-row lg:gap-12 lg:px-0 lg:py-20">
      <img src="/undraw_github.svg" className="h-56 w-auto" alt="hero image" />
      <div>
        <div>
          <h1 className="text-2xl font-semibold">
            Link your GitHub Repository.
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the URL of your GitHub repository to link the Dionysus.
          </p>
        </div>
        <div className="h-4"></div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("projectName", { required: true })}
              placeholder="Project Name"
              required
            />

            <div className="h-2"></div>

            <Input
              {...register("repoUrl", { required: true })}
              placeholder="GitHub Repository URL"
              type="url"
              required
            />

            <div className="h-2"></div>

            <Input
              {...register("githubToken")}
              placeholder="GitHub Token (Optional)"
            />

            {!!checkCredits.data && (
              <>
                <div className="mt-4 rounded-md border border-orange-200 bg-orange-50 px-4 py-2 text-orange-700">
                  <div className="items center flex gap-2">
                    <Info className="size-4" />
                    <p className="text-sm">
                      You will be charged{" "}
                      <strong>{checkCredits.data?.fileCount}</strong> credits
                      for this repository. <br />
                      If you don't have a GitHub token, creating project <br />
                      may restricted to <strong>60</strong> credits per hour.
                    </p>
                  </div>
                  <p className="ml-6 text-sm text-blue-600">
                    You have <strong>{checkCredits.data?.userCredits}</strong>{" "}
                    credits remaining.
                  </p>
                </div>
              </>
            )}

            <div className="h-4"></div>

            <Button
              type="submit"
              disabled={
                createProject.isPending ||
                checkCredits.isPending ||
                !hasEnoughCredits
              }
            >
              {!!checkCredits.data ? "Create Project" : "Check Credits"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
