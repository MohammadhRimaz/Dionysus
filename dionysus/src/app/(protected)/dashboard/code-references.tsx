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

  const handleTabClick = (fileName: string) => {
    setTab(fileName);
    const button = buttonRefs.current[fileName];
    if (button) {
      button.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  if (filesReferences.length === 0) return null;

  return (
    <div className="scrollbar-hide max-h-[90vh] w-full overflow-y-auto rounded-md px-4 py-6 sm:max-w-[95vw] md:max-w-[75vw]">
      <Tabs value={tab} onValueChange={setTab}>
        <div className="scrollbar-hide flex gap-2 overflow-auto rounded-md bg-gray-200 p-1">
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
            className="scrollbar-hide max-h-[40vh] w-full overflow-auto rounded-md"
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
