import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX, FiCode } from 'react-icons/fi'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/achievements', label: 'Achievements' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar({ toggleTheme, isDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'dark:bg-dark-800/90 bg-white/90 backdrop-blur-xl shadow-lg dark:shadow-dark-900/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-glow-teal group-hover:shadow-glow-teal transition-shadow">
              <FiCode className="text-white text-sm" />
            </div>
            <span className="font-display font-bold text-lg dark:text-white text-dark-900">
              Yashwant<span className="text-brand-500"></span>
            </span>
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium font-body transition-colors duration-200 rounded-lg ${
                    isActive
                      ? 'text-brand-500'
                      : 'dark:text-slate-400 text-slate-600 hover:text-brand-500 dark:hover:text-brand-400'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-500"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg dark:bg-dark-600 bg-slate-100 flex items-center justify-center dark:text-slate-300 text-slate-600 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
                </motion.div>
              </AnimatePresence>
            </button>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); window.location.href = '/contact' }}
              className="hidden md:block btn-primary text-sm py-2"
            >
              Hire Me
            </a>

            <button
              className="md:hidden w-9 h-9 rounded-lg dark:bg-dark-600 bg-slate-100 flex items-center justify-center dark:text-slate-300 text-slate-600"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 md:hidden dark:bg-dark-900/95 bg-white/95 backdrop-blur-xl flex flex-col pt-20 px-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block py-4 text-2xl font-display font-bold border-b dark:border-dark-600 border-slate-100 transition-colors ${
                      isActive ? 'text-brand-500' : 'dark:text-white text-dark-900'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <a href="/contact" className="btn-primary w-full justify-center">
                Hire Me
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
