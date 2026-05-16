import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function SkillBar({ skill, index = 0 }) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-base">{skill.icon}</span>
          <span className="text-sm font-medium dark:text-slate-300 text-slate-700 font-body">
            {skill.name}
          </span>
        </div>
        <span className="text-xs font-mono dark:text-slate-500 text-slate-400 font-semibold">
          {skill.level}%
        </span>
      </div>
      <div className="h-1.5 dark:bg-dark-500 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.08 + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: `linear-gradient(90deg, #14b8a6, #6366f1)`,
          }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" style={{ animationDuration: '2s' }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export function SkillCard({ skill, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="card p-4 flex flex-col items-center gap-2 cursor-default hover:border-brand-500/40"
    >
      <span className="text-3xl">{skill.icon}</span>
      <span className="text-sm font-medium dark:text-slate-300 text-slate-600 text-center font-body">
        {skill.name}
      </span>
      <div className="w-full h-1 dark:bg-dark-500 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: index * 0.07 + 0.3, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #14b8a6, #6366f1)' }}
        />
      </div>
      <span className="text-xs font-mono dark:text-slate-500 text-slate-400">{skill.level}%</span>
    </motion.div>
  )
}
