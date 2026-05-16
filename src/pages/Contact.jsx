import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from 'emailjs-com'
import {
  FiMail, FiMapPin, FiGithub, FiLinkedin,
  FiSend, FiCheckCircle, FiAlertCircle, FiUser, FiMessageSquare
} from 'react-icons/fi'
import PageTransition from '../components/PageTransition'
import SectionHeader from '../components/SectionHeader'
import data from '../data/portfolio.json'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

const contactInfo = [
  { icon: FiMail, label: 'Email', value: data.personal.email, href: `mailto:${data.personal.email}` },
  { icon: FiMapPin, label: 'Location', value: 'India (Remote-ready)', href: null },
  { icon: FiGithub, label: 'GitHub', value: `github.com/${data.personal.github}`, href: `https://github.com/${data.personal.github}` },
  { icon: FiLinkedin, label: 'LinkedIn', value: `in/${data.personal.linkedin}`, href: `https://linkedin.com/in/${data.personal.linkedin}` },
]

const initialForm = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 20) e.message = 'Message should be at least 20 characters'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_name: 'Ray',
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto section-padding">

        <SectionHeader
          eyebrow="Get in Touch"
          title="Contact Me"
          subtitle="I'm actively looking for full-stack roles. Drop me a message — I respond within 24 hours."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-4">

          {/* ── Left: Info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
                  <Icon className="text-brand-500" size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs dark:text-slate-500 text-slate-400 font-mono mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="text-sm dark:text-slate-300 text-slate-600 hover:text-brand-500 transition-colors font-medium truncate block"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm dark:text-slate-300 text-slate-600 font-medium">{value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-5 bg-gradient-to-br from-brand-500/10 to-accent-500/10 border-brand-500/20"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="glow-dot" />
                <span className="text-sm font-semibold dark:text-white text-dark-900">Available for Hire</span>
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-500 leading-relaxed">
                Open to full-time roles, internships, and freelance projects.
                Targeting <strong className="text-brand-500">6–10 LPA</strong> full-stack positions.
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: Contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="card p-6 md:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
                      <FiCheckCircle className="text-brand-500" size={32} />
                    </div>
                    <h3 className="font-display font-bold text-xl dark:text-white text-dark-900 mb-2">
                      Message Sent! 🎉
                    </h3>
                    <p className="dark:text-slate-400 text-slate-500 mb-6">
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                    <button onClick={() => setStatus('idle')} className="btn-outline text-sm">
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-mono dark:text-slate-400 text-slate-500 mb-1.5 uppercase tracking-wide">
                          Name *
                        </label>
                        <div className="relative">
                          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 dark:text-slate-500 text-slate-400" size={14} />
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className={`w-full pl-9 pr-4 py-3 rounded-xl text-sm dark:bg-dark-700 bg-slate-50 border ${errors.name ? 'border-red-500' : 'dark:border-dark-500 border-slate-200'
                              } dark:text-white text-dark-900 dark:placeholder-slate-600 placeholder-slate-400 focus:outline-none focus:border-brand-500 transition-colors`}
                          />
                        </div>
                        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-mono dark:text-slate-400 text-slate-500 mb-1.5 uppercase tracking-wide">
                          Email *
                        </label>
                        <div className="relative">
                          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 dark:text-slate-500 text-slate-400" size={14} />
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className={`w-full pl-9 pr-4 py-3 rounded-xl text-sm dark:bg-dark-700 bg-slate-50 border ${errors.email ? 'border-red-500' : 'dark:border-dark-500 border-slate-200'
                              } dark:text-white text-dark-900 dark:placeholder-slate-600 placeholder-slate-400 focus:outline-none focus:border-brand-500 transition-colors`}
                          />
                        </div>
                        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-mono dark:text-slate-400 text-slate-500 mb-1.5 uppercase tracking-wide">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Job opportunity / Project collaboration / …"
                        className={`w-full px-4 py-3 rounded-xl text-sm dark:bg-dark-700 bg-slate-50 border ${errors.subject ? 'border-red-500' : 'dark:border-dark-500 border-slate-200'
                          } dark:text-white text-dark-900 dark:placeholder-slate-600 placeholder-slate-400 focus:outline-none focus:border-brand-500 transition-colors`}
                      />
                      {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-mono dark:text-slate-400 text-slate-500 mb-1.5 uppercase tracking-wide">
                        Message *
                      </label>
                      <div className="relative">
                        <FiMessageSquare className="absolute left-3 top-3.5 dark:text-slate-500 text-slate-400" size={14} />
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Tell me about the opportunity, project, or just say hi…"
                          className={`w-full pl-9 pr-4 py-3 rounded-xl text-sm dark:bg-dark-700 bg-slate-50 border ${errors.message ? 'border-red-500' : 'dark:border-dark-500 border-slate-200'
                            } dark:text-white text-dark-900 dark:placeholder-slate-600 placeholder-slate-400 focus:outline-none focus:border-brand-500 transition-colors resize-none`}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        {errors.message
                          ? <p className="text-xs text-red-400">{errors.message}</p>
                          : <span />
                        }
                        <p className="text-xs dark:text-slate-600 text-slate-400 font-mono">{form.message.length}/1000</p>
                      </div>
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                        <FiAlertCircle className="text-red-400 shrink-0" size={16} />
                        <p className="text-sm text-red-400">
                          Failed to send. Please try emailing directly at{' '}
                          <a href={`mailto:${data.personal.email}`} className="underline">
                            {data.personal.email}
                          </a>
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <FiSend size={15} /> Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
