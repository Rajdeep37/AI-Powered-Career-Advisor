import torch
from transformers import AutoTokenizer, AutoModel
from sklearn.metrics.pairwise import cosine_similarity
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re
import json
import numpy as np

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModel.from_pretrained("bert-base-uncased")
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'\W', ' ', text)
    words = word_tokenize(text)
    return [word for word in words if word not in stop_words]

def get_embeddings(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    outputs = model(**inputs)
    embeddings = outputs.last_hidden_state.mean(dim=1) 
    return embeddings

def calculate_similarity(embedding1, embedding2):
    similarity = cosine_similarity(embedding1.detach().numpy(), embedding2.detach().numpy())
    return similarity[0][0]

def skill_overlap_score(user_skills, job_skills):
    matched_skills = set(user_skills).intersection(set(job_skills))
    return len(matched_skills) / len(job_skills)

def calculate_match_score(profile_embedding, job_embedding, user_skills, job_skills, skill_weight=0.7, embedding_weight=0.3):
    similarity_score = calculate_similarity(profile_embedding, job_embedding)
    skill_score = skill_overlap_score(user_skills, job_skills)
    return skill_weight * skill_score + embedding_weight * similarity_score

def recommend_jobs(user_profile, job_listings):
    user_text = f"{user_profile['education']} {user_profile['experience']} {user_profile['projects']} {user_profile['interests']}"
    user_embedding = get_embeddings(user_text)
    
    recommendations = []
    for job in job_listings:
        job_text = f"{job['title']} {job['description']} {job['skills']}"
        job_embedding = get_embeddings(job_text)
        
        match_score = calculate_match_score(
            user_embedding,
            job_embedding,
            user_profile['skills'],
            job['skills']
        )
        
        recommendations.append({
            'jobId': job['jobId'],
            'title': job['title'],
            'matchScore': match_score
        })
    
    recommendations = sorted(recommendations, key=lambda x: x['matchScore'], reverse=True)
    return recommendations


# Sample user profile and job listings
user_profile = {
    'education': 'Bachelor of Computer Science',
    'experience': 'none',
    'projects': 'Built a web-based real-time interview system',
    'skills': ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    'interests': ['AI', 'Machine Learning']
}

job_listings = [
    {
        'jobId': '1',
        'title': 'Frontend Developer',
        'description': 'Looking for a frontend developer skilled in React and JavaScript',
        'skills': ['JavaScript', 'React', 'CSS']
    },
    {
        'jobId': '2',
        'title': 'Backend Engineer',
        'description': 'Seeking a backend engineer with experience in Node.js and MongoDB',
        'skills': ['Node.js', 'MongoDB', 'Express']
    },
    {
        'jobId': '3',
        'title': 'ML Developer',
        'description': 'Seeking a machine learning engineer with experience in AWS',
        'skills': ['Python', 'Pandas', 'MySQL']
    }
]


recommendations = recommend_jobs(user_profile, job_listings)
for rec in recommendations:
    print(f"Job ID: {rec['jobId']}, Title: {rec['title']}, Match Score: {rec['matchScore']}")

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.float32):
            return float(obj)
        return super(NpEncoder, self).default(obj)

with open("data.js", "w") as file:
    file.write("const data = ")
    json.dump(recommendations, file, cls=NpEncoder)
    file.write(";")


