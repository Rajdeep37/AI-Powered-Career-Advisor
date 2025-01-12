import React, { useState } from "react";
import axiosInstance from "./axiosInstance";
import "./ResumeAnalyzer.css";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisType, setAnalysisType] = useState("Quick Scan");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a file!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jobDescription);
    formData.append("analysis_option", analysisType === "Quick Scan" ? "1" : analysisType === "Detailed Analysis" ? "2" : "3");

    setLoading(true);
    try {
      const response = await axiosInstance.post("/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data.analysis_results);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("Failed to analyze the resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-analyzer">
      <h2>Resume Analyzer</h2>
      <div className="form-group">
        <label htmlFor="resume-upload">Upload Resume (PDF):</label>
        <input
          id="resume-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="job-description">Job Description (Optional):</label>
        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter job description..."
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="analysis-type">Analysis Type:</label>
        <select
          id="analysis-type"
          value={analysisType}
          onChange={(e) => setAnalysisType(e.target.value)}
        >
          <option value="Quick Scan">Quick Scan</option>
          <option value="Detailed Analysis">Detailed Analysis</option>
          <option value="ATS Optimization">ATS Optimization</option>
        </select>
      </div>
      <button onClick={handleAnalyze} disabled={loading} className="analyze-btn">
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
      {result && (
        <div className="result">
          <h3>Analysis Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
