"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { lucario } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  filesReferences: { fileName: string; sourceCode: string; summary: string }[];
};

const CodeReferences = ({ filesReferences }: Props) => {
  const [tab, setTab] = React.useState(filesReferences[0]?.fileName);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleTabClick = (filename: string) => {
    setTab(filename);
    const button = buttonRefs.current[filename];
    if (button) {
      button.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  if (filesReferences.length === 0) return null;

  return (
    <div className="mx-auto max-w-[90vw]">
      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex gap-2 overflow-x-auto rounded-md bg-gray-200 px-1">
          {filesReferences.map((file) => (
            <button
              key={file.fileName}
              ref={(el) => {
                buttonRefs.current[file.fileName] = el;
              }}
              onClick={() => handleTabClick(file.fileName)}
              className={cn(
                "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors",
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
            className="max-h-[40vh] w-full overflow-auto rounded-md"
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
