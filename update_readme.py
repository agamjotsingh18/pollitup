import requests

# Fetch contributors using GitHub API
owner = "agamjotsingh18"
repo = "pollitup"
url = f"https://api.github.com/repos/{owner}/{repo}/contributors"
response = requests.get(url)
contributors = response.json()

# Process contributors' information
contributor_info = []
for index, contributor in enumerate(contributors, 1):
    username = contributor['login']
    profile_url = contributor['html_url']
    avatar_url = contributor['avatar_url']
    contributions = contributor['contributions']

    # Add a new row for every 7 contributors
    if (index - 1) % 7 == 0:
        contributor_info.append("  </tr>")
        contributor_info.append("  <tr>")
        
    # Format contributor information with rounded images
    contributor_info.append(f'    <td align="center"><a href="{profile_url}"><img src="{avatar_url}" width="100px;" style="border-radius: 50%;" alt="{username}"/><br /><sub><b>{username}</b></sub></a><br /><a href="https://github.com/{owner}/{repo}/commits?author={username}" title="Contributions">📖</a></td>')

# Read existing README content
with open("README.md", "r") as readme_file:
    readme_content = readme_file.read()

# Update README with contributor information
updated_content = readme_content.replace("<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->", "<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->\n<!-- prettier-ignore-start -->\n<!-- markdownlint-disable -->\n<table>\n  <tr>\n" + "\n".join(contributor_info) + "\n  </tr>\n</table>\n<!-- markdownlint-restore -->\n<!-- prettier-ignore-end -->")

# Write the updated README
with open("README.md", "w") as readme_file:
    readme_file.write(updated_content)
