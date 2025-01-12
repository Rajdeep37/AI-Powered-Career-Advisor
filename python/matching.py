from flask import Flask, request, jsonify
import spacy

app = Flask(__name__)

# Load spaCy model
nlp = spacy.load("en_core_web_md")

def extract_skills_from_description(description):
    """
    Dynamically extract potential skills from the job description using Named Entity Recognition (NER).
    """
    doc = nlp(description)
    # Extract nouns and proper nouns (common in skills)
    extracted_skills = set()
    for token in doc:
        if token.pos_ in ["NOUN", "PROPN"] and not token.is_stop:
            extracted_skills.add(token.text)
    return list(extracted_skills)

def calculate_match_score_nlp(user_profile, job_listing):
    """
    Calculate match score by extracting skills from job description
    and comparing with user skills.
    """
    # Extract skills dynamically from the job description
    extracted_skills = extract_skills_from_description(job_listing['description'])
    
    # Skills similarity
    user_skills = nlp(" ".join(user_profile['skills']))
    job_skills = nlp(" ".join(extracted_skills))
    skills_similarity = user_skills.similarity(job_skills)

    # Interest similarity with job description
    user_interests = nlp(" ".join(user_profile['interests']))
    job_description = nlp(job_listing['description'])
    interests_similarity = user_interests.similarity(job_description)

    # Calculate weighted match score
    match_score = (skills_similarity * 0.7) + (interests_similarity * 0.3)
    return match_score

@app.route('/match_jobs', methods=['POST'])
def match_jobs():
    data = request.json
    user_profile = data.get('user_profile')
    job_listings = data.get('job_listings')

    if not user_profile or not job_listings:
        return jsonify({'error': 'User profile and job listings are required'}), 400

    # Calculate scores for each job listing
    matched_jobs = []
    for job in job_listings:
        score = calculate_match_score_nlp(user_profile, job)
        matched_jobs.append({
            'jobId': job['jobId'],
            'title': job['title'],
            'description': job['description'],
            'match_score': score
        })

    # Sort jobs by match score in descending order and return the top 10
    matched_jobs = sorted(matched_jobs, key=lambda x: x['match_score'], reverse=True)[:10]

    return jsonify(matched_jobs)

if __name__ == '__main__':
    app.run(debug=True)
