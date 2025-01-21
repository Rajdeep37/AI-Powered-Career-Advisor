from flask import Flask, request, jsonify
from dotenv import load_dotenv
import google.generativeai as genai
from PyPDF2 import PdfReader
from flask_cors import CORS
import os
# Load environment variables
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

def get_gemini_output(pdf_text, prompt):
    response = model.generate_content([pdf_text, prompt])
    return response.text

def read_pdf(uploaded_file):
    pdf_reader = PdfReader(uploaded_file.stream)  # Use the stream directly
    pdf_text = ""
    for page in pdf_reader.pages:
        pdf_text += page.extract_text()
    return pdf_text

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    try:
        file = request.files['resume']
        job_description = request.form.get('job_description', '')
        analysis_option = request.form['analysis_option']

        pdf_text = read_pdf(file)  # Pass the FileStorage object directly
        
        if analysis_option == "1":
            prompt = f"""
            You are ResumeChecker, an expert in resume analysis. Provide a quick scan of the following resume:
            
            1. Identify the most suitable profession for this resume.
            2. List 3 key strengths of the resume.
            3. Suggest 2 quick improvements.
            4. Give an overall ATS score out of 100.
            
            Resume text: {pdf_text}
            Job description (if provided): {job_description}
            """
        elif analysis_option == "2":
            prompt = f"""
            You are ResumeChecker, an expert in resume analysis. Provide a detailed analysis of the following resume:
            
            1. Identify the most suitable profession for this resume.
            2. List 5 strengths of the resume.
            3. Suggest 3-5 areas for improvement with specific recommendations.
            4. Rate the following aspects out of 10: Impact, Brevity, Style, Structure, Skills.
            5. Provide a brief review of each major section (e.g., Summary, Experience, Education).
            6. Give an overall ATS score out of 100 with a breakdown of the scoring.
            
            Resume text: {pdf_text}
            Job description (if provided): {job_description}
            """
        elif analysis_option == "3":
            prompt = f"""
            You are ResumeChecker, an expert in ATS optimization. Analyze the following resume and provide optimization suggestions:
            
            1. Identify keywords from the job description that should be included in the resume.
            2. Suggest reformatting or restructuring to improve ATS readability.
            3. Recommend changes to improve keyword density without keyword stuffing.
            4. Provide 3-5 bullet points on how to tailor this resume for the specific job description.
            5. Give an ATS compatibility score out of 100 and explain how to improve it.
            
            Resume text: {pdf_text}
            Job description: {job_description}
            """
        else:
            return jsonify({"error": "Invalid analysis option selected"}), 400
        
        response = get_gemini_output(pdf_text, prompt)
        return jsonify({"analysis_results": response})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
