import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiDownload, FiCode, FiDatabase, FiStar } from 'react-icons/fi'
import PageTransition from '../components/PageTransition'
import SectionHeader from '../components/SectionHeader'
import ProjectCard from '../components/ProjectCard'
import data from '../data/portfolio.json'

const highlights = [
  {
    icon: FiCode,
    label: 'MERN Developer',
    desc: 'Full-stack apps with React, Node, MongoDB',
    color: 'from-brand-500/20 to-brand-500/5',
    border: 'border-brand-500/20',
    iconColor: 'text-brand-500',
  },
  {
    icon: FiDatabase,
    label: 'Data Analyst',
    desc: 'Learning Python, Pandas & visualization',
    color: 'from-accent-500/20 to-accent-500/5',
    border: 'border-accent-500/20',
    iconColor: 'text-accent-400',
  },
  {
    icon: FiStar,
    label: 'HackerRank 3★',
    desc: 'Problem Solving certified',
    color: 'from-yellow-500/20 to-yellow-500/5',
    border: 'border-yellow-500/20',
    iconColor: 'text-yellow-500',
  },
]

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Home() {
  const { personal, projects, certifications } = data
  const featured = projects.filter(p => p.featured)

  return (
    <PageTransition>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-500/8 blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent-500/8 blur-[100px]" />
          {/* Grid dots */}
          <div
            className="absolute inset-0 opacity-30 dark:opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(20,184,166,0.15) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40">
          <motion.div variants={stagger} initial="initial" animate="animate">

            {/* Status pill */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-dark-600 bg-white border dark:border-dark-500 border-slate-200 shadow-sm">
                <span className="glow-dot" />
                <span className="text-xs font-mono dark:text-slate-300 text-slate-600">
                  Open to work · India
                </span>
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeUp}
              className="heading-xl dark:text-white text-dark-900 mb-4 leading-none"
            >
              Hey, I'm{' '}
              <span className="text-gradient">{personal.name}</span>
              <span className="text-brand-500">.</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={fadeUp} className="mb-6">
              <div className="flex items-center gap-2 text-xl md:text-2xl dark:text-slate-300 text-slate-600 font-body">
                <span>I build</span>
                <span className="text-brand-400 font-semibold font-display">
                  <TypeAnimation
                    sequence={[
                      'Full-Stack Web Apps', 2000,
                      'REST APIs with Node.js', 2000,
                      'React Frontends', 2000,
                      'Data Dashboards', 2000,
                      'MERN Solutions', 2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="text-lg dark:text-slate-400 text-slate-500 max-w-xl mb-10 leading-relaxed"
            >
              {/* {personal.tagline}. Targeting{' '}
              <span className="text-brand-500 font-semibold">6–10 LPA</span> roles as a
              Full Stack Developer. */}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-12">
              <Link to="/projects" className="btn-primary">
                View Projects <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Me <FiMail size={15} />
              </Link>
              <a
                href={personal.resumeUrl}
                className="inline-flex items-center gap-2 px-6 py-3 dark:bg-dark-600 bg-white border dark:border-dark-500 border-slate-200 dark:text-slate-300 text-slate-600 font-semibold rounded-xl hover:border-brand-500 transition-all duration-300 hover:-translate-y-0.5 text-sm"
              >
                <FiDownload size={15} /> Resume
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              {[
                { href: `https://github.com/${personal.github}`, icon: FiGithub, label: 'GitHub' },
                { href: `https://linkedin.com/in/${personal.linkedin}`, icon: FiLinkedin, label: 'LinkedIn' },
                { href: `mailto:${personal.email}`, icon: FiMail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl dark:bg-dark-600 bg-white border dark:border-dark-500 border-slate-200 flex items-center justify-center dark:text-slate-400 text-slate-500 hover:text-brand-500 hover:border-brand-500 hover:-translate-y-1 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
              <div className="w-px h-6 dark:bg-dark-500 bg-slate-200 mx-1" />
              {/* <span className="text-xs font-mono dark:text-slate-500 text-slate-400">
                github/{personal.github}
              </span> */}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono dark:text-slate-600 text-slate-400">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-8 bg-gradient-to-b from-brand-500 to-transparent rounded-full"
          />
        </motion.div>
      </section>

      {/* ── Highlights ── */}
      <section className="section-padding dark:bg-dark-800 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="What I bring"
            title="Quick Highlights"
            subtitle="Here's what makes me a strong candidate for your team."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`card p-6 bg-gradient-to-br ${h.color} border ${h.border}`}
              >
                <h.icon className={`${h.iconColor} mb-4`} size={28} />
                <h3 className="font-display font-bold text-lg dark:text-white text-dark-900 mb-2">
                  {h.label}
                </h3>
                <p className="text-sm dark:text-slate-400 text-slate-500">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Verified Skills"
            title="Certifications"
            subtitle="Professional certifications and coding achievements."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-6"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-52 object-cover rounded-2xl border dark:border-dark-500 border-slate-200 mb-5"
                />

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-brand-500">
                    {cert.platform}
                  </span>

                  <span className="text-xs dark:text-slate-400 text-slate-500">
                    {cert.date}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg dark:text-white text-dark-900 mb-4">
                  {cert.title}
                </h3>

                <a
                  href={cert.credential}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary inline-flex items-center gap-2 text-sm"
                >
                  View Certificate <FiArrowRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <SectionHeader
              eyebrow="Selected Work"
              title="Featured Projects"
              subtitle="A few things I've built recently."
            />
            <Link
              to="/projects"
              className="hidden md:flex items-center gap-1 text-sm text-brand-500 hover:text-brand-400 font-medium transition-colors"
            >
              All Projects <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/projects" className="btn-outline">
              All Projects <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats banner ── */}
      <section className="section-padding dark:bg-dark-800 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { value: '5+', label: 'Projects Built' },
              { value: '3★', label: 'HackerRank Rating' },
              { value: 'MERN', label: 'Core Stack' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-display font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm dark:text-slate-500 text-slate-400 font-body">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(20,184,166,0.15) 0%, rgba(99,102,241,0.15) 100%)',
              border: '1px solid rgba(20,184,166,0.2)',
            }}
          >
            <div className="absolute inset-0 dark:bg-dark-700/50 bg-white/50 backdrop-blur-sm rounded-3xl" />
            <div className="relative z-10">
              <h2 className="heading-lg dark:text-white text-dark-900 mb-4">
                Ready to build something{' '}
                <span className="text-gradient">great together?</span>
              </h2>
              <p className="dark:text-slate-400 text-slate-500 mb-8 max-w-lg mx-auto">
                I'm actively looking for full-stack developer roles. Let's connect and see if I'm a fit for your team.
              </p>
              <Link to="/contact" className="btn-primary text-base px-8 py-3.5">
                Get in Touch <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
