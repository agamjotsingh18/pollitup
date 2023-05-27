import requests

# Fetch contributors using GitHub API
owner = "agamjotsingh18"
repo = "pollitup"
url = f"https://api.github.com/repos/{owner}/{repo}/contributors"
response = requests.get(url)
contributors = response.json()

# Process contributors' information
contributor_info = []
for contributor in contributors:
    username = contributor['login']
    profile_url = contributor['html_url']
    avatar_url = contributor['avatar_url']
    contributions = contributor['contributions']

    contributor_info.append(f'<div align="center"><img src="{avatar_url}" width="100px" alt="{username}"/><br/><a href="{profile_url}">{username}</a><br/>{contributions} contributions</div>')

# Read existing README content
with open("README.md", "r") as readme_file:
    readme_content = readme_file.read()

# Update README with contributor information
updated_content = readme_content + "\n\n## Contributors\n\n<div align='center'>\n" + "\n".join(contributor_info) + "\n</div>"

# Write the updated README
with open("README.md", "w") as readme_file:
    readme_file.write(updated_content)
