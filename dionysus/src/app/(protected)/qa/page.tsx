"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import React from "react";
import AskQuestionCard from "../dashboard/ask-question-card";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "../dashboard/code-references";

const QAPage = () => {
  const { projectId } = useProject();
  const { data: questions } = api.project.getQuestions.useQuery({
    projectId,
  });
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const question = questions?.[questionIndex];

  return (
    <Sheet>
      <AskQuestionCard />
      <div className="h-4"></div>
      <h1 className="text-xl font-semibold">Saved Questions</h1>
      <div className="h-2"></div>
      <div className="flex flex-col gap-2">
        {questions?.map((question, index) => {
          return (
            <React.Fragment key={question.id}>
              <SheetTrigger onClick={() => setQuestionIndex(index)}>
                <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow">
                  <img
                    className="rounded-full"
                    height={30}
                    width={30}
                    src={question.user.imageUrl ?? ""}
                  />

                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2">
                      <p className="line-clamp-1 text-lg font-medium text-gray-700">
                        {question.question}
                      </p>
                      <span className="whitespace-nowrap text-xs text-gray-400">
                        {question.createdAt.toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="line-clamp-1 text-sm text-gray-500">
                      {question.answer}
                    </p>
                  </div>
                </div>
              </SheetTrigger>
            </React.Fragment>
          );
        })}
      </div>
      {question && (
        <SheetContent className="w-full md:max-w-[75vw]">
          <SheetHeader>
            <SheetTitle>{question.question}</SheetTitle>
            <MDEditor.Markdown
              source={question.answer}
              className="max-h-[36vh] overflow-scroll rounded-md bg-white p-2 text-left text-black"
              style={{
                backgroundColor: "white",
                color: "black",
              }}
              components={{
                code: ({ children }) => (
                  <code
                    style={{
                      backgroundColor: "#015482", // Sea Blue
                      color: "white",
                      padding: "4px 6px",
                      borderRadius: "4px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {children}
                  </code>
                ),
              }}
            />
            <CodeReferences
              filesReferences={(question.filesReferences ?? []) as any}
            />
          </SheetHeader>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default QAPage;
