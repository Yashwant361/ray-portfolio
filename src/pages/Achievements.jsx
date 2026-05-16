// C:\Users\yashw\Desktop\ray-portfolio\ray-portfolio\frontend\src\pages\Achievements.jsx

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiStar, FiRefreshCw, FiExternalLink, FiAward, FiCheckCircle, FiCode } from 'react-icons/fi'
import PageTransition from '../components/PageTransition'
import SectionHeader from '../components/SectionHeader'
import { fetchHackerRankData } from '../services/hackerrank'
import data from '../data/portfolio.json'

function StarRating({ count, max = 5, size = 20 }) {
  return (
    <div className="flex gap-1">
      {[...Array(max)].map((_, i) => (
        <FiStar
          key={i}
          size={size}
          className={i < count ? 'text-yellow-400 fill-yellow-400' : 'dark:text-dark-400 text-slate-300'}
        />
      ))}
    </div>
  )
}

export default function Achievements() {
  const { achievements } = data
  const [hrData, setHrData] = useState(null)
  const [hrLoading, setHrLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  const loadHackerRank = async () => {
    setHrLoading(true)
    const d = await fetchHackerRankData()
    setHrData(d)
    setLastUpdated(new Date())
    setHrLoading(false)
  }

  useEffect(() => { loadHackerRank() }, [])

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto section-padding">

        <SectionHeader
          eyebrow="Recognition"
          title="Achievements"
          subtitle="Certifications, badges, and milestones I've earned along the way."
          centered
        />

        {/* ── HackerRank Live Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <div className="relative overflow-hidden card p-8 md:p-12 text-center max-w-2xl mx-auto"
            style={{ borderColor: 'rgba(20,184,166,0.25)' }}>
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-accent-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              {/* Platform badge */}
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full dark:bg-dark-600 bg-slate-100 border dark:border-dark-500 border-slate-200">
                <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">H</span>
                </div>
                <span className="text-xs font-mono dark:text-slate-300 text-slate-600 font-semibold">HackerRank</span>
                {hrData?.source !== 'static' && (
                  <span className="text-xs font-mono text-brand-500">● LIVE</span>
                )}
              </div>

              <h2 className="heading-md dark:text-white text-dark-900 mb-2">Problem Solving</h2>
              <p className="text-sm dark:text-slate-400 text-slate-500 mb-6">
                Algorithmic challenges solved in JavaScript
              </p>

              {hrLoading ? (
                <div className="flex justify-center items-center gap-3 py-4">
                  <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm dark:text-slate-400 text-slate-500">Fetching live data…</span>
                </div>
              ) : hrData ? (
                <>
                  <div className="flex justify-center mb-4">
                    <StarRating count={hrData.stars} size={32} />
                  </div>
                  <div className="text-5xl font-display font-bold text-gradient mb-2">
                    {hrData.stars}★
                  </div>
                  <p className="text-sm dark:text-slate-400 text-slate-500 mb-6">
                    Rating in Problem Solving
                  </p>

                  {/* Badges */}
                  {hrData.badges && (
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {hrData.badges.map((badge) => (
                        <div key={badge.name} className="flex items-center gap-1.5 px-3 py-1.5 tag-teal">
                          <FiAward size={12} />
                          {badge.name}
                          {badge.stars > 0 && (
                            <span className="text-yellow-400 text-xs">{badge.stars}★</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {hrData.rank && (
                    <p className="text-sm dark:text-slate-400 text-slate-500 mb-4">
                      Global Rank: <span className="text-brand-500 font-mono font-semibold">#{hrData.rank}</span>
                    </p>
                  )}
                </>
              ) : (
                <p className="dark:text-slate-400 text-slate-500 py-4">Data unavailable</p>
              )}

              <div className="flex items-center justify-center gap-3">
                <a
                  href={`https://hackerrank.com/${data.personal.hackerrank}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-sm py-2"
                >
                  <FiExternalLink size={14} /> View Profile
                </a>
                <button
                  onClick={loadHackerRank}
                  disabled={hrLoading}
                  className="w-9 h-9 rounded-xl dark:bg-dark-600 bg-slate-100 border dark:border-dark-500 border-slate-200 flex items-center justify-center dark:text-slate-400 text-slate-500 hover:text-brand-500 transition-colors disabled:opacity-50"
                  title="Refresh live data"
                >
                  <FiRefreshCw size={14} className={hrLoading ? 'animate-spin' : ''} />
                </button>
              </div>

              {lastUpdated && (
                <p className="mt-4 text-xs font-mono dark:text-slate-600 text-slate-400">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                  {hrData?.source === 'static' && ' · (static fallback — start backend for live data)'}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Achievement Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center">
                  {ach.platform === 'HackerRank' ? (
                    <FiAward className="text-brand-500" size={18} />
                  ) : (
                    <FiCheckCircle className="text-brand-500" size={18} />
                  )}
                </div>
                <div>
                  <span className="text-xs font-mono dark:text-slate-500 text-slate-400">{ach.platform}</span>
                  <div className="text-xs font-mono text-brand-500">{ach.date}</div>
                </div>
              </div>

              {ach.stars > 0 && (
                <StarRating count={ach.stars} size={14} />
              )}

              <h3 className="font-display font-bold dark:text-white text-dark-900 mt-3 mb-2 leading-tight">
                {ach.title}
              </h3>
              <p className="text-sm dark:text-slate-400 text-slate-500 leading-relaxed">
                {ach.description}
              </p>

              <div className="mt-4 pt-4 border-t dark:border-dark-500 border-slate-100">
                <span className="tag-teal">{ach.badge}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Backend setup note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="card p-5 border-accent-500/20 border"
        >
          <div className="flex items-start gap-3">
            <FiCode className="text-accent-400 mt-0.5 shrink-0" size={18} />
            <div>
              <h4 className="font-display font-semibold dark:text-white text-dark-900 mb-1">
                Live HackerRank Data — How It Works
              </h4>
              <p className="text-sm dark:text-slate-400 text-slate-500 leading-relaxed">
                The backend runs{' '}
                <code className="font-mono text-xs text-accent-400 dark:bg-dark-600 bg-slate-100 px-1.5 py-0.5 rounded">
                  GET /api/hackerrank
                </code>{' '}
                using Puppeteer to scrape your HackerRank profile page and extract star rating and badges.
                When the backend is offline, static fallback data is displayed automatically.
                Start the backend with{' '}
                <code className="font-mono text-xs text-brand-500 dark:bg-dark-600 bg-slate-100 px-1.5 py-0.5 rounded">
                  npm run dev
                </code>{' '}
                from the <code className="font-mono text-xs dark:bg-dark-600 bg-slate-100 px-1.5 py-0.5 rounded">/backend</code> folder.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
