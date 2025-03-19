// npx tsx src/lib/gemini.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export const aiSummariseCommit = async (diff: string) => {
  // https://github.com/owner/repo/commit/<commitHash>.diff
  const response = await model.generateContent([
    `Your are an expert programmer, and you are trying to summarize a git file.
        Reminders about the git diff format:
        For every file, there are a few metadata lines, like (for example):
        \`\`\`
        diff --git a/src/lib/index.js b/src/lib/index.js
        index aadf691..bfef603 100644
        --- a/src/lib/index.js
        +++ b/src/lib/index.js
        \`\`\`
        This means that \`lib/index.js\` was modified in this commit. Note that this is only an example.
        Then there is a specifier of the lines that were modified.
        A line starting with \`+\` means it was added.
        A line that starting with \`-\` means that line was deleted.
        A line that starts with neither \`+\` nor \`-\` is code given for context and better understanding.
        It is not part of the diff.
        [...]
        EXAMPLE SUMMARY COMMENTS:
        \`\`\`
        * Raised the amount of returned recordings from \`10\` to \`100\` [packeges/server/recordings_api.ts], [packages/server/constants.ts]
        * Fixed a typo in the github action name [.github/workflows/gpt-commit-summarizer.yml]
        * Moved the \`octokit\` initialization to a separate file [src/octokit.ts], [src/index.ts]
        * Added an OpenAI API for completions [packages/utils/apis/openai.ts]
        * Lowered numeric tolerance for test files
        \`\`\`
        Most commits will have less comments than this example list.
        The last comment does not include the file names, because there were more than two relevant files in the hypothetical commit.
        Do not include parts of the example in your summary.
        It is given only as an example of appropirate comments.`,
    `Please summarise the following diff file: \n\n${diff}`,
  ]);
  return response.response.text();
};

// console.log(
//   await aiSummariseCommit(`
//   diff --git a/dionysus/prisma/schema.prisma b/dionysus/prisma/schema.prisma
// index 003ffbd..01c0c32 100644
// --- a/dionysus/prisma/schema.prisma
// +++ b/dionysus/prisma/schema.prisma
// @@ -1,6 +1,5 @@
//  // This is your Prisma schema file,
//  // learn more about it in the docs: https://pris.ly/d/prisma-schema
// -
//  generator client {
//      provider = "prisma-client-js"
//  }
// @@ -22,6 +21,8 @@ model User {
//      emailAddress String @unique

//      credits Int @default(150)
// +
// +    userToProjects UserToProject[]
//  }

//  model Project {
// @@ -33,4 +34,20 @@ model Project {
//      githubUrl String

//      deletedAt DateTime?
// +
// +    userToProjects UserToProject[]
// +}
// +
// +model UserToProject {
// +    id        String   @id @default(cuid())
// +    createdAt DateTime @default(now())
// +    updatedAt DateTime @updatedAt
// +
// +    userId String
// +    projectId String
// +
// +    user User @relation(fields: [userId], references: [id])
// +    project Project @relation(fields: [projectId], references: [id])
// +
// +    @@unique([userId, projectId])
//  }
// \ No newline at end of file
// diff --git a/dionysus/src/app/(protected)/create/page.tsx b/dionysus/src/app/(protected)/create/page.tsx
// index 269c2c4..cd64645 100644
// --- a/dionysus/src/app/(protected)/create/page.tsx
// +++ b/dionysus/src/app/(protected)/create/page.tsx
// @@ -1,8 +1,10 @@
//  "use client";
//  import { Button } from "@/components/ui/button";
//  import { Input } from "@/components/ui/input";
// +import { api } from "@/trpc/react";
//  import React from "react";
//  import { useForm } from "react-hook-form";
// +import { toast } from "sonner";

//  type FormInput = {
//    repoUrl: string;
// @@ -12,9 +14,26 @@ type FormInput = {

//  const CreatePage = () => {
//    const { register, handleSubmit, reset } = useForm<FormInput>();
// +  const createProject = api.project.createProject.useMutation();

//    function onSubmit(data: FormInput) {
//      window.alert(JSON.stringify(data, null, 2));
// +    createProject.mutate(
// +      {
// +        githubUrl: data.repoUrl,
// +        name: data.projectName,
// +        githubToken: data.githubToken,
// +      },
// +      {
// +        onSuccess: () => {
// +          toast.success("Project created successfully");
// +          reset();
// +        },
// +        onError: (error) => {
// +          toast.error("Failed to create project");
// +        },
// +      },
// +    );
//      return true;
//    }

// diff --git a/dionysus/src/app/layout.tsx b/dionysus/src/app/layout.tsx
// index 78e2904..9a6c133 100644
// --- a/dionysus/src/app/layout.tsx
// +++ b/dionysus/src/app/layout.tsx
// @@ -11,6 +11,7 @@ import { GeistSans } from "geist/font/sans";
//  import { type Metadata } from "next";

//  `),
// );
