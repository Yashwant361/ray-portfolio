import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi'

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full ${project.type === 'fullstack'
              ? 'bg-brand-500/90 text-white'
              : project.type === 'data'
                ? 'bg-accent-500/90 text-white'
                : 'bg-slate-700/90 text-white'
            }`}>
            {project.type === 'fullstack' ? 'Full Stack' : project.type === 'data' ? 'Data Analysis' : 'Frontend'}
          </span>
        </div>

        {/* Links overlay */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-brand-500 transition-colors"
            aria-label="GitHub"
          >
            <FiGithub size={14} />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-brand-500 transition-colors"
            aria-label="Live Demo"
          >
            <FiExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-lg dark:text-white text-dark-900 mb-2 leading-tight">
          {project.title}
        </h3>
        <p className="text-sm dark:text-slate-400 text-slate-500 leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((tech) => (
            <span key={tech} className="tag-teal">{tech}</span>
          ))}
          {project.tech.length > 4 && (
            <span className="tag dark:bg-dark-500 bg-slate-100 dark:text-slate-400 text-slate-500">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-1.5 mb-4">
          {project.highlights.map((h) => (
            <div key={h} className="flex items-center gap-1.5 text-xs dark:text-slate-400 text-slate-500">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
              {h}
            </div>
          ))}
        </div>

        {/* Action links */}
        <div className="flex gap-2 pt-2 border-t dark:border-dark-500 border-slate-100">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex-1 btn-outline text-xs py-2 justify-center"
          >
            <FiGithub size={13} /> Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="flex-1 btn-primary text-xs py-2 justify-center"
          >
            <FiExternalLink size={13} /> Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  )
}
