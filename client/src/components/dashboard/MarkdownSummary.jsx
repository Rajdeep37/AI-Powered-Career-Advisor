import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from 'lucide-react'

export function MarkdownSummary() {
  return (
    <Card className="bg-gray-900/40 border-gray-800 backdrop-blur-sm text-white">
      <CardHeader className="p-6 border-b border-gray-800">
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Markdown Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="prose prose-invert max-w-none">
          {/* Content will be added here */}
          <div className="h-[200px] flex items-center justify-center text-gray-500">
            Summary content will be generated here
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

