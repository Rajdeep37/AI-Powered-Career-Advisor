import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "./axiosInstance";
import { NeonGradientCard } from "../ui/neon-gradient-card";
import Markdown from 'react-markdown'

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisType, setAnalysisType] = useState("Quick Scan");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please upload a file!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jobDescription);
    formData.append(
      "analysis_option",
      analysisType === "Quick Scan"
        ? "1"
        : analysisType === "Detailed Analysis"
        ? "2"
        : "3"
    );

    setLoading(true);
    try {
      const response = await axiosInstance.post("/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data.analysis_results);
      toast.success("Resume analysis completed successfully.");
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast.error("Failed to analyze the resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
    <NeonGradientCard className="w-full sm:max-w-5xl max-w-3xl">
      <Card className="w-full  mx-auto bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            Resume Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-purple-600">
            <Label htmlFor="resume-upload" className="text-gray-300">
              Upload Resume (PDF)
            </Label>
            <Input
              id="resume-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="bg-gray-800 text-white border-gray-700 focus:border-gray-600"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-description" className="text-gray-300">
              Job Description (Optional)
            </Label>
            <Textarea
              id="job-description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Enter job description..."
              className="min-h-[100px] bg-gray-800 text-white border-gray-700 focus:border-gray-600"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="analysis-type" className="text-gray-300">
              Analysis Type
            </Label>
            <Select value={analysisType} onValueChange={setAnalysisType}>
              <SelectTrigger
                id="analysis-type"
                className="bg-gray-800 text-white border-gray-700"
              >
                <SelectValue placeholder="Select analysis type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border-gray-700">
                <SelectItem value="Quick Scan">Quick Scan</SelectItem>
                <SelectItem value="Detailed Analysis">
                  Detailed Analysis
                </SelectItem>
                <SelectItem value="ATS Optimization">
                  ATS Optimization
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Resume"
            )}
          </Button>
          {result && (
            <div className="mt-4 p-4 bg-gray-800 rounded-md">
              <h3 className="text-lg font-semibold mb-2 text-white">
                Analysis Result:
              </h3>
              <p className="whitespace-pre-wrap text-gray-300"><Markdown>{result}</Markdown></p>
            </div>
          )}
        </CardContent>
      </Card>
      </NeonGradientCard>
      

    
    </div>
  );
};

export default ResumeAnalyzer;
