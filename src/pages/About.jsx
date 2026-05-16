import { motion } from 'framer-motion'
import { FiCode, FiDatabase, FiServer, FiTrendingUp, FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi'
import PageTransition from '../components/PageTransition'
import SectionHeader from '../components/SectionHeader'
import SkillBar from '../components/SkillBar'
import data from '../data/portfolio.json'

const categories = [
  { key: 'frontend', label: 'Frontend', icon: FiCode, color: 'text-brand-500', bg: 'bg-brand-500/10' },
  { key: 'backend', label: 'Backend', icon: FiServer, color: 'text-accent-400', bg: 'bg-accent-500/10' },
  { key: 'database', label: 'Database', icon: FiDatabase, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { key: 'data', label: 'Data Analysis', icon: FiTrendingUp, color: 'text-pink-400', bg: 'bg-pink-500/10', badge: 'Learning' },
]

const timeline = [
  { year: '2022', title: 'The Spark', desc: 'Discovered programming through YouTube. Fell in love with JavaScript after building a simple to-do app.' },
  { year: '2023', title: 'Going Full Stack', desc: 'Learned Node.js, Express, MongoDB. Built my first MERN app. Realised I wanted to be a builder, not just a learner.' },
  { year: '2024', title: 'Leveling Up', desc: 'Earned HackerRank 3★ in Problem Solving. Deployed 5+ projects. Started exploring SQL and data analysis.' },
  { year: 'Now', title: 'Job Ready', desc: 'Actively seeking Full Stack Developer roles (6–10 LPA). Bridging dev + data worlds.' },
]

export default function About() {
  const { personal, about, skills } = data

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto section-padding">

        {/* ── Intro ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-brand-500" />
              <span className="text-xs font-mono font-semibold text-brand-500 uppercase tracking-widest">About Me</span>
            </div>
            <h1 className="heading-lg dark:text-white text-dark-900 mb-6">
              The human behind the code
            </h1>
            <div className="space-y-4 dark:text-slate-400 text-slate-500 leading-relaxed">
              <p>{about.story}</p>
              <p>{about.journey}</p>
              <p>
                <span className="text-brand-500 font-semibold">Current goal:</span>{' '}
                {about.goal}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={personal.resumeUrl} className="btn-primary">
                <FiDownload size={15} /> Download Resume
              </a>
              <a href={`https://github.com/${personal.github}`} target="_blank" rel="noreferrer" className="btn-outline">
                <FiGithub size={15} /> GitHub
              </a>
              <a href={`https://linkedin.com/in/${personal.linkedin}`} target="_blank" rel="noreferrer" className="btn-outline">
                <FiLinkedin size={15} /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Glow behind */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 blur-2xl scale-110" />
              <div className="relative card p-8 text-center">
                {/* Avatar placeholder */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 mx-auto mb-5 flex items-center justify-center shadow-glow-teal">
                  <span className="text-4xl font-display font-bold text-white">R</span>
                </div>
                <h2 className="font-display font-bold text-xl dark:text-white text-dark-900 mb-1">{personal.name}</h2>
                <p className="text-sm text-brand-500 font-mono mb-4">{personal.role}</p>
                <div className="space-y-2 text-left">
                  {[
                    { label: 'Location', value: personal.location },
                    { label: 'Email', value: personal.email },
                    { label: 'Target Role', value: 'Full Stack Dev' },
                    { label: 'Target CTC', value: '6–10 LPA' },
                    { label: 'Status', value: '🟢 Open to Work' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="dark:text-slate-500 text-slate-400">{label}</span>
                      <span className="dark:text-slate-300 text-slate-600 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Timeline ── */}
        <div className="mb-24">
          <SectionHeader eyebrow="Journey" title="My Story So Far" />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500 via-accent-500 to-transparent" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex gap-6 md:gap-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 top-2 w-3 h-3 rounded-full bg-brand-500 border-2 border-brand-500/30 shadow-glow-teal -translate-x-1/2 z-10" />

                  {/* Card */}
                  <div className={`ml-12 md:ml-0 md:w-5/12 card p-5 ${i % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                    <span className="font-mono text-xs text-brand-500 font-semibold">{item.year}</span>
                    <h3 className="font-display font-bold dark:text-white text-dark-900 mt-1 mb-2">{item.title}</h3>
                    <p className="text-sm dark:text-slate-400 text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Skills breakdown ── */}
        <div>
          <SectionHeader eyebrow="Capabilities" title="Skills Breakdown" subtitle="Organized by category — honest percentages, no fluff." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map(({ key, label, icon: Icon, color, bg, badge }) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                    <Icon className={color} size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold dark:text-white text-dark-900">{label}</h3>
                    {badge && (
                      <span className="text-xs font-mono text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full">
                        {badge}
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  {skills[key].map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} index={i} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
