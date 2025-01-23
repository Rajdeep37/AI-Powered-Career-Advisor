from flask import Flask, request, jsonify
import spacy
from flask_cors import CORS
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
nlp = spacy.load("en_core_web_md")

def extract_skills_from_description(description):
    doc = nlp(description)
    extracted_skills = set()
    for token in doc:
        if token.pos_ in ["NOUN", "PROPN"] and not token.is_stop:
            extracted_skills.add(token.text)
    return list(extracted_skills)

def calculate_match_score_nlp(user_profile, job_listing):
    extracted_skills = extract_skills_from_description(job_listing['description'])
    
    user_skills = nlp(" ".join(user_profile['skills']))
    job_skills = nlp(" ".join(extracted_skills))
    skills_similarity = user_skills.similarity(job_skills)

    user_interests = nlp(" ".join(user_profile['interests']))
    job_description = nlp(job_listing['description'])
    interests_similarity = user_interests.similarity(job_description)

    match_score = (skills_similarity * 0.7) + (interests_similarity * 0.3)
    return match_score

@app.route('/match_jobs', methods=['POST'])
def match_jobs():
    data = request.json
    user_profile = data.get('user_profile')
    job_listings = data.get('job_listings')

    if not user_profile or not job_listings:
        return jsonify({'error': 'User profile and job listings are required'}), 400

    matched_jobs = []
    for job in job_listings:
        score = calculate_match_score_nlp(user_profile, job)
        matched_jobs.append({
            'jobId': job['jobId'],
            'title': job['title'],
            'companyUniversalName': job['companyUniversalName'],
            'formattedLocation': job['formattedLocation'],
            'formattedEmploymentStatus': job['formattedEmploymentStatus'],
            'formattedExperienceLevel': job['formattedExperienceLevel'],
            'companyApplyUrl': job['companyApplyUrl'],
            'jobPostingUrl': job['jobPostingUrl'],
            'match_score': score
        })

    matched_jobs = sorted(matched_jobs, key=lambda x: x['match_score'], reverse=True)[:10]

    return jsonify(matched_jobs)

if __name__ == '__main__':
    app.run(debug=True,port=5001)
