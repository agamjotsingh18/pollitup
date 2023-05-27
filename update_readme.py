import requests

# Fetch contributors using GitHub API
owner = "agamjotsingh18"
repo = "pollitup"
url = f"https://api.github.com/repos/{owner}/{repo}/contributors"
response = requests.get(url)
contributors = response.json()
contributors_count = len(response.json())

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

# Construct the updated README content
new_readme_content = '''\

# Poll It Up ~ A community polling app with unlimited potential

<p align="center">
  <img src="https://user-images.githubusercontent.com/88102392/239682688-0c5debf5-d414-4916-87d8-e1a710773ae3.png" alt="image">
</p>

<h1 align="center">Contributions Accepted under GSSoC '23</h1>

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![Contributors](https://img.shields.io/badge/all_contributors-'''{contributors_count}'''-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


<img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome" /> <a href="https://github.com/agamjotsingh18/pollitup/pulls" target="_blank"><img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/agamjotsingh18/pollitup?style=for-the-badge" /></a> <a href="https://github.com/agamjotsingh18/pollitup/issues" target="_blank"><img alt="GitHub issues" src="https://img.shields.io/github/issues/agamjotsingh18/pollitup?style=for-the-badge" /></a> <a href="https://github.com/agamjotsingh18/pollitup/blob/master/README.md#contributors-" target="_blank"></a>

## About The Project
- Teachers, members of the government, and even concerned citizens can launch polls about problems they are facing to get opinions on the best method to approach the problem. Or, anyone can create polls just for fun!.<br>
- The community can pick and choose which polls are most important for them, this can allow the community to prioritize the most urgent polls that could potentially cause drastic reforms.<br>
- Easily find polls near you. You can answer polls related to problems that are arising in your community that can help better the environment, aid in the growth of local startups, allow you to share your ideas with your local government, and so much more!<br>
- Poll It Up is **PWA optimized**, so you can download it and run it as if it were a native app!

## Before You Start
<ul>
<li>Try to maintain the file format & folder structure. </li>
<li>Try to maintain proper file names. </li>
<li>Don't use capital or spaces for files names instead use _ or -. </li>
</ul>

## Getting Started
Please follow these simple steps to start working:<br>

**1.**  If you want to work on issue then comment. If you get assigned, Fork [this](https://github.com/agamjotsingh18/pollitup.git) repository.

**2.**  Clone your forked copy of the project.

```
git clone https://github.com/agamjotsingh18/pollitup.git
```

**3.** Navigate to your project directory and open it in your code editor. :file_folder: .

```
cd pollitup
```

**4.** Add a reference(remote) to the original repository.

```
git remote add upstream https://github.com/agamjotsingh18/pollitup.git
```

**5.** Check the remotes for this repository.
```
git remote -v
```

**6.** Always take a pull from the upstream repository to your master branch to keep it at par with the main project(updated repository).

```
git pull upstream main
```

**7.** Create a new branch.

```
git checkout -b <your_branch_name>
```

**8.** Perform your desired changes to the code base.


**9.** Track your changes:heavy_check_mark: .

```
git add . 
```

**10.** Commit your changes .

```
git commit -m "Relevant message"
```

**11.** Push the committed changes in your feature branch to your remote repo.
```
git push -u origin <your_branch_name>
```

**12.** Open a Pull Request with a name of the issue and describe about your changes with reasons. To create a pull request, click on `compare and pull requests`. Please ensure you compare your feature branch to the desired branch of the repository you are supposed to make a PR to.


**13.** Add appropriate title and description to your pull request explaining your changes and efforts done.


**14.** Click on `Create Pull Request`.


**15** Voila!<br>
![Whoohooo!](https://media3.giphy.com/media/sgswHaZw5yklq/giphy.gif?cid=ecf05e4752791acvsi719im8d4lib8z33uxbga6secdplwq2&rid=giphy.gif)

## Add Your Name
Once your PR got merged, do not forget to add your name in [CONTRIBUTING.md](https://github.com/agamjotsingh18/pollitup/blob/main/CONTRIBUTING.md) file. 
Further instructions are mentioned there.

## Roadmap
See the open issues for a full list of proposed features (and known issues).<br>

 - Documentation at some places.<br>
 - Addition of Some Cool Styles.<br>
 - Addition of More Useful Libraries.<br>
 - Give Chance to user to add their Library.<br>
 - More Features for More Interactivity in Site.<br>
 - Developing in Next Js with more features.<br>

## Contributors:

### The Wonderful People Who Contributed Here

<table>
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
  <tr>
'''
new_readme_content += "\n".join(contributor_info)
new_readme_content += '''
  </tr>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
</table>


<hr>
<p align="left">
<h3 align="left">Contact:</h3>
<a href="https://www.linkedin.com/in/agamjot-singh/" target="blank"><img align="center" src="https://img.icons8.com/bubbles/100/000000/linkedin.png" height="75" width="75" /></a>&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://twitter.com/_agamjotsingh/" target="blank"><img align="center" src="https://img.icons8.com/bubbles/344/twitter-squared.png" height="75" width="75" /></a>&nbsp;&nbsp;&nbsp;&nbsp;
<a href="mailto:agamjotsingh1801@gmail.com" target="blank"><img align="center" src="https://img.icons8.com/bubbles/100/000000/email.png" height="75" width="75" /></a>&nbsp;&nbsp;&nbsp;&nbsp;
</p>
</hr>


<p align="right"><a href="#top">Back to top</a></p>

'''

# Write the updated README content to the file
with open("README.md", "w") as readme_file:
    readme_file.write(new_readme_content)
