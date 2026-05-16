import { motion } from 'framer-motion'
import { FiCode, FiServer, FiDatabase, FiTrendingUp, FiTool } from 'react-icons/fi'
import PageTransition from '../components/PageTransition'
import SectionHeader from '../components/SectionHeader'
import SkillBar, { SkillCard } from '../components/SkillBar'
import data from '../data/portfolio.json'

const categories = [
  {
    key: 'frontend',
    label: 'Frontend Development',
    icon: FiCode,
    desc: 'Building responsive, interactive UIs with React and modern CSS.',
    color: 'brand',
    iconBg: 'bg-brand-500/10',
    iconColor: 'text-brand-500',
    borderColor: 'border-brand-500/20',
  },
  {
    key: 'backend',
    label: 'Backend Development',
    icon: FiServer,
    desc: 'REST APIs, middleware, JWT auth and server-side logic with Node + Express.',
    color: 'accent',
    iconBg: 'bg-accent-500/10',
    iconColor: 'text-accent-400',
    borderColor: 'border-accent-500/20',
  },
  {
    key: 'database',
    label: 'Database',
    icon: FiDatabase,
    desc: 'MongoDB for NoSQL and MySQL/SQL for relational data modelling.',
    color: 'yellow',
    iconBg: 'bg-yellow-500/10',
    iconColor: 'text-yellow-500',
    borderColor: 'border-yellow-500/20',
  },
  {
    key: 'data',
    label: 'Data Analysis',
    icon: FiTrendingUp,
    desc: 'Just started — Python, Pandas, Excel. Growing fast.',
    color: 'pink',
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-400',
    borderColor: 'border-pink-500/20',
    badge: '🌱 Learning Phase',
  },
  {
    key: 'tools',
    label: 'Tools & Others',
    icon: FiTool,
    desc: 'Git, GitHub, Postman, VS Code and beginner DSA fundamentals.',
    color: 'slate',
    iconBg: 'dark:bg-dark-500 bg-slate-100',
    iconColor: 'dark:text-slate-400 text-slate-500',
    borderColor: 'dark:border-dark-500 border-slate-200',
  },
]

const techIcons = [
  { name: 'React', emoji: '⚛️' },
  { name: 'Node.js', emoji: '🟢' },
  { name: 'MongoDB', emoji: '🍃' },
  { name: 'Express', emoji: '🚀' },
  { name: 'JavaScript', emoji: '🟨' },
  { name: 'SQL', emoji: '🗄️' },
  { name: 'Python', emoji: '🐍' },
  { name: 'Git', emoji: '🐙' },
  { name: 'Tailwind', emoji: '💨' },
  { name: 'REST API', emoji: '🔗' },
  { name: 'JWT', emoji: '🔐' },
  { name: 'Pandas', emoji: '🐼' },
]

export default function Skills() {
  const { skills } = data

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto section-padding">

        <SectionHeader
          eyebrow="Expertise"
          title="Skills & Proficiencies"
          subtitle="Transparent self-assessment — what I know, what I'm learning, and how deep I go."
          centered
        />

        {/* Tech orbit / cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-2.5 justify-center mb-16 max-w-2xl mx-auto"
        >
          {techIcons.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.12, y: -4 }}
              className="flex items-center gap-2 px-3 py-1.5 card cursor-default hover:border-brand-500/40 hover:shadow-glow-teal"
            >
              <span className="text-lg">{t.emoji}</span>
              <span className="text-sm font-mono dark:text-slate-300 text-slate-600">{t.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill bars by category */}
        <div className="space-y-8">
          {categories.map(({ key, label, icon: Icon, desc, iconBg, iconColor, borderColor, badge }) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`card p-6 border ${borderColor}`}
            >
              {/* Category header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className={iconColor} size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold dark:text-white text-dark-900">{label}</h3>
                      {badge && (
                        <span className="text-xs font-mono text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">
                          {badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5">{desc}</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="text-xs font-mono dark:text-slate-500 text-slate-400">
                    avg {Math.round(skills[key].reduce((a, s) => a + s.level, 0) / skills[key].length)}%
                  </span>
                </div>
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills[key].map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 card p-6"
          style={{ borderColor: 'rgba(99,102,241,0.2)' }}
        >
          <h3 className="font-display font-bold dark:text-white text-dark-900 mb-2">
            📍 What's Next on My Radar
          </h3>
          <p className="text-sm dark:text-slate-400 text-slate-500 mb-4">
            Skills I'm actively working towards in the next 6 months:
          </p>
          <div className="flex flex-wrap gap-2">
            {['TypeScript', 'Docker', 'Redis', 'GraphQL', 'Next.js', 'AWS basics', 'Machine Learning basics'].map(t => (
              <span key={t} className="tag-indigo">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
