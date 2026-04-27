const axios = require('axios');

async function debug() {
  const USERNAME = 'tarunyaio';
  console.log(`Checking GitHub for ${USERNAME}...`);
  try {
    const gh = await axios.get(`https://api.github.com/users/${USERNAME}`);
    console.log('GitHub User:', gh.data.login, 'Repos:', gh.data.public_repos);
    
    const repos = await axios.get(`https://api.github.com/users/${USERNAME}/repos?per_page=100`);
    console.log('GitHub Repos Count:', repos.data.length);
    const stars = repos.data.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    console.log('Total Stars:', stars);
  } catch (e) {
    console.error('GitHub Error:', e.message);
  }

  console.log(`\nChecking Codeforces for ${USERNAME}...`);
  try {
    const cf = await axios.get(`https://codeforces.com/api/user.info?handles=${USERNAME}`);
    console.log('Codeforces Status:', cf.data.status);
    if (cf.data.result) {
      console.log('Codeforces User:', cf.data.result[0].handle, 'Rating:', cf.data.result[0].rating);
    }
    
    const status = await axios.get(`https://codeforces.com/api/user.status?handle=${USERNAME}`);
    console.log('Codeforces Submissions:', status.data.result.length);
  } catch (e) {
    console.error('Codeforces Error:', e.message);
  }
}

debug();
