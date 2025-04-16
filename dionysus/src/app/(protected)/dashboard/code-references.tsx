"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { lucario } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  filesReferences: { fileName: string; sourceCode: string; summary: string }[];
};

const CodeReferences = ({ filesReferences }: Props) => {
  const [tab, setTab] = React.useState(filesReferences[0]?.fileName);
  if (filesReferences.length === 0) return null;
  return (
    <div className="max-w-[88vw] md:max-w-[70vw]">
      <Tabs value={tab} onValueChange={setTab}>
        <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent flex gap-2 overflow-x-auto rounded-md bg-gray-200 px-1">
          {filesReferences.map((file) => (
            <button
              key={file.fileName}
              onClick={() => setTab(file.fileName)}
              className={cn(
                "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-gray-300 hover:text-blue-950",
                {
                  "bg-primary text-primary-foreground": tab === file.fileName,
                },
              )}
            >
              {file.fileName}
            </button>
          ))}
        </div>
        {filesReferences.map((file) => (
          <TabsContent
            key={file.fileName}
            value={file.fileName}
            className="max-h-[40vh] w-full overflow-auto break-words rounded-md"
          >
            <SyntaxHighlighter
              language="typescript"
              style={lucario}
              wrapLongLines={true}
              customStyle={{
                whiteSpace: "pre-wrap", // ensures text wraps
                wordBreak: "break-word",
              }}
            >
              {file.sourceCode}
            </SyntaxHighlighter>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CodeReferences;
