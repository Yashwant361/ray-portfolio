import { motion } from 'framer-motion'

export default function SectionHeader({ eyebrow, title, subtitle, centered = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <div className={`flex items-center gap-2 mb-3 ${centered ? 'justify-center' : ''}`}>
          <div className="w-6 h-px bg-brand-500" />
          <span className="text-xs font-mono font-semibold text-brand-500 uppercase tracking-widest">
            {eyebrow}
          </span>
          <div className="w-6 h-px bg-brand-500" />
        </div>
      )}
      <h2 className="heading-lg dark:text-white text-dark-900 mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className={`dark:text-slate-400 text-slate-500 leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
