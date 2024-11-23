import requests
import json
from datetime import datetime

EXCLUDED_REPOS = ['sankeer28', 'sankeer28.github.io', 'Blender-Donut']

def fetch_and_save():
    headers = {'Accept': 'application/vnd.github.v3+json'}
    response = requests.get('https://api.github.com/users/sankeer28/repos?per_page=100&type=all', headers=headers)
    repos = response.json()
    
    processed_repos = []
    for repo in repos:
        if isinstance(repo, dict) and repo.get('name') not in EXCLUDED_REPOS:
            processed_repos.append({
                'title': repo['name'],
                'description': repo.get('description') or 'No description available',
                'technologies': [repo.get('language')] if repo.get('language') else [],
                'link': repo['html_url'],
                'stars': repo.get('stargazers_count', 0),
                'forks': repo.get('forks_count', 0),
                'created_at': datetime.strptime(repo['created_at'], '%Y-%m-%dT%H:%M:%SZ').strftime('%m/%d/%Y')
            })
    
    # Sort by creation date, newest first
    processed_repos.sort(key=lambda x: datetime.strptime(x['created_at'], '%m/%d/%Y'), reverse=True)
    
    with open('repos.json', 'w') as f:
        json.dump(processed_repos, f, indent=2)

fetch_and_save()
