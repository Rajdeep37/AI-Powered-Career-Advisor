import requests
import json

url = "http://127.0.0.1:5000/analyze"
file_path = "C:\\Users\\rajde\\Downloads\\Rajdeep_Resume (2).pdf"

with open(file_path, 'rb') as file:
    files = {'resume': file}
    data = {
        'job_description': 'Software Engineer with experience in web development',
        'analysis_option': '2'
    }
    response = requests.post(url, files=files, data=data)

# Parse the JSON response
response_data = response.json()

# Pretty print the response
if 'analysis_results' in response_data:
    print("Analysis Results:")
    print(json.dumps(response_data['analysis_results'], indent=2, ensure_ascii=False))
else:
    print("Error:")
    print(response_data.get('error', 'Unknown error occurred'))
