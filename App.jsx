import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import { MarkGithubIcon } from '@primer/octicons-react';

const ContributorPage = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/repos/agamjotsingh18/pollitup/contributors')
      .then(response => response.json())
      .then(data => {
        setContributors(data);
      })
      .catch(error => {
        console.log('Error fetching contributors:', error);
      });
  }, []);

  return (
    <div>
      <div style={styles.contributorsContainer}>
        {contributors.map(contributor => (
          <div key={contributor.id} style={styles.contributorItem}>
            <img src={contributor.avatar_url} alt={contributor.login} style={styles.avatar} />
            <p style={styles.username}>{contributor.login}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>
      <h1 style={styles.pageHeading}>CONTRIBUTORS</h1>
      <p style={styles.motivation}>
        "Make a difference. Share your expertise. Build together. Inspire innovation. Embrace open source collaboration."
      </p>
      <a href="https://github.com/agamjotsingh18/pollitup" target="_blank" rel="noopener noreferrer" style={styles.githubButton}>
        <MarkGithubIcon size={20} style={styles.githubIcon} />
        GitHub
      </a>
      <ContributorPage />
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
  },
  logo: {
    width: '130px',
    height: '50px',
    padding: '10px',
    paddingLeft: '15px',
  },
  pageHeading: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  motivation: {
    fontSize: '20px',
    margin: '10px',
    marginBottom: '25px',
    fontWeight: 'medium',
    fontStyle: 'italic',
  },
  githubButton: {
    display: 'inline-block',
    padding: '8px 16px',
    width:'100px',
    position:'relative',
    left:'700px',
    backgroundColor: '#24292e',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '4px',
    textDecoration: 'none',
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap:'5px'
  },
  githubIcon: {
    marginRight: '5px',
  },
  contributorsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  contributorItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
  },
  username: {
    marginTop: '10px',
    fontWeight: 'bold',
  },
};

export default App;
