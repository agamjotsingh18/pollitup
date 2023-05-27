import requests

# Fetch contributors using GitHub API
owner = "agamjotsingh18"
repo = "pollitup"
url = f"https://api.github.com/repos/{owner}/{repo}/contributors"
response = requests.get(url)
contributors = response.json()

# Process contributors' information excluding bots
contributor_info = []
for index, contributor in enumerate(contributors, 1):
    username = contributor['login']
    profile_url = contributor['html_url']
    avatar_url = contributor['avatar_url']
    contributions = contributor['contributions']

    # Check if the contributor is a bot
    if not contributor['type'] == 'User':
        continue

    # Add a new row for every 7 contributors
    if (index - 1) % 7 == 0:
        contributor_info.append("  </tr>")
        contributor_info.append("  <tr>")

    # Format contributor information with rounded images
    contributor_info.append(f'    <td align="center"><a href="{profile_url}"><img src="{avatar_url}" width="100px;" style="border-radius: 50%;" alt="{username}"/><br /><sub><b>{username}</b></sub></a><br /><a href="https://github.com/{owner}/{repo}/commits?author={username}" title="Contributions">📖</a></td>')

# Read existing README content
with open("README.md", "r") as readme_file:
    readme_content = readme_file.read()

# Remove previous contributor list
start_marker = "<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->"
end_marker = "<!-- ALL-CONTRIBUTORS-LIST:END -->"
start_index = readme_content.find(start_marker)
end_index = readme_content.find(end_marker) + len(end_marker)
updated_content = readme_content[:start_index] + readme_content[end_index:]

# Insert new contributor list
insert_index = updated_content.find("<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->", start_index)
insert_content = f'{start_marker}\n<!-- prettier-ignore-start -->\n<!-- markdownlint-disable -->\n<table>\n  <tr>\n' + "\n".join(contributor_info) + '\n  </tr>\n</table>\n<!-- markdownlint-restore -->\n<!-- prettier-ignore-end -->\n{end_marker}\n'
updated_content = updated_content[:insert_index] + insert_content + updated_content[insert_index:]

# Write the updated README
with open("README.md", "w") as readme_file:
    readme_file.write(updated_content)
