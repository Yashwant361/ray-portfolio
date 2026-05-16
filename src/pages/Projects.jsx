import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiGrid, FiList } from 'react-icons/fi'
import PageTransition from '../components/PageTransition'
import SectionHeader from '../components/SectionHeader'
import ProjectCard from '../components/ProjectCard'
import GitHubRepoCard from '../components/GitHubRepoCard'
import { fetchGithubRepos, fetchGithubProfile } from '../services/github'
import data from '../data/portfolio.json'

const FILTERS = ['All', 'Full Stack', 'Data Analysis', 'Frontend']

export default function Projects() {
  const { projects } = data
  const [filter, setFilter] = useState('All')
  const [githubRepos, setGithubRepos] = useState([])
  const [githubProfile, setGithubProfile] = useState(null)
  const [githubLoading, setGithubLoading] = useState(true)

  useEffect(() => {
    const loadGithub = async () => {
      const [repos, profile] = await Promise.all([
        fetchGithubRepos(),
        fetchGithubProfile(),
      ])
      setGithubRepos(repos)
      setGithubProfile(profile)
      setGithubLoading(false)
    }
    loadGithub()
  }, [])

  const filtered = projects.filter(p => {
    if (filter === 'All') return true
    if (filter === 'Full Stack') return p.type === 'fullstack'
    if (filter === 'Data Analysis') return p.type === 'data'
    if (filter === 'Frontend') return p.type === 'frontend'
    return true
  })

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto section-padding">

        {/* Header */}
        <SectionHeader
          eyebrow="Portfolio"
          title="Projects I've Built"
          subtitle="From MERN full-stack apps to beginner data dashboards — here's what I've shipped."
          centered
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium font-body transition-all duration-200 ${
                filter === f
                  ? 'bg-brand-500 text-white shadow-glow-teal'
                  : 'dark:bg-dark-600 bg-slate-100 dark:text-slate-300 text-slate-600 hover:border-brand-500 border border-transparent dark:border-dark-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub Repos section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <SectionHeader
              eyebrow="Open Source"
              title={
                <span className="flex items-center gap-3">
                  GitHub Activity
                  <FiGithub className="dark:text-slate-500 text-slate-400" size={28} />
                </span>
              }
              subtitle="My latest public repositories, fetched live from GitHub API."
            />
            {githubProfile && (
              <a
                href={`https://github.com/${githubProfile.login}`}
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center gap-2 dark:bg-dark-600 bg-white border dark:border-dark-500 border-slate-200 px-4 py-2 rounded-xl text-sm dark:text-slate-300 text-slate-600 hover:border-brand-500 transition-all"
              >
                <FiGithub size={14} />
                {githubProfile.public_repos} public repos
              </a>
            )}
          </div>

          {githubLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card p-4 h-28 animate-pulse">
                  <div className="h-3 dark:bg-dark-500 bg-slate-200 rounded w-2/3 mb-3" />
                  <div className="h-2 dark:bg-dark-500 bg-slate-200 rounded w-full mb-2" />
                  <div className="h-2 dark:bg-dark-500 bg-slate-200 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : githubRepos.length === 0 ? (
            <div className="card p-8 text-center dark:text-slate-500 text-slate-400">
              <FiGithub size={32} className="mx-auto mb-3 opacity-50" />
              <p className="text-sm">
                GitHub repos couldn't be loaded right now. Set{' '}
                <code className="font-mono text-brand-500">VITE_GITHUB_USERNAME</code> in your .env to enable this.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {githubRepos.slice(0, 9).map((repo, i) => (
                <GitHubRepoCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
