import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ['home', 'about', 'skills', 'internship', 'projects', 'blog', 'certifications', 'contact'];
      const reversed = [...sections].reverse();
      for (const id of reversed) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    trackEvent('nav_click', { target: id });
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'internship' },
    { name: 'Projects', id: 'projects' },
    { name: 'Blog', id: 'blog' },
    { name: 'Certifications', id: 'certifications' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/60 backdrop-blur-2xl border-b border-border/50' : 'bg-transparent'
      }`}
    >

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => scrollToSection('home')} aria-label="Back to top of amruthportfolio" className="font-mono text-sm font-bold tracking-tight text-primary hover:opacity-80 transition-all duration-300 hover:tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md">
            amruthportfolio
          </button>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-current={activeSection === item.id ? 'true' : undefined}
                className={`relative text-sm px-3 py-1.5 rounded-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  activeSection === item.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/8 rounded-md border border-primary/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-1">
            {[
              { href: 'https://github.com/Amruth011', icon: <Github className="h-4 w-4" aria-hidden="true" />, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/amruth-kumar-m', icon: <Linkedin className="h-4 w-4" aria-hidden="true" />, label: 'LinkedIn' },
              { href: 'mailto:amruth.kumar.portfolio@gmail.com', icon: <Mail className="h-4 w-4" aria-hidden="true" />, label: 'Email' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={link.href.startsWith('mailto') ? 'Email Amruth' : `${link.label} profile (opens in a new tab)`}
                onClick={() => trackEvent('social_click', { network: link.label, location: 'header' })}
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {link.icon}
              </a>
            ))}
          </div>

          <button className="md:hidden text-muted-foreground p-2 min-h-11 min-w-11 inline-flex items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-card/98 backdrop-blur-2xl border-t border-border absolute left-0 right-0 top-16"
            >
              <nav className="flex flex-col p-4 gap-1">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-sm text-muted-foreground hover:text-foreground py-3 px-4 rounded-md hover:bg-accent transition-colors"
                  >
                    {item.name}
                  </motion.button>
                ))}
                <div className="flex items-center gap-4 pt-4 mt-2 border-t border-border px-4">
                  <a href="https://github.com/Amruth011" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground" aria-label="GitHub"><Github className="h-4 w-4" /></a>
                  <a href="https://www.linkedin.com/in/amruth-kumar-m" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
                  <a href="mailto:amruth.kumar.portfolio@gmail.com" className="text-muted-foreground hover:text-foreground" aria-label="Email"><Mail className="h-4 w-4" /></a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
