import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiMail, FiCode } from 'react-icons/fi'
import data from '../data/portfolio.json'

export default function Footer() {
  const { personal } = data
  const year = new Date().getFullYear()

  return (
    <footer className="border-t dark:border-dark-600 border-slate-100 dark:bg-dark-800 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
                <FiCode className="text-white text-xs" />
              </div>
              <span className="font-display font-bold dark:text-white text-dark-900">
                Yashwant<span className="text-brand-500"></span>
              </span>
            </div>
            <p className="text-sm dark:text-slate-400 text-slate-500 leading-relaxed">
              Full Stack Developer (MERN) building scalable web apps and exploring data stories.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-display font-semibold dark:text-white text-dark-900 mb-3 text-sm">Navigation</p>
            <div className="grid grid-cols-2 gap-1">
              {['/', '/about', '/projects', '/skills', '/achievements', '/contact'].map((path) => (
                <Link
                  key={path}
                  to={path}
                  className="text-sm dark:text-slate-400 text-slate-500 hover:text-brand-500 transition-colors py-0.5"
                >
                  {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="font-display font-semibold dark:text-white text-dark-900 mb-3 text-sm">Connect</p>
            <div className="flex gap-3">
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
                  className="w-9 h-9 rounded-lg dark:bg-dark-600 bg-white border dark:border-dark-500 border-slate-200 flex items-center justify-center dark:text-slate-400 text-slate-500 hover:text-brand-500 hover:border-brand-500 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs dark:text-slate-500 text-slate-400">
              Current Location • India | Available for opportunities 
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t dark:border-dark-600 border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs dark:text-slate-500 text-slate-400">
            © {year} Yashwant Ray. Built with ❤️ and Engineered by RayTech Corp.
          </p>
          <p className="text-xs dark:text-slate-500 text-slate-400 font-mono">
           With great code comes great responsibility · Open to work | v1.0.0 
          </p>
        </div>
      </div>
    </footer>
  )
}
