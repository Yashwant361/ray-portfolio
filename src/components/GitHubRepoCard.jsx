import { motion } from 'framer-motion'
import { FiGithub, FiStar, FiGitBranch, FiExternalLink } from 'react-icons/fi'
import { getLanguageColor } from '../services/github'

export default function GitHubRepoCard({ repo, index = 0 }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="card p-4 flex flex-col gap-3 cursor-pointer group hover:border-brand-500/40 block"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <FiGithub className="dark:text-slate-400 text-slate-500 shrink-0" size={16} />
          <span className="font-mono text-sm font-semibold text-brand-500 group-hover:underline truncate max-w-[160px]">
            {repo.name}
          </span>
        </div>
        <FiExternalLink className="dark:text-slate-500 text-slate-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
      </div>

      <p className="text-xs dark:text-slate-400 text-slate-500 leading-relaxed line-clamp-2 flex-1">
        {repo.description || 'No description provided.'}
      </p>

      <div className="flex items-center gap-3 text-xs dark:text-slate-500 text-slate-400">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            />
            <span>{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <FiStar size={11} />
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <FiGitBranch size={11} />
          <span>{repo.forks_count}</span>
        </div>
      </div>
    </motion.a>
  )
}
