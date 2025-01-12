import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { baseURL } from "@/utils/constants";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownSummary() {
  const [text, setText] = useState("");

  const fetchStreamedData = async () => {
    try {
      const response = await fetch(`${baseURL}/users/generateSummary`, {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
        },
        credentials: "include",
      });

      if (!response.body) {
        console.error("ReadableStream is not supported in this environment");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        if (value) {
          setText((prevText) => prevText + decoder.decode(value));
        }
      }
    } catch (error) {
      console.error("Error fetching streamed data:", error);
    }
  };

  useEffect(() => {
    fetchStreamedData();
  }, []);

  return (
    <Card className="bg-gray-900/40 border-gray-800 backdrop-blur-sm text-white">
      <CardHeader className="p-6 border-b border-gray-800">
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Profile Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="prose prose-invert max-w-none">
          <div className="h-[200px] overflow-y-auto p-4 rounded bg-gray-800 text-gray-300">
            {text ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {text}
              </ReactMarkdown>
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
