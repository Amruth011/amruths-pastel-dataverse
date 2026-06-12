import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground font-mono">
              © 2026 Amruth Kumar M
            </p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { href: 'https://github.com/Amruth011', icon: <Github className="h-3.5 w-3.5" />, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/amruth-kumar-m', icon: <Linkedin className="h-3.5 w-3.5" />, label: 'LinkedIn' },
              { href: 'mailto:amruth.kumar.portfolio@gmail.com', icon: <Mail className="h-3.5 w-3.5" />, label: 'Email' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 p-1.5"
              >
                {link.icon}
              </a>
            ))}
          </div>

          <p className="text-[10px] text-muted-foreground font-mono tracking-wider uppercase">
            AI & Data Science Engineer
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
