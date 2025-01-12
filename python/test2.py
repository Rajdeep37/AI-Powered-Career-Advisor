import requests

# API endpoint URL
url = "http://127.0.0.1:5000/match_jobs"

# Data to send in the request
data = {
    "user_profile": {
        "education": "Bachelor of Computer Science",
        "experience": "none",
        "projects": "Built a web-based real-time interview system",
        "skills": ["JavaScript", "React", "Node.js", "MongoDB"],
        "interests": ["AI", "Machine Learning"]
    },
    "job_listings": [
        {
            "jobId": "1",
            "title": "Hiring ArcGIS Full stack developer with Angular and .Net",
            "description": "Job description: Location – PAN IndiaExperience – 5 – 8 YearsFull stack developer with Angular and .Net. Both angular and .net is mandatory Should have good web development experience Good with Web API and mapping experience Experience with Web server configuration and Databases Must have development experience with Angular,.net, Oracle and Web services."
        },
        {
            "jobId": "2",
            "title": "Senior Software Developer (Java) x3",
            "description": "Overview WELCOME TO SITA SITA is the leading specialist in air transport communications and information technology. We don’t just connect the global aviation industry, we apply decades of experience and expertise to address almost every core business, operational, baggage, and passenger process in air transport. As an organization, we cover 95% of all international air travel destinations and work with over 2,800 air transport and government customers in every corner of the globe. Immerse yourself in the dynamic world of technology while embracing our collaborative, and inclusive culture. Ready to redefine air travel? The journey starts here, with you at SITA. About The Role & Team As Senior Java Developer, you will be part of the technical design, development and maintenance of applications and systems using existing and emerging technology platforms. You will be accountable for writing and delivering functionality, documentation, unit test cases and integration tests as part of a fully Agile DevOps team. You will guide junior developers and non-technical business colleagues through the software development lifecycle, ensuring best practice and delivery of solutions on time and within budget. Reporting to the Software Development Manager, you will be a part of the Product Technology and Engineering team. The world is changing. Are you ready to define the future of travel with us? What You Will Do Grasp the technical direction of the product.Collaborate with your team to provide assistance and support.Follow existing coding guidelines, practices, and all technical processes, but be ready to feedback improvements and new ideas into that process to improve our practices.Understand and articulate how our software aligns within the wider architecture of the solution.Participate in analysis of requirements for designing new application and system features. Assist with documenting and expressing those requirements for business and technical stakeholders.Learn and integrate new technologies in a cutting-edge environment."
        },
        {
            "jobId": "3",
            "title": "Software Engineer",
            "description": "The ideal candidate will be responsible for developing high-quality applications. They will also be responsible for designing and implementing testable and scalable code. ResponsibilitiesShould have experience on PowerApps-Power Automate, Power Flow, (Canvas and Model driven)DAX, functions Data Modelling knowledge - one to many and Many to many relationship dimensional modelling, Facts & dimension tables, data model schema, snowflake schemaSQL - joins , normalization Experience Level-5-10 YearsLocation :Delhi NCRWork mode: Hybrid Qualification: B.E/B.Tech( Computers/Electronics/IT) or MCA"
        }
    ]
}

# Make a POST request to the API
response = requests.post(url, json=data)

# Print the response
if response.status_code == 200:
    print("Top matching jobs:")
    for job in response.json():
        print(f"Job ID: {job['jobId']}, Title: {job['title']}, Match Score: {job['match_score']}")
else:
    print(f"Error: {response.status_code}")
    print(response.json())
