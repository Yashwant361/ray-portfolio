import axios from 'axios'

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'ray-dev'
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || ''

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
  },
})

export const fetchGithubRepos = async () => {
  try {
    const { data } = await githubApi.get(`/users/${GITHUB_USERNAME}/repos`, {
      params: {
        sort: 'updated',
        per_page: 10,
        type: 'public',
      },
    })
    return data
      .filter(r => !r.fork)
      .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
  } catch (err) {
    console.error('GitHub API error:', err.message)
    return []
  }
}

export const fetchGithubProfile = async () => {
  try {
    const { data } = await githubApi.get(`/users/${GITHUB_USERNAME}`)
    return data
  } catch (err) {
    console.error('GitHub profile error:', err.message)
    return null
  }
}

export const getLanguageColor = (language) => {
  const colors = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Python: '#3776ab',
    HTML: '#e34f26',
    CSS: '#1572b6',
    Java: '#ed8b00',
    'C++': '#00599c',
    Go: '#00add8',
    Rust: '#ce422b',
    Shell: '#89e051',
  }
  return colors[language] || '#8b949e'
}
